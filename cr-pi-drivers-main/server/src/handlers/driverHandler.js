const {getDriverById} = require ("../controllers/driverDetailController")
const {getAllDrivers} = require ("../controllers/driverController")
const {getDriverByName} = require("../controllers/driverNameController")
const {getAllTeams} = require ("../controllers/teamsControllers")




const getDriversHanlder = async (req, res) => {
    try {
      const drivers = await getAllDrivers();
      const driversWithDefaultImages = drivers.map(driver => {
        if (!driver.image || !driver.image.url) {
          driver.image = { url: "https://th.bing.com/th/id/OIF.Toe3IIjpFG7NOMYDCFa69A?pid=ImgDet&rs=1" };
        }
        return driver;
      });
      return res.status(200).json(driversWithDefaultImages);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  
  const getDriverName = async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const driverByName = await getDriverByName(name);
        if (driverByName.length === 0) {
          res.status(404).json({ message: "Driver not found" });
        } else {
          res.status(200).json(driverByName);
        }
      } else {
        const response = await getAllDrivers(); // Asegúrate de que getAllDrivers esté definido
        if (response.length === 0) {
          res.status(404).json({ message: "No drivers found" });
        } else {
          res.status(200).json(response);
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const getDetailHandler = async (req, res) => {
    const id = req.params.id;
  
    try {
      const driver = await getDriverById(id);
      if (!driver) {
        
        return res.status(404).json({ error: "Driver with this ID does not exist" });
      }
      res.status(200).json(driver);
    } catch (error) {
      
      res.status(400).json({ error: error.message });
    }
  };
  


  const getTeamHandler = async (req, res) => {
    try {
      const allTeams = await getAllTeams();
      res.status(200).json(allTeams);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports={
    getDriversHanlder,
    getDetailHandler,
    getTeamHandler,
    getDriverName,
    
}