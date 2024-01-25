// Show.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetails from '../../components/pokemonDetails/PokemonDetails';

const Show: React.FC = () => {
  const { pokemonId = '' } = useParams<{ pokemonId?: string }>();

  return (
    <div>
      <h1>Pokemons</h1>
      <PokemonDetails pokemonId={pokemonId} />
    </div>
  );
};

export default Show;
