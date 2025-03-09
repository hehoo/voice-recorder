import React from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';

const OfflineIndicator: React.FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white p-2 text-center z-50">
      <p className="text-sm font-medium">
        You are currently offline. Recordings will be saved locally.
      </p>
    </div>
  );
};

export default OfflineIndicator; 