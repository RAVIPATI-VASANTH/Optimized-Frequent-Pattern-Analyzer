const express = require("express");
const deleteItemController = require("../../controllers/taskControllers/deleteItemController");

const deleteItemRouter = express.Router();
deleteItemRouter.post("/deleteItem", deleteItemController);

module.exports = deleteItemRouter;
