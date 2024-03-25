const connections = require("../app/database");

class MomentService {
  /** 添加动态语句 */
  async create({ content, userId }) {
    const statement = `INSERT INTO moments (content,userId) VALUES (?,?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result;
  }

  /** 根据动态id获取动态详情 */
  async momentDetail(id) {
    const statement = `
    SELECT
      m.id id,
      m.content content,
      m.createTime createTime,
      m.updateTime updateTime,
      JSON_OBJECT( 'id', u.id, 'name', u.name ) user_data 
    FROM
      moments m
      LEFT JOIN users u ON m.userId = u.id 
    WHERE
      m.id = ?;`;

    const result = await connections.execute(statement, [id]);
    return result[0][0];
  }
}

module.exports = new MomentService();
