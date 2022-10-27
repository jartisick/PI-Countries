const { Activity, Country } = require("../db");

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countryName } = req.body;
  if (!name || !difficulty | !duration || !season || !countryName)
    return res.status(404).send("Missing parameters");

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      countryName,
    });

    const findCountry = await Country.findAll({
      where: { name: countryName },
    });

    await newActivity.addCountries(findCountry);

    return res.status(200).send(newActivity);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  postActivity,
};
