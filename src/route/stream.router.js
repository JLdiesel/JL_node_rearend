const express = require('express');
const streamRouter = express.Router();
const {
  addStream,
  avatarInfo,
  getStreamList,
  deleteStream
} = require('../controller/stream.controller');
const { verifyAuth } = require('../middleware/auth_middleware');
const { streamAvatarUpload } = require('../middleware/file_middleware');
streamRouter.get('/avatar/:filename', avatarInfo);
streamRouter.get('/', getStreamList);
streamRouter.use('/', verifyAuth);

streamRouter.post('/', streamAvatarUpload.any(), addStream);
streamRouter.delete('/:streamId', deleteStream);

module.exports = streamRouter;
