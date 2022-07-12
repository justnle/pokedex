import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CapturedCard from '../components/CapturedCard';

export default function Captured(): JSX.Element {
    const [capturedPokemon, setCapturedPokemon] = useState([]);

    useEffect(() => {
        const capturedPokemonList = localStorage.getItem(`capturedPokemon`);

        if (capturedPokemonList) {
            setCapturedPokemon(JSON.parse(capturedPokemonList));
        }
    }, []);

    const tableHeader: string[] = [
        `POKEMON`,
        `NICKNAME`,
        `CAPTURED AT`,
        `CAPTURED LEVEL`
    ];

    return (
        <div className="captured-page-container px-10">
            <Header catchButton={false} />
            <div className="captured-list-container">
                <div className="table-header grid grid-cols-4 bg-light-gray/30 rounded-[16px] text-[24px] font-[590] px-6 py-4">
                    {tableHeader.map((header: string, index: number) => (
                        <div key={`header-${index}`}>{header}</div>
                    ))}
                </div>
                {capturedPokemon.map((pokemon: Object, index: number) => {
                    return (
                        <CapturedCard
                            {...pokemon}
                            key={`${pokemon}-row-${index}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
