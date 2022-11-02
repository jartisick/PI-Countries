const { Activity } = require("../db");

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  //recibo ID por params
  try {
    if (id) {
      // si tengo ID
      await Activity.destroy({
        where: { id: id }, // eliminame la activity que cumpla con el ID que le estoy pasando, destroy es un metodo de sequelize para eliminar
      });
      res.send({ msg: "Activity Delete" });
    }
  } catch (error) {
    res.status(404).send("404 not found");
  }
};

module.exports = {
  deleteActivity,
};
