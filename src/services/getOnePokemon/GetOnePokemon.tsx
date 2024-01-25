import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonDetails from '../../components/pokemonDetails/PokemonDetails';
import Loader from '../../components/loader/Loader';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  apiTypes: { 
    name: string;
    image: string;
  }[];
  apiPrevEvolution: {
    id: number;
    name: string;
    image: string;
  }[];
  apiNextEvolution: {
    id: number;
    name: string;
    image: string;
  }[];
}

const GetOnePokemon: React.FC = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
        setPokemon(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (loading) {
    return <Loader />; // Affiche le Loader pendant le chargement
  }

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loading && <Loader />} {/* Afficher le Loader si en cours de chargement */}
      {!loading && (
        <div className="container">
          <h2 className="header">Détails du Pokémon</h2>
          <PokemonDetails pokemon={pokemon} />
        </div>
      )}
    </div>
  );
};

export default GetOnePokemon;
