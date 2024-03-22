/*
 * @FileDescription: 用户服务 - 数据库操作
 * @Author: zyj
 * @Date: 2024-03-04 10:30:37
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-12 10:49:35
 * @FilePath: \koa-app\src\service\user.service.js
 * @Description:
 */

const connections = require("../app/database");

/** 向数据库中添加数据 */
class UserService {
  async create({ name, password }) {
    /** 将用户数据保存至数据库中 */
    const statement = `INSERT INTO users (name,password) VALUES (?,?); `;
    const result = await connections.execute(statement, [name, password]);
    console.log(result, "result");
    /** 返回数据 */
    return result;
  }

  /** 根据用户名查用户数据 */
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connections.execute(statement, [name]);

    return result[0];
  }
}

module.exports = new UserService();
