const express = require("express");
const { guard } = require("../middleware/guard");
const { register, login, getCurrentUser } = require("../controllers/auth");

const routes = express.Router();

routes.post("/register", register);

routes.post("/login", login);

routes.get("/me", guard, getCurrentUser);

module.exports = routes;
