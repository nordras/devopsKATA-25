import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders Vite + React', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});
