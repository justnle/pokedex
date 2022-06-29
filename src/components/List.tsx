import { useState, useEffect } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import Card from './Card';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Pokemon {
    name: string;
    url: string;
}

const LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

export default function List({ useCache }: { useCache: boolean }) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>(
        getCachedPokemonData(LIST_URL) || []
    );

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
        };

        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(pokemonList[`results`].length);

    return (
        <div className="list">
            <InfiniteScroll
                dataLength={pokemonList[`results`].length}
                next={async () => {
                    const newPokemon = await getPokemonData(
                        pokemonList[`next`],
                        useCache
                    );

                    // console.log(`old`);
                    // console.log(pokemonList[`results`]);
                    // console.log(`new`);
                    // console.log(newPokemon[`results`]);

                    setPokemonList(
                        pokemonList[`results`].concat(newPokemon[`results`])
                    );

                    console.log(pokemonList[`results`]);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <div className="grid grid-cols-4 gap-4">
                    {pokemonList[`results`].map(
                        (pokemon: Pokemon, index: number) => {
                            return (
                                <Card
                                    key={`${pokemon.name}-${index}`}
                                    {...pokemon}
                                    url={pokemon.url}
                                    useCache={true}
                                />
                            );
                        }
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}
