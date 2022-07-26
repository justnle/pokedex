import React, { useState } from 'react';
import { toISOStringWithTimezone } from '../utils/date';
import ModalForm from './ModalForm';

type Props = {
    onClick: () => void;
    props?: Object;
};

export default function Modal(props: Props): JSX.Element {
    const [fillModal, setFillModal] = useState({
        captured_date: '',
        captured_level: ''
    });

    const [button, enableButton] = useState(false);

    const capturePokemon = (
        time: string,
        level: string,
        event: React.SyntheticEvent
    ) => {
        event.preventDefault();

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

        if (fillModal.captured_date === '' || fillModal.captured_level === '') {
            setFillModal({
                captured_date: date,
                captured_level: (Math.floor(Math.random() * 100) + 1).toString()
            });
        }

        enableButton(true);
    };

    return (
        <div className="modal flex flex-col items-center justify-center h-full">
            <div className="modal-contents w-[348px] px-[24px] py-[32px] bg-white rounded-[16px]">
                <div className="pokemon-name">
                    <h2 className="text-[32px] font-[590]">
                        Capturing{' '}
                        {props[`name`].charAt(0).toUpperCase() +
                            props[`name`].slice(1)}
                    </h2>
                </div>
                <ModalForm
                    capture={capturePokemon}
                    autoFill={autoFill}
                    {...fillModal}
                    buttonState={!button}
                />
            </div>
        </div>
    );
}
