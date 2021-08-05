const express = require('express');
//动态
const momentRouter = express.Router();
const {
  remove,
  create,
  detailListbyStatus,
  currentUserReviews,
  detailByMomentId,
  update,
  addTags,
  fileInfo
} = require('../controller/moment_controller');
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth_middleware');
const { verifyLabelExists } = require('../middleware/tag_middleware');
// authRouter.use('/',loginMidware)
//文章id查询
momentRouter.get('/detailbymomentid/:momentId', detailByMomentId);
//更新文章
momentRouter.patch('/:momentId', update);
//文章列表
momentRouter.get('/detaillistbyStatus/:status', detailListbyStatus);
//获取文章图片
momentRouter.get('/images/:filename', fileInfo);

momentRouter.use('/', verifyAuth);
//通过用户ID 查询该用户的文章
momentRouter.get('/currentUserReviews', currentUserReviews);
//创建文章
momentRouter.post('/', create);
//验证修改权限
momentRouter.use('/:momentId', verifyPermission);

//删除文章
momentRouter.delete('/:momentId', remove);
//添加标签中间件
momentRouter.use('/:momentId/tags', verifyLabelExists);
//添加标签
momentRouter.post('/:momentId/tags', addTags);

module.exports = momentRouter;
