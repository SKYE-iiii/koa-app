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
  not_found: {
    message: "资源不存在",
    status: 404,
  },
  internal_server_error: {
    message: "服务器错误",
    status: 500,
  },
};

module.exports = {
  userErrorTypeEnum,
};
