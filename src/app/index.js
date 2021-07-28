const express = require('express')
// const useRouter=require('../route')
const userRouter = require('../route/userRouter')
const momentRouter = require('../route/moment.router')
const commentRouter = require('../route/comment.router')
const tagRouter = require('../route/tag.router')
// const fileRouter=require('../route/file.router')
const errHandler = require('./err_handle')

const app = express()


app.use(express.json())

app.use('/user', userRouter);

app.use('/moment', momentRouter)
app.use('/comment',commentRouter)
app.use('/tag', tagRouter)
// app.use('/uploads',fileRouter)
app.use(errHandler)
module.exports = app