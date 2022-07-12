import { typeColor } from '../utils/backgrounds';
import { formatDate } from '../utils/date';

export default function CapturedCard(props: Object): JSX.Element {
    return (
        <div className="pokemon-row grid grid-cols-4 pt-9 text-dark-gray text-[28px]">
            <div className="pokemon-info flex">
                <div
                    className="pokemon-picture p-[8px] rounded-[16px]"
                    style={{
                        backgroundColor:
                            typeColor[
                                props[`pokemon_detail`][`types`][0][`type`][
                                    `name`
                                ]
                            ]
                    }}
                >
                    <img
                        src={
                            props[`pokemon_detail`][`sprites`][`other`][
                                `official-artwork`
                            ][`front_default`]
                        }
                        alt={props[`name`]}
                        className="w-[100px] h-[100px] mx-auto"
                    />
                </div>
                <div className="pokemon-name-type flex flex-col justify-center pl-[24px]">
                    <div className="pokemon-name font-bold">
                        <h2>
                            #
                            {props[`pokemon_detail`][`id`]
                                .toString()
                                .padStart(3, `0`)}
                            {` `}
                            {props[`name`].charAt(0).toUpperCase() +
                                props[`name`].slice(1)}
                        </h2>
                    </div>
                    <div className="pokemon-type-info text-medium-gray text-[24px]">
                        {props[`pokemon_detail`][`types`]
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
            {props[`nickname`] === `None` ? (
                <div className="pokemon-no-nickname my-auto text-dark-gray/20 font-[510]">
                    None
                </div>
            ) : (
                <div className="pokemon-nickname my-auto font-[510]">
                    {props[`nickname`]}
                </div>
            )}
            <div className="pokemon-caputured-date my-auto font-[510]">
                {formatDate(props)}
            </div>
            <div className="pokemon-captured-level my-auto font-[510]">
                {props[`captured_level`]}
            </div>
        </div>
    );
}
