/*
 * @Description: 评论 - 路由
 * @Author: zyj
 * @Date: 2024-04-01 14:33:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-03 10:55:35
 * @FilePath: \koa-app\src\router\comment.router.js
 */
const { verifyToken, verifyAuthor } = require("../middleware/auth.middleware");
const { createAndReply, update } = require("../controller/comment.controller");
const Router = require("koa-router");
const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", verifyToken, createAndReply("create"));
commentRouter.post("/reply", verifyToken, createAndReply("reply"));
/** 更新评论 : 登录验证 , 评论权限验证(发布评论的用户id与当前登录用户id一致)  , 更新(id,content) */
commentRouter.put("/", verifyToken, verifyAuthor("comment"), update);

module.exports = commentRouter;
