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
  list
} = require('../controller/comment_controller');
//获取评论列表
commentRouter.get('/', list);
//验证登录token
commentRouter.use('/', verifyAuth);
//创建评论
commentRouter.post('/', create);
//回复评论
commentRouter.post('/:commentId/reply', reply);
//验证修改权限
commentRouter.use('/:commentId', verifyPermission);
commentRouter.patch('/:commentId', update);
commentRouter.delete('/:commentId', remove);

module.exports = commentRouter;
