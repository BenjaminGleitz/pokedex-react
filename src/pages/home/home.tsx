import React from 'react';
import GetPokemons from '../../services/getAllPokemons/GetAllPokemons';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Pokemons</h1>
      <GetPokemons />
    </div>
  );
};

export default Home;
