import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import Loader from '../../components/loader/Loader';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  apiTypes: { 
    name: string;
    image: string;
  }[];
}

const GetPokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('https://pokebuildapi.fr/api/v1/pokemon/limit/100');
      setPokemons(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="card-container">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default GetPokemons;
