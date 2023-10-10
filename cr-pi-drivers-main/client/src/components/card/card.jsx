import "./card.css"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'; // Importar PropTypes

const Card = ({ driver }) => {
  let name;
  let teams;
  let id = driver.id
  const imageUrl = typeof driver.image === 'string' ? driver.image : driver.image?.url;
  console.log("Driver en Card:", driver);

  if (driver.name && driver.lastName) {  // Estructura 1
      name = `${driver.name} ${driver.lastName}`;
      teams = driver['Teams.name'] || 'N/A';  // Si 'Teams.name' no existe, mostrar 'N/A'
  } else if (driver.name && driver.name.forename && driver.name.surname) {  // Estructura 2
      name = `${driver.name.forename} ${driver.name.surname}`;
      teams = driver.teams
          ? typeof driver.teams === 'string'
              ? driver.teams.split(',').join(", ")
              : driver.teams.join(", ")
          : "N/A";
  } else {
      name = "N/A";
      teams = "N/A";
  }

  return (
    <div className='card-container'>
      {id ? 
        <Link to={`/home/${id}`}> 
          <img src={imageUrl} alt={name} />
          <h3>{name}</h3>
          <p>{teams}</p>
        </Link>
        :
        <>
          <img src={imageUrl} alt={name} />
          <h3>{name}</h3>
          <p>{teams}</p>
        </>
      }
    </div>
  );
};

// Validación de PropTypes
Card.propTypes = {
  driver: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ]).isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        forename: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
      }),
    ]),
    
    lastName: PropTypes.string,
    "Teams.name": PropTypes.string,
    teams: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }).isRequired,
};

export default Card;