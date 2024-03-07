import React from 'react';

interface TextAreaProps {
    label: string;
    value: string;
    setValue: (e: any) => any;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, setValue }) => {
    const handleOnchange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                onChange={(e) => handleOnchange(e.target.value)}
            />
        </div>
    );
};

export default TextArea;
