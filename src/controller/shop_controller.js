const shopService = require('../service/shop.service');
const fileService = require('../service/file.service');
class shopController {
  async addShop(req, res, next) {
    const { title, price, sellnum, type, introduce } = req.body;
    const result = await shopService.createShop(
      title,
      price,
      sellnum,
      type,
      introduce
    );
    res.send('添加商品成功');
  }
  async getShopList(req, res, next) {
    const { type } = req.params;
    const { offset, top } = req.query;
    const result = await shopService.getShopLists(type, offset, top);
    res.send(result);
  }
  async getShopHomeList(req, res, next) {
    const { offset, top } = req.query;
    const result = await shopService.getShopHomeList(offset, top);
    res.send(result);
  }
  async BannerPicInfo(req, res, next) {
    const { filename } = req.params;
    const fileInfo = await fileService.getBannerByFilename(filename);
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName2 = `${fileInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName2 = `${fileInfo.filename}-${type}`;
    }

    var options = {
      root: './uploads/shop',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': fileInfo.mimetype
      }
    };

    res.sendFile(fileName2, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    });
  }
  async InnerPicInfo(req, res, next) {
    const { filename } = req.params;
    const fileInfo = await fileService.getInnerByFilename(filename);
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName2 = `${fileInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName2 = `${fileInfo.filename}-${type}`;
    }

    var options = {
      root: './uploads/shop',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': fileInfo.mimetype
      }
    };

    res.sendFile(fileName2, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    });
  }
  async carPicInfo(req, res, next) {
    const { filename } = req.params;
    const fileInfo = await fileService.getCarByFilename(filename);
    const { type } = req.query;
    const types = ['large', 'middle', 'small'];
    let fileName2 = `${fileInfo.filename}`;
    if (types.some((item) => item === type)) {
      fileName2 = `${fileInfo.filename}-${type}`;
    }

    var options = {
      root: './uploads/shop',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': fileInfo.mimetype
      }
    };

    res.sendFile(fileName2, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('成功了');
      }
    });
  }
  async addshopcar(req, res, next) {
    const { color, price } = req.body;
    const { shopcarId } = req.params;
    const result = await shopService.addshopcarInner(color, price, shopcarId);
    res.send('成功了');
  }
  async getShopById(req, res, next) {
    const { shopId } = req.params;
    const result = await shopService.getShopById(shopId);
    res.send(result);
  }
}

module.exports = new shopController();
