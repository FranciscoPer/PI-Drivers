const axios = require ("axios")
const { Op } = require("sequelize");

const {Driver, Teams } = require ("../db")

const createDriverDb = async (name, lastName, description, image, nationality, birthDate, teamIds, teamName) => {
  const newDriver = await Driver.create({ name, lastName, description, image, nationality, birthDate });

  if (teamIds && teamIds.length > 0) {
    const teams = await Teams.findAll({
      where: {
        id: teamIds
      }
    });
    await newDriver.addTeams(teams);
  }

  if (teamName) {
    let team = await Teams.findOne({ where: { name: teamName } });
    if (!team) {
      team = await Teams.create({ name: teamName });
    }
    await newDriver.addTeam(team);
  }

  const newDriverWithTeams = await Driver.findByPk(newDriver.id, {
    include: [Teams]
  });

  return newDriverWithTeams;
};

module.exports = { createDriverDb };
