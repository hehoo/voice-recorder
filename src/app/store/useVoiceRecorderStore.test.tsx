import { renderHook, act } from '@testing-library/react';
import { useVoiceRecorderStore, voiceRecorderActions } from './voiceRecorderStore';

describe('useVoiceRecorderStore', () => {
  // Reset the store state before each test
  beforeEach(() => {
    voiceRecorderActions.resetState();
  });

  test('should return the current state and actions', () => {
    const { result } = renderHook(() => useVoiceRecorderStore());
    
    // Check initial state
    expect(result.current.state.isRecording).toBe(false);
    expect(result.current.state.isPaused).toBe(false);
    expect(result.current.state.recordingTime).toBe(0);
    expect(result.current.state.transcript).toBe('');
    expect(result.current.state.audioURL).toBe(null);
    
    // Check that actions are available
    expect(typeof result.current.actions.setIsRecording).toBe('function');
    expect(typeof result.current.actions.setIsPaused).toBe('function');
    expect(typeof result.current.actions.setRecordingTime).toBe('function');
    expect(typeof result.current.actions.incrementRecordingTime).toBe('function');
    expect(typeof result.current.actions.setTranscript).toBe('function');
    expect(typeof result.current.actions.setAudioURL).toBe('function');
    expect(typeof result.current.actions.resetState).toBe('function');
  });

  test('should update state when actions are called', () => {
    const { result } = renderHook(() => useVoiceRecorderStore());
    
    // Update isRecording
    act(() => {
      result.current.actions.setIsRecording(true);
    });
    
    expect(result.current.state.isRecording).toBe(true);
    
    // Update isPaused
    act(() => {
      result.current.actions.setIsPaused(true);
    });
    
    expect(result.current.state.isPaused).toBe(true);
    
    // Update recordingTime
    act(() => {
      result.current.actions.setRecordingTime(42);
    });
    
    expect(result.current.state.recordingTime).toBe(42);
    
    // Update transcript
    act(() => {
      result.current.actions.setTranscript('Test transcript');
    });
    
    expect(result.current.state.transcript).toBe('Test transcript');
    
    // Update audioURL
    act(() => {
      result.current.actions.setAudioURL('blob:test');
    });
    
    expect(result.current.state.audioURL).toBe('blob:test');
  });

  test('should reset state when resetState is called', () => {
    const { result } = renderHook(() => useVoiceRecorderStore());
    
    // Set some values
    act(() => {
      result.current.actions.setIsRecording(true);
      result.current.actions.setIsPaused(true);
      result.current.actions.setRecordingTime(42);
      result.current.actions.setTranscript('Test transcript');
      result.current.actions.setAudioURL('blob:test');
    });
    
    // Reset state
    act(() => {
      result.current.actions.resetState();
    });
    
    // Verify all values are reset
    expect(result.current.state.isRecording).toBe(false);
    expect(result.current.state.isPaused).toBe(false);
    expect(result.current.state.recordingTime).toBe(0);
    expect(result.current.state.transcript).toBe('');
    expect(result.current.state.audioURL).toBe(null);
  });
}); 