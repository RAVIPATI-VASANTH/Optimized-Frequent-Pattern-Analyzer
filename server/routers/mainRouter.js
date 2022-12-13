const express = require("express");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const mainRouter = express.Router();
mainRouter.get("/", authenticationMiddleware, (req, res) => {
  res.json({ message: true });
});

module.exports = mainRouter;
