const applyService = require('../service/apply_service');

class Tag {
  async getList(req, res, next) {
    const result = await applyService.getList();
    res.send(result);
  }
  async deleteByApplyId(req, res, next) {
    const { applyId } = req.params;
    const result = await applyService.deleteByApplyId(applyId);
    res.send(result);
  }
  async applyInfo(req, res, next) {
    try {
      //1.用户的头像是哪一个文件
      const { filename } = req.params;
      var options = {
        root: './uploads/apply',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
          'Content-Type': 'image/png'
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
      await next(error);
    }
  }
}

module.exports = new Tag();
