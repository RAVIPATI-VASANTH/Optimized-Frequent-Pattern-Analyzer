const express = require("express");
// const bodyParser = require("body-parser");
const server = express();

const loginRouter = require("./routers/accessibilityRouters/loginRouter");
const registerRouter = require("./routers/accessibilityRouters/registerRouter");
const searchItemRouter = require("./routers/taskRouters/searchItemRouter");
const confirmTransactionRouter = require("./routers/taskRouters/confirmTransactionRouter");
const createCategoryRouter = require("./routers/taskRouters/createCategoryRouter");
const getCategoriesRouter = require("./routers/taskRouters/getCategoriesRouter");

// server.use(
//   session({
//     name: "server",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       secure: false,
//     },
//     secret: "this is a secret",
//   })
// );

// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());

server.use(loginRouter);
server.use(registerRouter);
server.use(searchItemRouter);
server.use(confirmTransactionRouter);
server.use(createCategoryRouter);
server.use(getCategoriesRouter);

server.listen(5000);
