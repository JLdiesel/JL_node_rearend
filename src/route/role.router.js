const express = require('express');
const roleRoute = express.Router();
const {
  create,
  avatarInfo,
  getRoleList,
  getRolePicById,
  getRoleMomentById,
  getRoleVideoById
} = require('../controller/role_controller');
const {
  roleAvatarUpload,
  pictureResize
} = require('../middleware/file_middleware');

roleRoute.use('/create', roleAvatarUpload.any(), pictureResize);
roleRoute.get('/avatar/:filename', avatarInfo);
roleRoute.get('/roleList', getRoleList);
roleRoute.get('/roleInnerVideo/:roleId', getRoleVideoById);
roleRoute.get('/roleInnerPic/:roleId', getRolePicById);
roleRoute.get('/roleInnerMoment/:roleId', getRoleMomentById);
roleRoute.post('/create', create);

module.exports = roleRoute;
