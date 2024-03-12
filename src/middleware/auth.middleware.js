const {
  USER_DOES_NOT_EXISTS,
  ACCOUNT_OR_PASSWORD_IS_INCORRECT,
} = require("../constants/error-types");
const { md5Password } = require("../utils/handle-password");
const userService = require("../service/user.service");

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
  await next();
};

module.exports = {
  verifyLogin,
};
