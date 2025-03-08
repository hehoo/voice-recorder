import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer Component', () => {
  const mockAudioURL = 'blob:http://localhost:3000/1234-5678';

  test('renders the audio player with the provided URL', () => {
    render(<AudioPlayer audioURL={mockAudioURL} />);
    
    // Check that the heading is rendered
    expect(screen.getByText('Recording')).toBeInTheDocument();
    
    // Check that the audio element is rendered with the correct URL
    const audioElement = screen.getByTestId('audio-player');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', mockAudioURL);
    expect(audioElement).toHaveAttribute('controls');
  });
}); 