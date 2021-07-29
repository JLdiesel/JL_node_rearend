class FileController{
  async saveAvatarInfo(req, res, next) {
    console.log(req.files);
    const {mimetype,filename,size}=req.files
    res.send("成功")
  }
}


module.exports=new FileController()