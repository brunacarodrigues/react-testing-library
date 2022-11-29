import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Renderiza o componente FavoritePokemon e teste...', () => {
  it('é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFoundFavorite = screen.getByText(/No favorite Pokémon found/);
    expect(notFoundFavorite).toBeInTheDocument();
  });
  it('são exibidos todos os cards de Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const firstCard = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(firstCard);

    const firstCardDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(firstCardDetails);

    const checkFavoriteFirst = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkFavoriteFirst);

    act(() => {
      history.push('/');
    });

    const secondCard = screen.getByRole('button', {
      name: /normal/i,
    });
    userEvent.click(secondCard);

    const secondCardDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(secondCardDetails);

    const checkFavoriteSecond = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkFavoriteSecond);

    act(() => {
      history.push('/');
    });

    const linkFavorites = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(linkFavorites);

    const listFavorites = screen.getAllByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(listFavorites).toHaveLength(1);
  });
});
