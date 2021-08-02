const express = require('express');
// const { create } = require('../controller/file_controller')
const {
  AvataUpload,
  PicUpload,
  pictureResize
} = require('../middleware/file_middleware');
const { verifyAuth } = require('../middleware/auth_middleware');
const {
  saveAvatarInfo,
  savePicInfo
} = require('../controller/file_controller');
const fileRouter = express.Router();
fileRouter.use('/', verifyAuth);

fileRouter.post('/avatar', AvataUpload.any(), saveAvatarInfo);

fileRouter.use('/picture/:momentId', pictureResize);
fileRouter.post('/picture/:momentId', PicUpload.any(), savePicInfo);

module.exports = fileRouter;
