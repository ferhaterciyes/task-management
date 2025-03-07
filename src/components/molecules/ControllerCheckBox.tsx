import React, {FC} from 'react';
import {Control, FieldValues, useController} from 'react-hook-form';
import Label from "../atom/Label.tsx";
import CheckBox from "../atom/Input.tsx";

interface ControllerCheckBoxProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    control: Control<T>;
    name: string;
    label?: string;
    labelStyle?: React.CSSProperties | undefined;
}
const ControllerCheckBox: FC<ControllerCheckBoxProps<any>> = ({
                                                                    name,
                                                                    control,
                                                                    label,
                                                                    labelStyle,
                                                                    ...rest
                                                                }) => {
        const {
            field: {onChange, onBlur, value},
            fieldState: {error},
        } = useController({name, control});

        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <Label htmlFor={name} style={labelStyle}>
                        {label}
                    </Label>
                )}
                <CheckBox
                    {...rest}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                />
                {error && <span
                    className="text-red-500 text-xs"
                >{error.message}</span>}
            </div>
        );
}
export default ControllerCheckBox;
