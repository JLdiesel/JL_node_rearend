const express = require('express');
const { create, getTagList } = require('../controller/tag_controller.js');
// const {verifyAuth}=require('../middleware/auth_middleware')
const tagRouter = express.Router();
//获取全部标签verifyLabelExists
tagRouter.get('/', getTagList);
// tagRouter.use('/',verifyAuth)

//创建标签
tagRouter.post('/', create);

module.exports = tagRouter;
