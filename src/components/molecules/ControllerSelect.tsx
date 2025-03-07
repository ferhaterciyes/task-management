import React, { FC } from 'react';
import { Control, FieldValues, useController, RegisterOptions } from 'react-hook-form';
import Label from "../atom/Label";

interface Option {
    value: string;
    label: string;
}

interface ControllerSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: string;
    label?: string;
    options: Option[];
    rules?: RegisterOptions;
    placeholder?: string;
}

const ControllerSelect: FC<ControllerSelectProps<any>> = ({
    name,
    control,
    label,
    options,
    rules,
    placeholder = "Seçiniz..."
}) => {
    const {
        field: { onChange, onBlur, value },
        fieldState: { error }
    } = useController({ name, control, rules });

    return (
        <div className="flex flex-col gap-1">
            {label && <Label htmlFor={name}>{label}</Label>}
            <select
                id={name}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
};

export default ControllerSelect;
