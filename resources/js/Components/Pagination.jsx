export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                        page === currentPage
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
