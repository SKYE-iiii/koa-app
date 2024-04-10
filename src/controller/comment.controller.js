/*
 * @Description: 评论 - 控制器
 * @Author: zyj
 * @Date: 2024-04-01 14:35:28
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-09 10:20:32
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
  async update(ctx, next) {
    const { id, content } = ctx.request.body;
    if (!content) {
      const error = new Error("内容不能为空");
      return ctx.app.emit("error", error, ctx);
    }
    try {
      const result = await commentService.update(id, content);
      ctx.body = {
        code: 200,
        message: "更新评论",
        data: result,
      };
      await next();
    } catch (err) {
      const error = new Error(`修改失败,请重试`);
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 删除评论 */
  async remove(ctx, next) {
    const { id } = ctx.params;
    try {
      const result = await commentService.remove(id);
      ctx.body = {
        code: 200,
        message: "删除评论",
        data: result,
      };
      await next();
    } catch (err) {
      const error = new Error(`删除失败,请重试`);
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 获取评论列表 */
  async list(ctx, next) {
    const { momentId } = ctx.params;
    try {
      const commentList = await commentService.commentListByMomentId(momentId);
      ctx.body = { code: 200, message: "获取评论列表成功", data: commentList };
      await next();
    } catch (err) {
      const error = new Error(`获取失败,请重试`);
      return ctx.app.emit("error", error, ctx);
    }
  }
}

module.exports = new CommentController();
