const express = require('express');
// const useRouter=require('../route')
const userRouter = require('../route/userRouter');
const momentRouter = require('../route/moment.router');
const commentRouter = require('../route/comment.router');
const tagRouter = require('../route/tag.router');
const fileRouter = require('../route/file.router');
const errHandler = require('./err_handle');
const shopRouter = require('../route/shop.router');
const videoRouter = require('../route/video.router');
const streamRouer = require('../route/stream.router');
const roleRouter = require('../route/role.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', fileRouter);
app.use('/user', userRouter);

app.use('/moment', momentRouter);
app.use('/comment', commentRouter);
app.use('/stream', streamRouer);
app.use('/tag', tagRouter);
app.use('/shop', shopRouter);
app.use('/video', videoRouter);
app.use('/role', roleRouter);

app.use(errHandler);
module.exports = app;
