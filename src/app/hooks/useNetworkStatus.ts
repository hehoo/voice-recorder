'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to monitor network status (online/offline)
 * @returns boolean indicating if the device is online
 */
export const useNetworkStatus = (): boolean => {
  // Default to true (online) for server-side rendering
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Set initial state based on navigator.onLine
      setIsOnline(navigator.onLine);
      
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return isOnline;
};

export default useNetworkStatus; 