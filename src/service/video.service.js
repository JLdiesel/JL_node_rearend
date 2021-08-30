const connection = require('../app/database');

class VideoService {
  async updateAvatarUrlById(avatarUrl, videoId) {
    try {
      const statement = `update video set avatar =? where id =?`;
      const [result] = await connection.execute(statement, [
        avatarUrl,
        videoId
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async createVideo(title, status, ezcontent) {
    try {
      const statement = `Insert into video (title,status,ezcontent) values (?,?,?)  `;
      const [result] = await connection.execute(statement, [
        title,
        status,
        ezcontent
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getVideoListBystatus(status, offset, top) {
    try {
      const statement = `SELECT  v.id id,v.title title,v.avatar avatar ,v.watchNum watchNum,v.createAt createAt,v.status status,JSON_ARRAYAGG(t.name) tag,
    v.ezcontent ezcontent
FROM video v 
LEFT JOIN video_tag vt on v.id=vt.video_id
left JOIN tag t ON vt.tag_id=t.id  
WHERE v.status=?
GROUP BY v.id
LIMIT ?,? ;`;
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
  //判断是否含有tag
  async hasTag(videoId, tagId) {
    try {
      const statement = `SELECT * FROM video_tag WHERE video_id =? AND tag_id=?`;
      const result = await connection.execute(statement, [videoId, tagId]);
      return result[0].length ? true : false;
    } catch (error) {
      return error;
    }
  }
  //为文章添加标签
  async addTag(videoId, tagId) {
    try {
      const statement = `INSERT INTO video_tag (video_id,tag_id) VALUES(?,?)`;
      const result = await connection.execute(statement, [videoId, tagId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getVideoInnerById(videoId) {
    try {
      const statement = `SELECT v.title title , v.watchNum watchNum  , v.avatar avatar ,CONCAT('http://120.79.86.32:3000/video/',vf.video_id,'/file') video,vf.likeNum likeNum,vf.collectionNum collectionNum,vf.createAt createAt

FROM video_file  vf
LEFT JOIN video v ON  vf.video_id=v.id 
WHERE vf.video_id=?`;
      const [result] = await connection.execute(statement, [videoId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getVideoCommentById(videoId) {
    try {
      const statement = `	SELECT vc.content content,vc.createAt createAt,vc.id id,JSON_OBJECT("nickName",u.nickName,"avatar",u.avatar_url,"id",u.id) user ,
	(SELECT  JSON_ARRAYAGG(JSON_OBJECT("id",vr.id,"content",vr.content,"createAt",vr.createAt,"user",JSON_OBJECT("nickName",us.nickName,"avatar",us.avatar_url,"id",us.id)))
from video_recomment vr
LEFT JOIN user us on  vr.user_id=us.id
WHERE vc.id=vr.video_comment_id
)  recomment 
	from video_comment vc
	LEFT JOIN user u ON  vc.user_id=u.id
	WHERE vc.video_id =?`;
      const [result] = await connection.execute(statement, [videoId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getVideoList() {
    const statement = `SELECT JSON_OBJECT("totalCount",COUNT(id),"list",JSON_ARRAYAGG(JSON_OBJECT("id",id,"title",title,"avatar",avatar,"watchNum",watchNum,"createAt",createAt,"ezcontent",ezcontent,"status",status)) ) data FROM video`;
    const [result] = await connection.execute(statement);
    return result;
  }
  async updateById(id, title, ezcontent, status) {
    const statement = `INSERT INTO video (id,title, ezcontent, status) VALUES
    (?,?,?,?)
ON DUPLICATE KEY UPDATE title=VALUES(title), ezcontent=VALUES(ezcontent), status=VALUES(status); `;
    const [result] = await connection.execute(statement, [
      id,
      title,
      ezcontent,
      status
    ]);
    return result[0];
  }
  async removeById(videoId) {
    const statement = `delete from video where id=?`;
    const result = await connection.execute(statement, [videoId]);
    return result;
  }
}

module.exports = new VideoService();
