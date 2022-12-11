const express = require("express");
const server = express();

const loginRouter = require("./routers/accessibilityRouters/loginRouter");
const registerRouter = require("./routers/accessibilityRouters/registerRouter");
const searchItemRouter = require("./routers/taskRouters/searchItemRouter");
const confirmTransactionRouter = require("./routers/taskRouters/confirmTransactionRouter");
const createCollectionRouter = require("./routers/taskRouters/createCollectionRouter");

server.use(loginRouter);
server.use(registerRouter);
server.use(searchItemRouter);
server.use(confirmTransactionRouter);
server.use(createCollectionRouter);

server.listen(5000);
