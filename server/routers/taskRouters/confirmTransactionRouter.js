const express = require("express");
const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");

const confirmTransactionController = require("../../controllers/taskControllers/confirmTransactionController");

const confirmTransactionRouter = express.Router();
confirmTransactionRouter.post(
  "/saveTransaction",
  authenticationMiddleware,
  confirmTransactionController
);

module.exports = confirmTransactionRouter;
