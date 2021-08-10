const errTypes = require('../constants/error_types');

const errHandler = (err, req, res, next) => {
  let status, message;
  switch (err.message) {
    case errTypes.NAME_OR_PASSWORD_IS_SPACE:
      status = 400; //bad request
      message = '用户名或者密码不能为空';
      break;
    case errTypes.USER_ALREADY_EXITS:
      status = 400; //bad request
      message = '用户名已经被注册';
      break;
    case errTypes.NOT_FIND_USER:
      status = 400; //用户名未注册
      message = '用户名不存在';
      break;
    case errTypes.ERR_PASSWORD:
      status = 400; //用户名密码错误
      message = '密码错误';
      break;
    case errTypes.UN_LOGIN:
      status = 401; //需要token验证
      message = '登录已过期，请重新登录';
      break;
    case errTypes.CANT_FIND_CONTETN:
      status = 401; //需要token验证
      message = '用户未注册';
      break;
    case errTypes.NO_AUTH_CHANGE_MOMENT:
      status = 401; //需要token验证
      message = '用户无权修改该评论';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
      break;
  }
  res.status(status);

  res.json({
    errCode: status,
    errMessage: message
  });
};

module.exports = errHandler;
