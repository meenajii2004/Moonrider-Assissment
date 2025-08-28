import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('renders with custom color', () => {
    render(<LoadingSpinner color="text-blue-500" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('text-blue-500');
  });

  it('renders with text message', () => {
    const message = 'Loading data...';
    render(<LoadingSpinner text={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders without text when not provided', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.parentElement).not.toHaveTextContent('Loading');
  });
});

describe('FullPageSpinner', () => {
  it('renders full page spinner', () => {
    render(<LoadingSpinner.FullPage />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.closest('div')).toHaveClass('min-h-screen');
  });

  it('renders with custom message', () => {
    const message = 'Please wait...';
    render(<LoadingSpinner.FullPage text={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

describe('InlineSpinner', () => {
  it('renders inline spinner', () => {
    render(<LoadingSpinner.Inline />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.closest('div')).toHaveClass('inline-flex');
  });
});

describe('ButtonSpinner', () => {
  it('renders button spinner', () => {
    render(<LoadingSpinner.Button />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-4', 'h-4');
  });
});
