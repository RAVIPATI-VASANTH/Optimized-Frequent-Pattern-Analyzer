const express = require("express");

const searchItemController = require("../../controllers/taskControllers/searchItemController");

const searchItemRouter = express.Router();

searchItemRouter.post("/searchItem", searchItemController);

module.exports = searchItemRouter;
