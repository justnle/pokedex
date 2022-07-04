import { toISOStringWithTimezone } from '../utils/date';

export default function Modal(props: { onClick: () => void }) {
    const capturePokemon = () => {
        const nicknameElement = document.getElementById(
            `nickname`
        ) as HTMLInputElement;

        const captureData = {
            name:
                props[`name`].charAt(0).toUpperCase() + props[`name`].slice(1),
            nickname:
                nicknameElement.value.length > 1
                    ? nicknameElement.value
                    : `None`,
            captured_date: toISOStringWithTimezone(new Date()),
            captured_level: Math.floor(Math.random() * 101),
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
            console.log(`captured pokemon!`);
        } else {
            const capturedPokemonList = [captureData];
            localStorage.setItem(
                `capturedPokemon`,
                JSON.stringify(capturedPokemonList)
            );
            console.log(`captured pokemon!`);
        }
        props.onClick();
    };

    return (
        <div className="modal flex flex-col items-center justify-center h-screen">
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
                    ></input>
                    <input
                        type="text"
                        id="capture-date"
                        name="capture-date"
                        placeholder="Captured Date"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                    ></input>
                    <input
                        type="text"
                        id="capture-level"
                        name="capture-level"
                        placeholder="Captured Level"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                    ></input>
                </div>
                <div
                    className="capture-button bg-red-500 rounded-[100px] text-white text-[18px] font-semibold"
                    onClick={() => capturePokemon()}
                >
                    <h2 className="text-center py-3">Capture</h2>
                </div>
            </div>
        </div>
    );
}
