import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'
import Settings from '@/views/settings/'
import Fans from '@/views/fans/'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登陆' }
  },
  {
    path: '/home',
    // name: 'layout', // 当前路由有默认子路由 且不用加name
    component: Layout,
    children: [
      {
        path: '', // 空 为当前路由的默认路由
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article,
        meta: { title: '内容管理' }
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish,
        meta: { title: '发布文章' }
      },
      {
        path: '/image',
        name: 'name',
        component: Image,
        meta: { title: '素材管理' }
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment,
        meta: { title: '评论管理' }
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: { title: '个人设置' }
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans,
        meta: { title: '粉丝管理' }
      }
    ]
  }
]

const router = new Router({
  routes
})

// 组件路由 = 前置路由守卫 === 未登录直接跳转login
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 拿到本地的user用户数据
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 判断to（要进入的位置） 不为login时，判断是否已有user 无则转到login
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 后置路由守卫 跳转成功更改doc.title
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '今日头条后台管理系统'
  }
})

export default router
