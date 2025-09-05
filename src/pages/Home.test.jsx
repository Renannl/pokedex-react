import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { ThemeProvider } from '../context/ThemeContext';

describe('Home', () => {
  it('renderiza o campo de busca', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    expect(screen.getByPlaceholderText(/buscar pokémon/i)).toBeInTheDocument();
  });

  it('renderiza o botão de carregar mais', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    expect(screen.getByText(/carregar mais/i)).toBeInTheDocument();
  });
});
