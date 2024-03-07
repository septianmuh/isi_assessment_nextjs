import React from 'react';

interface TextBoxProps {
    label: string;
    value: string;
    setValue: (e: any) => any;
    disabled?: boolean
    placeholder?: string
    className?: string
    type?: "text" | "password"
    children?: React.ReactElement
}

const TextBox: React.FC<TextBoxProps> = ({ label, value, setValue, disabled=false, placeholder, className, type='text', children }) => {
    const handleOnchange = (value: string) => {
        setValue(value)
    }

    let class_name = "shadow appearance-none border rounded w-full text-xl py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    if(className){
        class_name = className
    }

    return (
        <div className="mb-4 relative">
            <label className="block text-gray-700 text-xl font-bold mb-2">{label}</label>
            <input
                className={class_name}
                type={type}
                value={value}
                onChange={(e) => handleOnchange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
            />
            {children && (
                <div className="absolute right-3 top-1/2 transform translate-y-[20%] cursor-pointer">
                    {children}
                </div>
            )}
        </div>
    );
};
  

export default TextBox;
