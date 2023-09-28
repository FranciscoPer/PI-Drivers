const axios = require('axios');
const { Sequelize } = require("sequelize");
const { Driver, Teams} = require('../db')


const getDriverByName = async (name) => {
  try {
    const lowercaseName = name.toLowerCase();  // Convertir el nombre a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas.
    
    // Llamar a la API para obtener todos los drivers
    const response = await axios.get(`http://localhost:5000/drivers`);
    const driverApi = response.data;  // Almacenar los datos devueltos por la API
    
    // Comprobar si la API devuelve una respuesta
    if (!driverApi || !Array.isArray(driverApi)) {
      throw new Error("No data returned from API");  // Lanzar un error si no se devuelve data o no es un array
    }

    // Filtrar los drivers
    const driverFiltered = driverApi
    .filter(driver => {
        return driver &&  // Verificar si el objeto driver es válido
        driver.name &&  // Verificar si el objeto name dentro de driver es válido
        driver.name.forename &&  // Verificar si forename dentro de name es válido
        driver.name.forename.toLowerCase() === lowercaseName;  // Realizar la comparación en minúsculas
      })
      .slice(0, 15);  // Limitar los resultados a los primeros 15
      
      // Consultar la base de datos
      const driverDB = await Driver.findAll({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),  // Usar la función LOWER de SQL para hacer la comparación insensible a mayúsculas y minúsculas
          lowercaseName,  // El nombre convertido a minúsculas
          ),
          include: [
            {
              model: Teams,
              as: 'Teams',
              through: {
                attributes: ['DriverId', 'TeamId'],
              },
            }
          ],
          limit: 15,  // Limitar a 15 registros
        });
        
        // Unir los resultados
        return [...driverFiltered, ...driverDB].slice(0, 15);  // Unir los arrays y limitar el resultado a 15 elementos
        
      } catch (error) {
        console.error("Error en getDriverByName:", error);  // Imprimir el error si algo sale mal
        throw new Error("Driver not found");  // Lanzar un nuevo error
      }
    };
    module.exports = {
      getDriverByName
    };
    
    
    
    
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
    
    