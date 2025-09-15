import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

// Mock fetch for testing
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('renders posts app header', async () => {
  // Mock successful API responses
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, title: 'Test post', body: 'Test body', userId: 1 }
      ]
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: 'Test User' }
      ]
    });

  await act(async () => {
    render(<App />);
  });
  
  // Wait for the component to finish loading
  await waitFor(() => {
    expect(screen.getByText('Posts de JSONPlaceholder')).toBeInTheDocument();
  });
  
  expect(screen.getByText(/https:\/\/jsonplaceholder\.typicode\.com\//)).toBeInTheDocument();
});

test('displays loading state initially', () => {
  // Mock pending fetch requests
  fetch.mockImplementation(() => new Promise(() => {}));
  
  render(<App />);
  
  expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
});

test('displays posts after loading', async () => {
  // Mock successful API responses
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, title: 'Test post title', body: 'Test post body', userId: 1 }
      ]
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: 'John Doe' }
      ]
    });

  await act(async () => {
    render(<App />);
  });
  
  // Wait for posts to load
  await waitFor(() => {
    expect(screen.getByText('Test post title')).toBeInTheDocument();
  });
  
  expect(screen.getByText('Test post body')).toBeInTheDocument();
  expect(screen.getByText('Autor: John Doe')).toBeInTheDocument();
});
