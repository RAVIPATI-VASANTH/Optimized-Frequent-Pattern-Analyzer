const express = require("express");

const getFPARequestInfoController = require("../../controllers/taskControllers/getFPARequestInfoController");

const getFPARequestInfoRouter = express.Router();
getFPARequestInfoRouter.post("/getFPARequestInfo", getFPARequestInfoController);

module.exports = getFPARequestInfoRouter;
