/*
 * @Description: 
 * @Author: zyj
 * @Date: 2024-03-04 16:14:06
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-02 16:35:37
 * @FilePath: \koa-app\src\app\error-handler.js
 */
const { userErrorTypeEnum } = require("../utils/enum-config");
const errorHandler = (error, ctx) => {
  const errorItem = userErrorTypeEnum[error.message] || {
    message: error.message,
    status: 500,
  };
  ctx.body = errorItem.message;
  ctx.status = errorItem.status;
};

module.exports = errorHandler;
