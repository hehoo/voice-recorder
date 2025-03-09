'use client';

import React, { useState, useEffect } from 'react';
import useNetworkStatus from '../hooks/useNetworkStatus';

const OfflineIndicator: React.FC = () => {
  // Start with assuming we're online during server-side rendering
  const [mounted, setMounted] = useState(false);
  const isOnline = useNetworkStatus();

  // Only show the component after it has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server or before mounting
  if (!mounted) {
    return null;
  }

  // Only show the indicator when offline
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