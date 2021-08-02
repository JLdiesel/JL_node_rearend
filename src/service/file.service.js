const connection = require('../app/database');

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?)`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ]);
    return result[0];
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id=?`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `insert into file (filename,mimetype,size,user_id,moment_id) values (?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId
    ]);
    return result[0];
  }
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}
module.exports = new FileService();
