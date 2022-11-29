import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Renderiza o componente About e teste...', () => {
  it('A página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    expect(history.location.pathname).toBe('/about');
  });
  it('A página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    const textAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(textAbout).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    const firstText = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/);
    const secondText = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/);

    expect(history.location.pathname).toBe('/about');
    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    expect(history.location.pathname).toBe('/about');

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
