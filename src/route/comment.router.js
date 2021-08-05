const express = require('express');
//评论
const commentRouter = express.Router();
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth_middleware');

const {
  create,
  reply,
  update,
  remove,
  list,
  getRecomment
} = require('../controller/comment_controller');
//获取评论列表
commentRouter.get('/:commentId', getRecomment);
commentRouter.get('/', list);
//验证登录token
commentRouter.use('/', verifyAuth);
//创建评论
commentRouter.post('/:momentId', create);
//回复评论
commentRouter.post('/:commentId/reply', reply);
//验证修改权限
commentRouter.use('/:commentId', verifyPermission);
//修改评论
commentRouter.patch('/:commentId', update);
//删除评论
commentRouter.delete('/:commentId', remove);

module.exports = commentRouter;
