const connection = require('../app/database');
class CommentService {
  async create(momentId, content, userId) {
    try{
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      content,
      momentId,
      userId
    ]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async reply(content, userId, commentId) {try{
    const statement = `INSERT INTO recomment (user_id,comment_id,content) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      userId,
      commentId,
      content
    ]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async getRecomment(commentId) {try{
    const statement = `SELECT IF(count(rec.id), JSON_ARRAYAGG(JSON_OBJECT("id",u.id,"avatar",u.avatar_url,"nickName",u.nickName,"content",rec.content,"createAt",rec.createAt)),null) recomment
            FROM comment c 
            left JOIN recomment rec ON c.id=rec.comment_id
            LEFT JOIN user u ON c.user_id=u.id
            WHERE c.id=?`;

    const result = await connection.execute(statement, [commentId]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async createVideoComment(videoId, content, userId) {try{
    const statement = `INSERT INTO video_comment (content,video_id,user_id) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      content,
      videoId,
      userId
    ]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async replyVideoComment(content, userId, commentId) {try{
    const statement = `INSERT INTO video_recomment (user_id,video_comment_id,content) VALUES(?,?,?)`;
    const result = await connection.execute(statement, [
      userId,
      commentId,
      content
    ]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async getVideoRecomment(videoCommentId) {try{
    const statement = `SELECT IF(count(rec.id), JSON_ARRAYAGG(JSON_OBJECT("id",u.id,"avatar",u.avatar_url,"nickName",u.nickName,"content",rec.content,"createAt",rec.createAt)),null) recomment
            FROM video_comment c 
            left JOIN video_recomment rec ON c.id=rec.video_comment_id
            LEFT JOIN user u ON c.user_id=u.id
            WHERE c.id=?`;

    const result = await connection.execute(statement, [videoCommentId]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async update(commentId, content) {try{
    const statement = `UPDATE comment SET content=? WHERE id=?`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async remove(commentId) {try{
    const statement = `DELETE FROM comment where id=?`;
    const result = await connection.execute(statement, [commentId]);
    return result[0]; } catch (error) {
      return error
    }
  }
  async getCommentByMomentId(momentId) {try{
    // id,content,comment_id commentId
    const statement = `SELECT *  from comment  where moment_id =?; `;
    const result = await connection.execute(statement, [momentId]);
    return result[0]; } catch (error) {
      return error
    }
  }
}

module.exports = new CommentService();
