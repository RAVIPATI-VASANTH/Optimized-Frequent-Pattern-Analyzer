const express=require("express");
const cancelFPARequestController= require("./../../controllers/taskControllers/cancelFPARequestController")

const cancelFPARequestRouter=express.Router();
cancelFPARequestRouter.post("/cancelFPARequest",cancelFPARequestController)
module.exports=cancelFPARequestRouter;