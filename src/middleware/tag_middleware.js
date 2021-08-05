const tagService = require('../service/tag_service');

const verifyLabelExists = async (req, res, next) => {
  const { tags } = req.body;
  //判断每一个标签是否在label表中穿着
  const newTags = [];
  for (const name of tags) {
    const tagResult = await tagService.getTagByName(name);
    const tag = { name };

    //标签不存在
    if (!tagResult.length) {
      const result = await tagService.create(name);
      tag.id = result.insertId;
    } else {
      tag.id = tagResult[0].id;
    }
    newTags.push(tag);
  }

  req.tags = newTags;

  await next();
};
/* const verifyColorExists = async (req, res, next) => {
  const { colors } = req.body;
  //判断每一个标签是否在label表中穿着
  const newColors = [];
  for (const name of colors) {
    const colorResult = await tagService.getColorByName(name);
    const color = { name };

    //标签不存在
    if (!colorResult.length) {
      const result = await tagService.createColor(name);
      color.id = result.insertId;
    } else {
      color.id = tagResult[0].id;
    }
    newColors.push(tag);
  }

  req.colors = newColors;

  await next();
}; */

module.exports = { verifyLabelExists };
