/*
 * @Description: 评论 - 路由
 * @Author: zyj
 * @Date: 2024-04-01 14:33:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 14:34:24
 * @FilePath: \koa-app\src\router\comment.router.js
 */

const Router = require("koa-router");

const commentRouter = new Router({
  prefix: "/comment",
});

module.exports = commentRouter;
