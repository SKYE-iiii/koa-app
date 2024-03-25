/*
 * @Description: moment 中间件
 * @Author: zyj
 * @Date: 2024-03-25 15:14:03
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-25 15:54:01
 * @FilePath: \koa-app\src\middleware\moment.middleware.js
 */
const momentService = require("../service/moment.service");
/** 验证发布人 */
const verifyAuthor = async (ctx, next) => {
  /** 获取要修改的动态数据 */
  const { id } = ctx.request.body;
  const moment = await momentService.momentDetail(id);
  if (!moment) {
    const error = new Error("动态不存在");
    return ctx.app.emit("error", error, ctx);
  }
  /** 获取当前登陆人的数据 */
  const { id: userId } = ctx.user;
  /** 验证是否是发布人 */
  if (moment.user_data.id !== userId) {
    const error = new Error("没有权限");
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyAuthor,
};
