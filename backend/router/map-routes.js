const express = require("express");

const { getMapData } = require("../controllers/auth");

const routes = express.Router();

routes.get("/map-data", getMapData);

module.exports = routes;
