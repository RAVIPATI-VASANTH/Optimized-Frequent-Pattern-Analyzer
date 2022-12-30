const express = require("express");
const getCategoryItemsController = require("../../controllers/taskControllers/getCategoryItemsController");

const getCategoryitemsRouter = express.Router();
getCategoryitemsRouter.post("/getCategoryItems", getCategoryItemsController);

module.exports = getCategoryitemsRouter;
