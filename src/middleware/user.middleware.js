const { isEmpty } = require("../utils/index");

/** 校验用户信息 */
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  /** 判空 */
  if (!isEmpty(name) || !isEmpty(password)) {
    const error = new Error("用户名或密码不能为空!");
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyUser,
};
 