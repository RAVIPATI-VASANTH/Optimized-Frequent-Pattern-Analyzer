const express = require("express");

const getFPARequestInfoBrandController = require("../../controllers/taskControllers/getFPARequestBrandInfoController");

const getFPARequestBrandInfoRouter = express.Router();
getFPARequestBrandInfoRouter.post(
  "/getFPARequestBrandInfo",
  getFPARequestInfoBrandController
);

module.exports = getFPARequestBrandInfoRouter;
