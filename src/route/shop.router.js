const express = require('express');
//商品
const { shopUpload, pictureResize } = require('../middleware/file_middleware');
const shopRouter = express.Router();
const {
  addShop,
  getShopList,
  BannerPicInfo,
  InnerPicInfo,
  carPicInfo,
  addshopcar,
  getShopById,
  getShopHomeList,
  deleteByShopId,
  updateShopInfo,
  getList
} = require('../controller/shop_controller.js');
shopRouter.get('/list', getList);
shopRouter.patch('/:shopId', updateShopInfo);
shopRouter.delete('/:shopId', deleteByShopId);

shopRouter.post('/', addShop);
//获取商品信息
shopRouter.get('/getShopById/:shopId', getShopById);
//获取商品列表
shopRouter.get('/', getShopHomeList);
//通过type获取商品列表
shopRouter.get('/getShopList/:type', getShopList);
//获取商品轮播图
shopRouter.get('/shopBanner/:filename', BannerPicInfo);
//获取商品内容
shopRouter.get('/shopInner/:filename', InnerPicInfo);
//获取商品购物车
shopRouter.get('/shopcar/:filename', carPicInfo);

//添加商品购物车
shopRouter.post('/shopcar/:shopcarId', addshopcar);

module.exports = shopRouter;
