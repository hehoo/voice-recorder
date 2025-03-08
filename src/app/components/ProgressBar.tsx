interface ProgressBarProps {
  isRecording: boolean;
  isPaused: boolean;
}

const ProgressBar = ({ isRecording, isPaused }: ProgressBarProps) => {
  return (
    <div className="w-full mb-6 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5" data-testid="progress-bar">
      <div 
        className={`h-2.5 rounded-full ${isRecording && !isPaused ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`} 
        style={{ width: isRecording ? '100%' : '0%' }}
        role="progressbar"
        aria-valuenow={isRecording ? 100 : 0}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar; 