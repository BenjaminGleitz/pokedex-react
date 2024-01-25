import React from 'react';
import GetOnePokemon from '../../services/getOnePokemon/GetOnePokemon';

const Show: React.FC = () => {
  return (
    <div>
      <h1>Pokemons</h1>
      <GetOnePokemon />
    </div>
  );
};

export default Show;
