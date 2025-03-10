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
    stopRecording: jest.fn(),
    error: null
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
    expect(screen.queryByTestId('transcript-text')).not.toBeInTheDocument();
  });

  test('renders record button when not recording', () => {
    // Mock the useVoiceRecorder hook to return default values
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      transcript: '',
      audioURL: null,
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if the record button is rendered
    expect(screen.getByTestId('record-button')).toBeInTheDocument();
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
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if pause and stop buttons are rendered
    expect(screen.getByTestId('pause-button')).toBeInTheDocument();
    expect(screen.getByTestId('stop-button')).toBeInTheDocument();
  });

  test('renders transcript display with "Listening..." when recording starts', () => {
    // Update the mock to return isRecording as true but no transcript yet
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: true,
      isPaused: false,
      recordingTime: 5,
      transcript: '',
      audioURL: null,
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if transcript display is rendered with "Listening..." text
    const transcriptElement = screen.getByTestId('transcript-text');
    expect(transcriptElement).toBeInTheDocument();
    expect(transcriptElement).toHaveTextContent('Listening...');
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
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if resume button is rendered - the button has data-testid="pause-button" but text "Resume"
    const pauseButton = screen.getByTestId('pause-button');
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).toHaveTextContent('Resume');
  });

  test('renders audio player when audioURL is available and not recording', () => {
    // Update the mock to return an audioURL
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      transcript: '',
      audioURL: 'blob:http://localhost:3000/1234-5678',
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if audio player is rendered
    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
  });

  test('does not render audio player when audioURL is available but still recording', () => {
    // Update the mock to return an audioURL but still recording
    mockedUseVoiceRecorder.mockReturnValue({
      isRecording: true,
      isPaused: false,
      recordingTime: 10,
      transcript: '',
      audioURL: 'blob:http://localhost:3000/1234-5678',
      startRecording: jest.fn(),
      pauseRecording: jest.fn(),
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check that audio player is not rendered
    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument();
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
      stopRecording: jest.fn(),
      error: null
    });
    
    render(<VoiceRecorder />);
    
    // Check if transcript is rendered - it has data-testid="transcript-text"
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