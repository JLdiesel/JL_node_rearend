const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const { PICTURE_PATH, AVATAR_PATH } = require('../constants/file-path');
const AvataStorage = multer.diskStorage({
  destination: AVATAR_PATH
  /*  filename: (req, file, cb) => {
        //第二个字段传文件名
        cb(null, Date.now() + path.extname(file.originalname));
    }, */
});

const AvataUpload = multer({
  // dest: './uploads/'
  storage: AvataStorage
});
const PicStorage = multer.diskStorage({
  destination: PICTURE_PATH
  /*  filename: (req, file, cb) => {
        //第二个字段传文件名
        cb(null, Date.now() + path.extname(file.originalname));
    }, */
});

const PicUpload = multer({
  // dest: './uploads/'
  storage: PicStorage
});

const pictureResize = async (req, res, next) => {
  const files = req.files;
  //对图像进行处理 (sharp(path).resize)/jimp
  for (const file of files) {
    jimp.read(file.path).then((image) => {});
  }
};
module.exports = { AvataUpload, PicUpload, pictureResize };
