const express = require("express");
const getBrandItemsController = require("../../controllers/taskControllers/getBrandItemsController");

const getBrandItemsRouter = express.Router();
getBrandItemsRouter.post("/getBrandItems", getBrandItemsController);

module.exports = getBrandItemsRouter;
