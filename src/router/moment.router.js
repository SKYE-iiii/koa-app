/*
 * @Description: 动态相关路由
 * @Author: zyj
 * @Date: 2024-03-22 14:11:53
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-25 10:36:09
 * @FilePath: \koa-app\src\router\moment.router.js
 */
const {
  publishMoment,
  getMomentDetail,
} = require("../controller/moment.controller");
const Router = require("koa-router");
const { verifyToken } = require("../middleware/auth.middleware");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyToken, publishMoment);
momentRouter.get("/:id", verifyToken, getMomentDetail);

module.exports = momentRouter;
