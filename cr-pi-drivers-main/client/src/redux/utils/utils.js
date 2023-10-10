export const getFullDate = (driver) => {
    if (driver.dob) {
        const [year, month, day] = driver.dob.split('-');
        return new Date(year, month - 1, day);
    } else if (driver.birthDate) {
        const [year, month, day] = driver.birthDate.split('T')[0].split('-');
        return new Date(year, month - 1, day);
    }
};

export const filterDriversByTeam = (drivers, team) => {
  return drivers.filter(driver => {
    if (driver["Teams.name"]) {  // Cambiado de driver.teamName a driver["Teams.name"]
      return driver["Teams.name"] === team;
    } else if (driver.teams) {
      return driver.teams.split(', ').includes(team);
    }
    return false;
  });
}
  
export const sortDriversByName = (drivers, order) => {
    return [...drivers].sort((a, b) => {
        let nameA = a.name && typeof a.name === 'object' ? a.name.forename : a.name || "";
        let nameB = b.name && typeof b.name === 'object' ? b.name.forename : b.name || "";
        if (order === 'asc') {
          return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
      });
  }


export const sortDriversByBirthdate = (drivers, order) => {
    return [...drivers].sort((a, b) => {
      const dateA = a.dob ? new Date(a.dob) : a.birthDate ? new Date(a.birthDate) : null;
      const dateB = b.dob ? new Date(b.dob) : b.birthDate ? new Date(b.birthDate) : null;
      if (!dateA) return 1;  // Mueve las fechas no definidas o null al final
      if (!dateB) return -1;  // Mueve las fechas no definidas o null al principio
      if (order === 'asc') {
          return dateA - dateB;
      } else if (order === 'desc') {
          return dateB - dateA;
      }
      return 0;
    });
  }

  
  