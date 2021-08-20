const connection = require('../app/database');

class TagService {
  async create(name) {try{
    const statement = `INSERT into tag (name) values(?)`;
    const result = await connection.execute(statement, [name]);
    return result[0];} catch (error) {
      return error
    }
  }

  async getTagByName(name) {try{
    const statement = `SELECT * FROM tag where name=?`;
    const result = await connection.execute(statement, [name]);
    return result[0];} catch (error) {
      return error
    }
  }
  async getTagList(offset, limit) {try{
    const statement = `SELECT * FROM tag LIMIT  ?,?`;
    const result = await connection.execute(statement, [offset, limit]);
    return result[0];} catch (error) {
      return error
    }
  }
}

module.exports = new TagService();
