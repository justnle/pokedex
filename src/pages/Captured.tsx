import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { typeColor } from '../utils/backgrounds';

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
                <div className="grid grid-cols-4 bg-light-gray/30 rounded-[16px] text-[24px] font-[590] px-6 py-4">
                    <div>POKEMON</div>
                    <div>NICKNAME</div>
                    <div>CAPTURED AT</div>
                    <div>CAPTURED LEVEL</div>
                </div>
                {capturedPokemon.map((pokemon: Object, index: number) => {
                    return (
                        <div
                            className="grid grid-cols-4 pt-9 text-[28px]"
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
                                            {pokemon[`name`]}
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
                            <div className="pokemon-nickname my-auto">
                                {pokemon[`nickname`]}
                            </div>
                            <div className="pokemon-caputured-date my-auto">
                                {pokemon[`captured_date`]}
                            </div>
                            <div className="pokemon-captured-level my-auto">
                                {pokemon[`captured_level`]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/*
 <table className="table-auto w-full">
                    <thead className="">
                        <tr className="text-left bg-light-gray/30 text-[24px] rounded-[16px]">
                            <th className="pl-[24px] font-[590]">POKEMON</th>
                            <th className="font-[590]">NICKNAME</th>
                            <th className="font-[590]">CAPTURED AT</th>
                            <th className="pr-[24px] font-[590]">
                                CAPTURED LEVEL
                            </th>
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
                                        <td className="flex pt-[36px]">
                                            <div
                                                className="pokemon-picture p-[8px] rounded-[16px]"
                                                style={{
                                                    backgroundColor:
                                                        typeColor[
                                                            pokemon[
                                                                `pokemon_detail`
                                                            ][`types`][0][
                                                                `type`
                                                            ][`name`]
                                                        ]
                                                }}
                                            >
                                                <img
                                                    src={
                                                        pokemon[
                                                            `pokemon_detail`
                                                        ][`sprites`][`other`][
                                                            `official-artwork`
                                                        ][`front_default`]
                                                    }
                                                    alt={pokemon[`name`]}
                                                    className="w-[100px] h-[100px] mx-auto"
                                                />
                                            </div>
                                            <div className="pokemon-info flex flex-col justify-center pl-[24px]">
                                                <div className="pokemon-name">
                                                    <b className="font-[700]">
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
                                                <div className="pokemon-type-info text-medium-gray text-[24px]">
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
                                        <td className="font-[510]">
                                            {pokemon[`nickname`]}
                                        </td>
                                        <td className="font-[510]">
                                            {pokemon[`captured_date`]}
                                        </td>
                                        <td className="font-[510]">
                                            {pokemon[`captured_level`]}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
*/
