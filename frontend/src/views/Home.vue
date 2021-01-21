<template>
  <div class="home">
    <router-link to="/"><img class="home__logo" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"></router-link>
    <div class="home__buttons">
        <div class="home__buttons__signin" @click="visiblesignin = !visible, visiblelogin = visible">S'inscrire</div>
        <div class="home__buttons__login" @click="visiblelogin = !visible, visiblesignin = visible">Se connecter</div>
    </div>
    <signin v-if="visiblesignin"/>
    <login v-if="visiblelogin"/>    
  </div>
</template>

<script>
import login from '@/components/login.vue'
import signin from '@/components/signin.vue'

export default {
  name: 'Home',
  components: {
    login,
    signin,
  },
  data: () => ({
    visiblelogin: false,
    visiblesignin: false
  })
}
</script>

<style lang="scss">

</style>