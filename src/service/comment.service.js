const connection = require('../app/database');
class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId
    ]);
    return result[0];
  }
  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?)`;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId,
      commentId
    ]);
    return result[0];
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content=? WHERE id=?`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0];
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment where id=?`;
    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }
  async getCommentByMomentId(momentId) {
    // id,content,comment_id commentId
    const statement = `SELECT *  from comment  where moment_id =?; `;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async createPic() {}
}

module.exports = new CommentService();
