const { createDriverDb } = require("../controllers/createDriverController")


const postDriversHandler = async (req, res) => {
    const { name, lastName, description, image, nationality, birthDate, teamIds, teamName } = req.body;
  
    try {
      const newDriver = await createDriverDb(name, lastName, description, image, nationality, birthDate, teamIds, teamName);
      return res.status(200).json(newDriver);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = { postDriversHandler };