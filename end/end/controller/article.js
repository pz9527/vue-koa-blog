const blogDb = require('../config/db')
const articleModel = blogDb.import('../model/article')
const userModel = blogDb.import('../model/user')
const replyModel = blogDb.import('../model/reply')
const tagModel = blogDb.import('../model/tag')
const cateModel = blogDb.import('../model/cate')
userModel.hasMany(articleModel, {as: 'auther'})
articleModel.belongsTo(userModel)
cateModel.hasMany(articleModel)
articleModel.hasMany(replyModel, {foreignKey: 'idforarticle'})
replyModel.belongsTo(articleModel, {foreignKey: 'idforarticle'})
articleModel.belongsTo(cateModel)

class articleControllor {
    static async getArticleByPage(ctx) {
        let limit = ctx.query.limit,
            page = ctx.query.page,
            cate = ctx.query.cate

        if (!cate) {
            await articleModel.findAll({
                limit: limit * 1,
                offset: (page - 1) * limit,
                order: [['id', 'DESC']],

                include: [{
                    model: userModel,
                    'attributes': ['name']
                }, {
                    model: cateModel,
                    'attributes': ['content']
                }, {
                    model: replyModel,
                    'attributes': ['id']
                }],
            })
                .then(result => {
                    for (let re of result) {
                        re.content = re.content.slice(0, 120)
                    }
                    ctx.body = result
                })

        } else {
            await articleModel.findAll({
                limit: limit * 1,
                offset: (page - 1) * limit,

                order: [['id', 'DESC']],
                where: {
                    cate_id: cate
                },
                include: [{
                    model: userModel,
                    'attributes': ['name']
                }, {
                    model: cateModel,
                    'attributes': ['content']
                }, {
                    model: replyModel,
                    'attributes': ['id']
                }],

            })
                .then(result => {
                    for (let re of result) {
                        re.content = re.content.slice(0, 120)
                    }
                    ctx.body = result
                })

        }
    }

    static async total(ctx) {
        let countArticle = await articleModel.count({
        })
        let tagList = await tagModel.findAll({
            attributes: ['id', 'content'],
        })
        let cateList = await cateModel.findAll({
            attributes: ['id', 'content'],
        })
        let latestReply=await replyModel.findAll({
            attributes: ['id', 'content','created_at'],
            order: [['id', 'DESC']]
        })
        ctx.body = {countArticle, tagList, cateList,latestReply}
    }
    static async createAirticle(ctx) {
        let {title, content,cate,user_id} = ctx.request.body
        await articleModel.create({
            title,content,tags:1,cate_id:cate,user_id
        }).then(
            ctx.body={success:true}
        )
    }
    static async getArticleById(ctx){
        let id=ctx.params.id
        await articleModel.findOne({
            where:{
            id}
        })
            .then(res=>{
                ctx.body=res
            })
    }
}

module.exports = articleControllor