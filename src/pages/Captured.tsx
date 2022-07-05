import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { typeColor } from '../utils/backgrounds';
import { formatDate } from '../utils/date';

export default function Captured() {
    const [capturedPokemon, setCapturedPokemon] = useState([]);

    useEffect(() => {
        const capturedPokemonList = localStorage.getItem(`capturedPokemon`);

        if (capturedPokemonList) {
            setCapturedPokemon(JSON.parse(capturedPokemonList));
        }
    }, []);

    return (
        <div className="captured-container px-10">
            <Header />
            <div className="captured-list-container">
                <div className="table-header grid grid-cols-4 bg-light-gray/30 rounded-[16px] text-[24px] font-[590] px-6 py-4">
                    <div>POKEMON</div>
                    <div>NICKNAME</div>
                    <div>CAPTURED AT</div>
                    <div>CAPTURED LEVEL</div>
                </div>
                {capturedPokemon.map((pokemon: Object, index: number) => {
                    return (
                        <div
                            className="pokemon-row grid grid-cols-4 pt-9 text-dark-gray text-[28px]"
                            key={`${pokemon[`name`]}-${index}`}
                        >
                            <div className="pokemon-name flex">
                                <div
                                    className="pokemon-picture p-[8px] rounded-[16px]"
                                    style={{
                                        backgroundColor:
                                            typeColor[
                                                pokemon[`pokemon_detail`][
                                                    `types`
                                                ][0][`type`][`name`]
                                            ]
                                    }}
                                >
                                    <img
                                        src={
                                            pokemon[`pokemon_detail`][
                                                `sprites`
                                            ][`other`][`official-artwork`][
                                                `front_default`
                                            ]
                                        }
                                        alt={pokemon[`name`]}
                                        className="w-[100px] h-[100px] mx-auto"
                                    />
                                </div>
                                <div className="pokemon-info flex flex-col justify-center pl-[24px]">
                                    <div className="pokemon-name">
                                        <b>
                                            #
                                            {pokemon[`pokemon_detail`][`id`]
                                                .toString()
                                                .padStart(3, `0`)}
                                            {` `}
                                            {pokemon[`name`]
                                                .charAt(0)
                                                .toUpperCase() +
                                                pokemon[`name`].slice(1)}
                                        </b>
                                    </div>
                                    <div className="pokemon-type-info text-medium-gray text-[24px]">
                                        {pokemon[`pokemon_detail`][`types`]
                                            .map(
                                                (type: Object) =>
                                                    type[`type`][`name`]
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    type[`type`][`name`].slice(
                                                        1
                                                    )
                                            )
                                            .join(' \u00B7 ')}
                                    </div>
                                </div>
                            </div>
                            {pokemon[`nickname`] === `None` ? (
                                <div className="pokemon-no-nickname my-auto text-dark-gray/20 font-[510]">
                                    None
                                </div>
                            ) : (
                                <div className="pokemon-nickname my-auto font-[510]">
                                    {pokemon[`nickname`]}
                                </div>
                            )}
                            <div className="pokemon-caputured-date my-auto font-[510]">
                                {formatDate(pokemon)}
                            </div>
                            <div className="pokemon-captured-level my-auto font-[510]">
                                {pokemon[`captured_level`]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
