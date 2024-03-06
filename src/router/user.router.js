const Router = require("koa-router");
/** 拆分具体的处理逻辑 */
const { create } = require("../controller/user.controller.js");
/** 信息校验 */
const {
  verifyUser,
  handlePassword,
} = require("../middleware/user.middleware.js");
const userRouter = new Router({
  prefix: "/users",
});

/** 创建用户 */
userRouter.post("/", verifyUser, handlePassword, create);

module.exports = userRouter;
