const shopService = require('../service/shop.service');
const fileService = require('../service/file.service');
class shopController {
  async addShop(req, res, next) {
    try {
      console.log(123);
      const { title, price, sellnum = 0, type = 0, introduce } = req.body;
      const result = await shopService.createShop(
        title,
        price,
        sellnum,
        type,
        introduce
      );

      res.send('添加商品成功');
    } catch (error) {
      await next(error);
    }
  }

  async deleteByShopId(req, res, next) {
    try {
      const { shopId } = req.params;

      const result = await shopService.deleteByShopId(shopId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async updateShopInfo(req, res, next) {
    try {
      const { shopId } = req.params;
      console.log(123);
      const { title, price, type, introduce } = req.body;
      const result = await shopService.updateByShopId(
        shopId,
        title,
        price,
        type,
        introduce
      );
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getList(req, res, next) {
    try {
      const result = await shopService.getList();
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getShopList(req, res, next) {
    try {
      const { type } = req.params;
      const { offset, top } = req.query;
      const result = await shopService.getShopLists(type, offset, top);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async getShopHomeList(req, res, next) {
    try {
      const { offset, top } = req.query;
      const result = await shopService.getShopHomeList(offset, top);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
  async BannerPicInfo(req, res, next) {
    try {
      const { filename } = req.params;
      const fileInfo = await fileService.getBannerByFilename(filename);
      const { type } = req.query;
      const types = ['small'];
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
    } catch (error) {
      await next(error);
    }
  }
  async InnerPicInfo(req, res, next) {
    try {
      const { filename } = req.params;
      const fileInfo = await fileService.getInnerByFilename(filename);
      const { type } = req.query;
      const types = ['small'];
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
    } catch (error) {
      await next(error);
    }
  }
  async carPicInfo(req, res, next) {
    try {
      const { filename } = req.params;
      const fileInfo = await fileService.getCarByFilename(filename);
      const { type } = req.query;
      const types = ['small'];
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
    } catch (error) {
      await next(error);
    }
  }
  async addshopcar(req, res, next) {
    try {
      const { color, price } = req.body;
      const { shopcarId } = req.params;
      const result = await shopService.addshopcarInner(color, price, shopcarId);
      res.send('成功了');
    } catch (err) {
      await next(err);
    }
  }
  async getShopById(req, res, next) {
    try {
      const { shopId } = req.params;
      const result = await shopService.getShopById(shopId);
      res.send(result);
    } catch (error) {
      await next(error);
    }
  }
}

module.exports = new shopController();
