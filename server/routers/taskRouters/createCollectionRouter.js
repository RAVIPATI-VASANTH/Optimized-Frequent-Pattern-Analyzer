const express = require("express");
const authenticationMiddleware = require("../../middlewares/authenticationMiddleware");

const createCollectionRouter = express.Router();
const createCollectionController = require("../../controllers/taskControllers/createCollectionController");
createCollectionRouter.post(
  "/createCollection",
  authenticationMiddleware,
  createCollectionController
);

module.exports = createCollectionRouter;
