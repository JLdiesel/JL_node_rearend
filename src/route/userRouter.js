const express = require('express');
// const JWT = require('jsonwebtoken')
const {
  verifyUser,
  handlePassword,
  loginMiddleware
} = require('../middleware/user_middeware');
const userRouter = express.Router();
const { create, login, avatarInfo } = require('../controller/user_controller');
/* const SERCET_KYE = 'jl123456'
//秘钥发布
userRouter.post('/test', (req, res, next) => {
    const user = { name: 'jl', age: 18 }
    const token = JWT.sign(user, SERCET_KYE, {
        expiresIn: 60*60*24*7
    })
    res.send(token)
})
//公钥解析
userRouter.get('/test', (req, res, next) => {
    const authorization = req.headers.authorization
    console.log(authorization);
    const token = authorization.replace('Bearer ', '')
    console.log(token);
    try {
        const result = JWT.verify(token, SERCET_KYE)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})
 */
userRouter.use('/login', loginMiddleware);
userRouter.post('/login', login);
userRouter.get('/:userId/avatar', avatarInfo);
userRouter.use('/register', verifyUser);
userRouter.use('/register', handlePassword);
userRouter.post('/register', create);

module.exports = userRouter;
