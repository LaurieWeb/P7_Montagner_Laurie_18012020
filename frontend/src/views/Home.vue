<template>
  <div class="home">
    <router-link to="/"><img class="home__logo" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"></router-link>
    <div class="home__buttons">
        <div class="home__buttons__signup" @click="visiblesignup = !visible, visiblelogin = visible">S'inscrire</div>
        <div class="home__buttons__login" @click="visiblelogin = !visible, visiblesignup = visible">Se connecter</div>
    </div>
    <signup v-if="visiblesignup"/>
    <login v-if="visiblelogin"/>    
  </div>
</template>

<script>
import login from '@/components/login.vue'
import signup from '@/components/signup.vue'

export default {
  name: 'Home',
  components: {
    login,
    signup,
  },
  data: () => ({
    visiblelogin: false,
    visiblesignup: false,
    connected: true,
    visible: null
  }),
  methods: {
    checkConnect(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
        window.location.href = '/feed';
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  },
  created(){
    this.checkConnect()
  }
}
</script>

<style lang="scss">

</style>