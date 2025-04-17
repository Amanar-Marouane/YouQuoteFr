import React, { useEffect, useState } from "react";

const Input = ({ type, name, label, placeholder, value = '', onChange }) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="w-full px-6 flex flex-col gap-1">
            <label htmlFor={name} className="text-[#374151] text-lg font-semibold p-1">
                {label}
            </label>
            <div className={`flex justify-center items-center border p-1`}>
                {type === "textarea" ? (
                    <textarea
                        className="w-full p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                        name={name}
                        id={name}
                        placeholder={placeholder || ""}
                        value={inputValue}
                        onChange={handleChange}
                        rows={4}
                    />
                ) : (
                    <input
                        autoComplete="on"
                        className="w-full p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent"
                        type={type === "password" && isPasswordVisible ? "text" : type}
                        name={name}
                        id={name}
                        placeholder={placeholder || ""}
                        value={inputValue}
                        onChange={handleChange}
                    />
                )}
                {type === "password" && (
                    <button type="button" className="cursor-pointer" onClick={togglePassword}>
                        <img
                            src={isPasswordVisible ? "/eye-off-icon.svg" : "/eye-icon.svg"}
                            alt="Toggle Password"
                            className="w-6 h-6 mr-3"
                        />
                    </button>
                )}
            </div>
            <span className={`${name}-error error text-red-500 text-sm mt-1`}></span>
        </div>
    )
}

export default Input;