class userService {
  async create(userData) {
    /** 将用户数据保存至数据库中 */
    /** 返回数据 */
    return {
      msg: "用户数据创建成功",
      data: userData,
    };
  }
}

module.exports = new userService();
