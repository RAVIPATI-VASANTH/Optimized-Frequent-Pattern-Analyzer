const express = require("express");
const createItemController = require("../../controllers/taskControllers/createItemController");

const createItemRouter = express.Router();
createItemRouter.post("/createItem", createItemController);

module.exports = createItemRouter;
