import React from 'react';

interface RadioButtonProps {
    label: string;
    options: Record<string, string>;
    selectedOption: any;
    onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, options, selectedOption, onChange }) => {
    const handleOnchange = (value: string) => {
        onChange(value)
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">{label}</label>
            <div className='flex'>
                {Object.entries(options).map(([key, value], index) => (
                    <div key={index} className="mb-1 mr-4">
                        <input
                            type="radio"
                            id={key}
                            name={label}
                            value={key}
                            checked={selectedOption === key}
                            onChange={() => handleOnchange(key)}
                            className="mr-2"
                        />
                        <label htmlFor={key} className="text-sm">{value}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioButton;
