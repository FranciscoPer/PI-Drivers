import "./navbar.css"
import PropTypes from 'prop-types';

const Navbar = ({ handleChange, handleSubmit }) => {
  return (
    <div className='nav-box'>
      <form onSubmit={handleSubmit} className="search-container">
        <input 
          placeholder='Buscar' 
          type='search' 
          onChange={handleChange} 
          className="search-input"
        />
        <button type='submit' className="search-btn">Search Driver</button>
      </form>
    </div>
  );
};

Navbar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Navbar;
