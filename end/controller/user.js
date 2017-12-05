const blogDb = require('../config/db')
const userModel = blogDb.import('../model/user.js')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/token')

class userController {
    static async getUserById(ctx) {
        let id = ctx.params.id
        ctx.body = await userModel.findById(id)
    }

    static async login(ctx) {
        let {name, password} = ctx.request.body
        let userInfo = await userModel.findOne({
            where: {
                name,
                password
            }
        })
        if (userInfo) {
            let userToken = {
                    id: userInfo.id,
                    name: userInfo.name
                },
                token = jwt.sign(userToken, jwtconfig.secret, {
                    expiresIn: jwtconfig.exprisesIn
                })
            ctx.body = {
                success: true,
                token: token,
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '账号或密码错误'
            }
        }
    }
    static async signUp(ctx){
        let {name,password,email}=ctx.request.body
        await userModel.create({
            name,password,email
        })
        ctx.body={success:true}
    }
}

module.exports = userController
