import "./cards.css"
import PropTypes from 'prop-types'; 
import Card from "../card/card";

const Cards = ({ allDrivers }) => {
    return (
      <div className='cards-container'>
        {allDrivers.map((driver, index) => (
          <Card key={index} driver={driver} />
        ))}
      </div>
    );
};

Cards.propTypes = {
  allDrivers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      teams: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired
};

export default Cards;