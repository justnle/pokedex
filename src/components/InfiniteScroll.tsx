import { useEffect, useState } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import List from './List';
import InfiniteScroll from 'react-infinite-scroll-component';

const LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

export default function Scroll({ useCache }: { useCache: boolean }) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>(
        getCachedPokemonData(LIST_URL)[`results`] || []
    );
    const [nextPokemonList, setNextPokemonList] = useState<Array<Object>>(
        getCachedPokemonData(LIST_URL)[`next`] || []
    );

    useEffect(() => {
        const getData = async (url: string) => {
            if (useCache) {
                const cachedPokemonList = getCachedPokemonData(LIST_URL);

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

        getData(LIST_URL);
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
            <List pokemonList={pokemonList} useCache={true} />
        </InfiniteScroll>
    );
}
