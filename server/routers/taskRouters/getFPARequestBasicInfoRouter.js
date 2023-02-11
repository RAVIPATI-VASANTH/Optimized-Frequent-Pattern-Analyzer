const express = require("express");

const getFPARequestBasicInfoController = require("../../controllers/taskControllers/getFPARequestBasicInfoController");

const getFPARequestBasicInfoRouter = express.Router();
getFPARequestBasicInfoRouter.post(
  "/getFPARequestBasicInfo",
  getFPARequestBasicInfoController
);

module.exports = getFPARequestBasicInfoRouter;
