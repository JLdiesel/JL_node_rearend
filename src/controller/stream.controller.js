const streamService = require('../service/stream.service');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

class Stream {
  async quitStream(req, res, next) {
    try {
      const { streamId } = req.params;
      await streamService.quitStream(streamId);
      res.send('退出成功');
    } catch (error) {
      return next(error);
    }
  }
  async getToken(req, res, next) {
    const appID = '29792ec3eded410facd609fb7ad76fef';
    const appCertificate = 'ed2b1a3133144492aa549f4d404b19bd';
    const channelName = req.params.channelName;
    const uid = 0;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );
    res.send(token);
  }
  async addStream(req, res, next) {
    try {
      const { id } = req.user;
      const [file] = req.files;
      const { name, token, cannalName } = req.body;
      const result = await streamService.createStream(
        id,
        name,
        token,
        cannalName
      );
      const { insertId } = result;
      const { filename, mimetype, size } = file;
      await streamService.createFile(filename, mimetype, size, insertId);
      const fileUrl = `${APP_HOST}:${APP_PORT}/stream/avatar/${filename}`;
      await streamService.updateAvatar(fileUrl, insertId);
      res.send(result);
    } catch (error) {
      return next(error);
    }
  }
  async avatarInfo(req, res, next) {
    try {
      const { filename } = req.params;
      const fileInfo = await streamService.getFileByFilename(filename);
      console.log(fileInfo);

      var options = {
        root: './uploads/streamAvatar',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
          'Content-Type': fileInfo.mimetype
        }
      };

      res.sendFile(filename, options, function (err) {
        if (err) {
          next(err);
        } else {
          console.log('成功了');
        }
      });
    } catch (error) {
      return next(error);
    }
  }
  async getStreamList(req, res, next) {
    const { offset = 0, top = 10 } = req.query;
    const result = await streamService.getStreamList(offset, top);
    res.send(result);
  }
}

module.exports = new Stream();
