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
  getRecomment,
  createVideoComment,
  replyVideoComment,
  getVideoRecomment
} = require('../controller/comment_controller');
//获取评论列表
commentRouter.get('/:commentId', getRecomment);
commentRouter.get('/video/:commentId', getVideoRecomment);
//查询所有回复
commentRouter.get('/', list);
//验证登录token
commentRouter.use('/', verifyAuth);
//创建评论
commentRouter.post('/:momentId', create);
//回复评论
commentRouter.post('/:commentId/reply', reply);
//创建评论
commentRouter.post('/video/:videoId', createVideoComment);
//回复评论
commentRouter.post('/video/:commentId/reply', replyVideoComment);
//验证修改权限
commentRouter.use('/:commentId', verifyPermission);
//修改评论
commentRouter.patch('/:commentId', update);
//删除评论
commentRouter.delete('/:commentId', remove);

module.exports = commentRouter;
