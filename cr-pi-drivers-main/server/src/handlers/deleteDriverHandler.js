const {deleteDriverById} = require ("../controllers/deleteDriverController")
const deleteDriverHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const message = await deleteDriverById(id);
      res.status(200).send(message);
    } catch (error) {
      res.status(500).send('Error al eliminar el driver');
    }
  };

  module.exports= {
    deleteDriverHandler
  }