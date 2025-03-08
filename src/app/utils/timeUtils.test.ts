import { formatTime } from './timeUtils';

describe('timeUtils', () => {
  describe('formatTime', () => {
    test('formats seconds less than 60 correctly', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(1)).toBe('00:01');
      expect(formatTime(45)).toBe('00:45');
      expect(formatTime(59)).toBe('00:59');
    });

    test('formats minutes and seconds correctly', () => {
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(61)).toBe('01:01');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(599)).toBe('09:59');
    });

    test('formats hours as minutes correctly', () => {
      expect(formatTime(3600)).toBe('60:00');
      expect(formatTime(3661)).toBe('61:01');
      expect(formatTime(7200)).toBe('120:00');
    });

    test('handles negative values by treating them as positive', () => {
      expect(formatTime(-45)).toBe('00:45');
      expect(formatTime(-125)).toBe('02:05');
    });
  });
}); 