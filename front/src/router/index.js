import Vue from 'vue'
import Router from 'vue-router'
import root from '../components/common/root.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: root,
      redirect: '/home',

      children: [

        {
          path: '/home/',
          name: 'article',
          component: resolve => { require(['../components/home.vue'], resolve) },
          children: [
            {
              path: '/home/echart',
              name: 'erchart',
              component: resolve => {
                require(['../components/echart'], resolve)
              }
            },
            {
              path: '/home/article',
              name: 'article',
              component: resolve => { require(['../components/article.vue'], resolve) }
            },
            {
              path: '/home/publish',
              name: 'publish',
              meta: { auth: true },
              component: resolve => { require(['../components/publish.vue'], resolve) }
            },

            
            {
              path: '/home/edit',
              name: 'edit',
              meta: { auth: true },
              component: resolve => { require(['../components/edit.vue'], resolve) }
            },
            {
              path: '/home/person',
              name: 'person',
              meta: { auth: true },
              component: resolve => { require(['../components/person.vue'], resolve) }
            },
          ]
        },


      ]
    },
    {
      path: '/nav',
      name: 'nav',
      component: resolve => { require(['../components/common/nav.vue'], resolve) }
    },
    {
      path: "*",
      redirect: '/home'
    }
  ]
})
