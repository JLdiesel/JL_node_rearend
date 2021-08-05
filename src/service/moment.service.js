const connection = require('../app/database');
class MomentService {
  async create(userID, content, title, status) {
    const statement =
      'INSERT INTO `moment` (content,user_id,title,status) VALUES(?,?,?,?);';
    const result = await connection.execute(statement, [
      content,
      userID,
      title,
      status
    ]);

    return result;
  }
  //通过用户id查询其发表的文章
  async getMomentByUserId(id) {
    const statement =
      'SELECT user_id userId,JSON_ARRAYAGG(JSON_OBJECT("momentId",id,"content",content,"title",title,"cover",picture,"createAt",createAt)) contentArr FROM moment GROUP BY user_id HAVING user_id=?;';
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  //查找文章列表
  async getMomentList(offset, size, status) {
    const statement = `
            SELECT m.id id,m.content content,m.title title,m.createAt createTime,m.updateAt updateTime,m.status status,
            JSON_OBJECT('id',u.id,'nickName',u.nickName,"avatar",u.avatar_url) user,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentCount,
            (SELECT COUNT(*) FROM moment_tag mt WHERE mt.moment_id=m.id) tagCount,
             (SELECT JSON_ARRAYAGG(CONCAT('http://192.168.50.146:3000/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images 
            FROM moment m
            LEFT JOIN user u ON m.user_id =u.id
            where m.status=?
						  LIMIT ?,? ;`;
    const result = await connection.execute(statement, [status, offset, size]);
    return result[0];
  }
  //查找一篇文章所有的信息
  async getMomentByMomentId(momentId) {
    const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,m.title title,m.picture cover,m.status status,
        IF(COUNT(t.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',t.id,'name',t.name)
        ),null) tags,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,
        'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url))
        ) ,NULL) 
				FROM comment c
				LEFT JOIN user cu ON c.user_id=cu.id
				LEFT JOIN recomment rec ON c.id=rec.id
				WHERE m.id=c.moment_id ) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://192.168.50.146:3000/moment/images',file.filename)) FROM file WHERE m.id=file.moment_id) images 
        FROM moment m
        LEFT JOIN user u ON m.user_id =u.id
        LEFT JOIN moment_tag mt ON m.id=mt.moment_id
        LEFT JOIN tag t ON mt.tag_id=t.id
        WHERE m.id=?
        GROUP BY m.id;
`;
    const result = await connection.execute(statement, [momentId]);
    return result[0][0];
  }
  //更新文章内容
  async updateById(content, id) {
    const statement = `UPDATE moment SET content =? WHERE id =?`;
    const result = await connection.execute(statement, [content, id]);
    return result[0];
  }
  //删除文章
  async deleteById(id) {
    const statement = `DELETE FROM moment WHERE id=?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  //判断是否含有tag
  async hasTag(momentId, tagId) {
    const statement = `SELECT * FROM moment_tag WHERE moment_id =? AND tag_id=?`;
    const result = await connection.execute(statement, [momentId, tagId]);
    return result[0].length ? true : false;
  }
  //为文章添加标签
  async addTag(momentId, tagId) {
    const statement = `INSERT INTO moment_tag (moment_id,tag_id) VALUES(?,?)`;
    const result = await connection.execute(statement, [momentId, tagId]);
    return result[0];
  }
  //更改文章封面图
  async updatePictureById(fileUrl, momentId) {
    const statement = `UPDATE moment SET picture =? where id = ?`;
    const [result] = await connection.execute(statement, [fileUrl, momentId]);
    return result[0];
  }
}

module.exports = new MomentService();
