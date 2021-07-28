const service = require('../service/user.service')
const JWT = require('jsonwebtoken')
const { SERCET_KYE } = require('../app/config')
class UserController {
    async create(req, res, next) {
        const user = req.body;
        // try {
        const result = await service.create(user);
        console.log(user);
        res.send(result)
        // } catch (error) {
        //     next(error)
        // }
    }
    async login(req, res, next) {
        const { id, name, password } = req.user;

        //秘钥发布
        const token = JWT.sign({ id, name, password }, SERCET_KYE, {
            expiresIn: 60 * 60 * 24 * 7
        })
        /*      //公钥解析
             const authorization = req.headers.authorization
             const token = authorization.replace('Bearer ', '')
             try {
                 const result = JWT.verify(token, SERCET_KYE)
                 console.log(result);
                 res.send(result)
             } catch (error) {
                 res.send(error)
             } */
        const result = await service.login(name)
        res.send({ token, result })
    }
}
module.exports = new UserController();