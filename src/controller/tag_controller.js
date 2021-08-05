const tagService = require('../service/tag_service');

class Tag {
  async create(req, res, next) {
    const { name } = req.body;

    const result = await tagService.create(name);
    res.send(result);
  }
  async getTagList(req, res, next) {
    const { limit, offset } = req.query;
    const result = await tagService.getTagList(offset, limit);
    res.send(result);
  }
  async createColor(req, res, next) {
    const { color } = req.body;
    const result = await tagService.createColor(color);
    res.send(result);
  }
}

module.exports = new Tag();
