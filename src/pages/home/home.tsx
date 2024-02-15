import React from 'react';
import GetPokemons from '../../services/displayAllPokemons/displayAllPokemons';

const Home: React.FC = () => {
  return (
    <div>
      <GetPokemons />
    </div>
  );
};

export default Home;
