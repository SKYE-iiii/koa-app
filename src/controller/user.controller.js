const userService = require("../service/user.service");

class userController {
  async create(ctx, next) {
    /** 获取用户请求数据 */
    const userData = ctx.request.body;
    /** 查询数据 */
    const { msg, data } = await userService.create(userData);
    /** 返回数据 */
    ctx.body = msg;
    console.log("用户数据创建成功", data);
  }
}

module.exports = new userController();
