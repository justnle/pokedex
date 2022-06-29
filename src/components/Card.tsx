import { useState, useEffect } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';

const Card = (props: any) => {
    console.log(props);

    const [pokemonInfo, setPokemonInfo] = useState<Array<Object>>([]);

    useEffect(() => {
        const callApi = async () => {
            setPokemonInfo([]);

            if (props.useCache) {
                const cachedPokemonData = getCachedPokemonData(props.url);

                if (cachedPokemonData) {
                    setPokemonInfo(cachedPokemonData);
                }
            } else {
                const getInfo = await getPokemonData(props.url, props.useCache);
                setPokemonInfo(getInfo);
            }
        };

        callApi();
    }, []);

    console.log(`pokemon information here`);
    console.log(pokemonInfo);

    return (
        <div>
            <img
                src={
                    pokemonInfo[`sprites`][`other`][`official-artwork`][
                        `front_default`
                    ]
                }
            />
            <b>
                {pokemonInfo[`order`].toString().padStart(3, '0')}{' '}
                {pokemonInfo[`name`].charAt(0).toUpperCase() +
                    props.name.slice(1)}
            </b>
        </div>
    );
};

export default Card;
