const connection = require('../app/database')
class UserService {
    //注册传入数据库
    async create(user) {
        const { name, password } = user
        const statement = `INSERT INTO user (name,password) VALUES(?,?)`

        await connection.execute(statement, [name, password])

        return user

        //将user存储到数据库中

    }
    //通过name查找user密码
    async getUserByName(name) {
        const statement = `select * from user where name=?`
        const result = await connection.execute(statement, [name])
        return result[0]
    }
    //通过name查找user密码
    async getUserById(id) {
        const statement = `select * from user where id=?`
        const result = await connection.execute(statement, [id])
        return result[0]
    }
    //登录查询数据库
    async login(name) {
        const statement = `select * from user where name=? `
        const result = await connection.execute(statement, [name])
        return result[0]
    }
}

module.exports = new UserService()