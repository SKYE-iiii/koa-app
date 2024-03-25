/*
 * @Description: 动态相关路由
 * @Author: zyj
 * @Date: 2024-03-22 14:11:53
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-25 13:40:04
 * @FilePath: \koa-app\src\router\moment.router.js
 */
const {
  publishMoment,
  getMomentDetail,
  getMomentList,
} = require("../controller/moment.controller");
const Router = require("koa-router");
const { verifyToken } = require("../middleware/auth.middleware");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyToken, publishMoment);
momentRouter.get("/:id", verifyToken, getMomentDetail);
momentRouter.get("/", verifyToken, getMomentList);

module.exports = momentRouter;
