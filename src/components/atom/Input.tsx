import React from 'react'

const Input = ({className, ...rest}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input 
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
            {...rest}
        />
    )
}
export default Input
