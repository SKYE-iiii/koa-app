const userService = require("../service/user.service");

class userController {
  async create(ctx, next) {
    /** 获取用户请求数据 */
    const userData = ctx.request.body;
    console.log(userData,'userData');
    /** 查询数据 */
    const result = await userService.create(userData);
    /** 返回数据 */
    ctx.body = result;
    console.log("用户数据创建成功");
  }
}

module.exports = new userController();
