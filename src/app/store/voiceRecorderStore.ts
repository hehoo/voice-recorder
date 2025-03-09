import { Store } from '@tanstack/store';
import { useStore } from '@tanstack/react-store';

// Define the state interface
export interface VoiceRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  transcript: string;
  audioURL: string | null;
  error: Error | null;
}

// Define the initial state
const initialState: VoiceRecorderState = {
  isRecording: false,
  isPaused: false,
  recordingTime: 0,
  transcript: '',
  audioURL: null,
  error: null,
};

// Create the store
export const voiceRecorderStore = new Store<VoiceRecorderState>(initialState);

// Create actions
export const voiceRecorderActions = {
  setIsRecording: (isRecording: boolean) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      isRecording,
    }));
  },
  
  setIsPaused: (isPaused: boolean) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      isPaused,
    }));
  },
  
  setRecordingTime: (recordingTime: number) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      recordingTime,
    }));
  },
  
  incrementRecordingTime: () => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      recordingTime: state.recordingTime + 1,
    }));
  },
  
  setTranscript: (transcript: string) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      transcript,
    }));
  },
  
  setAudioURL: (audioURL: string | null) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      audioURL,
    }));
  },
  
  setError: (error: Error | null) => {
    voiceRecorderStore.setState((state) => ({
      ...state,
      error,
    }));
  },
  
  resetState: () => {
    voiceRecorderStore.setState(() => initialState);
  },
};

// Create a custom hook to use the store
export const useVoiceRecorderStore = () => {
  const state = useStore(voiceRecorderStore);
  return { state, actions: voiceRecorderActions };
}; 