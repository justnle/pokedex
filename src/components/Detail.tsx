import { useEffect, useState } from 'react';
import { typeColor } from '../utils/backgrounds';
import { formatDate } from '../utils/date';

export default function Detail(props: any) {
    const [captured, setCaptured] = useState(false);
    const [capturedPokemon, setCapturedPokemon] = useState<Object>({});

    useEffect(() => {
        const checkCaptured = () => {
            const capturedPokemon = localStorage.getItem(``);
            // const capturedPokemon = localStorage.getItem(`capturedPokemon`);

            if (capturedPokemon) {
                setCaptured(true);
                setCapturedPokemon(JSON.parse(capturedPokemon));
            } else {
                setCaptured(false);
            }
        };

        checkCaptured();
    }, [captured]);

    return (
        <div className="detail-card flex flex-col justify-end h-screen sticky right-0">
            <div
                className="about-stats-container shadow-detail-card rounded-t-[44px]"
                style={{
                    backgroundColor:
                        typeColor[props[`types`][0][`type`][`name`]]
                }}
            >
                <div className="picture-container h-[275] w-[360px] py-[48px]">
                    <img
                        src={
                            props[`sprites`][`other`][`official-artwork`][
                                `front_default`
                            ]
                        }
                        alt={props[`name`]}
                        className="h-[140px] w-[140px] mx-auto"
                    />
                    <h1 className="text-center">
                        <b className="text-white text-[26px]">
                            #{props[`id`].toString().padStart(3, '0')}{' '}
                            {props[`name`].charAt(0).toUpperCase() +
                                props[`name`].slice(1)}
                        </b>
                    </h1>
                </div>
                <div className="info-container bg-white py-[32px]">
                    <div className="about-container mx-auto w-[326px] rounded-[16px] shadow-detail-box p-[16px]">
                        <h2 className="text-[18px]">
                            <b>About</b>
                        </h2>
                        <div className="about-info text-[15px]">
                            <div className="pokemon-types py-[10px]">
                                Type(s):{' '}
                                {props[`types`]
                                    .map(
                                        (type: Object) =>
                                            type[`type`][`name`]
                                                .charAt(0)
                                                .toUpperCase() +
                                            type[`type`][`name`].slice(1)
                                    )
                                    .join(' \u00B7 ')}
                            </div>
                            <div className="pokemon-weight pb-[10px]">
                                Weight: {Math.round(props[`weight`] / 10)}
                                {` `}kg
                            </div>
                            <div className="pokemon-height">
                                Height: {props[`height`] / 10}
                                {` `}m
                            </div>
                        </div>
                    </div>
                    <div className="pt-[24px]">
                        <div className="stats-container mx-auto w-[326px] rounded-[16px] shadow-detail-box p-[16px]">
                            <h2 className="text-[18px]">
                                <b>Base Stats</b>
                            </h2>
                            <div className="stats-info text-[15px]">
                                {props[`stats`].map(
                                    (stat: Object, index: number) => {
                                        return (
                                            <div
                                                className="pb-[10px]"
                                                key={index}
                                            >
                                                {stat[`stat`][`name`] === `hp`
                                                    ? stat[`stat`][
                                                          `name`
                                                      ].toUpperCase()
                                                    : stat[`stat`][`name`]
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      stat[`stat`][
                                                          `name`
                                                      ].slice(1)}
                                                : {stat[`base_stat`]}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="capture-container px-4 pb-6 bg-white">
                    {captured ? (
                        <div className="capture-info mx-auto rounded-[16px] shadow-detail-box p-[16px]">
                            <h2 className="flex justify-start text-[18px]">
                                <b>Capture Information</b>
                            </h2>
                            <div className="about-info text-[15px]">
                                <div className="flex justify-start py-[10px]">
                                    Nickname:{' '}
                                    {capturedPokemon[`nickname`]
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
                            className="capture-button h-[53px] bg-pokemon-red rounded-[100px] mx-auto text-white text-[18px] font-semibold ease-out duration-300"
                            onClick={props.onClick}
                        >
                            <h2 className="text-center py-3">Capture</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
