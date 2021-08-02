const fileService = require('../service/file.service');

const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');
class FileController {
  async saveAvatarInfo(req, res, next) {
    try {
      console.log(req.user);
      console.log(req.files);
      const { mimetype, filename, size } = req.files[0];

      const { insertId } = req.user;
      const result = await fileService.createAvatar(
        filename,
        mimetype,
        size,
        insertId
      );
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
    const files = req.files;
    const { insertId } = req.user;
    const { momentId } = req.params;
    //2 将所有的文件信息 保存到数据库中
    console.log(momentId);
    console.log(files);
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
  }
}

module.exports = new FileController();
