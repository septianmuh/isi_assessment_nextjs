import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination';

interface Action {
    title: string;
    param: string;
    handler: (row: any, param:string) => void;
}

interface TableColumn {
    field: string;
    title: string;
    onRender?: (value: any) => void;
}

interface TableProps {
    serial?: boolean
    columns: TableColumn[];
    actions?: Action[];
    data: any[];
    pagination?:{
        currentPage: number
        totalPages: number
        defaultItemsPerPage: number
        onPageChange: (page: number, itemsPerPage: number) => void;
    }
}

const Table: React.FC<TableProps> = ({ columns, data, actions, serial, pagination }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [dropdownRow, setDropdownRow] = useState<any>(null);
    let numberSerial = 1
    if(pagination){
        numberSerial = ((pagination.currentPage - 1) * pagination.defaultItemsPerPage) + 1
    }

    const toggleDropdown = (row: any) => {
        setShowDropdown(!showDropdown);
        setDropdownRow(row);
    };

    const columnLength = columns.length + (actions && actions.length > 0 ? 1 : 0);
    return (
        <>
            <table className="table-auto min-w-full leading-normal mb-8">
                <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        {serial && <th align='center'>#</th>}
                        {columns.map((column, index) => (
                            <th className='p-2' key={index}>{column.title}</th>
                        ))}
                        {actions && actions.length > 0 && <th align='center'>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {serial && (
                                    pagination ? (
                                        <td className="border-l border-r p-2">{numberSerial++}</td>
                                    ) : (
                                        <td className="border-l border-r p-2">{numberSerial++}</td>
                                    )
                                )}
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="border-r px-2 py-4">
                                        {column.onRender ? column.onRender(row[column.field]) : row[column.field]}
                                    </td>
                                ))}
                                {actions && actions.length > 0 && (
                                    <td className="relative border-l border-r px-2 py-4">
                                        <button
                                            onClick={() => toggleDropdown(row)}
                                            className="text-gray-500 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </button>
                                        {showDropdown && dropdownRow === row && (
                                            <div className="absolute right-0 bg-white z-20 border rounded shadow-md">
                                                <ul>
                                                    {actions.map((action, actionIndex) => (
                                                        <li key={actionIndex}>
                                                            <button
                                                                onClick={() => {
                                                                    action.handler(row, action.param);
                                                                    toggleDropdown(row);
                                                                }}
                                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                                            >
                                                                {action.title}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr className="w-full h-[100px] bg-gray-100">
                            <td align='center' colSpan={columnLength + (actions && actions?.length > 0 ? 1 : 0)}>
                                <span className='w-full'>-- No Data --</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {pagination && (
                <Pagination 
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    defaultItemsPerPage={pagination.defaultItemsPerPage}
                    onPageChange={pagination.onPageChange}
                />
            )}
        </>
    );
};

export default Table;
