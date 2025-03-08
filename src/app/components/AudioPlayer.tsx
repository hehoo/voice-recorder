interface AudioPlayerProps {
  audioURL: string;
}

const AudioPlayer = ({ audioURL }: AudioPlayerProps) => {
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recording</h3>
      <audio src={audioURL} controls className="w-full" data-testid="audio-player" />
    </div>
  );
};

export default AudioPlayer; 