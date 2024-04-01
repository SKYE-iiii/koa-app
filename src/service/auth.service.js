/*
 * @Description: 权限
 * @Author: zyj
 * @Date: 2024-04-01 10:08:51
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 11:16:40
 * @FilePath: \koa-app\src\service\auth.service.js
 */
const connections = require("../app/database");

class AuthService {
  /** 验证动态权限 */
  async checkMoment(id, userId) {
    const statement = `SELECT * FROM moments WHERE id = ? AND userId = ?;`;
    const result = await connections.execute(statement, [id, userId]);
    return result[0].length > 0;
  }
}

module.exports = new AuthService();
