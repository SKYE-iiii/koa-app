const { isEmpty } = require("../utils/index");
const { NAME_OR_PASSWORD_IS_REQUIRED } = require("../constants/error-types");

const judgingEmpty = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  /** 判空 */
  if (isEmpty(name) || isEmpty(password)) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};
module.exports = {
  judgingEmpty,
};
