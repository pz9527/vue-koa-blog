const jwtconfig = require('../config/token')
const jwt = require('jsonwebtoken');
module.exports = async (ctx, next) => {
    const authorization = ctx.get('autherization')
    console.log(authorization)
    if(authorization) {
        let token = authorization.split(" ")[1];
        try {
            let decoded = jwt.verify(token, jwtconfig.secret)
        } catch (err) {
            ctx.throw(401, 'expried token')
        }
    } else {
        ctx.throw(400, ' no token detected in http header Autherization')
    }
    await next();
}