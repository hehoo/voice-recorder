interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onStopRecording: () => void;
}

const RecordingControls = ({
  isRecording,
  isPaused,
  onStartRecording,
  onPauseRecording,
  onStopRecording
}: RecordingControlsProps) => {
  return (
    <div className="flex space-x-4 mb-6" data-testid="recording-controls">
      {!isRecording ? (
        <button
          onClick={onStartRecording}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="record-button"
          aria-label="Start recording"
        >
          Record
        </button>
      ) : (
        <>
          <button
            onClick={onPauseRecording}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            data-testid="pause-button"
            aria-label={isPaused ? "Resume recording" : "Pause recording"}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onStopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            data-testid="stop-button"
            aria-label="Stop recording"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default RecordingControls; 