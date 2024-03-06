class authController {
  async login(ctx, next) {
    console.log(ctx.request.body);
    ctx.body = "登录接口";
  }
}

module.exports = new authController();
