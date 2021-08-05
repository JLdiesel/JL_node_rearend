const express = require('express');
// const { create } = require('../controller/file_controller')
const {
  AvataUpload,
  PicUpload,
  shopUpload,
  pictureResize
} = require('../middleware/file_middleware');
const { verifyAuth } = require('../middleware/auth_middleware');
const {
  saveAvatarInfo,
  savePicInfo,
  saveShopPicBannerInfo,
  saveShopMainPicture,
  saveShopCar
} = require('../controller/file_controller');
const fileRouter = express.Router();
//处理论坛图片中间件
fileRouter.use('/shop', shopUpload.any(), pictureResize);
//添加商城图片
fileRouter.post('/shop/BannerPicture/:shopId', saveShopPicBannerInfo);
//添加商城详情图片
fileRouter.post('/shop/MainPicture/:shopId', saveShopMainPicture);
//添加商品购物车图片
fileRouter.post('/shop/shopCar/:shopId', saveShopCar);
fileRouter.use('/', verifyAuth);
//上传用户头像
fileRouter.post('/avatar', AvataUpload.any(), saveAvatarInfo);
//处理论坛图片中间件
fileRouter.use('/moment', PicUpload.any(), pictureResize);
//添加论坛图片
fileRouter.post('/momentPicture/:momentId', savePicInfo);

module.exports = fileRouter;
