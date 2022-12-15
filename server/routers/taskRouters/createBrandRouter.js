const express = require("express");
const createBrandController = require("../../controllers/taskControllers/createBrandController");

const createBrandRouter = express.Router();
createBrandRouter.post("/createBrand", createBrandController);

module.exports = createBrandRouter;
