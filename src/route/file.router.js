const express = require('express')
// const { create } = require('../controller/file_controller')
const {upload}=require('../middleware/file_middleware')
const { verifyAuth } = require('../middleware/auth_middleware')
const {saveAvatarInfo}=require('../controller/file_controller')
const fileRouter = express.Router()

fileRouter.post('/avatar', upload.any(),saveAvatarInfo)


fileRouter.use('/',verifyAuth)

module.exports=fileRouter