const crypto = require('crypto')
const md5password = (password) => {
    const md5 = crypto.createHash('md5');
    //拿到16进制的结果
    const result = md5.update(password).digest('hex');
    return result
}
module.exports = md5password