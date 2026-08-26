import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero name', () => {
  render(<App />);
  const nameElement = screen.getByRole('heading', { level: 1 });
  expect(nameElement).toHaveTextContent(/Om Balar/i);
});
