import { useEffect, useState } from 'react';
import { getPokemonData } from '../utils/request';
import List from '../components/List';

const API_URL_FIRST_30 = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;

export default function Home(): JSX.Element {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [nextPokemonList, setNextPokemonList] = useState<Array<Object>>([]);
    const [showPrevious, setShowPrevious] = useState<Boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const fetchPokemon = await getPokemonData(API_URL_FIRST_30);
            setPokemonList(fetchPokemon);
        };

        if (pokemonList.length === 0) {
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPokemonList]);

    const updatePokemonList = async () => {
        const newPokemon = await getPokemonData(pokemonList[`next`]);
        setNextPokemonList(newPokemon);
        setPokemonList(newPokemon);
        setShowPrevious(true);
    };

    const updatePreviousPokemonList = async () => {
        const oldPokemon = await getPokemonData(pokemonList[`previous`]);
        setPokemonList(oldPokemon);

        if (!oldPokemon[`previous`]) {
            setShowPrevious(false);
        }
    };

    return (
        <div className="home-container pb-10">
            <List pokemonList={pokemonList[`results`]} />
            <div className="pagination-button-container flex justify-around text-center text-[28px]">
                {showPrevious ? (
                    <div className="previous-button-container">
                        <button onClick={() => updatePreviousPokemonList()}>
                            <b>Previous Page</b>
                        </button>
                    </div>
                ) : null}
                <div className="next-button-container">
                    <button onClick={() => updatePokemonList()}>
                        <b>Next Page</b>
                    </button>
                </div>
            </div>
        </div>
    );
}
