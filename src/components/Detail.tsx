import { useEffect, useState } from 'react';

export default function Detail(props: any) {
    const data = {
        name: `bulbasaur`,
        id: 1,
        types: [
            {
                slot: 1,
                type: {
                    name: `grass`,
                    url: `https://pokeapi.co/api/v2/type/12/`
                }
            },
            {
                slot: 2,
                type: {
                    name: `poison`,
                    url: `https://pokeapi.co/api/v2/type/4/`
                }
            }
        ],
        weight: 69,
        height: 7,
        species: {
            name: `bulbasaur`,
            url: `https://pokeapi.co/api/v2/pokemon-species/1/`
        },
        sprites: {
            other: {
                official_artwork: {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`
                }
            }
        },
        stats: [
            {
                base_stat: 45,
                effort: 0,
                stat: {
                    name: `hp`,
                    url: `https://pokeapi.co/api/v2/stat/1/`
                }
            },
            {
                base_stat: 49,
                effort: 0,
                stat: {
                    name: `attack`,
                    url: `https://pokeapi.co/api/v2/stat/2/`
                }
            },
            {
                base_stat: 49,
                effort: 0,
                stat: {
                    name: `defense`,
                    url: `https://pokeapi.co/api/v2/stat/3/`
                }
            },
            {
                base_stat: 65,
                effort: 1,
                stat: {
                    name: `special-attack`,
                    url: `https://pokeapi.co/api/v2/stat/4/`
                }
            },
            {
                base_stat: 65,
                effort: 0,
                stat: {
                    name: `special-defense`,
                    url: `https://pokeapi.co/api/v2/stat/5/`
                }
            },
            {
                base_stat: 45,
                effort: 0,
                stat: {
                    name: `speed`,
                    url: `https://pokeapi.co/api/v2/stat/6/`
                }
            }
        ]
    };

    const [captured, setCaptured] = useState(false);
    const [capturedPokemon, setCapturedPokemon] = useState<Object>({});

    useEffect(() => {
        const checkCaptured = () => {
            const capturedPokemon = localStorage.getItem(`test`);

            if (capturedPokemon) {
                setCaptured(true);
                setCapturedPokemon(JSON.parse(capturedPokemon));
            } else {
                setCaptured(false);
            }
        };

        checkCaptured();
    }, [captured]);

    const formatDate = (pokemon: Object) => {
        if (pokemon[`captured_date`]) {
            const formattedDate = pokemon[`captured_date`],
                [yyyy, mm, dd] = formattedDate.split(/[/:\-T]/);

            const date = new Date(yyyy, mm - 1, dd);
            const month = date.toLocaleString('default', { month: 'long' });

            return `${month} ${dd}, ${yyyy}`;
        }
    };

    return (
        <div className="detail-card h-screen w-[360px] shadow-detail-card bg-slate-500 rounded-t-[44px]">
            <div className="about-stats-container">
                <div className="picture-container h-[275] w-[360px] py-[48px]">
                    <img
                        src={data.sprites.other.official_artwork.front_default}
                        alt={data.name}
                        className="h-[140px] w-[140px] mx-auto"
                    />
                    <h1>
                        <b className="text-white text-[26px]">
                            #{data.id.toString().padStart(3, '0')}{' '}
                            {data.name.charAt(0).toUpperCase() +
                                data.name.slice(1)}
                        </b>
                    </h1>
                </div>
                <div className="info-container bg-white py-[32px]">
                    <div className="about-container mx-auto w-[326px] rounded-[16px] shadow-detail-box p-[16px]">
                        <h2 className="flex justify-start text-[18px]">
                            <b>About</b>
                        </h2>
                        <div className="about-info text-[15px]">
                            <div className="flex justify-start py-[10px]">
                                Type(s):{' '}
                                {data.types
                                    .map(
                                        (type) =>
                                            type.type.name
                                                .charAt(0)
                                                .toUpperCase() +
                                            type.type.name.slice(1)
                                    )
                                    .join(', ')}
                            </div>
                            <div className="flex justify-start pb-[10px]">
                                Weight: {Math.round(data.weight / 10)}
                                {` `}kg
                            </div>
                            <div className="flex justify-start">
                                Height: {data.height / 10}
                                {` `}m
                            </div>
                        </div>
                    </div>
                    <div className="pt-[24px]">
                        <div className="stats-container mx-auto w-[326px] rounded-[16px] shadow-detail-box p-[16px]">
                            <h2 className="flex justify-start text-[18px]">
                                <b>Base Stats</b>
                            </h2>
                            <div className="stats-info text-[15px]">
                                {data.stats.map((stat: any, index: number) => {
                                    return (
                                        <div
                                            className="flex justify-start pb-[10px]"
                                            key={index}
                                        >
                                            {stat.stat.name === `hp`
                                                ? stat.stat.name.toUpperCase()
                                                : stat.stat.name
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  stat.stat.name.slice(1)}
                                            : {stat.base_stat}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="capture-container px-auto bg-white">
                {captured ? (
                    <div className="capture-info mx-auto w-[326px] rounded-[16px] shadow-detail-box p-[16px]">
                        <h2 className="flex justify-start text-[18px]">
                            <b>Capture Information</b>
                        </h2>
                        <div className="about-info text-[15px]">
                            <div className="flex justify-start py-[10px]">
                                Nickname:{' '}
                                {capturedPokemon[`nickname`].length > 0
                                    ? capturedPokemon[`nickname`]
                                    : capturedPokemon[`name`]}
                            </div>
                            <div className="flex justify-start pb-[10px]">
                                Captured on: {formatDate(capturedPokemon)}
                            </div>
                            <div className="flex justify-start">
                                Captured Level:{' '}
                                {capturedPokemon[`captured_level`]}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="capture-button h-[53px] w-[328px] bg-red-500 rounded-[100px] mx-auto text-white text-[18px] font-semibold"
                        onClick={props.onClick}
                    >
                        <h2 className="py-3">Capture</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
