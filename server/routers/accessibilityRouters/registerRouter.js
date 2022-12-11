const express = require("express");
const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");

const registerController = require("../../controllers/accessibilityControllers/registerController");

const registerRouter = express.Router();

registerRouter.post("/register", registerController);

module.exports = registerRouter;
