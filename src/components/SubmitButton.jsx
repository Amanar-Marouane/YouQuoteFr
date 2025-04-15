import React from 'react'

const SubmitButton = ({ children, className = '', ...props }) => {
    return (
        <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default SubmitButton 