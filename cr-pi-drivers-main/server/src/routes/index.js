const { Router } = require("express");
const { getDriverHandler, getDetailHandler, } = require("../handlers/driverHandler");
const { postDriversHandler } = require ("../handlers/postHandler")

const router = Router();


router.get("/", getDriverHandler)

router.get("/:id", getDetailHandler)

router.post("/", postDriversHandler)




module.exports = router;




  

  
  
  
  
  
