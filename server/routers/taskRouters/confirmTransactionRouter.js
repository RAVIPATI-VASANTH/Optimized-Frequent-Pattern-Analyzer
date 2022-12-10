const express = require("express");
const confirmTransactionController = require("../../controllers/taskControllers/confirmTransactionController");

const confirmTransactionRouter = express.Router();
confirmTransactionRouter.post("/saveTransaction", confirmTransactionController);

module.exports = confirmTransactionRouter;
