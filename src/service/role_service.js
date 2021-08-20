const connection = require('../app/database');
class RoleService {
  async create(name, content) {
    try{
    const statement = `insert into role (name,content) values(?,?)`;
    const [result] = await connection.execute(statement, [name, content]);
    return result;} catch (error) {
      return error
    }
  }
  async createFile(filename, mimetype, size, insertId) {try{
    const statement = `insert into role_pic (filename,mimetype,size,role_id) values(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      insertId
    ]);
    return result[0];} catch (error) {
      return error
    }
  }
  async updateAvatar(fileUrl, insertId) {try{
    const statement = `update role set avatar = ? where id=?`;
    const [result] = await connection.execute(statement, [fileUrl, insertId]);
    return result[0];} catch (error) {
      return error
    }
  }
  async getFileByFilename(filename) {try{
    const statement = `select * from role_pic where filename=?`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];} catch (error) {
      return error
    }
  }
  async getRoleList(offset, top) {try{
    const statement = `select * from role limit ?,?`;
    const [result] = await connection.execute(statement, [offset, top]);
    return result;} catch (error) {
      return error
    }
  }
  async getRoleVideoById(roleId) {try{
    const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT("id",id,"avatar",avatar,"title",title,"watchNum",watchNum)) videoList FROM video where role_id=? `;
    const [result] = await connection.execute(statement, [roleId]);
    return result[0];} catch (error) {
      return error
    }
  }
  async getRoleMomentById(roleId) {try{
    const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT("id",id,"avatar",picture,"title",title,"ezcontent",ezcontent)) momentList FROM moment  WHERE role_id =?`;
    const [result] = await connection.execute(statement, [roleId]);
    return result[0];} catch (error) {
      return error
    }
  }
  async getRolePicById(roleId) {try{
    const statement = `
SELECT JSON_ARRAYAGG(CONCAT('http://120.79.86.32:3000/role/avatar/',filename)) picList FROM role_pic WHERE role_id =? `;
    const [result] = await connection.execute(statement, [roleId]);
    return result[0];} catch (error) {
      return error
    }
  }
}
module.exports = new RoleService();
