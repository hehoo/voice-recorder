import { useRef, useEffect } from 'react';
import { useVoiceRecorderStore } from '../store/voiceRecorderStore';

interface UseVoiceRecorderProps {
  onRecordComplete?: (result: { audioURL: string | null; text: string }) => void;
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
}

// Define a simplified SpeechRecognition interface for use within this hook
interface SimpleSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresult: (event: any) => void;
  start: () => void;
  stop: () => void;
}

const useVoiceRecorder = ({ onRecordComplete }: UseVoiceRecorderProps = {}): UseVoiceRecorderReturn => {
  const { state, actions } = useVoiceRecorderStore();
  const { isRecording, isPaused, recordingTime, transcript, audioURL } = state;
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SimpleSpeechRecognition | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
          };
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
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
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        actions.setAudioURL(audioUrl);
        
        // Stop all tracks of the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      actions.setIsRecording(true);
      actions.setIsPaused(false);
      actions.setRecordingTime(0);
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (!isPaused) {
        mediaRecorderRef.current.pause();
        actions.setIsPaused(true);
        
        // Pause speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } else {
        mediaRecorderRef.current.resume();
        actions.setIsPaused(false);
        
        // Resume speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      }
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      actions.setIsRecording(false);
      actions.setIsPaused(false);
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };
  
  // Call onRecordComplete when recording is stopped and audioURL is available
  useEffect(() => {
    if (!isRecording && audioURL && transcript && onRecordComplete) {
      onRecordComplete({ audioURL, text: transcript });
    }
  }, [isRecording, audioURL, transcript, onRecordComplete]);
  
  return {
    isRecording,
    isPaused,
    recordingTime,
    transcript,
    audioURL,
    startRecording,
    pauseRecording,
    stopRecording
  };
};

export default useVoiceRecorder; 