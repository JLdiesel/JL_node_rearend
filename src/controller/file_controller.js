const fileService = require('../service/file.service');

const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');
const momentService = require('../service/moment.service');
const shopService = require('../service/shop.service');
const videoService = require('../service/video.service');
class FileController {
  async saveAvatarInfo(req, res, next) {
    try {
      console.log(req.files);
      const { originalname, filename, size } = req.files[0];

      const { id } = req.user;
      await fileService.createAvatar(filename, originalname, size, id);
      //将图片地址保存到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
      await userService.updateAvatarUrlById(avatarUrl, id);
      res.send(`上传头像成功`);
    } catch (error) {
     next(error)
    }
  }
  async saveUserBackground(req, res, next) {
    try {
      console.log(req.files[0]);
      const { originalname, filename, size } = req.files[0];

      const { id } = req.user;
      await fileService.createAvatar(filename, originalname, size, id);
      //将图片地址保存到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/bg`;
      await userService.updateBackgroundById(avatarUrl, id);
      res.send(`上传头像成功`);
    } catch (error) {
      next(error)
    }
  }
  async saveMusicInfo(req, res, next) {
     //1获取图像信息
    try {
      const files = req.files;
      const { momentId } = req.params;
      //存储一张首页图片到文章详情中
      const [file] = files;
      const { filename } = file;
      const fileUrl = `${APP_HOST}:${APP_PORT}/moment/music/${filename}`;
      await momentService.updateMusicById(fileUrl, momentId);
      await momentService.updateLabel(momentId);
      //2 将所有的文件信息 保存到数据库中
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile(filename, mimetype, size, momentId);
      }
      res.send('上传完成');
    } catch (err) {
      next(err);
    }
  }
  async savePicInfo(req, res, next) {
    //1获取图像信息
    try {
      const files = req.files;
      const { momentId } = req.params;
      //存储一张首页图片到文章详情中
      const [file] = files;
      const { filename } = file;
      const fileUrl = `${APP_HOST}:${APP_PORT}/moment/images/${filename}`;
      await momentService.updatePictureById(fileUrl, momentId);
      //2 将所有的文件信息 保存到数据库中
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile(filename, mimetype, size, momentId);
      }
      res.send('上传完成');
    } catch (err) {
      next(err);
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
      next(err);
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
      next(err);
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
      next(err);
    }
  }

  //保存video图片
  async saveVideoPicInfo(req, res, next) {
    try {
      const { mimetype, filename, size } = req.files[0];
      const { videoId } = req.params;
      await fileService.createVideoAvatar(filename, mimetype, size, videoId);
      //将图片地址保存到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/video/${videoId}/avatar`;
      await videoService.updateAvatarUrlById(avatarUrl, videoId);
      res.send(`上传头像成功`);
    } catch (error) {
      next(error);
      
    }
  }
  async saveVideoInfo(req, res, next) {
    try {
      const { mimetype, filename, size } = req.files[0];
      const { videoId } = req.params;
      await fileService.createVideo(filename, mimetype, size, videoId);
      res.send(`上传video内容成功`);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new FileController();
