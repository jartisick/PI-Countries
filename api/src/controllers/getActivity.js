const { Activity } = require("../db");

const getActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).send(activities);
  } catch (error) {
    res.status(401).send("Error, Activity Not Found");
  }
};

module.exports = {
  getActivity,
};
