import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderize o componente PokemonDetails e testa...', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const pikachuDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(details).not.toBeInTheDocument();
    expect(pikachuDetails).toBeInTheDocument();

    const infosPokemon = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(infosPokemon).toBeInTheDocument();

    const text = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(text).toBeInTheDocument();
  });
  it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const locations = screen.getByRole('heading', {
      name: /locations of pikachu/i,
    });
    expect(locations).toBeInTheDocument();

    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const img = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(img).toHaveLength(2);
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('O usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pokemonIdRoute);
    });
    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
