import React from 'react';

interface NumericTextBoxProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const NumericTextBox: React.FC<NumericTextBoxProps> = ({ label, value, onChange }) => {
    const handleOnchange = (value: number) => {
        onChange(value)
    }
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={value}
                onChange={(e) => handleOnchange(parseInt(e.target.value, 10))}
            />
        </div>
    );
};

export default NumericTextBox;
