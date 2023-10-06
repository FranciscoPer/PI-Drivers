const {Driver, Teams} = require ("../db")
const axios = require ('axios')


const getAllDrivers = async () => {
    const driverDataBase = await Driver.findAll({
      include: [{
        model: Teams,
        attributes: ['name'],
      }],
      raw: true,
    }); // raw: true para obtener un objeto JSON simple
    const response = await axios.get("http://localhost:5000/drivers/");
    const driversApi = response.data;
  
    return [...driverDataBase, ...driversApi];
  };
  module.exports = {
    getAllDrivers
  }