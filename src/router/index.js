import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 输入/重定向到登录页面
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 配置路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断请求地址是否为登录页面,如果是则放行
  if (to.path === '/login') return next()
  // 获取token判断是否存在,如果不存在则跳转到登录页面,如果存在则放行
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
