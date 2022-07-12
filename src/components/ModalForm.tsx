import React from 'react';

type Props = {
    capture: (date: string, level: string, event: React.SyntheticEvent) => void;
    autoFill: () => void;
    captured_date: string;
    captured_level: string;
    buttonState: boolean;
};

export default function ModalForm(props: Props): JSX.Element {
    return (
        <div className="form-container">
            <form
                onSubmit={(event) => {
                    props.capture(
                        props.captured_date,
                        props.captured_level,
                        event
                    );
                }}
            >
                <div className="capture-details py-5">
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        minLength={1}
                        maxLength={12}
                        placeholder="Nickname"
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        onClick={props.autoFill}
                    ></input>
                    <input
                        type="text"
                        id="captured-date"
                        name="captured-date"
                        placeholder="Captured Date"
                        defaultValue={
                            props.captured_date
                                ? props.captured_date.slice(0, 10)
                                : ``
                        }
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                        required
                    ></input>
                    <input
                        type="text"
                        id="captured-level"
                        name="captured-level"
                        placeholder="Captured Level"
                        defaultValue={
                            props.captured_level ? props.captured_level : ``
                        }
                        className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                        disabled
                        required
                    ></input>
                </div>
                <div className="modal-capture-button-container flex justify-center h-[53px]">
                    <button
                        className="modal-capture-button w-full bg-red-500 text-white text-[18px] font-[590] rounded-[100px]"
                        type="submit"
                        disabled={props.buttonState}
                    >
                        Capture
                    </button>
                </div>
            </form>
        </div>
    );
}
