const express = require("express");
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
const searchCategoriesRouter = require("./routers/taskRouters/searchCategoryRouter");
const getCategoryItemsRouter = require("./routers/taskRouters/getCategoryItemsRouter");
const getBrandItemsRouter = require("./routers/taskRouters/getBrandItemsRouter");
const confirmRequestRouter = require("./routers/taskRouters/confirmRequestRouter");
const cancelFPARequestRouter = require("./routers/taskRouters/cancelFPARequestRouter");
const startFPARequestRouter = require("./routers/taskRouters/startFPARequestRouter");
const getFPARequestBasicInfoRouter = require("./routers/taskRouters/getFPARequestBasicInfoRouter");
const getFPARequestInfoRouter = require("./routers/taskRouters/getFPARequestInfoRouter.js");
const getFPARequestBrandInfoRouter = require("./routers/taskRouters/getFPARequestBrandInfoRouter");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

server.use(cors(corsOptions));

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
server.use(searchCategoriesRouter);
server.use(getCategoryItemsRouter);
server.use(getBrandItemsRouter);
server.use(confirmRequestRouter);
server.use(cancelFPARequestRouter);
server.use(startFPARequestRouter);
server.use(getFPARequestInfoRouter);
server.use(getFPARequestBrandInfoRouter);
server.use(getFPARequestBasicInfoRouter);
server.listen(5000, console.log("server started"));
