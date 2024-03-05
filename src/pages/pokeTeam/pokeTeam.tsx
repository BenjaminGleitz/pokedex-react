import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../../components/pokemonCard/PokemonCard";
import Loader from "../../components/loader/Loader";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    apiTypes: {
        name: string;
        image: string;
    }[];
}

const PokeTeam: React.FC = () => {
    const [capturedPokemonArray, setCapturedPokemonArray] = useState<number[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Ajout de l'état loading

    useEffect(() => {
        const fetchCapturedPokemons = () => {
            const capturedPokemons = localStorage.getItem('capturedPokemons');
            if (capturedPokemons) {
                setCapturedPokemonArray(JSON.parse(capturedPokemons));
            }
        };

        fetchCapturedPokemons();
    }, []);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const details = await Promise.all(
                capturedPokemonArray.map(async (pokemonId) => {
                    try {
                        const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
                        return response.data;
                    } catch (error) {
                        console.log(error);
                        return null;
                    }
                })
            );
            setPokemonDetails(details.filter(Boolean));
            setLoading(false); // Mettre à jour l'état loading une fois les détails récupérés
        };

        fetchPokemonDetails();
    }, [capturedPokemonArray]);

    return (
        <div>
            <h1>Mon équipe !</h1>
            {loading ? (
                <Loader />
            ) : (
                <div className="card-container">
                    {pokemonDetails.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PokeTeam;
