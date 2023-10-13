import PropTypes from 'prop-types';
import "./pagination.css"
const Pagination = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
    return (
        <div className='pagination'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
            <span>{currentPage} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePrevPage: PropTypes.func.isRequired,
    handleNextPage: PropTypes.func.isRequired
  };

export default Pagination;