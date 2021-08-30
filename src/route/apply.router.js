const express = require('express');
const {
  getList,
  deleteByApplyId,
  applyInfo
} = require('../controller/apply_controller');
// const {verifyAuth}=require('../middleware/auth_middleware')
const { updateUserStatus } = require('../controller/user_controller');
const applyRouter = express.Router();
//获取全部标签verifyLabelExists
applyRouter.get('/list', getList);
applyRouter.get('/applyInfo/:filename', applyInfo);
applyRouter.patch('/:userId', updateUserStatus);
applyRouter.delete('/:applyId', deleteByApplyId);

module.exports = applyRouter;
