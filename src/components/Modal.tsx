export default function Modal() {
    return (
        <div className="modal rounded-[16px] flex flex-col items-center justify-center z-10">
            <div className="modal-contents w-[348px] px-[24px] py-[32px]">
                <div className="pokemon-name">
                    <h2 className="text-[32px] font-semibold">
                        Capturing Bulbasaur
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
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border"
                    ></input>
                    <input
                        type="text"
                        id="capture-date"
                        name="capture-date"
                        placeholder="Captured Date"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border"
                    ></input>
                    <input
                        type="text"
                        id="capture-level"
                        name="capture-level"
                        placeholder="Captured Level"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border"
                    ></input>
                </div>
                <div className="capture-button bg-red-500 rounded-[100px] mx-auto text-white text-[18px] font-semibold">
                    <h2 className="py-3">Capture</h2>
                </div>
            </div>
        </div>
    );
}
