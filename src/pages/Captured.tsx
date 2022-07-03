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
                                        <td>{pokemon[`name`]}</td>
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
