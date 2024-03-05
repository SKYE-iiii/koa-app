const { isEmpty } = require("../utils/index");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
} = require("../constants/error-types");
const userService = require("../service/user.service");

/** 校验用户信息 */
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  /** 判空 */
  if (isEmpty(name) || isEmpty(password)) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  /** 校验用户名唯一性 */
  const userInfo = await userService.getUserByName(name);
  if (userInfo.length) {
    const error = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyUser,
};
