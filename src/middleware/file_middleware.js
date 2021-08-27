const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const {
  PICTURE_PATH,
  AVATAR_PATH,
  SHOP_PATH,
  VIDEO_AVATAR,
  VIDEO_PATH,
  STREAM_AVATAR,
  ROLE_AVATAR,
  APPLY_PATH,
  MUSIC_PATH
} = require('../constants/file-path');
const AvataStorage = multer.diskStorage({
  destination: AVATAR_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'ua' + Date.now() + path.extname(file.originalname));
  }
});

const AvataUpload = multer({
  // dest: './uploads/'
  storage: AvataStorage
});

const musicStorage = multer.diskStorage({
  destination: MUSIC_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'music' + Date.now() + path.extname(file.originalname));
  }
});
const musicUpload = multer({
  // dest: './uploads/'
  storage: musicStorage
});
const applyStorage = multer.diskStorage({
  destination: APPLY_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const applyUpoads = multer({
  // dest: './uploads/'
  storage: applyStorage
});
const PicStorage = multer.diskStorage({
  destination: PICTURE_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'mc' + Date.now() + path.extname(file.originalname));
  }
});

const PicUpload = multer({
  // dest: './uploads/'
  storage: PicStorage
});
const shopStorage = multer.diskStorage({
  destination: SHOP_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'shop' + Date.now() + path.extname(file.originalname));
  }
});

const shopUpload = multer({
  // dest: './uploads/'
  storage: shopStorage
});
const videoStorage = multer.diskStorage({
  destination: VIDEO_PATH,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'videov' + Date.now() + path.extname(file.originalname));
  }
});

const videoUpload = multer({
  // dest: './uploads/'
  storage: videoStorage
});
const videoAvatarStorage = multer.diskStorage({
  destination: VIDEO_AVATAR,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'videoa' + Date.now() + path.extname(file.originalname));
  }
});

const videoAvatarUpload = multer({
  // dest: './uploads/'
  storage: videoAvatarStorage
});

const streamAvatarStorage = multer.diskStorage({
  destination: STREAM_AVATAR,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'stream' + Date.now() + path.extname(file.originalname));
  }
});

const streamAvatarUpload = multer({
  // dest: './uploads/'
  storage: streamAvatarStorage
});

const roleAvatarStorage = multer.diskStorage({
  destination: ROLE_AVATAR,
  filename: (req, file, cb) => {
    //第二个字段传文件名
    cb(null, 'role' + Date.now() + path.extname(file.originalname));
  }
});

const roleAvatarUpload = multer({
  // dest: './uploads/'
  storage: roleAvatarStorage
});

const pictureResize = async (req, res, next) => {
  const files = req.files;
  if (files.length) {
    //对图像进行处理 (sharp(path).resize)/jimp
  for (const file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then((image) => {
      image.resize(320, jimp.AUTO).write(`${destPath}-small`);
    });
  }
 }
  next();
};
module.exports = {
  AvataUpload,
  PicUpload,
  shopUpload,
  videoUpload,
  videoAvatarUpload,
  streamAvatarUpload,
  roleAvatarUpload,
  applyUpoads,
  musicUpload,
  pictureResize
};
