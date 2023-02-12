const express = require("express");

const startFPARequestController = require("../../controllers/taskControllers/startFPARequestController");

const startFPARequestRouter = express.Router();
startFPARequestRouter.post("/startFPARequest", startFPARequestController);

module.exports = startFPARequestRouter;
