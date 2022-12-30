const express = require("express");
const searchCategoryController = require("./../../controllers/taskControllers/searchCategoryController");

const searchCategoryRouter = express.Router();

searchCategoryRouter.post("/searchCategories", searchCategoryController);

module.exports = searchCategoryRouter;
