class AuthController {
  async login(ctx, next) {
    const { name } = ctx.request.body;
    ctx.body = `${name}登陆成功`;
  }
}

module.exports = new AuthController();
