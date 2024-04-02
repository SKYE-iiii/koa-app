/*
 * @Description: 评论 - 控制器
 * @Author: zyj
 * @Date: 2024-04-01 14:35:28
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-02 15:09:54
 * @FilePath: \koa-app\src\controller\comment.controller.js
 */

const commentService = require("../service/comment.service");

const checkParams = (ctx) => {
  const { content, moment_id, comment_id } = ctx.request.body;
  if (!content || !moment_id) {
    const error = new Error("参数错误");
    return ctx.app.emit("error", error, ctx);
  }
};

class CommentController {
  /** 创建评论 */
  async create(ctx, next) {
    const { content, moment_id, comment_id } = ctx.request.body;
    if (!content || !moment_id) {
      const error = new Error("参数错误");
      return ctx.app.emit("error", error, ctx);
    }

    try {
      const result = await commentService.create(
        content,
        moment_id,
        ctx.user.id,
        comment_id
      );

      ctx.body = {
        code: 200,
        message: "创建评论成功",
        data: result,
      };
      await next();
    } catch (err) {
      const error = new Error("发表失败,请重试");
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 回复评论 */
  async reply(ctx, next) {
    const { content, moment_id, comment_id } = ctx.request.body;
    if (!content || !moment_id || !comment_id) {
      const error = new Error("参数错误");
      return ctx.app.emit("error", error, ctx);
    }
    try {
      const result = await commentService.create(
        content,
        moment_id,
        ctx.user.id,
        comment_id
      );

      ctx.body = {
        code: 200,
        message: "回复评论成功",
        data: result,
      };
      await next();
    } catch (err) {
      const error = new Error("回复失败,请重试");
      return ctx.app.emit("error", error, ctx);
    }
  }
}

module.exports = new CommentController();
