
import PropTypes from 'prop-types';

const Navbar = ({ handleChange, handleSubmit }) => {
  return (
    <div className='nav-box'>
      <form onSubmit={handleSubmit}>
        <input placeholder='Buscar' type='search' onChange={handleChange} />
        <button type='submit'>Buscar</button>
      </form>
    </div>
  );
};

Navbar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Navbar;
