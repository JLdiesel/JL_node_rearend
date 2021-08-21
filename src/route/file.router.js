const express = require('express');
// const { create } = require('../controller/file_controller')
const {
  AvataUpload,
  PicUpload,
  shopUpload,
  videoAvatarUpload,
  videoUpload,
  musicUpload,
  pictureResize
} = require('../middleware/file_middleware');
const { verifyAuth } = require('../middleware/auth_middleware');
const {
  saveAvatarInfo,
  savePicInfo,
  saveShopPicBannerInfo,
  saveShopMainPicture,
  saveShopCar,
  saveVideoInfo,
  saveVideoPicInfo,
  saveUserBackground,
  saveMusicInfo,
  saveMusic
} = require('../controller/file_controller');
const fileRouter = express.Router();
fileRouter.post('/music', musicUpload.any(), saveMusic);
//视频页数据
//处理图片中间件
fileRouter.use('/videoAvatar', videoAvatarUpload.any(), pictureResize);
//添加首页图片
fileRouter.post('/videoAvatar/:videoId', saveVideoPicInfo);
//添加视频
fileRouter.post('/videoFile/:videoId', videoUpload.any(), saveVideoInfo);

//处理商城图片中间件
fileRouter.use('/shop', shopUpload.any(), pictureResize);
//添加商城图片
fileRouter.post('/shop/BannerPicture/:shopId', saveShopPicBannerInfo);
//添加商城详情图片
fileRouter.post('/shop/MainPicture/:shopId', saveShopMainPicture);
//添加商品购物车图片
fileRouter.post('/shop/shopCar/:shopId', saveShopCar);

//文章图片中间件
fileRouter.use('/moment', PicUpload.any(), pictureResize);

//上传文章图片
fileRouter.post('/moment/:momentId', savePicInfo);
fileRouter.post('/momentmusic/:momentId', videoUpload.any(), saveMusicInfo);
//处理论坛图片中间件
fileRouter.use('/momentInUser', PicUpload.any(), pictureResize);
//添加论坛图片
fileRouter.post('/momentInUser/:momentId', savePicInfo);

fileRouter.use('/', verifyAuth);

fileRouter.use('/avatar', AvataUpload.any(), pictureResize);
//上传用户头像
fileRouter.post('/avatar', saveAvatarInfo);

fileRouter.use('/userBackground', AvataUpload.any(), pictureResize);
//上传用户背景
fileRouter.post('/userBackground', saveUserBackground);

module.exports = fileRouter;
