const express = require('express');
// const JWT = require('jsonwebtoken')
const {
  verifyUser,
  handlePassword,
  loginMiddleware
} = require('../middleware/user_middeware');
const userRouter = express.Router();
const {
  create,
  login,
  avatarInfo,
  updateUserInfo,
  getUserInfo,
  createFollow,
  getFans,
  removeFollow,
  getFollow,
  updateUserStatus,
  getUserAddress,
  addUserAddress,
  removeAddress,
  addorider,
  getOriderByOriderId,
  getOriderListByUserId,
  getOriderListByStatus,
  changeOriderStatus,
  removeorider
} = require('../controller/user_controller');
const { verifyAuth } = require('../middleware/auth_middleware');
//管理员更改用户直播权限
userRouter.patch('/updateUserStatus/:userId', updateUserStatus);
//登录中间件  md5加密
userRouter.use('/login', loginMiddleware);
//登录
userRouter.post('/login', login);
//获取用户头像
userRouter.get('/:userId/avatar', avatarInfo);
//判断注册
userRouter.use('/register', verifyUser);
//密码转换
userRouter.use('/register', handlePassword);
//注册用户 同时登录
userRouter.post('/register', create);
userRouter.use('/', verifyAuth);
//获取用户信息
userRouter.get('/', getUserInfo);
//关注粉丝
userRouter.post('/follow/:userId', createFollow);
userRouter.get('/fans', getFans);
userRouter.get('/follow', getFollow);
userRouter.delete('/follow/:userId', removeFollow);

//更新用户信息
userRouter.patch('/updateUserInfo', updateUserInfo);
//地址管理
userRouter.get('/address', getUserAddress);
userRouter.post('/address', addUserAddress);
userRouter.delete('/address/:addressId', removeAddress);
//订单管理
userRouter.post('/orider', addorider);
userRouter.patch('/orider/:oriderId', changeOriderStatus);
userRouter.delete('/orider/:oriderId', removeorider);
//通过订单id查询订单页所有信息
userRouter.get('/orider/:oriderId', getOriderByOriderId);
//查询当前用户所有订单
userRouter.get('/oriderList', getOriderListByUserId);
//通过订单状态查询当前用户订单 0:未支付 1:待收货 2:待评价
userRouter.get('/oriderListBystatus/:status', getOriderListByStatus);
module.exports = userRouter;
