import { useRef, useEffect } from 'react';
import { useVoiceRecorderStore } from '../store/voiceRecorderStore';

interface UseVoiceRecorderProps {
  onRecordComplete?: (result: { audioURL: string | null; text: string }) => void;
  onError?: (error: Error) => void;
}

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  transcript: string;
  audioURL: string | null;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  stopRecording: () => void;
  error: Error | null;
}

// Define a simplified SpeechRecognition interface for use within this hook
interface SimpleSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresult: (event: any) => void;
  onerror?: (event: Event) => void;
  start: () => void;
  stop: () => void;
}

const useVoiceRecorder = ({ onRecordComplete, onError }: UseVoiceRecorderProps = {}): UseVoiceRecorderReturn => {
  const { state, actions } = useVoiceRecorderStore();
  const { isRecording, isPaused, recordingTime, transcript, audioURL } = state;
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SimpleSpeechRecognition | null>(null);
  const errorRef = useRef<Error | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // TypeScript doesn't have types for the experimental SpeechRecognition API
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          recognitionRef.current = new SpeechRecognition();
          if (recognitionRef.current) {
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognitionRef.current.onresult = (event: any) => {
              try {
                let interimTranscript = '';
                let finalTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                  const transcript = event.results[i][0].transcript;
                  if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                  } else {
                    interimTranscript += transcript;
                  }
                }
                
                actions.setTranscript(finalTranscript || interimTranscript);
              } catch (error) {
                handleError(error as Error);
              }
            };
            
            // Add error handler for speech recognition
            recognitionRef.current.onerror = (event) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const error = new Error(`Speech recognition error: ${(event as any).error}`);
              handleError(error);
            };
          }
        }
      } catch (error) {
        handleError(error as Error);
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping speech recognition:', error);
        }
      }
    };
  }, [actions]);
  
  // Timer for recording duration
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        actions.incrementRecordingTime();
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, actions]);
  
  // Handle errors
  const handleError = (error: Error) => {
    console.error('Voice recorder error:', error);
    errorRef.current = error;
    actions.setError(error);
    
    // Call onError callback if provided
    if (onError) {
      onError(error);
    }
    
    // Stop recording if it's in progress
    if (isRecording) {
      try {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        actions.setIsRecording(false);
        actions.setIsPaused(false);
      } catch (stopError) {
        console.error('Error stopping recording after error:', stopError);
      }
    }
    
    // Throw the error to be caught by ErrorBoundary
    throw error;
  };
  
  const startRecording = async () => {
    try {
      // Reset error state
      errorRef.current = null;
      
      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        throw new Error('MediaRecorder is not supported in this browser');
      }
      
      // Check if SpeechRecognition is supported
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).SpeechRecognition && !(window as any).webkitSpeechRecognition) {
        throw new Error('SpeechRecognition is not supported in this browser');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onerror = (event) => {
        handleError(new Error(`MediaRecorder error: ${event.error}`));
      };
      
      mediaRecorderRef.current.start();
      actions.setIsRecording(true);
      actions.setIsPaused(false);
      actions.setRecordingTime(0);
      
      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          handleError(error as Error);
        }
      }
    } catch (error) {
      handleError(error as Error);
    }
  };
  
  const pauseRecording = () => {
    try {
      if (mediaRecorderRef.current && isRecording) {
        if (!isPaused) {
          mediaRecorderRef.current.pause();
          actions.setIsPaused(true);
          
          // Pause speech recognition
          if (recognitionRef.current) {
            try {
              recognitionRef.current.stop();
            } catch (error) {
              console.error('Error stopping speech recognition:', error);
            }
          }
        } else {
          mediaRecorderRef.current.resume();
          actions.setIsPaused(false);
          
          // Resume speech recognition
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (error) {
              handleError(error as Error);
            }
          }
        }
      }
    } catch (error) {
      handleError(error as Error);
    }
  };
  
  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        actions.setIsRecording(false);
        actions.setIsPaused(false);
        
        // Stop speech recognition
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (error) {
            console.error('Error stopping speech recognition:', error);
          }
        }
      }
    } catch (error) {
      handleError(error as Error);
    }
  };
  
  // Call onRecordComplete when recording is stopped and audioURL is available
  useEffect(() => {
    if (!isRecording && audioURL && transcript && onRecordComplete) {
      onRecordComplete({ audioURL, text: transcript });
    }
  }, [isRecording, audioURL, transcript, onRecordComplete]);
  
  // Update the mediaRecorder onstop handler to call onRecordComplete
  useEffect(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          actions.setAudioURL(url);
          
          // Stop all tracks of the stream
          if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
          }
        } catch (error) {
          handleError(error as Error);
        }
      };
    }
  }, [actions]);
  
  return {
    isRecording,
    isPaused,
    recordingTime,
    transcript,
    audioURL,
    startRecording,
    pauseRecording,
    stopRecording,
    error: errorRef.current
  };
};

export default useVoiceRecorder; 