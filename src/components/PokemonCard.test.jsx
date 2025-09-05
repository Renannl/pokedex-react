import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { MemoryRouter } from 'react-router-dom';

describe('PokemonCard', () => {
  it('exibe nome e imagem do pokémon', () => {
    render(
      <MemoryRouter>
        <PokemonCard name="pikachu" img="/pikachu.png" />
      </MemoryRouter>
    );
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/pikachu.png');
  });
});