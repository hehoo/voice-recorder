import { useState, useRef, useEffect } from 'react';

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
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  
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
            
            setTranscript(finalTranscript || interimTranscript);
          };
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  // Timer for recording duration
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);
  
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
        setAudioURL(audioUrl);
        
        // Stop all tracks of the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
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
        setIsPaused(true);
        
        // Pause speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } else {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        
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
      setIsRecording(false);
      setIsPaused(false);
      
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };
  
  // Update the mediaRecorder onstop handler to call onRecordComplete
  useEffect(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        if (onRecordComplete) {
          onRecordComplete({ audioURL: url, text: transcript });
        }
      };
    }
  }, [mediaRecorderRef, transcript, onRecordComplete]);
  
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