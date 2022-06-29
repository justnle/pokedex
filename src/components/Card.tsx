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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pokemon-card">
            <img
                src={
                    pokemonInfo[`sprites`][`other`][`official-artwork`][
                        `front_default`
                    ]
                }
                alt={pokemonInfo[`name`]}
            />
            <b>
                {pokemonInfo[`order`].toString().padStart(3, '0')}{' '}
                {pokemonInfo[`name`].charAt(0).toUpperCase() +
                    props.name.slice(1)}
            </b>
            {pokemonInfo[`types`].map((types: any, index: number) => {
                return (
                    <div key={`${pokemonInfo[`name`]}-type-${index}`}>
                        {types.type.name.charAt(0).toUpperCase() +
                            types.type.name.slice(1)}
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
