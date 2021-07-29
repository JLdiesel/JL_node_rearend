const multer=require('multer')
const path=require('path')
const storage = multer.diskStorage({
    destination:  './uploads/',
    filename: (req, file, cb) => {
        //第二个字段传文件名
        cb(null, Date.now() + path.extname(file.originalname));
    },

})

const upload = multer({
    // dest: './uploads/'
    storage
});

module.exports={upload}