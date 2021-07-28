const connection = require('../app/database')

class TagService{
  async create(name) {
    const statement = `INSERT into tag (name) values(?)`
    const result =await connection.execute(statement, [name])
    return result[0]
  }

  async getTagByName(name) {
    const statement = `SELECT * FROM tag where name=?`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
  async getTagList(offset, limit) {
    const statement = `SELECT * FROM tag LIMIT  ?,?`
     const result = await connection.execute(statement, [offset,limit])
    return result[0]
  }
}

module.exports=new TagService()