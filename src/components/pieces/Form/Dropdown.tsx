import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import makeAnimated from "react-select/animated";

export interface OptionsFormat {
    value: any;
    label: any;
}

interface DropdownProps {
    label: string;
    apiUrl: string;
    selectedOption?: OptionsFormat | null;
    onSelect: (selectedValue: OptionsFormat | null) => void;
    isDisabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    apiUrl,
    onSelect,
    selectedOption,
    isDisabled = false,
}) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const animatedComponents = makeAnimated();

    const onChangOpt = (e: any) => {
        if(e && typeof e === 'object'){
            const opt = e as OptionsFormat
            onSelect(opt)
        }
    }

    const loadOptions = async (inputValue: string): Promise<OptionsFormat[]> => {
        try {
            setInput(inputValue)
            setLoading(true);
            const response = await axios.get(apiUrl, {params: {
                page: 1,
                limit: 10,
                search: inputValue,
            }});
            if (response.data.data && response.data.data.length > 0) {
                const options: OptionsFormat[] = response.data.data.map((val: any) => ({
                    value: val.value,
                    label: val.label,
                }));
                return options;
            }
            return []
        } catch (error) {
            console.error('Error fetching search data:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">{label}</label>
            <AsyncSelect
                className='py-4'
                value={selectedOption}
                isDisabled={isDisabled}
                cacheOptions
                components={animatedComponents}
                getOptionLabel={(e: OptionsFormat) => e.label}
                getOptionValue={(e: OptionsFormat) => e.value}
                loadOptions={loadOptions}
                onInputChange={(value) => setQuery(value)}
                onChange={(value) => onChangOpt(value)}
            />
        </div>
    );
};

export default Dropdown;
