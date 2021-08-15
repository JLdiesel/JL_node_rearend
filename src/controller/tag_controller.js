const tagService = require('../service/tag_service');

class Tag {
  async create(req, res, next) {
    try{
    const { name } = req.body;

    const result = await tagService.create(name);
    res.send(result); } catch (error) {
      return   next(error)
    }
  }
  async getTagList(req, res, next) {
    try{
    const { limit, offset } = req.query;
    const result = await tagService.getTagList(offset, limit);
    res.send(result); } catch (error) {
      return   next(error)
    }
  }
}

module.exports = new Tag();
