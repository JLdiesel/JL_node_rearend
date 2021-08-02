const service = require('../service/user.service');
const JWT = require('jsonwebtoken');
const { SERCET_KYE } = require('../app/config');
const fileService = require('../service/file.service');
const path = require('path');
const fs = require('fs');
const { AVATAR_PATH } = require('../constants/file-path');
class UserController {
  async create(req, res, next) {
    const user = req.body;
    // try {
    const result = await service.create(user);
    console.log(result.insertId);
    const { name, password } = user;
    const { insertId } = result;
    const token = JWT.sign({ insertId, name, password }, SERCET_KYE, {
      expiresIn: 60 * 60 * 24 * 7
    });
    const results = await service.login(name);
    res.send({ token, result: results });
    // res.send('1223')

    // } catch (error) {
    //     next(error)
    // }
  }
  async login(req, res, next) {
    const { id, name, password } = req.user;

    //秘钥发布
    const token = JWT.sign({ id, name, password }, SERCET_KYE, {
      expiresIn: 60 * 60 * 24 * 7
    });
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
    const result = await service.login(name);
    res.send({ token, result });
  }
  async avatarInfo(req, res, next) {
    //1.用户的头像是哪一个文件
    const { userId } = req.params;
    const avaterInfo = await fileService.getAvatarByUserId(userId);
    // res.send(avaterInfo.filename)
    console.log(avaterInfo);
    var options = {
      root: './uploads/avatar',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': avaterInfo.mimetype
      }
    };

    var fileName = `${avaterInfo.filename}`;

    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    });
    // res.set('Content-Type', avaterInfo.mimetype)
    // req.body=fs.createReadStream(`${AVATAR_PATH}/${avaterInfo.filename}`)
    // res.send(fs.createReadStream(`${AVATAR_PATH}/${avaterInfo.filename}`))
  }
}
module.exports = new UserController();
