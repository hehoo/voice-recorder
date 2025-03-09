import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback Component', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders error message correctly', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );

    // Check if error message is displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  test('calls resetErrorBoundary when try again button is clicked', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );

    // Find and click the try again button
    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);

    // Verify resetErrorBoundary was called
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  test('renders with correct styling', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );

    // Check if the component has the expected styling classes
    const container = screen.getByText('Something went wrong').closest('div');
    expect(container).toHaveClass('p-6');
    expect(container).toHaveClass('bg-red-50');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('text-center');

    // Check button styling
    const button = screen.getByText('Try again');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-md');
  });
}); 