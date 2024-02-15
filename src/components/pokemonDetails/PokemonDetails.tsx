import React from 'react';
import './pokemonDetails.css';
import getOnePokemon from '../../services/getOnePokemon/getOnePokemon';
import Loader from '../loader/Loader';
import {Link} from 'react-router-dom';

interface PokemonDetailsProps {
    pokemonId: number;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({pokemonId}) => {
    const {pokemon, loading, pokemonEvolution, pokemonPreEvolution} = getOnePokemon(pokemonId);

    const calculateWidth = (value: number): string => {
        return `${(value / 255) * 100}%`;
    };

    if (loading) {
        return <Loader/>;
    }

    if (!pokemon) {
        return <div>No Pokemon data available</div>;
    }

    return (
        <>
            <div className="pokemon-link">
                <Link to={`/show/${pokemon.id -1}`}>
                    <div className="back-link">
                        <p>&#10094; Pokemon précédent</p>
                    </div>
                </Link>
                <Link to={`/`}>
                    <div className="back-link">
                        <p>- Retour au Pokedex -</p>
                    </div>
                </Link>
                <Link to={`/show/${pokemon.id +1}`}>
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
                    <div className="image-evolutions-container">
                        {pokemonPreEvolution && pokemonPreEvolution.id === pokemon.id ? (
                            <p className='evo-pokemon'>Pas de pré-évolution</p>
                        ) : (
                            pokemonPreEvolution ? (
                                <Link to={`/show/${pokemonPreEvolution.id}`}>
                                    <img className='evo-pokemon' src={pokemonPreEvolution.image}
                                         alt={pokemonPreEvolution.name}/>
                                </Link>
                            ) : (
                                <p>Pas de pré-évolution</p>
                            )
                        )}
                        {pokemonEvolution && pokemonEvolution.id === pokemon.id ? (
                            <p className='evo-pokemon'>Pas d'évolution</p>
                        ) : (
                            pokemonEvolution ? (
                                <Link to={`/show/${pokemonEvolution.id}`}>
                                    <img className='evo-pokemon' src={pokemonEvolution.image}
                                         alt={pokemonEvolution.name}/>
                                </Link>
                            ) : (
                                <p>Pas d'évolution</p>
                            )
                        )}
                    </div>
                </div>
                <div className="details-stat-container">
                    <div className="details-stat">
                        <h1 className='details-stat-name'>{pokemon.name.toUpperCase()}
                            {pokemon.apiTypes.map((type, index) => (
                                <img key={index} src={type.image} alt=""/>
                            ))}
                        </h1>
                        <div className="details-stat-group">
                            <div className="stat-row">
                                <p className='stat-name'>HP:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.HP)}}>{pokemon.stats.HP}</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Attaque:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.attack)}}>{pokemon.stats.attack}</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Défense:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.defense)}}>{pokemon.stats.defense}</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Attaque Spéciale:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.special_attack)}}>{pokemon.stats.special_attack}</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Défense Spéciale:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.special_defense)}}>{pokemon.stats.special_defense}</div>
                                </div>
                            </div>
                            <div className="stat-row">
                                <p className='stat-name'>Vitesse:</p>
                                <div className="stat-progress-container">
                                    <div className="stat-progress"
                                         style={{width: calculateWidth(pokemon.stats.speed)}}>{pokemon.stats.speed}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PokemonDetails;
