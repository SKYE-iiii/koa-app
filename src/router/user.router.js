const Router = require("koa-router");
/** 拆分具体的处理逻辑 */
const { create } = require("../controller/user.controller.js");

const userRouter = new Router({
  prefix: "/users",
});

userRouter.post("/", create);

module.exports = userRouter;
