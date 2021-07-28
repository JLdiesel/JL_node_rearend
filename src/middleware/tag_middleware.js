const tagService=require('../service/tag_service')

const verifyLabelExists = async (req, res, next) => {
  const { tags } = req.body
  //判断每一个标签是否在label表中穿着
  const newTags = []
  for (const name of tags) {
    const tagResult =await tagService.getTagByName(name)
    const tag={name}

    //标签不存在
    if (!tagResult.length) {
      const result = await tagService.create(name)
      tag.id = result.insertId;
    } else {
      tag.id=tagResult[0].id
    }
     newTags.push(tag)
  }

  req.tags=newTags

  await next()
}


module.exports={verifyLabelExists}