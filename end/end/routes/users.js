const router = require('koa-router')()
const user = require('../controller/user')
router.prefix('/user')
router.post('/login', user.login)
router.post('/signup',user.signUp)
router.get('/:id', user.getUserById)
module.exports = router