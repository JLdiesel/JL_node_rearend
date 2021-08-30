const express = require('express');
//动态
const momentRouter = express.Router();
const { PicUpload, pictureResize } = require('../middleware/file_middleware');
const {
  remove,
  create,
  detailListbyStatus,
  currentUserReviews,
  detailByMomentId,
  update,
  addTags,
  fileInfo,
  createByStatus,
  getListByStatus,
  musicInfo,
  getUserMomentById,
  getMomentList
} = require('../controller/moment_controller');
const { verifyAuth } = require('../middleware/auth_middleware');
const { verifyLabelExists } = require('../middleware/tag_middleware');
// authRouter.use('/',loginMidware)
//文章id查询
momentRouter.get('/detailbymomentid/:momentId', detailByMomentId);
//更新文章
momentRouter.get('/list', getMomentList);
momentRouter.patch('/:momentId', update);
momentRouter.delete('/:momentId', remove);
//文章列表
momentRouter.get('/detaillistbyStatus/:status', detailListbyStatus);
//获取文章图片
momentRouter.get('/images/:filename', fileInfo);
momentRouter.get('/music/:filename', musicInfo);
//上传不同类型的文章
momentRouter.post('/createByStatus/:status', createByStatus);
//获取不同类型的文字
momentRouter.get('/getListByStatus/:status', getListByStatus);
momentRouter.get('/getUserMomentById/:userId', getUserMomentById);
momentRouter.use('/', verifyAuth);
//通过用户ID 查询该用户的文章
momentRouter.get('/currentUserReviews', currentUserReviews);

//创建文章
momentRouter.use('/', PicUpload.any(), pictureResize);

momentRouter.post('/', create);

//添加标签中间件trtrrrrrrrrrrrrrrrrrrr
momentRouter.use('/:momentId/momentTags', verifyLabelExists);
//添加标签
momentRouter.post('/:momentId/momentTags', addTags);

module.exports = momentRouter;
