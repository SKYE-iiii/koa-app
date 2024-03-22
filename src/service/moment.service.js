const connections = require("../app/database");

class MomentService {
  /** 添加动态语句 */
  async create({ content, userId }) {
    const statement = `INSERT INTO moments (content,userId) VALUES (?,?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result;
  }
}

module.exports = new MomentService();
