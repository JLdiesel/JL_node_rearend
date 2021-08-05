const connection = require('../app/database');
class UserService {
  //注册传入数据库
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES(?,?)`;

    const result = await connection.execute(statement, [name, password]);

    return result[0];

    //将user存储到数据库中
  }
  //通过name查找user密码
  async getUserByName(name) {
    const statement = `select * from user where name=?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  //通过name查找user密码
  async getUserById(id) {
    const statement = `select * from user where id=?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  //登录查询数据库
  async login(name) {
    const statement = `select * from user where name=? `;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url =? where id = ?`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result[0];
  }
  async updateUserInfo(id, nickName, sex, birthday, ownSay) {
    const statement = `INSERT INTO user (id,nickName, sex, birthday,ownSay) VALUES
    (?,?,?,?,?)
ON DUPLICATE KEY UPDATE nickName=VALUES(nickName), sex=VALUES(sex), birthday=VALUES(birthday), ownSay=VALUES(ownSay); `;
    const [result] = await connection.execute(statement, [
      id,
      nickName,
      sex,
      birthday,
      ownSay
    ]);
    return result[0];
  }
  async removeFollow(insertId, userId) {
    const statement = `DELETE FROM follow WHERE user_id=? AND follow_user_id =?`;
    const [result] = await connection.execute(statement, [insertId, userId]);
    return result;
  }
  async createFollow(insertId, userId) {
    const statement = `INSERT INTO follow (user_id,follow_user_id) VALUES (?,?)`;
    const [result] = await connection.execute(statement, [insertId, userId]);
    return result;
  }
  async getFollow(insertId) {
    const statement = `SELECT   COUNT(follow_user_id) followCount,JSON_ARRAYAGG(JSON_OBJECT("id",f.follow_user_id,"name",u.nickName,"avatar",u.avatar_url ))  follow
FROM follow f LEFT JOIN user  u on f.follow_user_id=u.id 
WHERE user_id=? and status = 0`;
    const [result] = await connection.execute(statement, [insertId]);
    return result;
  }
  async getFans(insertId) {
    const statement = `SELECT   COUNT(user_id) fansCount,JSON_ARRAYAGG( JSON_OBJECT("id",f.follow_user_id,"name",u.nickName,"avatar",u.avatar_url )) fans
FROM follow  f LEFT JOIN user  u on f.follow_user_id=u.id 
WHERE follow_user_id=? and status = 0`;
    const [result] = await connection.execute(statement, [insertId]);
    return result;
  }
  async updateUserStatus(userId) {
    const statement = `UPDATE user set isStream =0 where id=?`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  //获取用户地址
  async getUserAddress(userId) {
    const statement = `SELECT COUNT(address) followCount,JSON_ARRAYAGG(JSON_OBJECT("name",uad.name,"phoneNum",uad.phoneNum,"address",uad.address,"isdefault",uad.isdefault))  address
FROM useraddress  uad
left JOIN  user  u ON uad.user_id=u.id
WHERE user_id=?

`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  async addAddress(userId, name, phoneNum, address) {
    const statement = `INSERT INTO useraddress (user_id,name,phoneNum,address) VALUES (?,?,?,?)

`;
    const [result] = await connection.execute(statement, [
      userId,
      name,
      phoneNum,
      address
    ]);
    return result;
  }
  async removeAddress(addressId) {
    const statement = `DELETE FROM useraddress WHERE id =?`;
    const [result] = await connection.execute(statement, [addressId]);
    return result;
  }
  async addOrider(shopId, shopCarId, insertId, addressId, count, howPay) {
    const statement = `Insert into orider (shop_id,shopCar_id,user_id,address_id
      ,count,howPay)  values(?,?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      shopId,
      shopCarId,
      insertId,
      addressId,
      count,
      howPay
    ]);
    return result;
  }

  async getOriderByOriderId(oriderId) {
    const statement = `SELECT  JSON_OBJECT("address",ua.address,"phoneNum",ua.phoneNum,"name",ua.name) address,
JSON_OBJECT("title",shop.title,"img",CONCAT('http://192.168.50.146:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price)  shop,
od.howPay howPay, od.createAt createTime,od.status status
FROM orider od
LEFT JOIN shopcar  sc ON sc.id=od.shopCar_id
LEFT JOIN shop  ON shop.id=od.shop_id
LEFT JOIN useraddress ua ON ua.id=od.address_id
WHERE  od.id=?
`;
    const [result] = await connection.execute(statement, [oriderId]);
    return result[0];
  }
  async getOriderListByUserId(userId) {
    const statement = `SELECT JSON_ARRAYAGG(
JSON_OBJECT("oriderId",od.id,"title",shop.title,"img",CONCAT('http://192.168.50.146:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price,"status",status)) oriderList
FROM user  u
left JOIN orider od ON u.id= od.user_id
left JOIN shop  ON shop.id=od.shop_id
left JOIN shopcar  sc ON sc.id=od.shopCar_id
WHERE  u.id=?
`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  async getOriderListByStatus(userId, status) {
    const statement = `SELECT JSON_ARRAYAGG(
        JSON_OBJECT("oriderId",od.id,"title",shop.title,"img",CONCAT('http://192.168.50.146:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price,"status",status)) oriderList
        FROM user  u
        left JOIN orider od ON u.id= od.user_id
        left JOIN shop  ON shop.id=od.shop_id
        left JOIN shopcar  sc ON sc.id=od.shopCar_id
        WHERE  u.id=? AND od.status=?
`;
    const [result] = await connection.execute(statement, [userId, status]);
    return result[0];
  }
  async changeOriderListStatus(oriderId, status) {
    const statement = `update  orider set status=? where id =?`;
    const [result] = await connection.execute(statement, [status, oriderId]);
    return result[0];
  }
  async removeOriderListById(oriderId) {
    const statement = `DELETE from  orider where id = ?`;
    const [result] = await connection.execute(statement, [oriderId]);
    return result[0];
  }
}
module.exports = new UserService();
