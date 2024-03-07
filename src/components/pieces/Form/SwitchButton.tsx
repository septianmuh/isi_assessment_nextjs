'use client'
import React, { useState } from 'react';
import '@/appstyles/switchbutton.css';

interface SwitchButtonProps {
    label: string
    selectedValue: string
    labels?: Record<string, string>;
    onChange?: any;
    disabled?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label, onChange, disabled = false, selectedValue = 'INACTIVE'}) => {
    const [isChecked, setIsChecked] = useState(selectedValue === "ACTIVE" ? true : false);

    console.log(selectedValue)
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            const newValue = !isChecked;
            setIsChecked(newValue);
            console.log()
            if (onChange) {
                const value = newValue?'ACTIVE':'INACTIVE'
                onChange(value);
            }
        }
    };
    
    return (
        <>
            <div className='flex flex-col'>
                <label className="block text-gray-700 text-xl font-bold mb-2">{label}</label>
                <div className={`container-switch-btn ${disabled ? 'disabled' : ''}`}>
                    <div className="button-cover">
                        <div className="button-switch r" id="button-13">
                            <input type="checkbox" className="checkbox-switch" onChange={handleToggle} checked={isChecked}/>
                            <div className="knobs">
                                <span></span>
                            </div>
                            <div className="layer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SwitchButton;
