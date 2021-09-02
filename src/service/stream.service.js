const connection = require('../app/database');
class StreamService {
  async createStream(userId, name, token, cannalName, status) {
    try {
      const statement = `insert into stream (user_id,name,token,cannalName, status) values(?,?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        userId,
        name,
        token,
        cannalName,
        status
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async createFile(filename, mimetype, size, insertId) {
    try {
      const statement = `insert into stream_cover (filename,mimetype,size,stream_id) values(?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        insertId
      ]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateAvatar(fileUrl, insertId) {
    try {
      const statement = `update stream set avatar = ? where id=?`;
      const [result] = await connection.execute(statement, [fileUrl, insertId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getFileByFilename(filename) {
    try {
      const statement = `select * from stream_cover where filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getStreamListBystatus(offset, top, status) {
    try {
      const statement = `SELECT  st.id id ,st.avatar avatar ,st.name name,st.token token,st.cannalName cannalName,
	JSON_OBJECT("nickName",u.nickName,"avatar",u.avatar_url) user
	from stream 	st
	LEFT JOIN user u on u.id=st.user_id
   where status=?
	group by st.id
  limit ?,?`;
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

  async quitStream(streamId) {
    try {
      const statement = `delete from stream where id=?`;
      const [result] = await connection.execute(statement, [streamId]);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new StreamService();
