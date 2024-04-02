/*
 * @Description: 评论 - 路由
 * @Author: zyj
 * @Date: 2024-04-01 14:33:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 14:34:24
 * @FilePath: \koa-app\src\router\comment.router.js
 */
const { verifyToken } = require("../middleware/auth.middleware");
const { create, reply } = require("../controller/comment.controller");
const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", verifyToken, create);
commentRouter.post("/reply", verifyToken, reply);

module.exports = commentRouter;
