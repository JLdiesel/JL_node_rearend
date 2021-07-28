const momentService = require('../service/moment.service')

class MomentController {
    async create(req, res, next) {
        console.log(req.user);
        //取出发表的言论和用户ID
        const userID = req.user.id;
        const content = req.body.content
        console.log(userID);
        console.log(content);
        //讲输入信息传入到数据库
        const result = await momentService.create(userID, content)
        console.log(result);
        res.send({
            id: userID,
            message: '当前用户发表评论成功',
            code: 200
        })
    }
    async detailByMomentId(req, res, next) {
        console.log(req.params.momentId);
        const momentId = req.params.momentId
        const result = await momentService.getMomentByMomentId(momentId)
        res.send(result)

    }
    //通过用户ID 查询该用户的文章
    async currentUserReviews(req, res, next) {
        const {id} = req.user
        const result = await momentService.getMomentByUserId(id)
        res.send(result)
    }
    async detailList(req, res, next) {
        const { offset, size } = req.query
         const result=await momentService.getMomentList(offset,size)
            res.send(result)
        
    }
    async update(req, res, next) {
        const { momentId } = req.params;
        const { content } = req.body;

        const result = await momentService.updateById(content, momentId);
        res.send(result)
    }
    async remove(req, res, next) {
        const { momentId } = req.params;
        const result = await momentService.deleteById( momentId);
        res.send(result)
    }
    async addTags(req, res, next) {
        //获取标签和动态ID
        const { tags } = req;
        const {momentId}=req.params
        //添加所有的标签
        for (const tag of tags) {
            //判断动态中是否已经有标签了
            const isExist = await momentService.hasTag(momentId, tag.id);
            if (!isExist) {
               await momentService.addTag(momentId, tag.id);
            }
        }
        res.send({
            statusCode: 200,
            data:'给动态添加标签成功'
        })

    }

}

module.exports = new MomentController()