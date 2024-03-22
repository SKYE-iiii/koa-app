/*
 * @Description:
 * @Author: zyj
 * @Date: 2024-03-05 15:15:32
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-22 11:43:19
 * @FilePath: \koa-app\src\utils\enum-config.js
 */
const userErrorTypeEnum = {
  name_or_password_is_required: {
    message: "用户名和密码不能为空!",
    status: 400,
  },
  name_or_password_is_incorrect: {
    message: "用户名或密码错误!",
    status: 400,
  },
  user_already_exists: {
    message: "用户已存在",
    status: 409,
  },
  user_does_not_exists: {
    message: "用户不存在",
    status: 409,
  },
  account_or_password_is_incorrect: {
    message: "账户或密码错误",
    status: 400,
  },
  not_found: {
    message: "资源不存在",
    status: 404,
  },
  internal_server_error: {
    message: "服务器错误",
    status: 500,
  },
  invalid_token: {
    message: "无效token",
    status: 401,
  },
};

module.exports = {
  userErrorTypeEnum,
};
