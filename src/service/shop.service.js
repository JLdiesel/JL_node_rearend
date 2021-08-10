const connection = require('../app/database');

class ShopService {
  async createShop(title, price, sellnum, type, introduce) {
    const statement = `INSERT INTO shop (title,price,sellnum,type,introduce)values (?,?,?,?,?)`;
    const result = await connection.execute(statement, [
      title,
      price,
      sellnum,
      type,
      introduce
    ]);
    return result[0];
  }
  async getShopLists(type, offset, top) {
    const statement = `SELECT * from shop where type=? limit ?,? `;
    const [result] = await connection.execute(statement, [type, offset, top]);
    return result;
  }
  //更改商城封面图
  async updatePictureById(fileUrl, shopId) {
    const statement = `UPDATE shop SET imguri =? where id = ?`;
    const [result] = await connection.execute(statement, [fileUrl, shopId]);
    return result[0];
  }
  async addshopcarInner(color, price, shopcarId) {
    const statement = `INSERT INTO shopcar (id,color, price) VALUES
    (?,?,?)
ON DUPLICATE KEY UPDATE color=VALUES(color), price=VALUES(price);`;
    const [result] = await connection.execute(statement, [
      shopcarId,
      color,
      price
    ]);
    return result[0];
  }
  async getShopById(shopId) {
    const statement = `SELECT JSON_OBJECT("id",shop.id,'title',shop.title,'price',shop.price,'sellnum',shop.sellnum,"inner",shop.introduce,"imgurl",shop.imguri) shopInner ,
      (SELECT JSON_ARRAYAGG(  JSON_OBJECT("imgrl",CONCAT('http://192.168.50.146:3000/shop/shopBanner/',sbp.filename),"id",sbp.id)) FROM shopbannerpic sbp WHERE shop.id=sbp.shop_id) bannerImages ,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT("id",sc.id,"img",CONCAT('http://192.168.50.146:3000/shop/shopcar/',sc.filename),"color",sc.color ,"price",sc.price )) FROM shopcar sc WHERE shop.id=sc.shop_id) shopcarimages ,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT("imgurl",CONCAT('http://192.168.50.146:3000/shop/shopInner/',sip.filename),"id",sip.id)) FROM shopinnerpic sip WHERE shop.id=sip.shop_id) shopinnerimages 
      FROM shop   
      where  shop.id= ?

`;
    const [result] = await connection.execute(statement, [shopId]);
    return result[0];
  }
  async getShopHomeList(offset, top) {
    const statement = `SELECT * from shop  limit ?,?`;
    const [result] = await connection.execute(statement, [offset, top]);
    return result;
  }
}

module.exports = new ShopService();
