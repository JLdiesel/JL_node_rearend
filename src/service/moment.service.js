const connection = require('../app/database');
class MomentService {
  async create(userID, content, title, status, ezcontent) {
    try {
      const statement =
        'INSERT INTO `moment` (content,user_id,title,status,ezcontent) VALUES(?,?,?,?,?);';
      const result = await connection.execute(statement, [
        content,
        userID,
        title,
        status,
        ezcontent
      ]);

      return result;
    } catch (error) {
      return error;
    }
  }
  //通过用户id查询其发表的文章
  async getMomentByUserId(id) {
    try {
      const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT("momentId",id,"content",content,"title",title,"cover",picture,"createAt",createAt,"music",music,"label",label,"images", (SELECT JSON_ARRAYAGG(CONCAT("http://120.79.86.32:3000/moment/images/",file.filename)) FROM file WHERE m.id=file.moment_id))) contentArr
	FROM moment m
where user_id=? and status=0`;
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      return error;
    }
  }

  //查找文章列表
  async getMomentList(offset, size, status) {
    try {
      const statement = `
            SELECT m.id id,m.content content,m.title title,m.createAt createTime,m.updateAt updateTime,m.status status,m.music music,m.label label,
            m.picture picture,m.music music,m.label label,
            JSON_OBJECT('id',u.id,'nickName',u.nickName,"avatar",u.avatar_url) user,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentCount,
						IF(COUNT(t.id),JSON_ARRAYAGG(
							JSON_OBJECT('id',t.id,'name',t.name)
							),null) tags,
             (SELECT JSON_ARRAYAGG(CONCAT('http://120.79.86.32:3000/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images 
            FROM moment m
            LEFT JOIN user u ON m.user_id =u.id
						 LEFT JOIN moment_tag mt ON m.id=mt.moment_id
						LEFT JOIN tag t ON mt.tag_id=t.id
            where m.status=?
						GROUP BY m.id
						  LIMIT ?,? ;`;
      const result = await connection.execute(statement, [
        status,
        offset,
        size
      ]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //查找一篇文章所有的信息
  async getMomentByMomentId(momentId) {
    try {
      const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,m.title title,m.picture cover,m.music music,m.label label,
JSON_OBJECT('id',u.id,'nickName',u.nickName,'avatarUrl',u.avatar_url) user,
IF(COUNT(t.id),JSON_ARRAYAGG(
JSON_OBJECT('id',t.id,'name',t.name)
),null) tags,
(SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,
        'user',JSON_OBJECT('id',cu.id,'nickName',cu.nickName,'avatarUrl',cu.avatar_url),'reply',JSON_OBJECT("id",rec.id,"content",rec.content,"createAt",rec.createAt,"avatar",cu.avatar_url,"uid",cu.id,"nickName",cu.nickName)
        )) ,NULL) 
				FROM comment c
				LEFT JOIN recomment rec ON c.id=rec.comment_id
				LEFT JOIN user cu ON c.user_id=cu.id
				WHERE m.id= c.moment_id  ) comments,
 (SELECT JSON_ARRAYAGG(CONCAT('http://120.79.86.32:3000/moment/images/',file.filename)) FROM file WHERE m.id=file.moment_id) images 
  FROM moment m
  LEFT JOIN user u ON m.user_id =u.id
  LEFT JOIN moment_tag mt ON m.id=mt.moment_id
  LEFT JOIN tag t ON mt.tag_id=t.id
  WHERE m.id=?
`;
      const [result] = await connection.execute(statement, [momentId]);
      console.log(result);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //更新文章内容
  async updateById(content, id, title, ezcontent) {
    try {
      const statement = `INSERT INTO moment (id,content, ezcontent
        , title) VALUES
    (?,?,?,?)
ON DUPLICATE KEY UPDATE content=VALUES(content), ezcontent=VALUES(ezcontent), title=VALUES(title) `;
      const result = await connection.execute(statement, [
        id,
        content,
        ezcontent,
        title
      ]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //删除文章
  async deleteById(id) {
    try {
      const statement = `DELETE FROM moment WHERE id=?`;
      const result = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //判断是否含有tag
  async hasTag(momentId, tagId) {
    try {
      const statement = `SELECT * FROM moment_tag WHERE moment_id =? AND tag_id=?`;
      const result = await connection.execute(statement, [momentId, tagId]);
      return result[0].length ? true : false;
    } catch (error) {
      return error;
    }
  }
  //为文章添加标签
  async addTag(momentId, tagId) {
    try {
      const statement = `INSERT INTO moment_tag (moment_id,tag_id) VALUES(?,?)`;
      const result = await connection.execute(statement, [momentId, tagId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //更改文章封面图
  async updatePictureById(fileUrl, momentId) {
    try {
      const statement = `UPDATE moment SET picture =? where id = ?`;
      const [result] = await connection.execute(statement, [fileUrl, momentId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateMusicById(fileUrl, momentId) {
    try {
      const statement = `UPDATE moment SET music =? where id = ?`;
      const [result] = await connection.execute(statement, [fileUrl, momentId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateLabel(momentId) {
    try {
      const statement = `update moment set label =1 where id=?`;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async createByStatus(content, ezcontent, title, status) {
    try {
      const statement = `insert into moment (content,ezcontent,title,status) values(?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        content,
        ezcontent,
        title,
        status
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getListByStatus(status, offset, top) {
    try {
      const statement = `SELECT 	m.id id,m.content content,m.title title,m.picture picurl,m.ezcontent 
ezcontent 
FROM moment m WHERE status=? LIMIT ?,?`;
      const [result] = await connection.execute(statement, [
        status,
        offset,
        top
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getMomentListB() {
    const statement = `SELECT JSON_OBJECT("totalCount",COUNT(id),"list",JSON_ARRAYAGG(JSON_OBJECT("id",id,"content",content,"title",title,"createAt",createAt,"updateAt",updateAt,"ezcontent",ezcontent,"picture",picture)) ) data  FROM moment `;
    const [result] = await connection.execute(statement);
    return result;
  }
  async updateByMomentId(content, momentId, title, ezcontent, picture) {
    try {
      const statement = `INSERT INTO user (id,content, title, ezcontent,picture) VALUES
    (?,?,?,?,?)
ON DUPLICATE KEY UPDATE content=VALUES(content), title=VALUES(title), ezcontent=VALUES(ezcontent), picture=VALUES(picture); `;
      const [result] = await connection.execute(statement, [
        momentId,
        content,
        title,
        ezcontent,
        picture
      ]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
}

module.exports = new MomentService();
