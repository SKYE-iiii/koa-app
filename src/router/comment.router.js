/*
 * @Description: 评论 - 路由
 * @Author: zyj
 * @Date: 2024-04-01 14:33:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-03 09:46:49
 * @FilePath: \koa-app\src\router\comment.router.js
 */
const { verifyToken } = require("../middleware/auth.middleware");
const { createAndReply } = require("../controller/comment.controller");
const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", verifyToken, createAndReply("create"));
commentRouter.post("/reply", verifyToken, createAndReply("reply"));

module.exports = commentRouter;
