import React from 'react'

const CheckBox = ({...rest}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input type="checkbox" {...rest} />
    )
}

export default CheckBox
