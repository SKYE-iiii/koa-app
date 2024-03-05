const { errorTypeEnum } = require("../utils/enumList");
const errorHandler = (error, ctx) => {
  const { message, status } = errorTypeEnum[error.message];
  ctx.body = message;
  ctx.status = status;
};

module.exports = errorHandler;
