const roleService = require('../service/role_service');
class RoleController {
  async create(req, res, next) {
    const { name, content } = req.body;
    const file = req.files[0];
    const result = await roleService.create(name, content);
    const { insertId } = result;
    const files = req.files;
    const { filename } = file;
    for (const file of files) {
      const { filename, mimetype, size } = file;
      await roleService.createFile(filename, mimetype, size, insertId);
    }
    const fileUrl = `${APP_HOST}:${APP_PORT}/role/avatar/${filename}`;
    await roleService.updateAvatar(fileUrl, insertId);
    res.send('成功了');
  }
  async avatarInfo(req, res, next) {
    const { filename } = req.params;
    const fileInfo = await roleService.getFileByFilename(filename);
    var options = {
      root: './uploads/roleAvatar',
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
  }
  async getRoleList(req, res, next) {
    const { offset = 0, top = 10 } = req.query;
    const result = await roleService.getRoleList(offset, top);
    res.send(result);
  }
  async getRoleVideoById(req, res, next) {
    const { roleId } = req.params;
    const result = await roleService.getRoleVideoById(roleId);
    res.send(result);
  }
  async getRoleMomentById(req, res, next) {
    const { roleId } = req.params;
    const result = await roleService.getRoleMomentById(roleId);
    res.send(result);
  }
  async getRolePicById(req, res, next) {
    const { roleId } = req.params;
    const result = await roleService.getRolePicById(roleId);
    res.send(result);
  }
}
module.exports = new RoleController();
