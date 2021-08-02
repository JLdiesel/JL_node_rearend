var express = require('express');
var router = express.Router();
const multiparty  = require('multiparty')
const fs = require('fs')
const sqlConnect = require('./database');


//获取动态的所有数据
router.get('/allDongtai', function(req, res, next){
    let sql = `select  a.*,JSON_ARRAYAGG(b.pic) as pic,c.portrait,c.nickname,(SELECT count(d.content) from comment d where a.title_id =d.comment_id)as counts
    from dongtai_details a left join dongtai_pic b  on  a.title_id = b.pic_id left join person c on a.username = c.username group by a.title_id ORDER BY a.fabiao_time DESC;`;
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log(err);
        } else {
          console.log('data',data)
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
  })
  
//发布动态 存放图片信息
router.post('/releaseDongtai', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function(err, fields, files) {
        console.log(fields)
        var filesTmp = JSON.stringify(files);
        var pr = JSON.parse(filesTmp)
        var sqlArr = []
        if (!err){
            for (var i = 0 ; i < pr.files.length ; i++){
                let inputdata = files.files[i]
                let newPath = form.uploadDir + "/" + inputdata.originalFilename;
                sqlArr.push(inputdata.originalFilename)
                //同步重命名文件名 fs.renameSync(oldPath, newPath)
            　　　 //oldPath  不得作更改，使用默认上传路径就好
                fs.renameSync(inputdata.path, newPath); 
                res.send({files:inputdata,mes:'上传成功'})
            }
            console.log('sqlarr',sqlArr)
            //传入服务器
            let sql = `INSERT INTO dongtai_pic(pic,pic_id) VALUES (concat('http://192.168.50.117:3000/public/images/',"${sqlArr}"),"${fields.uuid}");`
            let callBack = (err,data)=>{
                if (err){
                    console.log(err);
                } 
            };
            sqlConnect(sql,sqlArr,callBack);
            } else {
            console.log(err)
        } 
    });
  });

  //发布动态 存放标题日期等信息
router.post('/title', function(req, res, next){
    let arr = req.body;
    console.log('arr',arr)
    let sql = `insert into dongtai_details(title,fabiao_time,dianzan,username,title_id) values ("${arr.title}","${arr.fabiao_time}",0,"${arr.username}","${arr.uuid}")`;
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log('err',err);
        } else {
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
})

//获取帖子中的评论信息
router.post('/comment',function(req,res,next){
    //let arr = req.headers;
    let arr = req.headers;
    console.log('arr',arr)
    let sql =  `select a.id,a.content,a.date_zhu,a.dianzan,b.nickname,b.portrait,count(c.content_huifu) as counts
        from comment a left join person b  on  a.username = b.username  left join comment_huifu c on a.id = parent_id
        where a.comment_id = "${arr.title_id}" group by a.id order by a.date_zhu desc`
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log('连接出错',err);
        } else {
            console.log('data',data)
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
})

//获取评论里的回复信息
router.post('/comment_huifu',function(req,res,next){
    //let arr = req.headers;
    let arr = req.headers;
    console.log('arr',arr)
    let sql =  `select a.id,a.content_huifu,a.date_huifu,b.nickname,b.portrait
        from comment_huifu a left join person b  on  a.username = b.username 
        where a.parent_id = "${arr.id}" order by date_huifu desc`
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log('连接出错',err);
        } else {
            console.log('data',data)
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
})

//发送回复
router.post('/insert_huifu',function(req,res,next){
    //let arr = req.headers;
    let arr = req.body;
    console.log('arr',arr)
    let sql =  `insert into comment_huifu(content_huifu,parent_id,date_huifu,username) value ("${arr.content_huifu}","${arr.parent_id}","${arr.date_huifu}","${arr.username}")`
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log('连接出错',err);
        } else {
            console.log('data',data)
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
})

//发送评论
router.post('/insert_comment',function(req,res,next){
    //let arr = req.headers;
    let arr = req.body;
    console.log('arr',arr)
    let sql =  `insert into comment(comment_id,content,username,date_zhu,dianzan) value ("${arr.comment_id}","${arr.content}","${arr.username}","${arr.date_zhu}",0)`
    let sqlArr = [];
    let callBack = (err,data)=>{
        if (err){
            console.log('连接出错',err);
        } else {
            console.log('data',data)
            res.send(
                data,
            );
        }
    };
    sqlConnect(sql,sqlArr,callBack);
})

module.exports = router;