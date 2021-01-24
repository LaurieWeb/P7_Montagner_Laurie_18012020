/********** Importation des plugins ************/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter) // lancement de Vue

/********** Déclaration des routes *********/

const routes = [
  {
    path: '/', //chemin dans l'url
    name: 'Home', // nom de page
    component: Home // composant correspondant
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

/********** Lancement et création du routeur Vue **********/
const router = new VueRouter({
  routes
})

export default router
