/*
 * @Description: 用户-路由
 * @Author: zyj
 * @Date: 2024-03-04 10:30:37
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-22 14:13:25
 * @FilePath: \koa-app\src\router\user.router.js
 */
/** 拆分具体的处理逻辑 */
const { create } = require("../controller/user.controller.js");
/** 信息校验 */
const {
  verifyUser,
  handlePassword,
} = require("../middleware/user.middleware.js");
const { judgingEmpty } = require("../middleware/judgingEmpty.middleware.js");

const Router = require("koa-router");
const userRouter = new Router({
  prefix: "/users",
});

/** 创建用户 */
userRouter.post("/", judgingEmpty, verifyUser, handlePassword, create);

module.exports = userRouter;
