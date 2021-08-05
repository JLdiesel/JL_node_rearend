const fileService = require('../service/file.service');

const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');
const momentService = require('../service/moment.service');
const shopService = require('../service/shop.service');
class FileController {
  async saveAvatarInfo(req, res, next) {
    try {
      console.log(req.user);
      console.log(req.files);
      const { mimetype, filename, size } = req.files[0];

      const { insertId } = req.user;
      await fileService.createAvatar(filename, mimetype, size, insertId);
      //将图片地址保存到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${insertId}/avatar`;
      await userService.updateAvatarUrlById(avatarUrl, insertId);
      res.send(`上传头像成功`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  async savePicInfo(req, res, next) {
    //1获取图像信息
    try {
      const files = req.files;
      const { insertId } = req.user;
      const { momentId } = req.params;
      //存储一张首页图片到文章详情中
      const [file] = files;
      const { filename } = file;
      const fileUrl = `${APP_HOST}:${APP_PORT}/moment/images/${filename}`;
      await momentService.updatePictureById(fileUrl, momentId);
      //2 将所有的文件信息 保存到数据库中
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile(
          filename,
          mimetype,
          size,
          insertId,
          momentId
        );
      }
      res.send('上传完成');
    } catch (err) {
      console.log(err);
    }
  }
  async saveShopPicBannerInfo(req, res, next) {
    //1获取图像信息
    try {
      const files = req.files;

      const { shopId } = req.params;
      //存储一张首页图片到文章详情中
      const [file] = files;
      const { filename } = file;
      const fileUrl = `${APP_HOST}:${APP_PORT}/shop/shopBanner/${filename}`;
      await shopService.updatePictureById(fileUrl, shopId);
      //2 将所有的文件信息 保存到数据库中
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createShopBannerFile(
          filename,
          mimetype,
          size,
          shopId
        );
      }
      res.send('上传完成');
    } catch (err) {
      console.log(err);
    }
  }
  async saveShopMainPicture(req, res, next) {
    try {
      const files = req.files;
      const { shopId } = req.params;
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createShopInnerFile(filename, mimetype, size, shopId);
      }
      res.send('上传完成');
    } catch (err) {
      console.log(err);
    }
  }
  async saveShopCar(req, res, next) {
    try {
      const files = req.files;

      const { shopId } = req.params;
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createShopcar(filename, mimetype, size, shopId);
      }
      res.send('上传完成');
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new FileController();
