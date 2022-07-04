import { useState, useEffect } from 'react';
import { getCachedPokemonData, getPokemonData } from '../utils/request';
import { typeColor } from '../utils/backgrounds';
import './Card.css';

const Card = (props: any) => {
    const [pokemonInfo, setPokemonInfo] = useState<Array<Object>>(
        getCachedPokemonData(props.url) || []
    );
    // const [pokemonInfo, setPokemonInfo] = useState<Array<Object>>([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            // setPokemonInfo([]);

            if (props.useCache) {
                console.log(`using cache`);
                const cachedPokemonData = getCachedPokemonData(props.url);

                if (cachedPokemonData) {
                    setPokemonInfo(cachedPokemonData);
                }
            } else {
                const getInfo = await getPokemonData(props.url, props.useCache);
                setPokemonInfo(getInfo);
            }
        };

        fetchPokemonData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="pokemon-card w-[333px]"
            onClick={() => {
                props.pokemonInfo(pokemonInfo);
                props.onClick();
            }}
        >
            {pokemonInfo.length === 0 ? (
                <div>
                    {pokemonInfo[`name`]}{' '}
                    <img
                        src={`https://via.placeholder.com/150`}
                        alt={`placeholder`}
                    />
                </div>
            ) : (
                <div className="rounded-2xl shadow-detail-box overflow-hidden">
                    <div
                        className="pokemon-image"
                        style={{
                            backgroundColor:
                                typeColor[
                                    pokemonInfo[`types`][0][`type`][`name`]
                                ]
                        }}
                    >
                        <img
                            src={
                                pokemonInfo[`sprites`][`other`][
                                    `official-artwork`
                                ][`front_default`]
                            }
                            alt={pokemonInfo[`name`]}
                            className="h-40 w-40 mx-auto"
                        />
                    </div>
                    <div className="pokemon-info flex flex-col items-start">
                        <div className="pokemon-name flex self-stretch text-[28px] text-dark-gray">
                            <b>
                                #{pokemonInfo[`id`].toString().padStart(3, '0')}{' '}
                                {pokemonInfo[`name`].charAt(0).toUpperCase() +
                                    props.name.slice(1)}
                            </b>
                        </div>
                        <div className="pokemon-type flex flex-row self-stretch text-[24px] text-medium-gray">
                            {pokemonInfo[`types`].map(
                                (types: any, index: number) => {
                                    return (
                                        <div
                                            className={`type-${index}`}
                                            key={`${
                                                pokemonInfo[`name`]
                                            }-type-${index}`}
                                        >
                                            {types.type.name
                                                .charAt(0)
                                                .toUpperCase() +
                                                types.type.name.slice(1)}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
