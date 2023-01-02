const express= require("express");
const confirmRequestController= require("./../../controllers/taskControllers/confirmRequestController")
const confirmRequestRouter=express.Router();
confirmRequestRouter.post("/confirmRequest",confirmRequestController)

module.exports=confirmRequestRouter;