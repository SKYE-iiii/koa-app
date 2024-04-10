/*
 * @Description: 评论 - 服务
 * @Author: zyj
 * @Date: 2024-04-01 14:37:24
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-09 10:02:35
 * @FilePath: \koa-app\src\service\comment.service.js
 */

const connections = require("../app/database");

class CommentService {
  /** 创建回复评论 */
  async create(content, moment_id, user_id, comment_id = null) {
    const statement = `
    INSERT INTO COMMENT ( content, moment_id, user_id, comment_id )
    VALUES
      (?,?,?,?)`;

    const result = await connections.execute(statement, [
      content,
      moment_id,
      user_id,
      comment_id,
    ]);
    return result[0];
  }

  /** 修改评论 */
  async update(id, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const result = await connections.execute(statement, [content, id]);
    return result[0];
  }

  /** 删除评论 */
  async remove(id) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const result = await connections.execute(statement, [id]);
    return result[0];
  }

  /** 查询动态详情- 评论列表 */
  async commentListByMomentId(momentId) {
    const statement = `SELECT * FROM comment WHERE moment_id = ?;`;
    const result = await connections.execute(statement, [momentId]);
    return result[0];
  }
}

module.exports = new CommentService();
