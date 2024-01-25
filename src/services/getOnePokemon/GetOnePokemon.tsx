import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonDetails from '../../components/pokemonDetails/PokemonDetails';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  apiTypes: { 
    name: string;
    image: string;
  }[];
}

const GetOnePokemon: React.FC = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
        setPokemon(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="header">Détails du Pokémon</h2>
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
};

export default GetOnePokemon;
