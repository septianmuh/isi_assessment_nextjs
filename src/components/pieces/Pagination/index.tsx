import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPageOptions?: number[];
    defaultItemsPerPage?: number;
    onPageChange: (page: number, itemsPerPage: number) => void;
    styling?:{
        button?: string
        dropdown?: string
    }
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    itemsPerPageOptions = [10, 20, 50, 100],
    defaultItemsPerPage = 10,
    onPageChange,
    styling
}) => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);

    const range = (start: number, end: number): number[] => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const generatePageList = () => {
        const pagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < pagesToShow - 1) {
            if (currentPage < totalPages / 2) {
                endPage = Math.min(totalPages, startPage + pagesToShow - 1);
            } else {
                startPage = Math.max(1, endPage - pagesToShow + 1);
            }
        }

        return range(startPage, endPage);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        onPageChange(1, selectedItemsPerPage);
    };

    return (
        <nav className="flex justify-between items-center my-4">
            <div>
                <span className='text-main'>Show</span>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className={`mx-2 p-2 border border-gray-300 rounded ${styling && styling.dropdown ? styling.dropdown : 'text-gray-600'}`} 
                >
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className='text-main'>entries</span>
            </div>
            <ul className="pagination flex">
                <li className='mx-1'>
                    <button
                        onClick={() => onPageChange(currentPage - 1, itemsPerPage)}
                        disabled={currentPage === 1}
                        className="page-link bg-white text-main py-2 px-4 rounded-full border border-main"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </li>
                {generatePageList().map((page) => (
                    <li
                        key={page}
                        className={`mx-1 page-item ${
                        currentPage === page ? 'active' : ''
                        }`}
                    >
                        <button
                            onClick={() => onPageChange(page, itemsPerPage)}
                            className={`
                            page-link py-2 px-4 rounded-full border ${currentPage === page ? 'bg-main text-white border-main': 'bg-white text-main border-main'}`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li className='mx-1'>
                    <button
                        onClick={() => onPageChange(currentPage + 1, itemsPerPage)}
                        disabled={currentPage === totalPages}
                        className="page-link bg-white text-main py-2 px-4 rounded-full border border-main"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
