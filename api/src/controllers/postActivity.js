const { Activity, Country } = require("../db");

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countryName } = req.body;

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    const findCountry = await Country.findOne({
      where: {
        name: countryName,
      },
    });

    await newActivity.addCountries(findCountry);

    res.status(201).send(newActivity);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  postActivity,
};
