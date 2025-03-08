'use client';

import VoiceRecorder from './components/VoiceRecorder';

export default function Home() {
  const handleTranscriptionComplete = (text: string) => {
    console.log('Transcription completed:', text);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Voice Recorder App</h1>
        <p className="text-gray-600 dark:text-gray-300">Record your voice and convert it to text</p>
      </header>
      
      <main className="w-full max-w-md">
        <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with Web Audio API and Web Speech API</p>
      </footer>
    </div>
  );
}
