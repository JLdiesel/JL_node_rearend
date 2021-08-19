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
  async createVideoAvatar(filename, mimetype, size, videoId) {
    const statement = `insert into video_avatar (filename,mimetype,size,video_id) values (?,?,?,?)`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      videoId
    ]);
    return result[0];
  }
  async createVideo(filename, mimetype, size, videoId) {
    const statement = `insert into video_file (filename,mimetype,size,video_id) values (?,?,?,?)`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      videoId
    ]);
    return result[0];
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id=?`;
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }
  async getAvatarByVideoId(videoId) {
    const statement = `SELECT * FROM video_avatar WHERE video_id=?`;
    const [result] = await connection.execute(statement, [videoId]);
    return result.pop();
  }
  async getVideoByVideoId(videoId) {
    const statement = `SELECT * FROM video_file WHERE video_id=?`;
    const [result] = await connection.execute(statement, [videoId]);
    return result.pop();
  }
  async createFile(filename, mimetype, size, momentId) {
    const statement = `insert into file (filename,mimetype,size,moment_id) values (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      momentId
    ]);
    return result[0];
  }
  async createShopBannerFile(filename, mimetype, size, shopId) {
    const statement = `insert into shopbannerpic (filename,mimetype,size,shop_id) values (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      shopId
    ]);
    return result[0];
  }
  async createShopInnerFile(filename, mimetype, size, shopId) {
    const statement = `insert into shopinnerpic (filename,mimetype,size,shop_id) values (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      shopId
    ]);
    return result[0];
  }
  async createShopcar(filename, mimetype, size, shopId) {
    const statement = `insert into shopcar (filename,mimetype,size,shop_id) values (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      shopId
    ]);
    return result[0];
  }
  async createApply(filename, mimetype, size, applyId) {
    const statement = `insert into apply_file (filename,mimetype,size,apply_id) values (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      applyId
    ]);
    return result[0];
  }
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }

  async getBannerByFilename(filename) {
    const statement = `SELECT * FROM shopbannerpic WHERE filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
  async getInnerByFilename(filename) {
    const statement = `SELECT * FROM shopinnerpic WHERE filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
  async getCarByFilename(filename) {
    const statement = `SELECT * FROM shopcar WHERE filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}
module.exports = new FileService();
