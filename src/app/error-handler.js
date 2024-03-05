const { userErrorTypeEnum } = require("../utils/enumList");
const errorHandler = (error, ctx) => {
  const errorItem = userErrorTypeEnum[error.message] || {
    message: error.message,
    status: 500,
  };
  ctx.body = errorItem.message;
  ctx.status = errorItem.status;
};

module.exports = errorHandler;
