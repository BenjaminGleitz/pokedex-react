import { useEffect, useState } from 'react';
import axios from 'axios';

interface Types {
    id: number;
    name: string;
    image: string;
    apiTypes: {
        name: string;
        image: string;
    }[];
}

const getTypes = () => {
    const [types, setTypes] = useState<Types[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemonTypes = async () => {
        try {
            const response = await axios.get('https://pokebuildapi.fr/api/v1/types');
            setTypes(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonTypes();
    }, []);

    return { types, loading };
};

export default getTypes;
