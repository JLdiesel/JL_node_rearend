const errType = require('../constants/error_types')
const service = require('../service/user.service')
const md5password = require('../utils/password_handle')
const verifyUser = async (req, res, next) => {
    //判断注册
    console.log('判断注册');
    //获取用户名与密码
    const { name, password } = req.body;
    //判断用户名和密码不能为空 ||name===''||password===''
    if (!name || !password) {
        next(new Error(errType.NAME_OR_PASSWORD_IS_SPACE))
    }
    //判断用户名是否被注册
    const result = await service.getUserByName(name)
    if (result.length) {
        next(new Error(errType.USER_ALREADY_EXITS))
    }
    await next()
}
const handlePassword = async (req, res, next) => {
    //转换密码
    console.log('密码转换');
    let { password } = req.body;
    //对密码进行加密
    req.body.password = md5password(password)
    await next()
}

const loginMiddleware = async (req, res, next) => {
    //判断登录
    console.log("判断登录");
    const { name, password } = req.body
    //判断用户名和密码不能为空 ||name===''||password===''
    if (!name || !password) {
        next(new Error(errType.NAME_OR_PASSWORD_IS_SPACE))
    } else {
        const result = await service.getUserByName(name)
        const md5Pw = md5password(password)

        if (!result.length) {
            next(new Error(errType.NOT_FIND_USER))
        } else if (result[0].password === md5Pw
            || result[0].password === password) {
            req.user = result[0]
            await  next()
        } else {
            next(new Error(errType.ERR_PASSWORD))
        }


    }
    

}

module.exports = {
    verifyUser,
    handlePassword, loginMiddleware
}