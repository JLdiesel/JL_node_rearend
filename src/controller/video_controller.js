const fileService = require('../service/file.service');
const tagService = require('../service/tag_service');
const videoService = require('../service/video.service');
const fs = require('fs');
class VideoController {
  async createVideo(req, res, next) {
    try {
      const { title, status, ezcontent } = req.body;
      const result = await videoService.createVideo(title, status, ezcontent);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getVideoList(req, res, next) {
    const result = await videoService.getVideoList();
    res.send(result);
  }
  async removeById(req, res, next) {
    const { videoId } = req.params;
    const result = await videoService.removeById(videoId);
    res.send(result);
  }
  async updateById(req, res, next) {
    const { videoId } = req.params;
    const { title, ezcontent, status } = req.body;
    console.log(req.body);
    const result = await videoService.updateById(
      videoId,
      title,
      ezcontent,
      status
    );
    res.send(result);
  }
  async videoInfo(req, res, next) {
    try {
      //1.查找视频名
      const { videoId } = req.params;
      const avaterInfo = await fileService.getVideoByVideoId(videoId);

      const videoPath = `uploads/video/${avaterInfo.filename}`;
      const videoStat = fs.statSync(videoPath);
      const fileSize = videoStat.size;
      const videoRange = req.headers.range;
      if (videoRange) {
        console.log(234);
        const parts = videoRange.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    } catch (error) {
      await next(error);
    }
  }
  async avatarInfo(req, res, next) {
    try {
      //1.用户的头像是哪一个文件
      const { videoId } = req.params;
      const avaterInfo = await fileService.getAvatarByVideoId(videoId);
      // res.send(avaterInfo.filename)
      const { type } = req.query;
      const types = ['small'];
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
      });
    } catch (error) {
      await next(error);
    }
  }
  async getVideoListBystatus(req, res, next) {
    try {
      const { status } = req.params;
      const { offset = 0, top = 5 } = req.query;
      const result = await videoService.getVideoListBystatus(
        status,
        offset,
        top
      );
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async addVideoTag(req, res, next) {
    try {
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
      });
    } catch (error) {
      await next(error);
    }
  }
  async getVideoInnerById(req, res, next) {
    try {
      const { videoId } = req.params;
      const result = await videoService.getVideoInnerById(videoId);
      // const result2 = await comm;
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getVideoCommentById(req, res, next) {
    try {
      const { videoId } = req.params;
      const result = await videoService.getVideoCommentById(videoId);
      res.send(result);
    } catch (err) {
      await next(err);
    }
  }
}

module.exports = new VideoController();
