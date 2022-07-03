export default function Modal(props: { onClick: () => void }) {
    const toISOStringWithTimezone = (date: Date) => {
        const timeZoneOffset = -date.getTimezoneOffset();
        const diff = timeZoneOffset >= 0 ? `+` : `-`;
        const pad = (num: number) =>
            `${Math.floor(Math.abs(num))}`.padStart(2, `0`);

        return (
            date.getFullYear() +
            `-` +
            pad(date.getMonth() + 1) +
            `-` +
            pad(date.getDate()) +
            `T` +
            pad(date.getHours()) +
            `:` +
            pad(date.getMinutes()) +
            `:` +
            pad(date.getSeconds()) +
            diff +
            pad(timeZoneOffset / 60) +
            `:` +
            pad(timeZoneOffset % 60)
        );
    };

    const capturePokemon = () => {
        const nicknameElement = document.getElementById(
            `nickname`
        ) as HTMLInputElement;

        const captureData = {
            name: `bulbasaur`, //pokemon.name
            nickname:
                nicknameElement.value.length > 1
                    ? nicknameElement.value
                    : `None`,
            captured_date: toISOStringWithTimezone(new Date()),
            captured_level: Math.floor(Math.random() * 101),
            pokemon_detail: ``
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
                        <b className="font-semibold">Capturing Bulbasaur</b>
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
                    className="capture-button bg-red-500 rounded-[100px] mx-auto text-white text-[18px] font-semibold"
                    onClick={() => capturePokemon()}
                >
                    <h2 className="py-3">Capture</h2>
                </div>
            </div>
        </div>
    );
}
