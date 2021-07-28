const connection = require('../app/database')
class MomentService {
    async create(userID, content) {
        const statement = "INSERT INTO `moment` (content,user_id) VALUES(?,?);"
        const result = await connection.execute(statement, [content, userID])

        return result
    }
    //通过用户id查询其发表的文章
    async getMomentByUserId(id) {
        const statement = "SELECT user_id userId,JSON_ARRAYAGG(content) contentArr FROM moment GROUP BY user_id HAVING user_id=?"
        const result = await connection.execute(statement, [id])
        return result[0]
    }
    
    //查找文章列表
    async getMomentList(offset, size) {
        const statement =
        `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentCount
            FROM moment m
            LEFT JOIN user u ON m.user_id =u.id
            LIMIT ? , ?;`
        const result = await connection.execute(statement, [offset, size])
        return result[0]
    }
    //查找一篇文章所有的信息
    async getMomentByMomentId(momentId) {
        const statement =
        `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
        'user',JSON_OBJECT('id',cu.id,'name',cu.name))
        ) ,NULL) FROM comment c LEFT JOIN user cu ON c.user_id=cu.id WHERE m.id=c.moment_id ) comments,
        IF(COUNT(t.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',t.id,'name',t.name)
        ),null) tags
        FROM moment m
        LEFT JOIN user u ON m.user_id =u.id
        LEFT JOIN moment_tag mt ON m.id=mt.moment_id
        LEFT JOIN tag t ON mt.tag_id=t.id
        WHERE m.id=?;`
        const result = await connection.execute(statement, [momentId])
        return result[0][0]
    }
    async updateById(content,id) {
        const statement = `UPDATE moment SET content =? WHERE id =?`
        const result = await connection.execute(statement, [content, id])
        return result[0]
    }
    async deleteById(id) {
        const statement = `DELETE FROM moment WHERE id=?`
        const result = await connection.execute(statement, [id])
        return result[0]
    }
    async hasTag(momentId, tagId) {
        const statement = `SELECT * FROM moment_tag WHERE moment_id =? AND tag_id=?`
        const result = await connection.execute(statement, [momentId,tagId])
        return result[0].length ? true : false;
    }
    async addTag(momentId, tagId) {
        const statement = `INSERT INTO moment_tag (moment_id,tag_id) VALUES(?,?)`
        const result = await connection.execute(statement, [momentId, tagId])
        return result[0]
    }
}

module.exports = new MomentService()