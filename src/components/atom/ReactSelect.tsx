import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

const ReactSelect: React.FC<SelectProps> = ({...rest}) => {
    return <Select {...rest} />;
}

export default ReactSelect;
