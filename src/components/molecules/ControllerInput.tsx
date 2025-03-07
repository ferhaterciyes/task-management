import React, {FC} from "react";
import {Control, FieldValues, useController, RegisterOptions} from "react-hook-form";
import Label from "../atom/Label.tsx";
import Input from "../atom/Input.tsx";

interface ControllerTextInputProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    control: Control<T>;
    name: string;
    label?: string;
    labelStyle?: React.CSSProperties | undefined;
    rules?: RegisterOptions;
    multiline?: boolean;
}

const ControllerInput: FC<ControllerTextInputProps<any>> = ({
                                                                name,
                                                                control,
                                                                label,
                                                                labelStyle,
                                                                rules,
                                                                multiline,
                                                                ...rest
                                                            }) => {
    const {
        field: {onChange, onBlur, value},
        fieldState: {error},
    } = useController({name, control, rules});

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <Label htmlFor={name} style={labelStyle}>
                    {label}
                </Label>
            )}
            {multiline ? (
                <textarea
                    {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} // Textarea için geçerli prop'ları ayırıyoruz
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    className="w-full p-2 border rounded-md resize-y min-h-[100px]"
                />
            ) : (
                <Input
                    {...rest}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                />
            )}
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
};

export default ControllerInput;
