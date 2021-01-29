<template>
  <div role="main" class="home">
    <router-link to="/"><img class="home__logo" aria-label="Page d'acceuil du réseau Groupomania" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"></router-link>
    <div class="home__buttons">
        <div class="home__buttons__signup" @click="visiblesignup = !visible, visiblelogin = visible" role="heading" aria-level="1">S'inscrire</div><!-- Au click, la variable visiblesignup devient true tandis que la variable visiblelogin devient false-->
        <div class="home__buttons__login" @click="visiblelogin = !visible, visiblesignup = visible">Se connecter</div> <!-- Au click, la variable visiblelogin devient true tandis que la variable visiblesignup devient false-->
    </div>
    <signup v-if="visiblesignup"/>
    <login v-if="visiblelogin"/>   <!-- Ajouts des composants dans le html en fonction de leur attribut visible en booléan--> 
  </div>
</template>

<script>
/*********** Importation des différents composants *******/
import login from '@/components/login.vue'
import signup from '@/components/signup.vue'

export default { // création de l'objet à exporter
  name: 'Home',
  components: { // déclaration des composants utilisés
    login,
    signup,
  },
  data: () => ({ // déclaration des différentes variables utilisées
    visiblelogin: false,
    visiblesignup: false,
    visible: null
  }),
  methods: {
    checkConnect(){ // Fonction de vérification de connexion
      if(localStorage.user !== undefined){ // si un utilisateur est enregistré dans localStorage
        console.log('Utilisateur connecté !');
        location.href = '../#/feed'; // Redirection vers la page feed
      }
      else if(localStorage.user == undefined){ // si aucun utilisateur n'est enregistré dans localStorage
        console.log('Utilisateur non connecté !');
      }
    }
  },
  created(){
    this.checkConnect() // Appel de la fonction checkConnect dès que la page est created, appelé juste après que l’instance a été créée
  }
}
</script>

<style lang="scss">

</style>