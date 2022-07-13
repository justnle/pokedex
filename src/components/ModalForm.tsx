import React, { MouseEventHandler } from 'react';

type Props = {
    capture: (date: string, level: string, event: React.SyntheticEvent) => void;
    autoFill: () => void;
    captured_date: string;
    captured_level: string;
    buttonState: boolean;
};

type Inputs = {
    type: string;
    id: string;
    name: string;
    minLength: number | undefined;
    maxLength: number | undefined;
    placeholder: string;
    defaultValue: string | undefined;
    onClick: MouseEventHandler<HTMLInputElement> | undefined;
    disabled: boolean;
    required: boolean;
};

export default function ModalForm(props: Props): JSX.Element {
    const inputFields: Inputs[] = [
        {
            type: `text`,
            id: `nickname`,
            name: `nickname`,
            minLength: 1,
            maxLength: 12,
            placeholder: `Nickname`,
            defaultValue: undefined,
            onClick: props.autoFill,
            disabled: false,
            required: false
        },
        {
            type: `text`,
            id: `captured-date`,
            name: `captured-date`,
            minLength: undefined,
            maxLength: undefined,
            placeholder: `Captured Date`,
            defaultValue: props.captured_date
                ? props.captured_date.slice(0, 10)
                : ``,
            onClick: undefined,
            disabled: true,
            required: true
        },
        {
            type: `text`,
            id: `captured-level`,
            name: `captured-level`,
            minLength: undefined,
            maxLength: undefined,
            placeholder: `Captured Level`,
            defaultValue: props.captured_level ? props.captured_level : ``,
            onClick: undefined,
            disabled: true,
            required: true
        }
    ];

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
                    {inputFields.map((input: Inputs, index: number) => {
                        return (
                            <input
                                type="text"
                                id={input.id}
                                name={input.name}
                                minLength={input.minLength}
                                maxLength={input.maxLength}
                                placeholder={input.placeholder}
                                defaultValue={input.defaultValue}
                                onClick={input.onClick}
                                disabled={input.disabled}
                                required={input.required}
                                className="w-full rounded-md my-1 pl-2 py-1 text-[18px] border border-black"
                                key={`input-${index}`}
                            ></input>
                        );
                    })}
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
