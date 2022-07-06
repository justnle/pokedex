import { useEffect, useState } from 'react';
import { typeColor } from '../utils/backgrounds';
import { formatDate } from '../utils/date';

type Props = {
    onClick?: () => void;
    props?: Object;
    captured: Object;
};

export default function Detail(props: Props): JSX.Element {
    const [captured, setCaptured] = useState(false);
    const [capturedPokemon, setCapturedPokemon] = useState([]);

    useEffect(() => {
        const checkCaptured = () => {
            const capturedPokemon = localStorage.getItem(props[`name`]);

            if (capturedPokemon) {
                setCaptured(true);
                setCapturedPokemon(JSON.parse(capturedPokemon));
            } else {
                setCaptured(false);
            }
        };

        checkCaptured();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props[`name`], props.captured]);

    return (
        <div className="about-stats-container shadow-detail-card rounded-t-[44px] fixed bottom-0 right-[22px] bg-white overflow-hidden">
            <div
                className="picture-container h-[275] w-[360px] py-[48px]"
                style={{
                    backgroundColor:
                        typeColor[props[`types`][0][`type`][`name`]]
                }}
            >
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
            <div className="info-container pt-[32px] pb-[24px]">
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
                        <h2 className="text-[18px] pb-[10px]">
                            <b>Base Stats</b>
                        </h2>
                        <div className="stats-info text-[15px]">
                            {props[`stats`].map(
                                (stat: Object, index: number) => {
                                    return (
                                        <div className="pb-[10px]" key={index}>
                                            {stat[`stat`][`name`] === `hp`
                                                ? stat[`stat`][
                                                      `name`
                                                  ].toUpperCase()
                                                : stat[`stat`][`name`]
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  stat[`stat`][`name`].slice(1)}
                                            : {stat[`base_stat`]}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="capture-container px-4 pb-6">
                {captured ? (
                    <div className="capture-info mx-auto rounded-[16px] shadow-detail-box p-[16px]">
                        <h2 className="text-[18px] pb-[10px]">
                            <b>Capture Information</b>
                        </h2>
                        <div className="about-info text-[15px]">
                            {capturedPokemon[`nickname`] === `None` ? (
                                <div className=""></div>
                            ) : (
                                <div className="pb-[10px]">
                                    Nickname: {capturedPokemon[`nickname`]}
                                </div>
                            )}
                            <div className="pb-[10px]">
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
                        className="detail-capture-button-container h-[53px] bg-pokemon-red rounded-[100px] mx-auto text-white text-[18px] font-semibold ease-out duration-300"
                        onClick={props.onClick}
                    >
                        <h2 className="detail-capture-button text-center py-3">
                            Capture
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
