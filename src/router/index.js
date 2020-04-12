import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Login1 from '../components/login1.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/users/user.vue'

Vue.use(VueRouter)

const routes = [
  // 输入/重定向到登录页面
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/login1', component: Login1 },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 配置路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断请求地址是否为登录页面,如果是则放行
  if (to.path === '/login' || to.path === '/login1' || to.path === '/login2') return next()
  // 获取token判断是否存在,如果不存在则跳转到登录页面,如果存在则放行
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
