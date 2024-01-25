import React from 'react';
import './pokemonDetails.css';

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    apiTypes: { 
      name: string;
      image: string;
    }[];
  };
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <div className="details">
      <p>ID du Pokémon : {pokemon.id}</p>
      <p>Nom : {pokemon.name}</p>
      <img src={pokemon.image} alt={pokemon.name} />
      <div>
        <h3>Types :</h3>
        <ul>
          {pokemon.apiTypes.map((type, index) => (
            <li key={index}>{type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
