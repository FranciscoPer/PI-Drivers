const  axios = require ("axios")
const {Teams} = require ("../db")


// const getAllTeams = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/drivers');
      
//       // Crear un conjunto para almacenar nombres de equipos únicos
//       const teamSet = new Set();
  
//       // Iterar a través de cada conductor y extraer los equipos
//       for (const driver of data) {
//         if (driver.teams) {
//           const teams = driver.teams.split(',').map(team => team.trim());
//           teams.forEach(team => teamSet.add(team));
//         }
//       }
  
//       // Convertir el conjunto en un array
//       const allTeamsArray = Array.from(teamSet);
  
//       // Guardar en la base de datos
//       for (const teamName of allTeamsArray) {
//         await Teams.create({ name: teamName });
//       }
  
//       return allTeamsArray;
//     } catch (error) {
//       console.error('Error al obtener todos los equipos:', error);
//       throw new Error('Algo salió mal al obtener todos los equipos');
//     }
//   };

//   module.exports = {
//     getAllTeams
//   }
const getAllTeams = async () => {
  try {
      // Obtener equipos existentes de la base de datos
      const existingTeams = await Teams.findAll();
      const existingTeamNames = existingTeams.map(team => team.name);

      const { data } = await axios.get('http://localhost:5000/drivers');

      // Crear un conjunto para almacenar nombres de equipos únicos
      const teamSet = new Set();

      // Iterar a través de cada conductor y extraer los equipos
      for (const driver of data) {
          if (driver.teams) {
              const teams = driver.teams.split(',').map(team => team.trim());
              teams.forEach(team => teamSet.add(team));
          }
      }

      // Convertir el conjunto en un array y combinarlo con los equipos existentes
      const allTeamsArray = Array.from(teamSet);
      const combinedTeams = new Set([...allTeamsArray, ...existingTeamNames]);

      // Guardar solo los nuevos equipos en la base de datos
      for (const teamName of combinedTeams) {
          if (!existingTeamNames.includes(teamName)) {
              await Teams.create({ name: teamName });
          }
      }

      return Array.from(combinedTeams);
  } catch (error) {
      console.error('Error al obtener todos los equipos:', error);
      throw new Error('Algo salió mal al obtener todos los equipos');
  }
};

module.exports = {
  getAllTeams
}

