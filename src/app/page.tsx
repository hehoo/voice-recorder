'use client';

import { useState } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import OfflineIndicator from './components/OfflineIndicator';
import RecordingsList from './components/RecordingsList';

export default function Home() {
  const [showSavedRecordings, setShowSavedRecordings] = useState(false);

  const handleRecordComplete = (result: { audioURL: string | null; text: string }) => {
    console.log('Recording completed:', result);
    // You can use the audioURL and text here
    // For example, you could send them to a server, display them in the UI, etc.
    
    // Show saved recordings after completing a recording
    setShowSavedRecordings(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <OfflineIndicator />
      
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Voice Recorder App</h1>
        <p className="text-gray-600 dark:text-gray-300">Record your voice and convert it to text</p>
      </header>
      
      <main className="w-full max-w-md">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
          // Reset application state here if needed
          console.log('Error boundary reset');
        }}>
          <VoiceRecorder onRecordComplete={handleRecordComplete} />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSavedRecordings(!showSavedRecordings)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showSavedRecordings ? 'Hide Saved Recordings' : 'Show Saved Recordings'}
            </button>
          </div>
          
          {showSavedRecordings && <RecordingsList />}
        </ErrorBoundary>
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Web Audio API</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Web Speech API</a></p>
        <p className="mt-1">Works offline! Your recordings are saved locally when offline.</p>
      </footer>
    </div>
  );
}
