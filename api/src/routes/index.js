const { Router } = require("express");
const { getAllCountries } = require("../controllers/getAllCountries");
const { getCountriesById } = require("../controllers/getCountriesById");
const { getActivity } = require("../controllers/getActivity");
const { postActivity } = require("../controllers/postActivity");
const { deleteActivity } = require("../controllers/deleteActivity");
//Traemos las tablas de db

const router = Router();

// Configurar los routers
// router.use('/countries', Countries);

router.get("/countries", getAllCountries);

router.get("/countries/:id", getCountriesById);

router.get("/activities", getActivity);

router.post("/activities", postActivity);

router.delete("/activities/:id", deleteActivity);

module.exports = router;
