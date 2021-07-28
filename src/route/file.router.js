const express = require('express')
const { create } = require('../controller/file_controller')
const {verifyAuth}=require('../middleware/auth_middleware')
const fileRouter = express.Router()
fileRouter.use('/',verifyAuth)
fileRouter.post('/avatar',create)
module.exports=fileRouter