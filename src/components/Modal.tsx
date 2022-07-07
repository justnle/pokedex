import { useState } from 'react';
import { formatDate, toISOStringWithTimezone } from '../utils/date';

type Props = {
    onClick: () => void;
    props?: Object;
};

export default function Modal(props: Props): JSX.Element {
    const [fillModal, setFillModal] = useState({
        captured_date: '',
        captured_level: ''
    });

    const capturePokemon = (time: string, level: string) => {
        const nicknameElement = document.getElementById(
            `nickname`
        ) as HTMLInputElement;

        const captureData = {
            name: props[`name`],
            nickname:
                nicknameElement.value.length > 1
                    ? nicknameElement.value
                    : `None`,
            captured_date: time,
            captured_level: level,
            pokemon_detail: props
        };

        const storedPokemonData = localStorage.getItem(`capturedPokemon`);

        if (storedPokemonData) {
            const storedPokemonList = JSON.parse(storedPokemonData);

            storedPokemonList.push(captureData);
            localStorage.setItem(
                `capturedPokemon`,
                JSON.stringify(storedPokemonList)
            );
        } else {
            const capturedPokemonList = [captureData];
            localStorage.setItem(
                `capturedPokemon`,
                JSON.stringify(capturedPokemonList)
            );
        }
        localStorage.setItem(props[`name`], JSON.stringify(captureData));
        props.onClick();
    };

    const autoFill = () => {
        const date = toISOStringWithTimezone(new Date());

        setFillModal({
            captured_date: date,
            captured_level: Math.floor(Math.random() * 101).toString()
        });
    };

    return (
        <div className="modal flex flex-col items-center justify-center h-full">
            <div className="modal-contents w-[348px] px-[24px] py-[32px] bg-white rounded-[16px]">
                <div className="pokemon-name">
                    <h2 className="text-[32px]">
                        <b className="font-semibold">
                            Capturing{' '}
                            {props[`name`].charAt(0).toUpperCase() +
                                props[`name`].slice(1)}
                        </b>
                    </h2>
                </div>
                <div className="capture-details py-5">
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        minLength={1}
                        maxLength={12}
                        placeholder="Nickname"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        onClick={() => {
                            autoFill();
                        }}
                    ></input>
                    <input
                        type="text"
                        id="capture-date"
                        name="capture-date"
                        placeholder="Captured Date"
                        defaultValue={
                            fillModal.captured_date ? formatDate(fillModal) : ``
                        }
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                    ></input>
                    <input
                        type="text"
                        id="capture-level"
                        name="capture-level"
                        placeholder="Captured Level"
                        defaultValue={
                            fillModal.captured_level
                                ? fillModal.captured_level
                                : ``
                        }
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                    ></input>
                </div>
                <div className="modal-capture-button-container flex justify-center h-[53px]">
                    <button
                        className="modal-capture-button w-full bg-red-500 text-white text-[18px] font-[590] rounded-[100px]"
                        onClick={() =>
                            capturePokemon(
                                fillModal.captured_date,
                                fillModal.captured_level
                            )
                        }
                    >
                        Capture
                    </button>
                </div>
            </div>
        </div>
    );
}
