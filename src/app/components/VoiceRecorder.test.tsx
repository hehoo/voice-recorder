import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoiceRecorder from './VoiceRecorder';
import useVoiceRecorder from '../hooks/useVoiceRecorder';

// Mock the useVoiceRecorder hook
jest.mock('../hooks/useVoiceRecorder', () => {
  return jest.fn(() => ({
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    transcript: '',
    audioURL: null,
    startRecording: jest.fn(),
    pauseRecording: jest.fn(),
    stopRecording: jest.fn()
  }));
});

// Get the mocked hook
const mockedUseVoiceRecorder = useVoiceRecorder as jest.MockedFunction<typeof useVoiceRecorder>;

describe('VoiceRecorder Component', () => {
  test('renders the component with initial state', () => {
    render(<VoiceRecorder />);
    
    expect(screen.getByText('Voice Recorder')).toBeInTheDocument();
    expect(screen.getByTestId('record-button')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop-button')).not.toBeInTheDocument();
  });

  test('renders pause and stop buttons when recording', () => {
    // Update the mock to return isRecording as true
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: true,
      isPaused: false,
      recordingTime: 10,
      transcript: '',
      audioURL: null,
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn()
    });
    
    render(<VoiceRecorder />);
    
    expect(screen.queryByTestId('record-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('pause-button')).toBeInTheDocument();
    expect(screen.getByTestId('stop-button')).toBeInTheDocument();
    expect(screen.getByText('00:10')).toBeInTheDocument();
  });

  test('renders resume button when paused', () => {
    // Update the mock to return isRecording and isPaused as true
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: true,
      isPaused: true,
      recordingTime: 5,
      transcript: '',
      audioURL: null,
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn()
    });
    
    render(<VoiceRecorder />);
    
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  test('renders audio player when audioURL is available', () => {
    // Update the mock to return an audioURL
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      transcript: '',
      audioURL: 'blob:http://localhost:3000/1234-5678',
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn()
    });
    
    render(<VoiceRecorder />);
    
    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
  });

  test('renders transcript when available', () => {
    // Update the mock to return a transcript
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      transcript: 'This is a test transcript',
      audioURL: null,
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn()
    });
    
    render(<VoiceRecorder />);
    
    expect(screen.getByTestId('transcript-text')).toBeInTheDocument();
    expect(screen.getByText('This is a test transcript')).toBeInTheDocument();
  });

  test('passes onRecordComplete to useVoiceRecorder', () => {
    const mockOnRecordComplete = jest.fn();
    render(<VoiceRecorder onRecordComplete={mockOnRecordComplete} />);
    
    // Verify that useVoiceRecorder was called with the correct props
    expect(mockedUseVoiceRecorder).toHaveBeenCalledWith(
      expect.objectContaining({
        onRecordComplete: mockOnRecordComplete
      })
    );
  });
}); 