const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const axios = require("axios");

// Llamamos a la API
const countriesApi = async () => {
  const countriesUrl = await axios.get("https://restcountries.com/v3/all");
  const countries = await countriesUrl.data.map((country) => {
    return {
      name: country.name.common,
      id: country.cca3,
      flags: country.flags[0],
      continent: country.continents
        ? country.continents[0]
        : "no continent registered",
      capital: country.capital ? country.capital[0] : "no capital registered",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  return countries;
};
// Función controladora del Get
const getAllCountries = async (req, res) => {
  //https://restcountries.com/v3/all
  // Se traen todos los paises desde la API a la DB para utilizarlos desde ahi
  // Se almacenan solo los datos necesarios para la ruta principal
  // Se obtiene un listado de los paises
  // Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  // Si no existe ningún país mostrar un mensaje adecuado
  const countries = await countriesApi();
  const { name } = req.query;
  const { order } = req.query;
  try {
    let full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (!full.length) {
      await Country.bulkCreate(countries);
    }
  } catch (error) {
    console.log(error);
  }
  if (name) {
    let countryName = await Country.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("404 not found");
  } else if (order) {
    try {
      let country = await Country.findAll({
        order: [["population", order]],
        include: {
          model: Activity,
        },
      });
      res.status(200).send(country);
    } catch (error) {
      res.status(500).send("Error");
    }
  } else {
    let full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).send(full);
  }
};

module.exports = {
  getAllCountries,
};
