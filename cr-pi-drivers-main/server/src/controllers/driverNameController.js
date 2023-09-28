const axios = require('axios');
const { Sequelize } = require("sequelize");
const { Driver, Teams} = require('../db')

// const getDriverByName = async (name) => {
//     try {
//       const lowercaseName = name.toLowerCase(); // Convierte el nombre a minúsculas
//       const changeApiName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Convierte la primera letra a mayúscula para la API
  
//       // Haz la petición a la API con el nombre capitalizado
//       const response = await axios.get(`http://localhost:5000/drivers?name.forename=${changeApiName}`);
//       const driverApi = response.data;
  
//       // Filtra los resultados de la API convirtiendo a minúsculas antes de comparar
//       const driverFiltered = driverApi.filter(driver => driver.name.forename.toLowerCase() === lowercaseName);
  
//       // Busca en la base de datos y convierte el nombre a minúsculas antes de comparar
//       const driverDB = await Driver.findAll({
//         where: Sequelize.where(
//           Sequelize.fn('LOWER', Sequelize.col('name')), // Convierte el nombre de la columna a minúsculas
//           lowercaseName,
//           ),
        
//         });
  
//       return [...driverFiltered, ...driverDB];
//     } catch (error) {
//       console.error("Error en getDriverByName:", error);
//       throw new Error("Algo salió mal");
//     }
//   };
const getDriverByName = async (name) => {
    try {
      const lowercaseName = name.toLowerCase();
      const changeApiName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      // Llamar a la API
      const response = await axios.get(`http://localhost:5000/drivers?name.forename=${changeApiName}`);
      const driverApi = response.data;
      const driverFiltered = driverApi
        .filter(driver => driver.name.forename.toLowerCase() === lowercaseName)
        .slice(0, 15); // Limitar a 15 registros

      // Consultar la base de datos
      const driverDB = await Driver.findAll({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          lowercaseName,
        ),
        include: [
          {
            model: Teams, // Incluimos al modelo Teams de DB
            as: 'Teams',
            through: {
              attributes: ['DriverId', 'TeamId'], 
            },
          }
        ],
        limit: 15,  
      });

      return [...driverFiltered, ...driverDB].slice(0, 15); // Limitamos resultado de busqueda en 15
    } catch (error) {
      console.error("Error en getDriverByName:", error);
      throw new Error("Driver not found");
    }
};
  module.exports = {
    getDriverByName
  };
  
  
  
  
  
  