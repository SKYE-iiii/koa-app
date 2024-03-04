/*
 * @FileDescription: 用户服务
 * @Author: zyj
 * @Date: 2024-03-04 10:30:37
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-04 11:00:35
 * @FilePath: \koa-app\src\service\user.service.js
 * @Description:
 */

const connections = require("../app/database");
/** 向数据库中添加数据 */
class userService {
  async create({ name, password }) {
    /** 将用户数据保存至数据库中 */
    const statement = `INSERT INTO users (name,password) VALUES (?,?); `;
    const result = await connections.execute(statement, [name, password]);
    /** 返回数据 */
    return result;
  }
}

module.exports = new userService();
