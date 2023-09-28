const {Driver} = require ("../db")
const axios = require ('axios')

const getAllDrivers = async () => {
    const driverDataBase = await Driver.findAll({ raw: true }); // raw: true para obtener un objeto JSON simple
    const response = await axios.get("http://localhost:5000/drivers/");
    const driversApi = response.data;
  
    return [...driverDataBase, ...driversApi];
  };
  module.exports = {
    getAllDrivers
  }