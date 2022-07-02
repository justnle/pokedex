export default function Modal() {
    return (
        <div className="modal absolute h-[334px] w-[348px] bg-slate-500 mx-auto my-auto rounded-[16px]">
            <div className="pokemon-name">
                <h2 className="text-[32px] font-semibold">
                    Capturing Bulbasaur
                </h2>
            </div>
            <div className="capture-details">
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    minLength={1}
                    maxLength={12}
                    placeholder="Nickname"
                ></input>
                <input
                    type="text"
                    id="capture-date"
                    name="capture-date"
                    placeholder="Captured Date"
                ></input>
                <input
                    type="text"
                    id="capture-level"
                    name="capture-level"
                    placeholder="Captured Level"
                ></input>
            </div>
            <div className="capture-button bg-red-500 rounded-[100px] mx-auto text-white text-[18px] font-semibold">
                <h2 className="py-3">Capture</h2>
            </div>
        </div>
    );
}
