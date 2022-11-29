import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o componente Pokedex e testa...', () => {
  it('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading', {
      name: /Encountered Pokémon/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });
  it('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);

    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('A Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    const bntType = screen.getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => (
      expect(bntType[index]).toHaveTextContent(type)
    ));
  });
  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const bntAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(bntAll).toBeInTheDocument();
    expect(bntAll).not
      .toHaveAttribute('data-testid', 'pokemon-type-button');
    userEvent.click(bntAll);
  });
});
