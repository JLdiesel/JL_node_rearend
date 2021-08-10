const service = require('../service/user.service');
const JWT = require('jsonwebtoken');
const { SERCET_KYE } = require('../app/config');
const fileService = require('../service/file.service');
const userService = require('../service/user.service');
class UserController {
  async create(req, res, next) {
    const user = req.body;
    // try {
    const result = await service.create(user);
    console.log(result.id);
    const { name, password } = user;
    const { id } = result;
    const token = JWT.sign({ id, name, password }, SERCET_KYE, {
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
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName = `${avaterInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName = `${avaterInfo.filename}-${type}`;
    }
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

    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    });
  }
  async updateUserInfo(req, res, next) {
    const { id } = req.user;
    const { nickName, sex, birthday, ownSay } = req.body;
    console.log(req.body);
    const result = await userService.updateUserInfo(
      id,
      nickName,
      sex,
      birthday,
      ownSay
    );
    res.send('修改用户信息成功');
  }
  async getUserInfo(req, res, next) {
    const { id } = req.user;
    const result = await userService.getUserById(id);
    res.send(result[0]);
  }
  async createFollow(req, res, next) {
    const { id } = req.user;
    const { userId } = req.params;
    const result = await userService.createFollow(id, userId);
    res.send(result);
  }
  async getFollow(req, res, next) {
    const { id } = req.user;
    const result = await userService.getFollow(id);
    res.send(result);
  }
  async removeFollow(req, res, next) {
    const { id } = req.user;
    const { userId } = req.params;
    const result = await userService.removeFollow(id, userId);
    res.send(result);
  }
  async getFans(req, res, next) {
    const { id } = req.user;
    const result = await userService.getFans(id);
    res.send(result);
  }
  async updateUserStatus(req, res, next) {
    const { userId } = req.params;
    const result = await userService.updateUserStatus(userId);
    res.send(result);
  }
  async getUserAddress(req, res, next) {
    const { id } = req.user;
    const result = await userService.getUserAddress(id);
    res.send(result);
  }
  async addUserAddress(req, res, next) {
    const { id } = req.user;
    const { name, phoneNum, address } = req.body;
    const result = await userService.addAddress(id, name, phoneNum, address);
    res.send(result);
  }
  async removeAddress(req, res, next) {
    const { addressId } = req.params;
    const result = await userService.removeAddress(addressId);
    res.send(result);
  }
  async addorider(req, res, next) {
    const { id } = req.user;
    const { shopId, shopCarId, addressId, count, howPay } = req.body;
    const result = await userService.addOrider(
      shopId,
      shopCarId,
      id,
      addressId,
      count,
      howPay
    );
    res.send('订单创建成功');
  }
  async getOriderByOriderId(req, res, next) {
    const { oriderId } = req.params;
    const result = await userService.getOriderByOriderId(oriderId);
    res.send(result);
  }
  async getOriderListByUserId(req, res, next) {
    const { id } = req.user;
    const result = await userService.getOriderListByUserId(id);
    res.send(result);
  }
  async getOriderListByStatus(req, res, next) {
    const { id } = req.user;
    const { status } = req.params;
    const result = await userService.getOriderListByStatus(id, status);
    res.send(result);
  }
  async changeOriderStatus(req, res, next) {
    const { oriderId } = req.params;
    const { status } = req.query;
    await userService.changeOriderListStatus(oriderId, status);
    res.send('更改成功');
  }
  async removeorider(req, res, next) {
    const { oriderId } = req.params;
    await userService.removeOriderListById(oriderId);
    res.send('删除成功');
  }
}
module.exports = new UserController();
