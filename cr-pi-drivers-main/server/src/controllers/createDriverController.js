

const {Driver, Teams } = require ("../db")

const createDriverDb = async (name, lastName, description, image, nationality, birthDate, teamNames) => {
  const newDriver = await Driver.create({ name, lastName, description, image, nationality, birthDate });

  

  if (teamNames && teamNames.length > 0) {
    for (const teamName of teamNames) {
      let team = await Teams.findOne({ where: { name: teamName } });
      if (!team) {
        team = await Teams.create({ name: teamName });
      }
      await newDriver.addTeam(team);
    }
  }

  const newDriverWithTeams = await Driver.findByPk(newDriver.id, {
    include: [Teams]
  });

  return newDriverWithTeams;
};
module.exports = { createDriverDb };
