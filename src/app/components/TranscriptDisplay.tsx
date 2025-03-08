interface TranscriptDisplayProps {
  transcript: string;
}

const TranscriptDisplay = ({ transcript }: TranscriptDisplayProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Transcript</h3>
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white" data-testid="transcript-text">
        {transcript}
      </div>
    </div>
  );
};

export default TranscriptDisplay; 