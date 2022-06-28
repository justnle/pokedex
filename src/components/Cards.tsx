import { useState, useEffect } from 'react';
import { getPokemon } from '../utils/getPokemon';

interface Pokemon {
    name: string;
    url: string;
}

export default function Cards() {
    const [pokemon, setPokemon] = useState<Array<Object>>([]);

    useEffect(() => {
        getPokemon().then((data) => {
            setPokemon(data);
        });
    }, []);

    console.log(pokemon[`results`]);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-5 gap-4">
                {pokemon[`results`].map((pokemon: Pokemon, index: number) => (
                    <div className="rounded shadow-md" key={index}>
                        {pokemon.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
