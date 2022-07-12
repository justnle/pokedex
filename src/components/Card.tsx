import { useState, useEffect } from 'react';
import { getPokemonData } from '../utils/request';
import { typeColor } from '../utils/backgrounds';

type Props = {
    url: string;
    name: string;
    pokemonInfo: (data: Object) => void;
    onClick: () => void;
};

const Card = (props: Props): JSX.Element => {
    const [pokemonInfo, setPokemonInfo] = useState<Array<Object>>([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const getInfo = await getPokemonData(props.url);
            setPokemonInfo(getInfo);
        };

        fetchPokemonData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            className="pokemon-card w-[333px]"
            onClick={() => {
                props.pokemonInfo(pokemonInfo);
                props.onClick();
            }}
        >
            {pokemonInfo.length === 0 ? (
                <div className="placeholder">Loading...</div>
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
                    <div className="pokemon-info flex flex-col items-start pt-[8px] pr-[8px] pb-[16px] pl-[16px]">
                        <div className="pokemon-name flex self-stretch text-[28px] text-dark-gray font-bold">
                            #{pokemonInfo[`id`].toString().padStart(3, '0')}{' '}
                            {pokemonInfo[`name`].charAt(0).toUpperCase() +
                                props.name.slice(1)}
                        </div>
                        <div className="pokemon-type flex flex-row self-stretch text-[24px] text-medium-gray">
                            {pokemonInfo[`types`]
                                .map(
                                    (type: Object) =>
                                        type[`type`][`name`]
                                            .charAt(0)
                                            .toUpperCase() +
                                        type[`type`][`name`].slice(1)
                                )
                                .join(' \u00B7 ')}
                        </div>
                    </div>
                </div>
            )}
        </button>
    );
};

export default Card;
