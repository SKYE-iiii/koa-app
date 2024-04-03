/*
 * @Description: 评论 - 服务
 * @Author: zyj
 * @Date: 2024-04-01 14:37:24
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-03 14:05:28
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
}

module.exports = new CommentService();
