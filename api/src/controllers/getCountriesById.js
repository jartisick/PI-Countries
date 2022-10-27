const { Country, Activity } = require("../db");

const getCountriesById = async (req, res) => {
  // Obtener el detalle de un país en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de país
  // Incluir los datos de las actividades turísticas correspondientes
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id, {
      include: [
        {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).send(country);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getCountriesById,
};
