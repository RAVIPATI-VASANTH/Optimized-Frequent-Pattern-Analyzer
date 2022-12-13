const express = require("express");

const createCategoryRouter = express.Router();
const createCategoryController = require("../../controllers/taskControllers/createCategoryController");
createCategoryRouter.post("/createCategory", createCategoryController);

module.exports = createCategoryRouter;
