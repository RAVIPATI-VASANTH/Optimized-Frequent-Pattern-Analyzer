const express = require("express");
// const bodyParser = require("body-parser");
const server = express();

const loginRouter = require("./routers/accessibilityRouters/loginRouter");
const registerRouter = require("./routers/accessibilityRouters/registerRouter");
const searchItemRouter = require("./routers/taskRouters/searchItemRouter");
const confirmTransactionRouter = require("./routers/taskRouters/confirmTransactionRouter");
const createCategoryRouter = require("./routers/taskRouters/createCategoryRouter");
const createBrandRouter = require("./routers/taskRouters/createBrandRouter");
const getCategoriesRouter = require("./routers/taskRouters/getCategoriesRouter");
const getBrandsRouter = require("./routers/taskRouters/getBrandsRouter");

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
server.use(createBrandRouter);
server.use(getCategoriesRouter);
server.use(getBrandsRouter);

server.listen(5000);
