import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock axios
jest.mock('axios');
const mockedAxios = require('axios');

describe('App Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('renders Jenkins React Demo title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Jenkins \+ React Demo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays build information', () => {
    render(<App />);
    
    expect(screen.getByText(/Informações da Build:/i)).toBeInTheDocument();
    expect(screen.getByText(/Job:/i)).toBeInTheDocument();
    expect(screen.getByText(/Build Number:/i)).toBeInTheDocument();
    expect(screen.getByText(/Build ID:/i)).toBeInTheDocument();
  });

  test('displays functionalities list', () => {
    render(<App />);
    
    expect(screen.getByText(/Pipeline automatizado Jenkins/i)).toBeInTheDocument();
    expect(screen.getByText(/Build e deploy de aplicação React/i)).toBeInTheDocument();
    expect(screen.getByText(/Testes automatizados/i)).toBeInTheDocument();
  });

  test('shows backend connection status', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Connection failed'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Desconectado/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Backend não disponível/i)).toBeInTheDocument();
  });

  test('test connection button works', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { message: 'Backend conectado com sucesso!' }
    });

    render(<App />);
    
    const testButton = screen.getByText(/Testar Conexão/i);
    fireEvent.click(testButton);
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/hello', { timeout: 5000 });
    });
  });

  test('handles successful backend connection', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { message: 'Sucesso!' }
    });

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Conectado/i)).toBeInTheDocument();
    });
  });
});
