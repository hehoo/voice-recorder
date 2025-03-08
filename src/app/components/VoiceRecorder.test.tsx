import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoiceRecorder from './VoiceRecorder';

// Mock the MediaRecorder API
global.MediaRecorder = jest.fn().mockImplementation(() => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    ondataavailable: jest.fn(),
    onstop: jest.fn(),
    state: 'inactive',
  };
});

// Mock getUserMedia
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  },
  writable: true,
});

// Mock SpeechRecognition
global.SpeechRecognition = jest.fn().mockImplementation(() => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    abort: jest.fn(),
    continuous: false,
    interimResults: false,
    onresult: jest.fn(),
  };
});

global.webkitSpeechRecognition = global.SpeechRecognition;

describe('VoiceRecorder Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with initial state', () => {
    render(<VoiceRecorder />);
    
    expect(screen.getByText('Voice Recorder')).toBeInTheDocument();
    expect(screen.getByText('Record')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).not.toBeInTheDocument();
    expect(screen.queryByText('Stop')).not.toBeInTheDocument();
  });

  test('shows pause and stop buttons when recording starts', async () => {
    render(<VoiceRecorder />);
    
    const recordButton = screen.getByText('Record');
    fireEvent.click(recordButton);
    
    expect(screen.queryByText('Record')).not.toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
    
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
  });

  test('changes button text when pausing', async () => {
    render(<VoiceRecorder />);
    
    // Start recording
    const recordButton = screen.getByText('Record');
    fireEvent.click(recordButton);
    
    // Pause recording
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);
    
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  test('calls onTranscriptionComplete when stopping recording', async () => {
    const mockOnTranscriptionComplete = jest.fn();
    render(<VoiceRecorder onTranscriptionComplete={mockOnTranscriptionComplete} />);
    
    // Start recording
    const recordButton = screen.getByText('Record');
    fireEvent.click(recordButton);
    
    // Stop recording
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    
    // Manually trigger the onstop event
    const mediaRecorderInstance = (MediaRecorder as jest.Mock).mock.instances[0];
    mediaRecorderInstance.onstop();
    
    expect(mockOnTranscriptionComplete).toHaveBeenCalled();
  });
}); 