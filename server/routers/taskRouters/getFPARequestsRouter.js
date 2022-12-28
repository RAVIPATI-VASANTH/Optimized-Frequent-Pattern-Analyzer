const express = require("express");
const getFPARequestsController = require("../../controllers/taskControllers/getFPARequestsController");
const getFPARequestsRouter = express.Router();
getFPARequestsRouter.post("/getFPARequests", getFPARequestsController);

module.exports = getFPARequestsRouter;
