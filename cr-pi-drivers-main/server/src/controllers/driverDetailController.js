const {Driver, Teams} = require ("../db")
const axios = require ('axios')


// const getDriverById = async (id) => {
//     if (typeof id === 'number' || !isNaN(id)) {
//       // Si es un número, busca en la API externa
//       const response = await axios.get(`http://localhost:5000/drivers/${id}`);
//       return response.data;
//     } else if (typeof id === 'string') {
//       // Si es un string, busca en la base de datos
//       const driver = await Driver.findByPk(id, {
//         include: [{
//           model: Teams,
//           attributes: ['name'], // Solo incluir el campo 'name'
//         }],
//       });
  
//       if (driver && driver.Teams && driver.Teams.length > 0) {
//         driver.dataValues.teamName = driver.Teams.map(team => team.name); // Podría haber más de un equipo
//       }
      
//       return driver;
//     } else {
//       throw new Error('Driver with this ID does not exist');
//     }
//   };
const getDriverById = async (id) => {
  if (typeof id === 'number' || !isNaN(id)) {
    // Si es un número, busca en la API externa
    try {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Driver with this ID does not exist");
    }
  } else if (typeof id === 'string') {
    // Si es un string, busca en la base de datos
    const driver = await Driver.findByPk(id, {
      include: [{
        model: Teams,
        attributes: ['name'], // Solo incluir el campo 'name'
      }],
    });

    if (driver) {
      if (driver.Teams && driver.Teams.length > 0) {
        driver.dataValues.teamName = driver.Teams.map(team => team.name); // Podría haber más de un equipo
      }
      return driver;
    } else {
      throw new Error("Driver with this ID does not exist");
    }
  } else {
    throw new Error('Invalid ID type');
  }
};







  module.exports = {
    getDriverById
  };