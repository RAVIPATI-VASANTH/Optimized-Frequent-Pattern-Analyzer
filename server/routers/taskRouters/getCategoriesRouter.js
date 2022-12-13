const express = require("express");
const getCategoriesController = require("../../controllers/taskControllers/getCategoriesController");

const getCategoriesRouter = express.Router();

getCategoriesRouter.get("/getCategories", getCategoriesController);

module.exports = getCategoriesRouter;
