import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/feed.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/post.vue')
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import('../views/myaccount.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
