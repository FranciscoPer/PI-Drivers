const {createDriverDb} = require("../controllers/createDriverController")

const postDriversHandler = async (req, res) => {
  const { name, lastName, description, image, nationality, birthDate, teamName } = req.body;

  try {
      let teamIds = []; // Para almacenar los IDs de los equipos seleccionados

      if (teamName && teamName.length > 0) {
          // Si se proporcionan nombres de equipos, crea o busca los equipos y obtén sus IDs
          const Teams = require("../db").Teams;
          for (const team of teamName) {
              let existingTeam = await Teams.findOne({ where: { name: team } });
              if (!existingTeam) {
                  existingTeam = await Teams.create({ name: team });
              }
              teamIds.push(existingTeam.id);
          }
      }

      const newDriver = await createDriverDb(name, lastName, description, image, nationality, birthDate, teamName);

      return res.status(200).json(newDriver);
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

module.exports = { postDriversHandler };