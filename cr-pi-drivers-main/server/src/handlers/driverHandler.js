

const getDriverHandler = (req, res) => {
    const {name }  = req.query
    res.status(200).send("todos los ususarios")
}



const getDetailHandler = (req, res) => {
    const { id } = req.params;
    res.status(200).json(`hola aca esta el ${id}`)
}


const getTeamHandler = (req, res) => {
    const {team} = req.query
    res.status(200).json("team perteneciente ")
}



// const createUserHandler = (req, res) => {
//     const {name} = req.body
//     res.status(200).json("ruta creadora")
// }
 

module.exports={
    getDriverHandler,
    getDetailHandler,
    getTeamHandler,
    
}