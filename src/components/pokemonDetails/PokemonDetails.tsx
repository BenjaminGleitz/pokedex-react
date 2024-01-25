// PokemonDetails.tsx
import React from 'react';
import './pokemonDetails.css';
import usePokemonDetails from '../../services/getOnePokemon/getOnePokemon';
import Loader from '../loader/Loader';

interface PokemonDetailsProps {
  pokemonId: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemonId }) => {
  const { pokemon, loading, pokemonEvolution, pokemonPreEvolution } = usePokemonDetails(pokemonId);

  if (loading) {
    return <Loader />;
  }

  if (!pokemon) {
    return <div>No Pokemon data available</div>;
  }

  return (
    <div className="details-container">
      <div className="details-image-container">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      {pokemonPreEvolution && (
        <div className="evolution-container">
          <h3>Pre-evolution</h3>
          <img src={pokemonPreEvolution.image} alt={pokemonPreEvolution.name} />
          <p>{pokemonPreEvolution.name}</p>
        </div>
      )}

      {pokemonEvolution && (
        <div className="evolution-container">
          <h3>Evolution</h3>
          <img src={pokemonEvolution.image} alt={pokemonEvolution.name} />
          <p>{pokemonEvolution.name}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
