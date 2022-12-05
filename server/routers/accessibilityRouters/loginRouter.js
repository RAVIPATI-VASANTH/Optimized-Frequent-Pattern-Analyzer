const express = require("express");
const loginController = require("../../controllers/accessibilityControllers/loginController");

const loginRouter = express.Router();

loginRouter.post("/login", loginController);

module.exports = loginRouter;
