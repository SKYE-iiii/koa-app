const connections = require("../app/database");
/** 向数据库中添加数据 */
class userService {
  async create({ name, password }) {
    /** 将用户数据保存至数据库中 */
    const statement = `INSERT INTO users (name,pwd) VALUES (?,?); `;
    const result = await connections.execute(statement, [name, password]);
    /** 返回数据 */
    return result;
  }
}

module.exports = new userService();
