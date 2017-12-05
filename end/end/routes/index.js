const router = require('koa-router')()
const checkToken = require('../middlewares/checkToken')
const articleController = require('../controller/article')
router.get(`/article`, articleController.getArticleByPage)
router.post(`/article`, checkToken, articleController.createAirticle)
router.get(`/article/:id`, articleController.getArticleById)
router.get(`/total`, articleController.total)
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
