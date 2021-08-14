const fileService = require('../service/file.service');
const tagService = require('../service/tag_service');
const videoService = require('../service/video.service');

class VideoController {
  async createVideo(req, res, next) {try{
    const { title, status } = req.body;
    await videoService.createVideo(title, status);
    res.send('创建成功'); } catch (error) {
      next(error)
    }
  }

  async videoInfo(req, res, next) {try{
    //1.查找视频名
    const { videoId } = req.params;
    const avaterInfo = await fileService.getVideoByVideoId(videoId);
    // res.send(avaterInfo.filename)
    var options = {
      root: './uploads/video',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': avaterInfo.mimetype
      }
    };

    var fileName = `${avaterInfo.filename}`;

    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    }); } catch (error) {
      next(error)
    }
  }
  async avatarInfo(req, res, next) {try{
    //1.用户的头像是哪一个文件
    const { videoId } = req.params;
    const avaterInfo = await fileService.getAvatarByVideoId(videoId);
    // res.send(avaterInfo.filename)
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName = `${avaterInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName = `${avaterInfo.filename}-${type}`;
    }
    var options = {
      root: './uploads/videoAvatar',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': avaterInfo.mimetype
      }
    };

    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
       console.log('成功了');
      }
    }) } catch (error) {
      next(error)
    }
  }
  async getVideoListBystatus(req, res, next) {
    try {
    const { status } = req.params;
    const { offset = 0, top = 5 } = req.query;
    const result = await videoService.getVideoListBystatus(status, offset, top);
      res.send(result);
    } catch (error) {
      next(error)
    }
  }
  async addVideoTag(req, res, next) {try{
    //获取标签和动态ID
    const { tags } = req;
    const { videoId } = req.params;
    //添加所有的标签
    for (const tag of tags) {
      //判断动态中是否已经有标签了
      const isExist = await videoService.hasTag(videoId, tag.id);
      if (!isExist) {
        await videoService.addTag(videoId, tag.id);
      }
    }
    res.send({
      statusCode: 200,
      data: '给动态添加标签成功'
    }); } catch (error) {
      next(error)
    }
  }
  async getVideoInnerById(req, res, next) {try{
    const { videoId } = req.params;
    const result = await videoService.getVideoInnerById(videoId);
    // const result2 = await comm;
    res.send(result); } catch (error) {
      next(error)
    }
  }
}

module.exports = new VideoController();
