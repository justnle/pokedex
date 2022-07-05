import { useEffect, useState } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import List from './List';
import InfiniteScroll from 'react-infinite-scroll-component';

const API_URL_FIRST_20 = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

export default function Scroll({
    useCache
}: {
    useCache: boolean;
}): JSX.Element {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [nextPokemonList, setNextPokemonList] = useState<Array<Object>>([]);

    useEffect(() => {
        const getData = async (url: string) => {
            if (useCache) {
                const cachedPokemonList =
                    getCachedPokemonData(API_URL_FIRST_20);

                if (cachedPokemonList) {
                    setPokemonList(cachedPokemonList[`results`]);
                    setNextPokemonList(cachedPokemonList);
                }
            } else {
                const fetchPokemon = await getPokemonData(url, useCache);
                setPokemonList(fetchPokemon[`results`]);
                setNextPokemonList(fetchPokemon);
            }
        };

        getData(API_URL_FIRST_20);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updatePokemonList = async () => {
        const newPokemon = await getPokemonData(nextPokemonList[`next`], false);
        setNextPokemonList(newPokemon);
        setPokemonList([...pokemonList, ...newPokemon[`results`]]);
    };

    return (
        <InfiniteScroll
            dataLength={pokemonList.length}
            next={updatePokemonList}
            hasMore={true}
            loader={<h4>Loading..</h4>}
        >
            <List pokemonList={pokemonList} useCache={false} />
        </InfiniteScroll>
    );
}
