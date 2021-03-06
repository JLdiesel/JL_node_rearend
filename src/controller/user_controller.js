const service = require('../service/user.service');
const JWT = require('jsonwebtoken');
const { SERCET_KYE } = require('../app/config');
const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const applyservice = require('../service/apply_service');
class UserController {
  async create(req, res, next) {
    const user = req.body;
    try {
      const result = await service.create(user);

      const { name, password } = user;
      const { insertId } = result;
      const token = JWT.sign({ id: insertId, name, password }, SERCET_KYE, {
        expiresIn: 60 * 60 * 24 * 7
      });
      const results = await service.login(name);
      res.send({ token, result: results });
    } catch (error) {
      await next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { id, name, password } = req.user;
      console.log(name);
      //秘钥发布
      const token = JWT.sign({ id, name, password }, SERCET_KYE, {
        expiresIn: 60 * 60 * 24 * 7
      });

      const result = await service.login(name);
      res.send({ token, result });
    } catch (error) {
      await next(error);
    }
  }
  async avatarInfo(req, res, next) {
    try {
      //1.用户的头像是哪一个文件
      const { userId } = req.params;
      const avaterInfo = await fileService.getAvatarByUserId(userId);
      // res.send(avaterInfo.filename)
      const { type } = req.query;
      const types = ['small'];
      let fileName = `${avaterInfo.filename}`;
      if (types.some((item) => item === type)) {
        fileName = `${avaterInfo.filename}-${type}`;
      }
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
    } catch (error) {
      await next(error);
    }
  }
  async updateUserInfo(req, res, next) {
    try {
      let id;
      if (req.user) {
        id = req.user.id;
      } else {
        id = req.params.userId;
      }

      const { nickName = '', sex = 0, birthday = '', ownSay = '' } = req.body;

      const result = await userService.updateUserInfo(
        id,
        nickName,
        sex,
        birthday,
        ownSay
      );
      res.send('修改用户信息成功');
    } catch (error) {
      await next(error);
    }
  }
  async getUserInfo(req, res, next) {
    try {
      const { id } = req.user;
      const result = await userService.getUserById(id);
      res.send(result[0]);
    } catch (error) {
      await next(error);
    }
  }
  async getUserList(req, res, next) {
    const result = await userService.getUserList();
    res.send(result);
  }
  async getUserInfoById(req, res, next) {
    try {
      const { userId } = req.params;

      const result = await userService.getUserById(userId);
      res.send(result[0]);
    } catch (error) {
      await next(error);
    }
  }
  async createFollow(req, res, next) {
    try {
      const { id } = req.user;

      const { userId } = req.params;
      const result = await userService.createFollow(id, userId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getFollow(req, res, next) {
    try {
      const { id } = req.user;
      const result = await userService.getFollow(id);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async removeFollow(req, res, next) {
    try {
      const { id } = req.user;
      const { userId } = req.params;
      const result = await userService.removeFollow(id, userId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getFans(req, res, next) {
    try {
      const { id } = req.user;

      const result = await userService.getFans(id);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async updateUserStatus(req, res, next) {
    try {
      const { userId } = req.params;
      const result = await userService.updateUserStatus(userId);
      await applyservice.deleteByuserId(userId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getUserAddress(req, res, next) {
    try {
      const { id } = req.user;

      const result = await userService.getUserAddress(id);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async addUserAddress(req, res, next) {
    try {
      const { id } = req.user;
      const { name, phoneNum, address } = req.body;
      const result = await userService.addAddress(id, name, phoneNum, address);
      await userService.clearDefaultAddress(id);
      await userService.changeUserDefaultAddress(result.insertId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async removeAddress(req, res, next) {
    try {
      const { addressId } = req.params;
      const result = await userService.removeAddress(addressId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async addorider(req, res, next) {
    try {
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
    } catch (error) {
      await next(error);
    }
  }
  async getOriderByOriderId(req, res, next) {
    try {
      const { oriderId } = req.params;
      const result = await userService.getOriderByOriderId(oriderId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getOriderListByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const { offset = 0, top = 10 } = req.query;
      const result = await userService.getOriderListByUserId(id, offset, top);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getOriderListByStatus(req, res, next) {
    try {
      const { id } = req.user;
      const { status } = req.params;
      const result = await userService.getOriderListByStatus(id, status);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async changeOriderStatus(req, res, next) {
    try {
      const { oriderId } = req.params;
      const { status } = req.query;
      await userService.changeOriderListStatus(oriderId, status);
      res.send('更改成功');
    } catch (error) {
      await next(error);
    }
  }
  async removeorider(req, res, next) {
    try {
      const { oriderId } = req.params;
      await userService.removeOriderListById(oriderId);
      res.send('删除成功');
    } catch (error) {
      await next(error);
    }
  }
  async changeUserDefaultAddress(req, res, next) {
    try {
      const { id } = req.user;
      const { addressId } = req.params;
      await userService.clearDefaultAddress(id);
      await userService.changeUserDefaultAddress(addressId);
      res.send('修改默认地址成功');
    } catch (error) {
      await next(error);
    }
  }
  async getUserDefaultAddress(req, res, next) {
    try {
      const { id } = req.user;
      const result = await userService.findDefaultAddress(id);

      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async applySteam(req, res, next) {
    const { realName, idCard } = req.body;
    const files = req.files;
    const front = `${APP_HOST}:${APP_PORT}/apply/applyInfo/${files[0].filename}`;
    const back = `${APP_HOST}:${APP_PORT}/apply/applyInfo/${files[1].filename}`;
    const { id } = req.user;
    const result = await userService.createApply(
      realName,
      idCard,
      id,
      front,
      back
    );
    const { insertId } = result;
    for (const file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createApply(filename, mimetype, size, insertId);
    }
    //2 将所有的文件信息 保存到数据库中
    res.send('上传完成');
  }
  async createNew(req, res, next) {
    const { name, sex, password, nickName, ownSay, birthday } = req.body;
    const result = await userService.createNew(
      name,
      sex,
      password,
      nickName,
      ownSay,
      birthday
    );
    res.send(result);
  }
  async deleteByUserId(req, res, next) {
    const { userId } = req.params;
    const result = await userService.deleteByUserId(userId);
    res.send(result);
  }
}
module.exports = new UserController();
