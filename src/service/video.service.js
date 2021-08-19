const connection = require('../app/database');

class VideoService {
  async updateAvatarUrlById(avatarUrl, videoId) {
    const statement = `update video set avatar =? where id =?`;
    const [result] = await connection.execute(statement, [avatarUrl, videoId]);
    return result;
  }

  async createVideo(title, status,ezcontent) {
    const statement = `Insert into video (title,status,ezcontent) values (?,?,?)  `;
    const [result] = await connection.execute(statement, [title, status,ezcontent]);
    return result;
  }
  async getVideoListBystatus(status, offset, top) {
    const statement = `SELECT  v.id id,v.title title,v.avatar avatar ,v.watchNum watchNum,v.createAt createAt,v.status status,JSON_ARRAYAGG(t.name) tag,
    v.ezcontent ezcontent
FROM video v 
LEFT JOIN video_tag vt on v.id=vt.video_id
left JOIN tag t ON vt.tag_id=t.id  
WHERE v.status=?
GROUP BY v.id
LIMIT ?,? ;`;
    const [result] = await connection.execute(statement, [status, offset, top]);
    return result;
  }
  //判断是否含有tag
  async hasTag(videoId, tagId) {
    const statement = `SELECT * FROM video_tag WHERE video_id =? AND tag_id=?`;
    const result = await connection.execute(statement, [videoId, tagId]);
    return result[0].length ? true : false;
  }
  //为文章添加标签
  async addTag(videoId, tagId) {
    const statement = `INSERT INTO video_tag (video_id,tag_id) VALUES(?,?)`;
    const result = await connection.execute(statement, [videoId, tagId]);
    return result[0];
  }
  async getVideoInnerById(videoId) {
    const statement = `SELECT v.title title , v.watchNum watchNum  , v.avatar avatar ,CONCAT('http://120.79.86.32:3000/video/',vf.video_id,'/file') video,vf.likeNum likeNum,vf.collectionNum collectionNum,vf.createAt createAt

FROM video_file  vf
LEFT JOIN video v ON  vf.video_id=v.id 
WHERE vf.video_id=?`;
    const [result] = await connection.execute(statement, [videoId]);
    return result[0];
  }
  async getVideoCommentById(videoId) {
    const statement =`	SELECT vc.content content,vc.createAt createAt,vc.id id,JSON_OBJECT("nickName",u.nickName,"avatar",u.avatar_url,"id",u.id) user ,
	(SELECT  JSON_ARRAYAGG(JSON_OBJECT("id",vr.id,"content",vr.content,"createAt",vr.createAt,"user",JSON_OBJECT("nickName",us.nickName,"avatar",us.avatar_url,"id",us.id)))
from video_recomment vr
LEFT JOIN user us on  vr.user_id=us.id
WHERE vc.id=vr.video_comment_id
)  recomment 
	from video_comment vc
	LEFT JOIN user u ON  vc.user_id=u.id
	WHERE vc.video_id =?`
    const [result] =await connection.execute(statement, [videoId])
    return result
  }
}

module.exports = new VideoService();
