const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const {
  PICTURE_PATH,
  AVATAR_PATH,
  SHOP_PATH
} = require('../constants/file-path');
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
const shopStorage = multer.diskStorage({
  destination: SHOP_PATH
  /*  filename: (req, file, cb) => {
        //第二个字段传文件名
        cb(null, Date.now() + path.extname(file.originalname));
    }, */
});

const shopUpload = multer({
  // dest: './uploads/'
  storage: shopStorage
});
const pictureResize = async (req, res, next) => {
  const files = req.files;
  //对图像进行处理 (sharp(path).resize)/jimp
  for (const file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, jimp.AUTO).write(`${destPath}-small`);
    });
  }
  next();
};
module.exports = { AvataUpload, PicUpload, shopUpload, pictureResize };
