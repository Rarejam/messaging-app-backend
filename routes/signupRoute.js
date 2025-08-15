const signupController = require("../controllers/signupController");
const express = require("express");
const signupRoute = express.Router();
signupRoute.post("/", signupController);
module.exports = signupRoute;
