import { formatTime } from '../utils/timeUtils';

interface TimeDisplayProps {
  seconds: number;
}

const TimeDisplay = ({ seconds }: TimeDisplayProps) => {
  return (
    <div className="text-3xl font-mono mb-6 text-gray-800 dark:text-white">
      {formatTime(seconds)}
    </div>
  );
};

export default TimeDisplay; 