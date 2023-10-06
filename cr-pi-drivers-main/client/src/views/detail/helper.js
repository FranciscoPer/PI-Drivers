const mapDriverDetails = (driver) => {
    let driverDetails = {
        id: driver.id || null,
        name: '',
        lastName: '',
        nationality: driver.nationality || 'N/A',
        image: '',
        description: driver.description || 'N/A',
        birthDate: driver.dob || driver.birthDate || 'N/A',
        teams: driver.teams || driver.teamName || 'N/A',
    };

    if (driver.name && typeof driver.name === 'string') {
        // Primera estructura
        driverDetails.name = driver.name;
        driverDetails.lastName = driver.lastName;
        driverDetails.image = driver.image || 'N/A';
    } else if (driver.name && driver.name.forename) {
        // Segunda estructura
        driverDetails.name = driver.name.forename;
        driverDetails.lastName = driver.name.surname;
        driverDetails.image = driver.image?.url || 'N/A';
    }

    return driverDetails;
};
export default mapDriverDetails