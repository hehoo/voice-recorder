import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptDisplay from './TranscriptDisplay';

describe('TranscriptDisplay Component', () => {
  const mockTranscript = 'This is a test transcript';

  test('renders the transcript display with the provided text', () => {
    render(<TranscriptDisplay transcript={mockTranscript} />);
    
    // Check that the heading is rendered
    expect(screen.getByText('Transcript')).toBeInTheDocument();
    
    // Check that the transcript text is rendered
    const transcriptElement = screen.getByTestId('transcript-text');
    expect(transcriptElement).toBeInTheDocument();
    expect(transcriptElement).toHaveTextContent(mockTranscript);
  });
}); 