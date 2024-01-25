import React from 'react';
import { Link } from 'react-router-dom';
import './pokemonCard.css';

interface PokemonCardProps {
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

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link to={`/show/${pokemon.id}`}>
      <div className="card">
        <div className="card-image">
          <img className='pokemon-image' src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="card-name">
          <h3>{pokemon.name}</h3>
          <div className="card-types">
            <div className="type-list">
              {pokemon.apiTypes.map((type, index) => (
                <img key={index} className='type-image' src={type.image} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
