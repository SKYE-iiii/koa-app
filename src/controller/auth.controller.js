/*
 * @Description:
 * @Author: zyj
 * @Date: 2024-03-06 16:34:48
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 14:35:11
 * @FilePath: \koa-app\src\controller\auth.controller.js
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    /** 生成token */
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: "1h",
      algorithm: "RS256",
    });
    ctx.body = {
      success: true,
      message: "登录成功",
      data: { id, name, token },
    };
  }

  async permissionList(ctx, next) {
    ctx.body = {
      code: 200,
      data: ["user", "admin"],
      message: "获取权限列表成功",
    };
    await next();
  }
}

module.exports = new AuthController();
