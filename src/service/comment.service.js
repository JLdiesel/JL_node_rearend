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
  async reply(content, userId, commentId) {
    const statement = `INSERT INTO recomment (user_id,comment_id,content) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      userId,
      commentId,
      content
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
  async getRecomment(commentId) {
    const statement = `SELECT IF(count(rec.id), JSON_ARRAYAGG(JSON_OBJECT("id",u.id,"avatar",u.avatar_url,"nickName",u.nickName,"content",rec.content,"createAt",rec.createAt)),null) recomment
            FROM comment c 
            left JOIN recomment rec ON c.id=rec.comment_id
            LEFT JOIN user u ON c.user_id=u.id
            WHERE c.id=?`;

    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }
}

module.exports = new CommentService();
