'use client';

import { VoiceRecorderProps } from '../types/voice-recorder';
import useVoiceRecorder from '../hooks/useVoiceRecorder';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import TimeDisplay from './TimeDisplay';

const VoiceRecorder = ({ onRecordComplete }: VoiceRecorderProps) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    transcript,
    audioURL,
    startRecording,
    pauseRecording,
    stopRecording
  } = useVoiceRecorder({ onRecordComplete });
  
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Voice Recorder</h2>
      
      <div className="w-full mb-6 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${isRecording && !isPaused ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`} 
          style={{ width: isRecording ? '100%' : '0%' }}
        ></div>
      </div>
      
      <TimeDisplay seconds={recordingTime} />
      
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
      
      {audioURL && <AudioPlayer audioURL={audioURL} />}
      
      {transcript && <TranscriptDisplay transcript={transcript} />}
    </div>
  );
};

export default VoiceRecorder; 