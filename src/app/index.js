const Koa = require("koa");
const app = new Koa();
/** 第三方依赖 koa-bodyparser : 解析json数据  */
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router/index");
app.use(bodyParser());
/** 路由注册 */
useRoutes(app);

/** 错误处理 */
const errorHandler = require("./error-handler");
app.on("error", errorHandler);

module.exports = app;
