/*
 * @Description: 评论 - 控制器
 * @Author: zyj
 * @Date: 2024-04-01 14:35:28
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 15:20:15
 * @FilePath: \koa-app\src\controller\comment.controller.js
 */

const commentService = require("../service/comment.service");

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
}

module.exports = new CommentController();
