const express = require("express");
const updateItemController = require("../../controllers/taskControllers/updateItemController");

const updateItemRouter = express.Router();
updateItemRouter.post("/updateItem", updateItemController);

module.exports = updateItemRouter;
