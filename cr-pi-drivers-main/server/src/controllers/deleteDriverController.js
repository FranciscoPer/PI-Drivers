const { Driver } = require('../db');  

const deleteDriverById = async (id) => {
  try {
    // Elimina el driver donde el id coincide
    const deletedRowCount = await Driver.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRowCount === 0) {
      return 'Driver no encontrado';
    }

    return 'Driver eliminado con éxito';
  } catch (error) {
    // Maneja el error como mejor te parezca
    console.error(error);
    throw new Error('Error al eliminar el driver');
  }
};

module.exports= {
    deleteDriverById
}