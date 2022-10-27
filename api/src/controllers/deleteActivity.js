const { Activity } = require("../db");

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Activity.destroy({
        where: { id: id },
      });
      res.send({ msg: "Actividad eliminada" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteActivity,
};
