const { Router } = require("express");
const { getDriversHanlder, getDetailHandler, getDriverName, getTeamHandler} = require("../handlers/driverHandler");
const { postDriversHandler } = require ("../handlers/postHandler");
const { deleteDriverHandler } = require("../handlers/deleteDriverHandler");

const router = Router();


router.get("/drivers", getDriversHanlder)

router.get('/', getDriverName)

router.get('/teams', getTeamHandler)

router.get("/drivers/:id", getDetailHandler)

router.post("/", postDriversHandler)

router.delete("/:id", deleteDriverHandler)



module.exports = router;




  

  
  
  
  
  
