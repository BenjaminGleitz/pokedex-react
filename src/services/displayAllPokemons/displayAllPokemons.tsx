import React, { useState } from 'react';
import getAllPokemons from '../../services/getAllPokemons/GetAllPokemons';
import getTypes from '../getTypes/getTypes.tsx';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import Loader from '../../components/loader/Loader';
import Select, { ValueType } from 'react-select';
import '../../components/pokemonCard/PokemonCard.css';

const GetPokemons: React.FC = () => {
    const { pokemons, loading } = getAllPokemons();
    const { types, loading: typesLoading } = getTypes();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedGenerations, setSelectedGenerations] = useState<number[]>([]);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTypes.length === 0 || selectedTypes.some(type => pokemon.apiTypes.map(apiType => apiType.name).includes(type))) &&
        (selectedGenerations.length === 0 || selectedGenerations.includes(pokemon.apiGeneration))
    );

    const typeOptions = types.map(type => ({ value: type.name, label: type.name }));
    const generationOptions = [{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }];

    const handleReset = () => {
        setSelectedTypes([]);
        setSelectedGenerations([]);
        setSearchTerm('');
    };

    type OptionType = { label: string; value: number };

    const handleTypeSelection = (selectedOptions: ValueType<OptionType>) => {
        setSelectedTypes((selectedOptions as { value: string; label: string; }[])?.map(option => option.value) || []);
    };

    const handleGenerationSelection = (selectedOptions: ValueType<OptionType>) => {
        setSelectedGenerations((selectedOptions as { value: number; label: string; }[])?.map(option => option.value) || []);
    };


    return (
        <>
            {(loading || typesLoading) && <Loader />}
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Rechercher un Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="search-bar">
                <Select
                    className="search-input"
                    placeholder="Sélectionnez un type..."
                    value={typeOptions.filter(option => selectedTypes.includes(option.value))}
                    options={typeOptions}
                    isMulti
                    onChange={handleTypeSelection}
                />
                <Select
                    className="search-input"
                    placeholder="Sélectionnez une génération..."
                    value={generationOptions.filter(option => selectedGenerations.includes(option.value))}
                    options={generationOptions}
                    isMulti
                    onChange={handleGenerationSelection}
                />
                <button onClick={handleReset} className="search-button">Réinitialiser</button>
            </div>
            <div className="card-container">
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </>
    );
};

export default GetPokemons;
