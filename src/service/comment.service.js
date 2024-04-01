/*
 * @Description: 评论 - 服务
 * @Author: zyj
 * @Date: 2024-04-01 14:37:24
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-01 15:11:52
 * @FilePath: \koa-app\src\service\comment.service.js
 */

const connections = require("../app/database");

class CommentService {
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
}

module.exports = new CommentService();
