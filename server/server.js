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
const createItemRouter = require("./routers/taskRouters/createItemRouter");
const deleteItemRouter = require("./routers/taskRouters/deleteItemRouter");
const updateItemRouter = require("./routers/taskRouters/updateItemRouter");
const getFPARequestsRouter = require("./routers/taskRouters/getFPARequestsRouter");
const searchBrandRouter = require("./routers/taskRouters/searchBrandRouter");

server.use(loginRouter);
server.use(registerRouter);
server.use(searchItemRouter);
server.use(confirmTransactionRouter);
server.use(createCategoryRouter);
server.use(createBrandRouter);
server.use(getCategoriesRouter);
server.use(getBrandsRouter);
server.use(createItemRouter);
server.use(deleteItemRouter);
server.use(updateItemRouter);
server.use(getFPARequestsRouter);
server.use(searchBrandRouter);

server.listen(5000);
