import { useState, useEffect } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import Card from './Card';

interface Pokemon {
    name: string;
    url: string;
}

const LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

export default function List({ useCache }: { useCache?: boolean }) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);

    useEffect(() => {
        const callApi = async () => {
            setPokemonList([]);

            if (useCache) {
                const cachedPokemonList = getCachedPokemonData(LIST_URL);

                if (cachedPokemonList) {
                    setPokemonList(cachedPokemonList);
                }
            } else {
                const callPokemon = await getPokemonData(LIST_URL, useCache);
                setPokemonList(callPokemon);
            }
            // const callPokemon = await getPokemonData(LIST_URL, useCache);
            // setPokemonList(callPokemon);
        };

        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-5 gap-4">
                {pokemonList[`results`].map(
                    (pokemonList: Pokemon, index: number) => {
                        return (
                            <Card
                                key={index}
                                {...pokemonList}
                                url={pokemonList.url}
                                useCache={true}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
}
