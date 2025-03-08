import { voiceRecorderStore, voiceRecorderActions } from './voiceRecorderStore';

describe('voiceRecorderStore', () => {
  // Reset the store state before each test
  beforeEach(() => {
    voiceRecorderActions.resetState();
  });

  test('should initialize with default values', () => {
    const state = voiceRecorderStore.state;
    
    expect(state.isRecording).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.recordingTime).toBe(0);
    expect(state.transcript).toBe('');
    expect(state.audioURL).toBe(null);
  });

  test('setIsRecording should update isRecording state', () => {
    voiceRecorderActions.setIsRecording(true);
    
    expect(voiceRecorderStore.state.isRecording).toBe(true);
    
    voiceRecorderActions.setIsRecording(false);
    
    expect(voiceRecorderStore.state.isRecording).toBe(false);
  });

  test('setIsPaused should update isPaused state', () => {
    voiceRecorderActions.setIsPaused(true);
    
    expect(voiceRecorderStore.state.isPaused).toBe(true);
    
    voiceRecorderActions.setIsPaused(false);
    
    expect(voiceRecorderStore.state.isPaused).toBe(false);
  });

  test('setRecordingTime should update recordingTime state', () => {
    voiceRecorderActions.setRecordingTime(42);
    
    expect(voiceRecorderStore.state.recordingTime).toBe(42);
  });

  test('incrementRecordingTime should increment recordingTime by 1', () => {
    // Set initial value
    voiceRecorderActions.setRecordingTime(10);
    
    // Increment
    voiceRecorderActions.incrementRecordingTime();
    
    expect(voiceRecorderStore.state.recordingTime).toBe(11);
  });

  test('setTranscript should update transcript state', () => {
    const testTranscript = 'This is a test transcript';
    voiceRecorderActions.setTranscript(testTranscript);
    
    expect(voiceRecorderStore.state.transcript).toBe(testTranscript);
  });

  test('setAudioURL should update audioURL state', () => {
    const testURL = 'blob:http://localhost:3000/1234-5678';
    voiceRecorderActions.setAudioURL(testURL);
    
    expect(voiceRecorderStore.state.audioURL).toBe(testURL);
    
    // Test with null value
    voiceRecorderActions.setAudioURL(null);
    
    expect(voiceRecorderStore.state.audioURL).toBe(null);
  });

  test('resetState should reset all state to initial values', () => {
    // Set some values
    voiceRecorderActions.setIsRecording(true);
    voiceRecorderActions.setIsPaused(true);
    voiceRecorderActions.setRecordingTime(42);
    voiceRecorderActions.setTranscript('Test transcript');
    voiceRecorderActions.setAudioURL('blob:test');
    
    // Reset state
    voiceRecorderActions.resetState();
    
    // Verify all values are reset
    const state = voiceRecorderStore.state;
    expect(state.isRecording).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.recordingTime).toBe(0);
    expect(state.transcript).toBe('');
    expect(state.audioURL).toBe(null);
  });

  test('store should maintain state between actions', () => {
    // Set multiple values
    voiceRecorderActions.setIsRecording(true);
    voiceRecorderActions.setRecordingTime(10);
    voiceRecorderActions.setTranscript('Hello');
    
    // Verify all values are maintained
    expect(voiceRecorderStore.state.isRecording).toBe(true);
    expect(voiceRecorderStore.state.recordingTime).toBe(10);
    expect(voiceRecorderStore.state.transcript).toBe('Hello');
    
    // Update one value
    voiceRecorderActions.setRecordingTime(20);
    
    // Verify only that value changed
    expect(voiceRecorderStore.state.isRecording).toBe(true);
    expect(voiceRecorderStore.state.recordingTime).toBe(20);
    expect(voiceRecorderStore.state.transcript).toBe('Hello');
  });
}); 