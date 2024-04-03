/*
 * @Description: 评论 - 控制器
 * @Author: zyj
 * @Date: 2024-04-01 14:35:28
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-03 09:55:42
 * @FilePath: \koa-app\src\controller\comment.controller.js
 */

const commentService = require("../service/comment.service");
const { hasEmpty } = require("../utils/index");

class CommentController {
  /** 创建&回复评论 */
  createAndReply(keyword) {
    return async (ctx, next) => {
      const { content, moment_id, comment_id } = ctx.request.body;
      const verifyEmptyArr =
        keyword === "reply"
          ? [content, moment_id, comment_id]
          : [content, moment_id];

      const message = keyword === "reply" ? "回复评论" : "创建评论";
      if (hasEmpty(verifyEmptyArr)) {
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
          message,
          data: result,
        };
        await next();
      } catch (err) {
        const error = new Error(`${message}失败,请重试`);
        return ctx.app.emit("error", error, ctx);
      }
    };
  }

  /** 更新评论 */
  update(ctx, next) {
    ctx.body = {
      code: 200,
      message: "更新评论",
    };
  }
}

module.exports = new CommentController();
