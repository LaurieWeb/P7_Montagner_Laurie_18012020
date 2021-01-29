/****** Importation des plugin de Vue *****/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueHead from 'vue-head'

Vue.config.productionTip = false // Annule le message "You are running Vue in development mode."


/******** Déclaration de variables globales à partir du localStorage */
if (localStorage.user != undefined) { // si un utilisateur existe dans localStorage
  Vue.prototype.$token = JSON.parse(localStorage.user).token; // définir dans la variable globale $token le token enregistré dans localStorage
}

/********* Lancement de Vue *********/
new Vue({
  router,
  VueHead,
  render: h => h(App)
}).$mount('#app')
