const express = require('express');
//动态
const momentRouter = express.Router();
const {
  remove,
  create,
  detailList,
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

//文章列表
momentRouter.get('/detaillist', detailList);
//获取文章图片
momentRouter.get('/images/:filename', fileInfo);

momentRouter.use('/', verifyAuth);
momentRouter.get('/currentUserReviews', currentUserReviews);
momentRouter.post('/', create);
momentRouter.use('/:momentId', verifyPermission);
momentRouter.patch('/:momentId', update);
momentRouter.delete('/:momentId', remove);
momentRouter.use('/:momentId/tags', verifyLabelExists);
momentRouter.post('/:momentId/tags', addTags);

module.exports = momentRouter;
