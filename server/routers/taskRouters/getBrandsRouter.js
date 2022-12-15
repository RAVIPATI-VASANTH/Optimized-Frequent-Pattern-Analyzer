const express = require("express");
const getBrandsController = require("../../controllers/taskControllers/getBrandsController");

const getBrandsRouter = express.Router();

getBrandsRouter.get("/getBrands", getBrandsController);

module.exports = getBrandsRouter;
