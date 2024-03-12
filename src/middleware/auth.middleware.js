const { USER_DOES_NOT_EXISTS } = require("../constants/error-types");
const userService = require("../service/user.service");

/** 校验登录账户密码 */
const verifyLogin = async (ctx, next) => {
  const { name } = ctx.request.body;
  /** 校验登录账户存在数据库中 */
  const result = await userService.getUserByName(name);
  const userInfo = result[0];
  if (!userInfo) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  console.log(userInfo, "userinfo");
  /** 校验登录账户与密码一致 */
  await next();
};

module.exports = {
  verifyLogin,
};
