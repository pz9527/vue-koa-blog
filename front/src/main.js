// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Pagination,
  Autocomplete,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Input,
  Select,
  Option,
  OptionGroup,
  Button,
  Tag,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Container,
  Aside,
  Main,
  Loading,
  Message,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)


Vue.prototype.$message = Message
import '../theme/index.css'
import VueQuillEditor from 'vue-quill-editor'
import './axios/interceptor'
import store from './store'
import jwt from 'jsonwebtoken'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


Vue.prototype.$echarts = echarts
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  
  if (to.meta.auth) {
    try {
      let token = localStorage.getItem('pagetoken')
      let decode = jwt.verify(token, "myjwtsecret");
  
      next()
  
    } catch (err) {
      localStorage.setItem('pagetoken',null)
      Message.error('请先登录')
      return next('/home');
    }
    // console.log('验证通过'+token.length)
   
    
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

