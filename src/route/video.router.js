const express = require('express');
const videoRouter = express.Router();

const {
  createVideo,
  avatarInfo,
  getVideoListBystatus,
  addVideoTag,
  videoInfo,
  getVideoInnerById
} = require('../controller/video_controller');
const { verifyLabelExists } = require('../middleware/tag_middleware');
videoRouter.post('/', createVideo);
//获取视频头像
videoRouter.get('/:videoId/avatar', avatarInfo);
//获取视频内容
videoRouter.get('/:videoId/file', videoInfo);
//通过视频分类查询视频列表
videoRouter.get('/videoListBystatus/:status', getVideoListBystatus);
//通过视频Id查询视频内容
videoRouter.get('/videoInnerById/:videoId', getVideoInnerById);

//添加标签中间件
videoRouter.use('/:videoId/videoTags', verifyLabelExists);
//添加标签
videoRouter.post('/:videoId/videoTags', addVideoTag);

module.exports = videoRouter;