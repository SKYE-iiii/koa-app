/*
 * @Description: moment控制器
 * @Author: zyj
 * @Date: 2024-03-22 14:15:29
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-25 16:54:29
 * @FilePath: \koa-app\src\controller\moment.controller.js
 */
const momentService = require("../service/moment.service");
class MomentController {
  async publishMoment(ctx, next) {
    const { content } = ctx.request.body;
    /** 校验发布内容是否为空 */
    if (!content) {
      const error = new Error("动态内容不能为空");
      return ctx.app.emit("error", error, ctx);
    }
    try {
      /** 发布内容,向数据库中添加数据 */
      await momentService.create({
        content,
        userId: ctx.user.id,
      });
      /** 发布成功 */
      ctx.body = {
        code: 200,
        message: "发布成功",
      };
      await next();
    } catch (err) {
      const error = new Error("发布失败,请稍后重试");
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 获取动态详情 */
  async getMomentDetail(ctx, next) {
    const res = await momentService.momentDetail(ctx.params.id);
    if (!res) {
      const error = new Error("动态不存在");
      return ctx.app.emit("error", error, ctx);
    }
    ctx.body = res;
    await next();
  }

  /** 获取分页数据 */
  async getMomentList(ctx, next) {
    const { pageSize, pageNum } = ctx.query;
    if (!pageSize || !pageNum) {
      const error = new Error("请检查参数");
      return ctx.app.emit("error", error, ctx);
    }

    try {
      const res = await momentService.momentPage({ pageSize, pageNum });
      ctx.body = {
        code: 200,
        message: "获取成功",
        data: res,
      };
      await next();
    } catch (err) {
      const error = new Error("获取失败,请稍后重试");
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 更新动态 */
  async updateMoment(ctx, next) {
    const params = ctx.request.body;
    try {
      await momentService.updated(params);
      ctx.body = {
        code: 200,
        message: "更新成功",
      };
      await next();
    } catch (err) {
      const error = new Error("更新失败");
      return ctx.app.emit("error", error, ctx);
    }
  }

  /** 删除动态 */
  async deleteComment(ctx, next) {
    const { id } = ctx.params;
    try {
      await momentService.delete(id);
      ctx.body = { code: 200, message: "删除成功" };
      await next();
    } catch (err) {
      const error = new Error("删除失败");
      return ctx.app.emit("error", error, ctx);
    }
  }
}

module.exports = new MomentController();
