const e = require("express");
const express = require("express");
const checkSessionController = require("../../controllers/accessibilityControllers/checkSessionController");
const CheckSessionRouter = express.Router();

CheckSessionRouter.get("/checkSession", (req, res) => {
  if (checkSessionController(req, res)) res.json({ message: true });
  else res.json({ message: false });
});

module.exports = CheckSessionRouter;
