const JWT = require('jsonwebtoken');
const { SERCET_KYE } = require('../app/config');
const errType = require('../constants/error_types');
const authService = require('../service/auth.service');
const verifyAuth = async (req, res, next) => {
  //公钥解析
  try {
    console.log('验证授权');
    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const result = JWT.verify(token, SERCET_KYE);
    req.user = result;
    console.log(result);
    await next();
  } catch (error) {
    next(new Error(errType.UN_LOGIN));
  }
};

/* const verifyPermission = (tableName,Id) => {

  return async (req, res, next) => {
  
     
   const momentId=req.params[Id];
  const { id } = req.user;
  const isPermission=await authService.checkResource(tableName,momentId,id)
  if (!isPermission) {
    next(new Error(errType.NO_AUTH_CHANGE_MOMENT))
  } else{
    await next()
  }
  
}
} */
const verifyPermission = async (req, res, next) => {
  const [key] = Object.keys(req.params);

  const momentId = req.params[key];
  const tableName = key.replace('Id', '');
  const { insertId } = req.user;
  const isPermission = await authService.checkResource(
    tableName,
    momentId,
    insertId
  );
  if (!isPermission) {
    next(new Error(errType.NO_AUTH_CHANGE_MOMENT));
  } else {
    await next();
  }
};

module.exports = { verifyAuth, verifyPermission };
