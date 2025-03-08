import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeDisplay from './TimeDisplay';

describe('TimeDisplay Component', () => {
  test('formats and displays time correctly for seconds less than 60', () => {
    render(<TimeDisplay seconds={45} />);
    expect(screen.getByText('00:45')).toBeInTheDocument();
  });

  test('formats and displays time correctly for minutes and seconds', () => {
    render(<TimeDisplay seconds={125} />);
    expect(screen.getByText('02:05')).toBeInTheDocument();
  });

  test('formats and displays time correctly for zero seconds', () => {
    render(<TimeDisplay seconds={0} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  test('formats and displays time correctly for large values', () => {
    render(<TimeDisplay seconds={3661} />);
    expect(screen.getByText('61:01')).toBeInTheDocument();
  });
}); 