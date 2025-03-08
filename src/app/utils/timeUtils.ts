/**
 * Formats seconds into a MM:SS time string
 * @param seconds - The number of seconds to format
 * @returns A string in the format "MM:SS" with leading zeros
 */
export const formatTime = (seconds: number): string => {
  // Handle negative values by using the absolute value
  const absoluteSeconds = Math.abs(seconds);
  const minutes = Math.floor(absoluteSeconds / 60);
  const remainingSeconds = absoluteSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 