import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  test('renders inactive progress bar when not recording', () => {
    render(<ProgressBar isRecording={false} isPaused={false} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    
    const progressIndicator = progressBar.firstChild as HTMLElement;
    expect(progressIndicator).toHaveStyle('width: 0%');
    expect(progressIndicator).not.toHaveClass('bg-red-600');
    expect(progressIndicator).not.toHaveClass('animate-pulse');
    expect(progressIndicator).toHaveClass('bg-gray-400');
    
    // Check accessibility attributes
    expect(progressIndicator).toHaveAttribute('role', 'progressbar');
    expect(progressIndicator).toHaveAttribute('aria-valuenow', '0');
    expect(progressIndicator).toHaveAttribute('aria-valuemin', '0');
    expect(progressIndicator).toHaveAttribute('aria-valuemax', '100');
  });

  test('renders active progress bar when recording', () => {
    render(<ProgressBar isRecording={true} isPaused={false} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    
    const progressIndicator = progressBar.firstChild as HTMLElement;
    expect(progressIndicator).toHaveStyle('width: 100%');
    expect(progressIndicator).toHaveClass('bg-red-600');
    expect(progressIndicator).toHaveClass('animate-pulse');
    expect(progressIndicator).not.toHaveClass('bg-gray-400');
    
    // Check accessibility attributes
    expect(progressIndicator).toHaveAttribute('role', 'progressbar');
    expect(progressIndicator).toHaveAttribute('aria-valuenow', '100');
  });

  test('renders inactive progress bar when recording is paused', () => {
    render(<ProgressBar isRecording={true} isPaused={true} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    
    const progressIndicator = progressBar.firstChild as HTMLElement;
    expect(progressIndicator).toHaveStyle('width: 100%');
    expect(progressIndicator).not.toHaveClass('bg-red-600');
    expect(progressIndicator).not.toHaveClass('animate-pulse');
    expect(progressIndicator).toHaveClass('bg-gray-400');
  });
}); 