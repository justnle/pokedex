import { useState, useEffect } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import { typeColor } from '../utils/backgrounds';

const Card = (props: any) => {
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

    const pokemonType = pokemonInfo[`types`][0][`type`][`name`];

    return (
        <div className="pokemon-card rounded shadow-lg overflow-hidden">
            {/* need to make backgroundColor opacity 70% */}
            <div
                className="pokemon-image"
                style={{ backgroundColor: typeColor[pokemonType] }}
            >
                <img
                    src={
                        pokemonInfo[`sprites`][`other`][`official-artwork`][
                            `front_default`
                        ]
                    }
                    alt={pokemonInfo[`name`]}
                    className="h-40 w-40 mx-auto"
                />
            </div>
            <div className="pokemon-info flex flex-col">
                <div className="pokemon-name flex self-stretch text-[28px] text-dark-gray">
                    <b>
                        #{pokemonInfo[`order`].toString().padStart(3, '0')}{' '}
                        {pokemonInfo[`name`].charAt(0).toUpperCase() +
                            props.name.slice(1)}
                    </b>
                </div>
                <div className="pokemon-type flex flex-row self-stretch text-[24px] text-medium-gray">
                    {pokemonInfo[`types`].map((types: any, index: number) => {
                        return (
                            <div key={`${pokemonInfo[`name`]}-type-${index}`}>
                                {types.type.name.charAt(0).toUpperCase() +
                                    types.type.name.slice(1)}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Card;
