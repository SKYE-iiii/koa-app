const jwt = require("jsonwebtoken");
const {
  USER_DOES_NOT_EXISTS,
  ACCOUNT_OR_PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
  UN_PERMISSION,
} = require("../constants/error-types");
const { md5Password } = require("../utils/handle-password");
const userService = require("../service/user.service");
const AuthService = require("../service/auth.service");
const { PUBLIC_KEY } = require("../app/config");

/** 校验登录账户密码 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  /** 校验登录账户存在数据库中 */
  const result = await userService.getUserByName(name);
  const userInfo = result[0];
  if (!userInfo) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  /** 校验登录账户与密码一致 */
  const md5Pwd = md5Password(password);
  if (userInfo.password !== md5Pwd) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = userInfo;
  await next();
};

/** 验证token */
const verifyToken = async (ctx, next) => {
  const authorization = ctx.request.headers.authorization;
  if (!authorization) {
    const error = new Error(INVALID_TOKEN);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = res;
    await next();
  } catch (err) {
    const error = new Error(INVALID_TOKEN);
    return ctx.app.emit("error", error, ctx);
  }
};

/** 验证权限 */
const verifyAuthor = (keyword) => {
  return async (ctx, next) => {
    /** 获取当前登陆人的数据 */
    const { id: userId } = ctx.user;
    /** 获取动态id */
    const params = ctx.request.body.id ? ctx.request.body : ctx.params;

    /** 查询是否具备权限 */
    try {
      const hasPermission = await AuthService.checkPermission(
        keyword,
        params.id,
        userId
      );
      if (!hasPermission) throw new Error();
      await next();
    } catch (err) {
      const error = new Error(UN_PERMISSION);
      return ctx.app.emit("error", error, ctx);
    }
  };
};

module.exports = {
  verifyLogin,
  verifyToken,
  verifyAuthor,
};
