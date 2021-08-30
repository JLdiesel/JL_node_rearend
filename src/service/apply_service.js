const connection = require('../app/database');

class ApplyService {
  async getList() {
    const statement = `SELECT JSON_OBJECT("totalCount",IF(COUNT(id),COUNT(id),0),"list",if(COUNT(id),JSON_ARRAYAGG(JSON_OBJECT("id",id,"userId",user_id,"realname",realName,"idcard",idCard,"back",back,"front",front,"createAt",createAt)),null) ) data  FROM apply
`;
    const [result] = await connection.execute(statement);
    return result;
  }
  async deleteByApplyId(applyId) {
    const statement = `delete from apply where id=?`;
    const result = await connection.execute(statement, [applyId]);
    return result;
  }
  async deleteByuserId(applyId) {
    const statement = `delete from apply where user_id=?`;
    const result = await connection.execute(statement, [applyId]);
    return result;
  }
}

module.exports = new ApplyService();
