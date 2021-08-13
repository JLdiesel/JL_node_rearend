const fileService = require('../service/file.service');
const momentService = require('../service/moment.service');

class MomentController {
  async create(req, res, next) {
    try {
      //取出发表的言论和用户ID
      const userID = req.user.id;
      const { content, title, status } = req.body;
      //讲输入信息传入到数据库
      const result = await momentService.create(userID, content, title, status);
      res.send({
        id: userID,
        message: '当前用户发表评论成功',
        code: 200
      })
    }catch (error) {
      console.log(error);
    }
  }
  async detailByMomentId(req, res, next) {
       try {
    const momentId = req.params.momentId;
    const result = await momentService.getMomentByMomentId(momentId);
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
  //通过用户ID 查询该用户的文章
    async currentUserReviews(req, res, next) {
       try {
    const { id } = req.user;
    const result = await momentService.getMomentByUserId(id);
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
    async detailListbyStatus(req, res, next) {
       try {
    const { offset, size } = req.query;
    const { status } = req.params;
    const result = await momentService.getMomentList(offset, size, status);
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
    async update(req, res, next) {
       try {
    const { momentId } = req.params;
    const { content } = req.body;

    const result = await momentService.updateById(content, momentId);
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
    async remove(req, res, next) {
       try {
    const { momentId } = req.params;
    const result = await momentService.deleteById(momentId);
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
    async addTags(req, res, next) {
       try {
    //获取标签和动态ID
    const { tags } = req;
    const { momentId } = req.params;
    //添加所有的标签
    for (const tag of tags) {
      //判断动态中是否已经有标签了
      const isExist = await momentService.hasTag(momentId, tag.id);
      if (!isExist) {
        await momentService.addTag(momentId, tag.id);
      }
    }
    res.send({
      statusCode: 200,
      data: '给动态添加标签成功'
    });} catch (error) {
    console.log(error);
  }
  }
    async fileInfo(req, res, next) {
       try {
    const { filename } = req.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName2 = `${fileInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName2 = `${fileInfo.filename}-${type}`;
    }

    var options = {
      root: './uploads/pic',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': fileInfo.mimetype
      }
    };

    res.sendFile(fileName2, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    })} catch (error) {
    console.log(error);
  }
  }
    async createByStatus(req, res, next) {
       try {
    const { status } = req.params;
    const { content, ezcontent, title } = req.body;
    const result = await momentService.createByStatus(
      content,
      ezcontent,
      title,
      status
    );
    res.send(result);} catch (error) {
    console.log(error);
  }
  }
  //通过status获取文章列表
    async getListByStatus(req, res, next) {
       try {
    const { status } = req.params;
    const { offset = 0, top = 5 } = req.query;
    const result = await momentService.getListByStatus(status, offset, top);
         res.send(result);
       }
       catch (error) {
    console.log(error);
  }
  }
}

module.exports = new MomentController();
