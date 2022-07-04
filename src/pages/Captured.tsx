import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Captured() {
    const [capturedPokemon, setCapturedPokemon] = useState([]);

    useEffect(() => {
        const capturedPokemonList = localStorage.getItem(`capturedPokemon`);

        if (capturedPokemonList) {
            setCapturedPokemon(JSON.parse(capturedPokemonList));
        }
    }, []);

    console.log(capturedPokemon);

    return (
        <div className="captured px-10">
            <Header />
            <div className="captured-list">
                <table className="table-auto w-full">
                    <thead className="bg-light-gray/30 text-[24px]">
                        <tr>
                            <th className="">POKEMON</th>
                            <th className="">NICKNAME</th>
                            <th className="">CAPTURED AT</th>
                            <th className="">CAPTURED LEVEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {capturedPokemon.map(
                            (pokemon: Object, index: number) => {
                                return (
                                    <tr
                                        key={`${
                                            pokemon[`name`]
                                        }-table-row-${index}`}
                                        className="text-[28px]"
                                    >
                                        <td className="flex">
                                            <div className="pokemon-picture w-[100px] h-[100px]">
                                                <img
                                                    src={
                                                        pokemon[
                                                            `pokemon_detail`
                                                        ][`sprites`][`other`][
                                                            `official-artwork`
                                                        ][`front_default`]
                                                    }
                                                />
                                            </div>
                                            <div className="pokemon-info">
                                                <div className="pokemon-name">
                                                    <b>
                                                        #
                                                        {pokemon[
                                                            `pokemon_detail`
                                                        ][`id`]
                                                            .toString()
                                                            .padStart(3, `0`)}
                                                        {` `}
                                                        {pokemon[`name`]}
                                                    </b>
                                                </div>
                                                <div className="pokemon-type-info">
                                                    {pokemon[`pokemon_detail`][
                                                        `types`
                                                    ]
                                                        .map(
                                                            (type: Object) =>
                                                                type[`type`][
                                                                    `name`
                                                                ]
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                type[`type`][
                                                                    `name`
                                                                ].slice(1)
                                                        )
                                                        .join(' \u00B7 ')}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{pokemon[`nickname`]}</td>
                                        <td>{pokemon[`captured_date`]}</td>
                                        <td>{pokemon[`captured_level`]}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
