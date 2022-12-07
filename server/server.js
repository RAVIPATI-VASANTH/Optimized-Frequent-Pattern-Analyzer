const express = require("express");
const server = express();
const loginRouter = require("./routers/accessibilityRouters/loginRouter");
const registerRouter = require("./routers/accessibilityRouters/registerRouter");

const getData=require("./randoms/itemGenerator");

server.use(loginRouter);
server.use(registerRouter);

server.get("/data",(req,res)=>{
    console.log("Called");
    res.json({"data":getData()});
})

server.listen(5000);
