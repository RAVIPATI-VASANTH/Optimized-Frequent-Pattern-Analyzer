const express = require("express");
const searchBrandController = require("./../../controllers/taskControllers/searchBrandController");

const searchBrandRouter = express.Router();

searchBrandRouter.post("/searchBrands", searchBrandController);

module.exports = searchBrandRouter;
