const connection = require('../app/database');

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    try {
      const statement = `insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?)`;
      const result = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        userId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createVideoAvatar(filename, mimetype, size, videoId) {
    try {
      const statement = `insert into video_avatar (filename,mimetype,size,video_id) values (?,?,?,?)`;
      const result = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        videoId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createVideo(filename, mimetype, size, videoId) {
    try {
      const statement = `insert into video_file (filename,mimetype,size,video_id) values (?,?,?,?)`;
      const result = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        videoId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getAvatarByUserId(userId) {
    try {
      const statement = `SELECT * FROM avatar WHERE user_id=?`;
      const [result] = await connection.execute(statement, [userId]);
      return result.pop();
    } catch (err) {
      return err;
    }
  }
  async getAvatarByVideoId(videoId) {
    try {
      const statement = `SELECT * FROM video_avatar WHERE video_id=?`;
      const [result] = await connection.execute(statement, [videoId]);
      return result.pop();
    } catch (err) {
      return err;
    }
  }
  async getVideoByVideoId(videoId) {
    try {
      const statement = `SELECT * FROM video_file WHERE video_id=?`;
      const [result] = await connection.execute(statement, [videoId]);
      return result.pop();
    } catch (err) {
      return err;
    }
  }
  async createFile(filename, mimetype, size, momentId) {
    try {
      const statement = `insert into file (filename,mimetype,size,moment_id) values (?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        momentId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createShopBannerFile(filename, mimetype, size, shopId) {
    try {
      const statement = `insert into shopbannerpic (filename,mimetype,size,shop_id) values (?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        shopId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createShopInnerFile(filename, mimetype, size, shopId) {
    try {
      const statement = `insert into shopinnerpic (filename,mimetype,size,shop_id) values (?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        shopId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createShopcar(filename, mimetype, size, shopId) {
    try {
      const statement = `insert into shopcar (filename,mimetype,size,shop_id) values (?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        shopId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createApply(filename, mimetype, size, applyId) {
    try {
      const statement = `insert into apply_file (filename,mimetype,size,apply_id) values (?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        applyId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getFileByFilename(filename) {
    try {
      const statement = `SELECT * FROM file WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getstaticFileByFilename(filename) {
    try {
      const statement = `SELECT * FROM static_music WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getStaticMusicById(id) {
    try {
      const statement = `SELECT filename FROM static_music WHERE id=?`;
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getBannerByFilename(filename) {
    try {
      const statement = `SELECT * FROM shopbannerpic WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getInnerByFilename(filename) {
    try {
      const statement = `SELECT * FROM shopinnerpic WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async getCarByFilename(filename) {
    try {
      const statement = `SELECT * FROM shopcar WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createMusic(filename, mimetype, size, id,staticId) {
    try {
      const statement = `insert into user_music (filename,mimetype,size,user_id,static_musicId) values (?,?,?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        id,staticId
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
  async createStaticMusic(filename, mimetype, size, id) {
    try {
      const statement = `insert into static_music (filename,mimetype,size) values (?,?,?)`;
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size
      ]);
      return result[0];
    } catch (err) {
      return err;
    }
  }
}
module.exports = new FileService();
