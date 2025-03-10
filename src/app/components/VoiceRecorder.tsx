'use client';

import useVoiceRecorder from '../hooks/useVoiceRecorder';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import TimeDisplay from './TimeDisplay';
import RecordingControls from './RecordingControls';
import ProgressBar from './ProgressBar';

interface VoiceRecorderProps {
    onRecordComplete?: (result: { audioURL: string | null; text: string }) => void;
} 

const VoiceRecorder = ({ onRecordComplete }: VoiceRecorderProps) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    transcript,
    audioURL,
    startRecording,
    pauseRecording,
    stopRecording,
    error
  } = useVoiceRecorder({ 
    onRecordComplete,
    onError: (error) => {
      console.error('Voice recorder error in component:', error);
    }
  });
  
  // If there's an error, let the ErrorBoundary handle it
  if (error) {
    throw error;
  }
  
  return (
    <div 
      className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md"
      data-testid="voice-recorder"
      aria-label="Voice Recorder"
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Voice Recorder</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Maximum recording time: 1 hour</p>
      
      <ProgressBar isRecording={isRecording} isPaused={isPaused} />
      
      <TimeDisplay seconds={recordingTime} />
      
      <RecordingControls 
        isRecording={isRecording}
        isPaused={isPaused}
        onStartRecording={startRecording}
        onPauseRecording={pauseRecording}
        onStopRecording={stopRecording}
      />
      
      {audioURL && !isRecording && <AudioPlayer audioURL={audioURL} />}
      
      {(isRecording || transcript) && (
        <TranscriptDisplay transcript={transcript || 'Listening...'} />
      )}
    </div>
  );
};

export default VoiceRecorder; 