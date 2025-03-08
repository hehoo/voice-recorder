'use client';

import { VoiceRecorderProps } from '../types/voice-recorder';
import useVoiceRecorder from '../hooks/useVoiceRecorder';

const VoiceRecorder = ({ onTranscriptionComplete }: VoiceRecorderProps) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    transcript,
    audioURL,
    startRecording,
    pauseRecording,
    stopRecording
  } = useVoiceRecorder({ onTranscriptionComplete });
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Voice Recorder</h2>
      
      <div className="w-full mb-6 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${isRecording && !isPaused ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`} 
          style={{ width: isRecording ? '100%' : '0%' }}
        ></div>
      </div>
      
      <div className="text-3xl font-mono mb-6 text-gray-800 dark:text-white">
        {formatTime(recordingTime)}
      </div>
      
      <div className="flex space-x-4 mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="record-button"
          >
            Record
          </button>
        ) : (
          <>
            <button
              onClick={pauseRecording}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              data-testid="pause-button"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              data-testid="stop-button"
            >
              Stop
            </button>
          </>
        )}
      </div>
      
      {audioURL && (
        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recording</h3>
          <audio src={audioURL} controls className="w-full" data-testid="audio-player" />
        </div>
      )}
      
      {transcript && (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Transcript</h3>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white" data-testid="transcript-text">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder; 