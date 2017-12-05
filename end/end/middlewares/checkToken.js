const config = require('../config/token');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
    const authorization = ctx.get('authorization');
    if (authorization) {
        let token = authorization.split(' ')[1];
        try {
            let decoded = jwt.verify(token, config.jwt.secret);
        } catch (err) {
            ctx.throw(401, 'expired token');      //token验证失败
        }
    } else {
        ctx.throw(401, 'no token detected in http header Authorization');         //缺少token
    }
    await next();
};