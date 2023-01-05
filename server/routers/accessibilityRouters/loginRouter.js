const express = require("express");
// const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");
const loginController = require("../../controllers/accessibilityControllers/loginController");

const loginRouter = express.Router();

loginRouter.post("/login", loginController);

module.exports = loginRouter;
