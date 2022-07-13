import { useEffect, useState } from 'react';
import { getPokemonData } from '../utils/request';
import List from '../components/List';

const baseURL: string = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;

export default function Home(): JSX.Element {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);
    const [nextPokemonList, setNextPokemonList] = useState<Array<Object>>([]);
    const [previousPokemonList, setPreviousPokemonList] = useState<
        Array<Object>
    >([]);
    const [showPrevious, setShowPrevious] = useState<Boolean>(false);
    const [homePage, setHomePage] = useState<Array<Object>>([]);

    let pageCount = 0;

    useEffect(() => {
        const getData = async () => {
            const fetchPokemon = await getPokemonData(baseURL);
            setPokemonList(fetchPokemon);
            setHomePage(fetchPokemon);
        };

        if (pokemonList.length === 0) {
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPokemonList]);

    const updatePokemonList = async () => {
        const newPokemon = await getPokemonData(pokemonList[`next`]);
        setPreviousPokemonList((previousList) => [
            ...previousList,
            pokemonList
        ]);
        setNextPokemonList(newPokemon);
        setPokemonList(newPokemon);
        setShowPrevious(true);
    };

    const updatePreviousPokemonList = async () => {
        // const oldPokemon = await getPokemonData(pokemonList[`previous`]);
        // setPokemonList(oldPokemon);

        // if (!oldPokemon[`previous`]) {
        //     setShowPrevious(false);
        // }
        const oldPokemon = previousPokemonList[pageCount];
        console.log(oldPokemon);
        // setPokemonList(oldPokemon);

        if (!previousPokemonList[`previous`]) {
            setShowPrevious(false);
        }
    };

    console.log(previousPokemonList[pageCount]);
    console.log(pageCount);

    return (
        <div className="home-container pb-10">
            <List
                pokemonList={pokemonList[`results`]}
                showHomePage={setPokemonList}
                homePageList={homePage}
                showPrevious={setShowPrevious}
            />
            <div className="pagination-button-container flex justify-around text-center text-[28px]">
                {showPrevious ? (
                    <div className="previous-button-container font-bold">
                        <button
                            onClick={() => {
                                updatePreviousPokemonList();
                                --pageCount;
                            }}
                        >
                            Previous Page
                        </button>
                    </div>
                ) : null}
                <div className="next-button-container font-bold">
                    <button
                        onClick={() => {
                            updatePokemonList();
                            ++pageCount;
                        }}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
}
