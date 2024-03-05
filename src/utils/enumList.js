const errorTypeEnum = {
  name_or_password_is_required: {
    message: "用户名和密码不能为空!",
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
};

module.exports = {
  errorTypeEnum,
};
