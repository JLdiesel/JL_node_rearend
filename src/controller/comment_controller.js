const commentService = require('../service/comment.service');

class CommentController {
  async create(req, res, next) {
    try {
       const { momentId } = req.params;
    const { content } = req.body;
    const { id } = req.user;
    const result = await commentService.create(momentId, content, id);
    res.send(result);
    } catch (error) {
     return   next(error);
    }
   
  }
  async reply(req, res, next) {
    try {
       const { content } = req.body;
    const { commentId } = req.params;
    const { id } = req.user;
    const result = await commentService.reply(content, id, commentId);
    res.send(result);
    } catch (error) {
      return   next(error);
    }
   
  }
  async getRecomment(req, res, next) {
    try {
      const { commentId } = req.params;
    const result = await commentService.getRecomment(commentId);
    res.send(result);
    } catch (error) {
    return   next(error);
    }
    
  }
  async update(req, res, next) {
    try {
       const { commentId } = req.params;
    const { content } = req.body;
    const result = await commentService.update(commentId, content);
    res.send(result);
    } catch (error) {
     return   next(error);
    }
   
  }
  async remove(req, res, next) {
    try {const { commentId } = req.params;
    const result = await commentService.remove(commentId);
    res.send(result);
      
    } catch (error) {
    return   next(error);
    }
  }
  async list(req, res, next) {
    try {
        const { momentId } = req.query;
    const result = await commentService.getCommentByMomentId(momentId);
    res.send(result);
    } catch (error) {
      return   next(error);
    }
  
  }
  async createVideoComment(req, res, next) {
    try {
      const { videoId } = req.params;
    const { content } = req.body;
    const { id } = req.user;
    const result = await commentService.createVideoComment(
      videoId,
      content,
      id
    );
    res.send(result);
    } catch (error) {
     return   next(error);
    }
  }
  async replyVideoComment(req, res, next) {
   try {
      const { content } = req.body;
    const { commentId } = req.params;
    const { id } = req.user;
    const result = await commentService.replyVideoComment(
      content,
      id,
      commentId
    );
    res.send(result);
   } catch (error) {
   return   next(error);
   }
  }
  async getVideoRecomment(req, res, next) {
    try {
      const { commentId } = req.params;
    const result = await commentService.getVideoRecomment(commentId);
    res.send(result);
    } catch (error) {
      return   next(error);
    }
  }
}

module.exports = new CommentController();
