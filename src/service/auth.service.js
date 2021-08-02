const connection = require('../app/database');

class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id=? and user_id=?;`;

    const [result] = await connection.execute(statement, [id, userId]);
    return result.length === 0 ? false : true;
  }
  /*   async checkComment(commentId, id) {
    const statement = `SELECT user_id FROM comment WHERE id=?`

    const result = await connection.execute(statement, [commentId])
    const userId = result[0][0].user_id

        if (id === userId) {
           return true
        } else {
          return false
        }
  } */
}

module.exports = new AuthService();
