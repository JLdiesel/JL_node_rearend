const express = require('express')
const { create,getTagList } = require('../controller/tag_controller.js')
// const {verifyAuth}=require('../middleware/auth_middleware')
const tagRouter = express.Router()

tagRouter.get('/',getTagList)
// tagRouter.use('/',verifyAuth)
tagRouter.post('/',create)




module.exports=tagRouter