import React from 'react';
import './pagination.css';


const Pagination = ({ currentPage, setCurrentPage, totalBooks, booksPerPage }) => {
    const totalPages = Math.ceil(totalBooks / booksPerPage);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <button 
          onClick={handlePrevious} 
          className="pagination-btn" 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-btn ${number === currentPage ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        <button 
          onClick={handleNext} 
          className="pagination-btn" 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

export default Pagination;
