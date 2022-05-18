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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings
        },
        {
          path: '/fans',
          name: 'fans',
          component: Fans
        }
      ]
    }
  ]
})
