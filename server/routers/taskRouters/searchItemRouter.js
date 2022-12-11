const express = require("express");
const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");

const searchItemController = require("../../controllers/taskControllers/searchItemController");

const searchItemRouter = express.Router();

searchItemRouter.get(
  "/searchItem",
  authenticationMiddleware,
  searchItemController
);

module.exports = searchItemRouter;
