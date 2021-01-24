import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueHead from 'vue-head'

Vue.config.productionTip = false

if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$user = JSON.parse(localStorage.user);
}

new Vue({
  router,
  VueHead,
  render: h => h(App)
}).$mount('#app')
