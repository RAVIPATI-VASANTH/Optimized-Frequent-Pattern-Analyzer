const express = require("express");
const createCategoryController = require("../../controllers/taskControllers/createCategoryController");

const createCategoryRouter = express.Router();
createCategoryRouter.post("/createCategory", createCategoryController);

module.exports = createCategoryRouter;
