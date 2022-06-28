import { useState, useEffect } from 'react';
import { getPokemon, getCachedPokemon } from '../utils/request';

interface Pokemon {
    name: string;
    url: string;
}

export default function Cards({ useCache }: { useCache: boolean }) {
    const [pokemon, setPokemon] = useState<Array<Object>>([]);

    useEffect(() => {
        const callApi = async () => {
            setPokemon([]);

            if (useCache) {
                const cachedPokemon = getCachedPokemon();

                if (cachedPokemon) {
                    setPokemon(cachedPokemon);
                }
            } else {
                const callPokemon = await getPokemon(useCache);
                setPokemon(callPokemon);
            }
        };

        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(pokemon[`results`]);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-5 gap-4">
                {pokemon[`results`].map((pokemon: Pokemon, index: number) => (
                    <div className="rounded shadow-md" key={index}>
                        {(index + 1).toString().padStart(3, '0')}{' '}
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </div>
                ))}
            </div>
        </div>
    );
}
