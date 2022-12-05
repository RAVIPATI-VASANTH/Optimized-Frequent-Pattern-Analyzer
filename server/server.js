const express = require("express");
const server = express();
const loginRouter = require("./routers/accessibilityRouters/loginRouter");
const registerRouter = require("./routers/accessibilityRouters/registerRouter");

server.use(loginRouter);
server.use(registerRouter);

server.listen(5000);
