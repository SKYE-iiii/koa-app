const connections = require("../app/database");

const fragmentStatement = `
    SELECT
      m.id id,
      m.content content,
      m.createTime createTime,
      m.updateTime updateTime,
      JSON_OBJECT( 'id', u.id, 'name', u.name ) user_data 
    FROM
      moments m
      LEFT JOIN users u ON m.user_id = u.id 
`;
class MomentService {
  /** 添加动态语句 */
  async create({ content, userId }) {
    const statement = `INSERT INTO moments (content,user_id) VALUES (?,?);`;
    const result = await connections.execute(statement, [content, userId]);
    return result;
  }

  /** 根据动态id获取动态详情 */
  async momentDetail(id) {
    const statement = `
   ${fragmentStatement}
    WHERE
      m.id = ?;`;
    const result = await connections.execute(statement, [id]);
    return result[0][0];
  }

  /**
   * 获取动态列表
   * tips : LIMIT 子句不能使用占位符?.
   */
  async momentPage({ pageSize, pageNum }) {
    const startNum = (pageNum - 1) * pageSize;
    const endNum = pageNum * pageSize;
    const statement = `
    ${fragmentStatement}
    LIMIT ${startNum},${endNum}; `;
    const result = await connections.execute(statement);
    return result[0];
  }

  /** 更新动态 */
  async updated({ content, id }) {
    const statement = `  UPDATE moments SET content = ? WHERE id = ?;`;
    const result = await connections.execute(statement, [content, id]);
    return result;
  }

  /** 删除动态 */
  async delete(id) {
    const statement = `DELETE FROM moments WHERE id = ?; `;
    const result = await connections.execute(statement, [id]);
    return result;
  }
}

module.exports = new MomentService();
