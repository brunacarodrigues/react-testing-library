import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o componente Pokemon e testa...', () => {
  const pokemonIdRoute = '/pokemon/25';
  it('É renderizado um card com as informações de determinado Pokémo', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/Pikachu/);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/);
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/Electric/);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /More details/,
    });
    expect(linkDetails).toHaveAttribute('href', pokemonIdRoute);
  });
  it('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /More details/,
    });
    expect(linkDetails).toHaveAttribute('href', pokemonIdRoute);
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(pokemonIdRoute);
  });
  it('A URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe(pokemonIdRoute);
  });
  it('Existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pokemonIdRoute);
    });
    const checkFavorite = screen.getByRole('checkbox');
    userEvent.click(checkFavorite);
    act(() => {
      history.push('/');
    });
    const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
