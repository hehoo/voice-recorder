import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecordingControls from './RecordingControls';

describe('RecordingControls Component', () => {
  const mockStartRecording = jest.fn();
  const mockPauseRecording = jest.fn();
  const mockStopRecording = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders record button when not recording', () => {
    render(
      <RecordingControls
        isRecording={false}
        isPaused={false}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    const recordButton = screen.getByTestId('record-button');
    expect(recordButton).toBeInTheDocument();
    expect(recordButton).toHaveTextContent('Record');
    
    // Pause and stop buttons should not be present
    expect(screen.queryByTestId('pause-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('stop-button')).not.toBeInTheDocument();
  });

  test('renders pause and stop buttons when recording', () => {
    render(
      <RecordingControls
        isRecording={true}
        isPaused={false}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    // Record button should not be present
    expect(screen.queryByTestId('record-button')).not.toBeInTheDocument();
    
    // Pause and stop buttons should be present
    const pauseButton = screen.getByTestId('pause-button');
    const stopButton = screen.getByTestId('stop-button');
    
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).toHaveTextContent('Pause');
    expect(stopButton).toBeInTheDocument();
    expect(stopButton).toHaveTextContent('Stop');
  });

  test('renders resume button when recording is paused', () => {
    render(
      <RecordingControls
        isRecording={true}
        isPaused={true}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    const pauseButton = screen.getByTestId('pause-button');
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).toHaveTextContent('Resume');
  });

  test('calls onStartRecording when record button is clicked', () => {
    render(
      <RecordingControls
        isRecording={false}
        isPaused={false}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    const recordButton = screen.getByTestId('record-button');
    fireEvent.click(recordButton);
    
    expect(mockStartRecording).toHaveBeenCalledTimes(1);
  });

  test('calls onPauseRecording when pause button is clicked', () => {
    render(
      <RecordingControls
        isRecording={true}
        isPaused={false}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    const pauseButton = screen.getByTestId('pause-button');
    fireEvent.click(pauseButton);
    
    expect(mockPauseRecording).toHaveBeenCalledTimes(1);
  });

  test('calls onStopRecording when stop button is clicked', () => {
    render(
      <RecordingControls
        isRecording={true}
        isPaused={false}
        onStartRecording={mockStartRecording}
        onPauseRecording={mockPauseRecording}
        onStopRecording={mockStopRecording}
      />
    );
    
    const stopButton = screen.getByTestId('stop-button');
    fireEvent.click(stopButton);
    
    expect(mockStopRecording).toHaveBeenCalledTimes(1);
  });
}); 