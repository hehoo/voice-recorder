import { renderHook, act } from '@testing-library/react';
import useVoiceRecorder from './useVoiceRecorder';

// Create a class to mock MediaRecorder with proper event handling
class MockMediaRecorder {
  start = jest.fn();
  pause = jest.fn();
  resume = jest.fn();
  ondataavailable: ((event: Event) => void) | null = null;
  onstop: ((event: Event) => void) | null = null;
  state = 'inactive';

  // When stop is called, trigger the onstop handler
  stop = jest.fn().mockImplementation(() => {
    if (this.onstop) {
      this.onstop({} as Event);
    }
  });
}

// Create the mock instance
const mockMediaRecorderInstance = new MockMediaRecorder();

// Mock the MediaRecorder constructor
const mockMediaRecorder = jest.fn(() => mockMediaRecorderInstance);

// @ts-expect-error - Adding property to mock function
mockMediaRecorder.isTypeSupported = jest.fn().mockReturnValue(true);

// @ts-expect-error - TypeScript doesn't know about MediaRecorder
global.MediaRecorder = mockMediaRecorder;

// Mock getUserMedia
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  },
  writable: true,
});

// Mock URL.createObjectURL
URL.createObjectURL = jest.fn().mockReturnValue('blob:mock-url');

// Mock SpeechRecognition
const mockSpeechRecognition = jest.fn().mockImplementation(() => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    abort: jest.fn(),
    continuous: false,
    interimResults: false,
    onresult: jest.fn(),
  };
});

// @ts-expect-error - TypeScript doesn't know about SpeechRecognition
global.SpeechRecognition = mockSpeechRecognition;
// @ts-expect-error - TypeScript doesn't know about webkitSpeechRecognition
global.webkitSpeechRecognition = mockSpeechRecognition;

describe('useVoiceRecorder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useVoiceRecorder());
    
    expect(result.current.isRecording).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.recordingTime).toBe(0);
    expect(result.current.transcript).toBe('');
    expect(result.current.audioURL).toBe(null);
  });

  test('should start recording when startRecording is called', async () => {
    const { result } = renderHook(() => useVoiceRecorder());
    
    // Fix for deprecated act signature
    await act(async () => {
      // Call startRecording and wait for it to complete
      await result.current.startRecording();
    });
    
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(mockMediaRecorderInstance.start).toHaveBeenCalled();
    expect(result.current.isRecording).toBe(true);
    expect(result.current.isPaused).toBe(false);
  });

  test('should pause recording when pauseRecording is called', async () => {
    const { result } = renderHook(() => useVoiceRecorder());
    
    // Start recording first
    await act(async () => {
      await result.current.startRecording();
    });
    
    // Then pause it - fix for deprecated act signature
    await act(() => {
      result.current.pauseRecording();
    });
    
    expect(mockMediaRecorderInstance.pause).toHaveBeenCalled();
    expect(result.current.isPaused).toBe(true);
  });

  test('should stop recording when stopRecording is called', async () => {
    const { result } = renderHook(() => useVoiceRecorder());
    
    // Start recording first
    await act(async () => {
      await result.current.startRecording();
    });
    
    // Then stop it - fix for deprecated act signature
    await act(() => {
      result.current.stopRecording();
    });
    
    expect(mockMediaRecorderInstance.stop).toHaveBeenCalled();
    expect(result.current.isRecording).toBe(false);
  });
}); 