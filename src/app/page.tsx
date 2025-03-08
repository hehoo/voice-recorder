'use client';

import VoiceRecorder from './components/VoiceRecorder';

export default function Home() {
  const handleRecordComplete = (result: { audioURL: string | null; text: string }) => {
    console.log('Recording completed:', result);
    // You can use the audioURL and text here
    // For example, you could send them to a server, display them in the UI, etc.
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Voice Recorder App</h1>
        <p className="text-gray-600 dark:text-gray-300">Record your voice and convert it to text</p>
      </header>
      
      <main className="w-full max-w-md">
        <VoiceRecorder onRecordComplete={handleRecordComplete} />
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Built with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Web Audio API</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Web Speech API</a></p>
      </footer>
    </div>
  );
}
