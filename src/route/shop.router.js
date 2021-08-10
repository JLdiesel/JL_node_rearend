const express = require('express');
//商品
const shopRouter = express.Router();
const {
  addShop,
  getShopList,
  BannerPicInfo,
  InnerPicInfo,
  carPicInfo,
  addshopcar,
  getShopById,
  getShopHomeList
} = require('../controller/shop_controller.js');
shopRouter.get('/getShopById/:shopId', getShopById);
shopRouter.get('/', getShopHomeList);
shopRouter.get('/getShopList/:type', getShopList);

shopRouter.get('/shopBanner/:filename', BannerPicInfo);
shopRouter.get('/shopInner/:filename', InnerPicInfo);
shopRouter.get('/shopcar/:filename', carPicInfo);
shopRouter.post('/', addShop);
shopRouter.post('/shopcar/:shopcarId', addshopcar);

module.exports = shopRouter;
