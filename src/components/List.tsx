import { useEffect, useState } from 'react';
import Card from './Card';

export default function List(props: any) {
    const [pokemonList, setPokemonList] = useState<Array<Object>>([]);

    useEffect(() => {
        setPokemonList(props.pokemonList);
        // console.log(pokemonList);
    });

    return (
        <div className="list">
            <div className="grid grid-cols-4 gap-4">
                {!pokemonList ? (
                    <div>No Pokemon List to Render</div>
                ) : (
                    pokemonList.map((pokemon: any, index: number) => {
                        return (
                            <Card
                                key={`${pokemon[`name`]}-${index}`}
                                {...pokemon}
                                useCache={false}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
