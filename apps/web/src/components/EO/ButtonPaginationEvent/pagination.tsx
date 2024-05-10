import * as React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="flex justify-center my-4">
            <ul className="flex">
                <li>
                    <button
                        className={`border border-gray-300 py-1 px-3 rounded-l ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200' : 'bg-white'}`}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            className={`border border-gray-300 py-1 px-3 ${currentPage === pageNumber ? 'bg-gray-200' : 'bg-white'}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className={`border border-gray-300 py-1 px-3 rounded-r ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-200' : 'bg-white'}`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
