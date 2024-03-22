/*
 * @Description: 动态相关路由
 * @Author: zyj
 * @Date: 2024-03-22 14:11:53
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-22 14:14:01
 * @FilePath: \koa-app\src\router\moment.router.js
 */
const { publishMoment } = require("../controller/moment.controller");
const Router = require("koa-router");
const { verifyToken } = require("../middleware/auth.middleware");
const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyToken, publishMoment);

module.exports = momentRouter;
