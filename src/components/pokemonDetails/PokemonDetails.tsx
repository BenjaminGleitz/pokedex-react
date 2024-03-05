import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGetOnePokemon from "../../services/getOnePokemon/UseGetOnePokemon.tsx";
import Loader from "../loader/Loader";
import "./pokemonDetails.css"; // Import du fichier CSS

interface PokemonDetailsProps {
    pokemonId: number;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({pokemonId}) => {
    const {pokemon, loading, pokemonEvolution, pokemonPreEvolution, evoliEvolutions} = useGetOnePokemon(pokemonId);

    const [capturedPokemons, setCapturedPokemons] = useState<number[]>([]);

    useEffect(() => {
        const capturedPokemonsString = localStorage.getItem('capturedPokemons');
        if (capturedPokemonsString) {
            setCapturedPokemons(JSON.parse(capturedPokemonsString));
        }
    }, []);

    const isCaptured = capturedPokemons.includes(pokemonId);

    const addToLocalStorage = () => {
        if (isCaptured) {
            const updatedCapturedPokemons = capturedPokemons.filter(id => id !== pokemonId);
            localStorage.setItem('capturedPokemons', JSON.stringify(updatedCapturedPokemons));
            setCapturedPokemons(updatedCapturedPokemons);
        } else {
            const updatedCapturedPokemons = [...capturedPokemons, pokemonId];
            localStorage.setItem('capturedPokemons', JSON.stringify(updatedCapturedPokemons));
            setCapturedPokemons(updatedCapturedPokemons);
        }
    };

    const calculateWidth = (value: number): string => {
        return `${(value / 255) * 100}%`;
    };

    if (loading) {
        return <Loader />;
    }

    if (!pokemon) {
        return <div>No Pokemon data available</div>;
    }

    return (
        <>
            <div className="pokemon-link">
                <Link to={`/show/${pokemon.id - 1}`}>
                    <div className="back-link">
                        <p>&#10094; Pokemon précédent</p>
                    </div>
                </Link>
                <Link to={`/`}>
                    <div className="back-link">
                        <p>- Retour au Pokedex -</p>
                    </div>
                </Link>
                <div className="back-link">
                    <button onClick={addToLocalStorage}>
                        {isCaptured ? "Enlever de l'équipe" : "Capturez !"}
                    </button>
                </div>
                <Link to={`/show/${pokemon.id + 1}`}>
                    <div className="back-link">
                        <p>Pokémon suivant &#10095;</p>
                    </div>
                </Link>
            </div>
            <div className="details-container">
                <div className="details-image-container">
                    <div className="main-pokemon-container">
                        <img className='main-pokemon' src={pokemon.image} alt={pokemon.name}/>
                    </div>
                    {pokemon.id === 133 ? (
                        <div className="image-evolutions-container evoli">
                            {evoliEvolutions ? (
                                evoliEvolutions.map((evolution, index: number) => (
                                    <Link key={index} to={`/show/${evolution.id}`}>
                                        <img className='evo-pokemon' src={evolution.image} alt={evolution.name}/>
                                    </Link>
                                ))
                            ) : (
                                <p className='evo-pokemon'></p>
                            )}
                        </div>
                    ) : (
                        <div className="image-evolutions-container">
                            {pokemonPreEvolution && pokemonPreEvolution.id === pokemon.id ? (
                                <p className='evo-pokemon'></p>
                            ) : (
                                pokemonPreEvolution ? (
                                    <Link to={`/show/${pokemonPreEvolution.id}`}>
                                        <img className='evo-pokemon' src={pokemonPreEvolution.image} alt={pokemonPreEvolution.name}/>
                                    </Link>
                                ) : (
                                    <p></p>
                                )
                            )}
                            {pokemonEvolution && pokemonEvolution.id === pokemon.id ? (
                                <p className='evo-pokemon'></p>
                            ) : (
                                pokemonEvolution ? (
                                    <Link to={`/show/${pokemonEvolution.id}`}>
                                        <img className='evo-pokemon' src={pokemonEvolution.image} alt={pokemonEvolution.name}/>
                                    </Link>
                                ) : (
                                    <p></p>
                                )
                            )}
                        </div>
                    )}
                </div>
                <div className="details-stat-container">
                    <div className="details-stat">
                        <h1 className='details-stat-name'>{pokemon.name.toUpperCase()}</h1>
                        <div className="details-stat-group">
                            <div className="stat-row">
                                <p className='stat-name'>HP:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.HP * 1.5)}}>
                                        {pokemon.stats.HP}
                                    </div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Attaque:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.attack * 1.5)}}>
                                        {pokemon.stats.attack}
                                    </div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Défense:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.defense * 1.5)}}>
                                        {pokemon.stats.defense}
                                    </div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Attaque Spéciale:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.special_attack * 1.5)}}>
                                        {pokemon.stats.special_attack}
                                    </div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Défense Spéciale:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.special_defense * 1.5)}}>
                                        {pokemon.stats.special_defense}
                                    </div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Vitesse:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress" style={{width: calculateWidth(pokemon.stats.speed * 1.5)}}>
                                        {pokemon.stats.speed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resistance">
                        <div className="resistance-container-resistance">
                            <div className="grups">
                                {pokemon.apiResistances.filter((resistance) => resistance.damage_multiplier < 1).map((resistance, index: number) => (
                                    <div key={index} className="resistance-row strong">
                                        <p className='resistance-name'>{resistance.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="grups">
                                {pokemon.apiResistances.filter((resistance) => resistance.damage_multiplier === 1).map((resistance, index: number) => (
                                    <div key={index} className="resistance-row neutral">
                                        <p className='resistance-name'>{resistance.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="grups">
                                {pokemon.apiResistances.filter((resistance) => resistance.damage_multiplier > 1).map((resistance, index: number) => (
                                    <div key={index} className="resistance-row weak">
                                        <p className='resistance-name'>{resistance.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PokemonDetails;
