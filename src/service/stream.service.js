const connection = require('../app/database');
class StreamService {
  async createStream(userId, name, token, cannalName) {
    const statement = `insert into stream (user_id,name,token,cannalName) values(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      userId,
      name,
      token,
      cannalName
    ]);
    return result;
  }
  async createFile(filename, mimetype, size, insertId) {
    const statement = `insert into stream_cover (filename,mimetype,size,stream_id) values(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      insertId
    ]);
    return result[0];
  }
  async updateAvatar(fileUrl, insertId) {
    const statement = `update stream set avatar = ? where id=?`;
    const [result] = await connection.execute(statement, [fileUrl, insertId]);
    return result[0];
  }
  async getFileByFilename(filename) {
    const statement = `select * from stream_cover where filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
  async getStreamList(offset, top) {
    const statement = `select * from stream limit ?,?`;
    const [result] = await connection.execute(statement, [offset, top]);
    return result;
  }

  async quitStream(streamId) {
    const statement = `delete from stream where id=?`;
    const [result] = await connection.execute(statement, [streamId]);
    return result;
  }
}

module.exports = new StreamService();
