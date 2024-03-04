const Koa = require("koa");
const app = new Koa();
/** 第三方依赖 koa-bodyparser : 解析json数据  */
const bodyParser = require("koa-bodyparser");

/** 将用户相关路由抽取出来 */
const userRouter = require("../router/user.router");

app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

/** 错误处理 */
const errorHandler = require("./error-handler");
app.on("error", errorHandler);

module.exports = app;
