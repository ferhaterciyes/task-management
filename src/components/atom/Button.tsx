import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

const Button = ({text, ...rest}: ButtonProps) => {
    return (
        <button {...rest}>{text}</button>
    )
}

export default Button
