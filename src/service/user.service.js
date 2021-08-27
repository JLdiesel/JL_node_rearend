const connection = require('../app/database');
class UserService {
  //注册传入数据库
  async create(user) {
    try {
      const { name, password } = user;
      const statement = `INSERT INTO user (name,password) VALUES(?,?)`;

      const result = await connection.execute(statement, [name, password]);

      return result[0];
    } catch (error) {
      return error;
    }

    //将user存储到数据库中
  }
  //通过name查找user密码
  async getUserByName(name) {
    try {
      const statement = `select * from user where name=?`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //通过id查找用户数据
  async getUserById(id) {
    try {
      const statement = `select u.nickName nickName,u.sex sex,u.birthday birthday ,u.ownSay ownSay,u.isStream isStream,u.avatar_url avatar,
    u.backgroundUrl bg,u.id id,
(SELECT    COUNT(follow_user_id) 
FROM follow f 
LEFT JOIN user  us on f.follow_user_id=us.id 
WHERE u.id=f.user_id) 
fansCount,
(SELECT    COUNT(user_id) 
FROM follow  f LEFT JOIN user  us on f.follow_user_id=us.id 
WHERE u.id=follow_user_id and status = 0) followCount
from user u
where id=?`;
      const result = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  //登录查询数据库
  async login(name) {
    try {
      const statement = `select * from user where name=? `;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    try {
      const statement = `UPDATE user SET avatar_url =? where id = ?`;
      const [result] = await connection.execute(statement, [avatarUrl, userId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateBackgroundById(avatarUrl, userId) {
    try {
      const statement = `UPDATE user SET backgroundUrl =? where id = ?`;
      const [result] = await connection.execute(statement, [avatarUrl, userId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateUserInfo(id, nickName, sex, birthday, ownSay) {
    try {
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
    } catch (error) {
      return error;
    }
  }
  async removeFollow(insertId, userId) {
    try {
      const statement = `DELETE FROM follow WHERE user_id=? AND follow_user_id =?`;
      const [result] = await connection.execute(statement, [userId, insertId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async createFollow(insertId, userId) {
    try {
      const statement = `INSERT INTO follow (user_id,follow_user_id) VALUES (?,?)`;
      const [result] = await connection.execute(statement, [userId, insertId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getFollow(insertId) {
    try {
      const statement = `
   SELECT   COUNT(follow_user_id) followCount,JSON_ARRAYAGG(JSON_OBJECT("id",u.id,"name",u.nickName,"avatar",u.avatar_url ))  follow
FROM follow f 
LEFT JOIN user  u on f.user_id=u.id 
WHERE f.follow_user_id=? and status = 0`;
      const [result] = await connection.execute(statement, [insertId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getFans(insertId) {
    try {
      const statement = `
   SELECT  COUNT(user_id) fansCount,JSON_ARRAYAGG( JSON_OBJECT("id",u.id,"name",u.nickName,"avatar",u.avatar_url )) fans
FROM follow  f LEFT JOIN user  u on f.follow_user_id=u.id 
WHERE f.user_id=? and status = 0
    `;
      const [result] = await connection.execute(statement, [insertId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async updateUserStatus(userId) {
    try {
      const statement = `UPDATE user set isStream =0 where id=?`;
      const [result] = await connection.execute(statement, [userId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  //获取用户地址
  async getUserAddress(userId) {
    try {
      const statement = `SELECT COUNT(address) addressCount,JSON_ARRAYAGG(JSON_OBJECT("id",uad.id,"name",uad.name,"phoneNum",uad.phoneNum,"address",uad.address,"isdefault",uad.isdefault))  address
FROM useraddress  uad
left JOIN  user  u ON uad.user_id=u.id
WHERE user_id=?

`;
      const [result] = await connection.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async addAddress(userId, name, phoneNum, address) {
    try {
      const statement = `INSERT INTO useraddress (user_id,name,phoneNum,address) VALUES (?,?,?,?)

`;
      const [result] = await connection.execute(statement, [
        userId,
        name,
        phoneNum,
        address
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async removeAddress(addressId) {
    try {
      const statement = `DELETE FROM useraddress WHERE id =?`;
      const [result] = await connection.execute(statement, [addressId]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async addOrider(shopId, shopCarId, insertId, addressId, count, howPay) {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async getOriderByOriderId(oriderId) {
    try {
      const statement = `SELECT  JSON_OBJECT("address",ua.address,"phoneNum",ua.phoneNum,"name",ua.name) address,
JSON_OBJECT("title",shop.title,"img",CONCAT('http://120.79.86.32:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price)  shop,
od.howPay howPay, od.createAt createTime,od.status status
FROM orider od
LEFT JOIN shopcar  sc ON sc.id=od.shopCar_id
LEFT JOIN shop  ON shop.id=od.shop_id
LEFT JOIN useraddress ua ON ua.id=od.address_id
WHERE  od.id=?
`;
      const [result] = await connection.execute(statement, [oriderId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getOriderListByUserId(userId, offset, top) {
    try {
      const statement = `SELECT IF(COUNT(od.id),JSON_ARRAYAGG(
JSON_OBJECT("oriderId",od.id,"title",shop.title,"img",CONCAT('http://120.79.86.32:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price,"status",status,"createAt",od.createAt)
),null) oriderList
    FROM user  u
left JOIN orider od ON u.id= od.user_id
left JOIN shop  ON shop.id=od.shop_id
left JOIN shopcar  sc ON sc.id=od.shopCar_id
WHERE  u.id=?
limit ?,?
`;
      const [result] = await connection.execute(statement, [
        userId,
        offset,
        top
      ]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async getOriderListByStatus(userId, status) {
    try {
      const statement = `SELECT JSON_ARRAYAGG(
        JSON_OBJECT("oriderId",od.id,"title",shop.title,"img",CONCAT('http://120.79.86.32:3000/shop/shopcar/',sc.filename),"color",sc.color,"count",od.count,"price",sc.price,"status",status)) oriderList
        FROM user  u
        left JOIN orider od ON u.id= od.user_id
        left JOIN shop  ON shop.id=od.shop_id
        left JOIN shopcar  sc ON sc.id=od.shopCar_id
        WHERE  u.id=? AND od.status=?
`;
      const [result] = await connection.execute(statement, [userId, status]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async changeOriderListStatus(oriderId, status) {
    try {
      const statement = `update  orider set status=? where id =?`;
      const [result] = await connection.execute(statement, [status, oriderId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async removeOriderListById(oriderId) {
    try {
      const statement = `DELETE from  orider where id = ?`;
      const [result] = await connection.execute(statement, [oriderId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async clearDefaultAddress(userId) {
    try {
      const statement = `UPDATE useraddress SET isdefault =0 WHERE user_id=? AND isdefault =1`;
      const result = await connection.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async changeUserDefaultAddress(addressId) {
    try {
      const statement = `UPDATE useraddress SET isdefault =1 WHERE id=?`;
      const result = await connection.execute(statement, [addressId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }
  async findDefaultAddress(userId) {
    try {
      const statement = `select * from  useraddress where user_id =? and isdefault=1`;
      const [result] = await connection.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      return error;
    }
  }

  async createApply(realName, idCard, id) {
    try {
      const statement = `insert into apply (realName,idCard,user_id) values (?,?,?)`;
      const [result] = await connection.execute(statement, [
        realName,
        idCard,
        id
      ]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getUserList() {
    const statement = `SELECT JSON_OBJECT("totalCount",COUNT(id),"list",JSON_ARRAYAGG(JSON_OBJECT("id",id,"name",name,"realName",nickName,"sex",sex,"ownSay",ownSay,"isStream",isStream)) ) data  FROM user`
     const [result] = await connection.execute(statement);
      return result;
  }
}
module.exports = new UserService();
