const { isEmpty, validatePassword } = require("../utils/index");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
} = require("../constants/error-types");
const { md5Password } = require("../utils/handle-password");
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

/** 校验密码&&加密密码 */
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // /** 校验密码 */
  if (!validatePassword(password)) {
    const error = new Error("密码长度不能小于6位且必须包含大小写字母");
    return ctx.app.emit("error", error, ctx);
  }
  /** 加密密码 */
  ctx.request.body.password = md5Password(password);
  console.log(ctx.request.body.password, "ctx.request.body.password ");
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
