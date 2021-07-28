const express = require('express')

const momentRouter = express.Router()
const {remove, create, detailList, currentUserReviews,
  detailByMomentId, update,addTags,getMomentAll } = require('../controller/moment_controller')
const { verifyAuth, verifyPermission} = require('../middleware/auth_middleware')
const { verifyLabelExists  }=require('../middleware/tag_middleware')
// authRouter.use('/',loginMidware)
momentRouter.get('/detailbymomentid/:momentId', detailByMomentId)

momentRouter.get('/detaillist', detailList)



momentRouter.use('/', verifyAuth)
momentRouter.get('/currentUserReviews', currentUserReviews)
momentRouter.post('/', create)
momentRouter.use('/:momentId',verifyPermission)
momentRouter.patch('/:momentId',update)
momentRouter.delete('/:momentId',remove)
momentRouter.use('/:momentId/tags',verifyLabelExists)
momentRouter.post('/:momentId/tags', addTags)


module.exports = momentRouter