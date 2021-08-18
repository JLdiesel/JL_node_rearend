const express = require('express');
const streamRouter = express.Router();
const {
  addStream,
  avatarInfo,
  getStreamList,
  quitStream
} = require('../controller/stream.controller');
const { verifyAuth } = require('../middleware/auth_middleware');
const { streamAvatarUpload } = require('../middleware/file_middleware');
streamRouter.get('/avatar/:filename', avatarInfo);
streamRouter.get('/', getStreamList);

streamRouter.use('/', verifyAuth);
streamRouter.delete('/:streamId', quitStream);
streamRouter.post('/', streamAvatarUpload.any(), addStream);

module.exports = streamRouter;
