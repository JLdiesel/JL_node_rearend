const  commentService =require('../service/comment.service')


class CommentController {
  async create(req, res, next) {
    const { momentId, content } = req.body;
    const { id } = req.user;
    const result = await commentService.create(momentId, content, id)
    res.send(result)
  }
  async reply(req, res, next) {
    const { momentId, content, } = req.body;
    const {commentId}=req.params
    const { id } = req.user;
    const result = await commentService.reply(momentId, content, id,commentId)
    res.send(result)
  }
  async update(req, res, next) {
    const { commentId } = req.params;
    const { content } = req.body
    const result = await commentService.update(commentId, content)
    res.send(result)
  }
  async remove(req, res, next) {
    const { commentId } = req.params
    const result = await commentService.remove(commentId)
    res.send(result)
  }
  async list(req, res, next) {
    const { momentId } = req.query;
    console.log(momentId);
    const result =await commentService.getCommentByMomentId(momentId)
    res.send(result)
  }
} 

module.exports = new CommentController()