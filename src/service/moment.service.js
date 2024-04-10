/*
 * @Description:
 * @Author: zyj
 * @Date: 2024-03-22 15:06:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-10 10:11:23
 * @FilePath: \koa-app\src\service\moment.service.js
 */
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
  /** 根据动态id获取动态详情+评论 */
  async momentDetailWithComment(id) {
    console.log(id, "i");
    const statement = `
      SELECT
	        m.id id,
	        m.content content,
	        m.createTime createTime,
	        m.updateTime updateTime,
	        JSON_OBJECT( 'id', u.id, 'name', u.name ) user_data,
	        JSON_ARRAYAGG(
		        JSON_OBJECT(
			        'id',
			        c.id,
			        'content',
			        c.content,
			        'commentId',
			        c.comment_id,
			        'createTime',
			        c.createTime,
			        'user',
		          JSON_OBJECT( 'id', cu.id, 'name', cu.name )
            )
          ) commentList
      FROM
	      moments m
	      LEFT JOIN users u ON m.user_id = u.id
	      LEFT JOIN comment c ON m.id = c.moment_id
	      LEFT JOIN users cu ON c.user_id = cu.id 
      WHERE
        m.id = ?
      GROUP BY m.id;`;

    try {
      const result = await connections.execute(statement, [id]);
      return result[0][0];
    } catch (error) {
      console.log(error, "error");
    }
  }

  /**
   * 获取动态列表
   * tips : LIMIT 子句不能使用占位符?.
   */
  async momentPage({ pageSize, pageNum }) {
    const startNum = (pageNum - 1) * pageSize;
    const endNum = pageNum * pageSize;
    const statement = `
    SELECT
	    m.id id,
	    m.content content,
	    m.createTime createTime,
	    m.updateTime updateTime,
	    JSON_OBJECT( 'id', u.id, 'name', u.name ) user_data , 
	    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount 
    FROM
	    moments m
	    LEFT JOIN users u ON m.user_id = u.id 
	  LIMIT ${startNum},${endNum};`;
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
