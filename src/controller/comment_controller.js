const commentService = require('../service/comment.service');

class CommentController {
  async create(req, res, next) {
    const { momentId } = req.params;
    const { content } = req.body;
    const { id } = req.user;
    const result = await commentService.create(momentId, content, id);
    res.send(result);
  }
  async reply(req, res, next) {
    const { content } = req.body;
    const { commentId } = req.params;
    const { id } = req.user;
    const result = await commentService.reply(content, id, commentId);
    res.send(result);
  }
  async getRecomment(req, res, next) {
    const { commentId } = req.params;
    const result = await commentService.getRecomment(commentId);
    res.send(result);
  }
  async update(req, res, next) {
    const { commentId } = req.params;
    const { content } = req.body;
    const result = await commentService.update(commentId, content);
    res.send(result);
  }
  async remove(req, res, next) {
    const { commentId } = req.params;
    const result = await commentService.remove(commentId);
    res.send(result);
  }
  async list(req, res, next) {
    const { momentId } = req.query;
    const result = await commentService.getCommentByMomentId(momentId);
    res.send(result);
  }
  async createVideoComment(req, res, next) {
    const { videoId } = req.params;
    const { content } = req.body;
    const { id } = req.user;
    const result = await commentService.createVideoComment(
      videoId,
      content,
      id
    );
    res.send(result);
  }
  async replyVideoComment(req, res, next) {
    const { content } = req.body;
    const { commentId } = req.params;
    const { id } = req.user;
    const result = await commentService.replyVideoComment(
      content,
      id,
      commentId
    );
    res.send(result);
  }
  async getVideoRecomment(req, res, next) {
    const { commentId } = req.params;
    const result = await commentService.getVideoRecomment(commentId);
    res.send(result);
  }
}

module.exports = new CommentController();
