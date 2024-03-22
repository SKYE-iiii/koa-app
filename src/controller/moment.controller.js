/*
 * @Description: moment控制器
 * @Author: zyj
 * @Date: 2024-03-22 14:15:29
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-22 15:41:30
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
}

module.exports = new MomentController();
