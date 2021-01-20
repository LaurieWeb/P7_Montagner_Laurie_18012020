<template>
  <div class="home">
    <router-link to="/"><img class="home__logo" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"></router-link>
    <div class="home__buttons">
        <div class="home__buttons__signin" v-on:click="componentType = signin">S'inscrire</div>
        <div class="home__buttons__login" v-on:click="componentType = login">Se connecter</div>
    </div>
    <component v-bind:is="currantComponent"/>
  </div>
</template>

<script>
import login from '@/components/login.vue'
import signin from '@/components/signin.vue'

export default {
  name: 'Home',
  components: {
    login,
    signin
  },
  computed: {
          currantComponent: function() {
            return this.componentType; }
  }
}
</script>

<style lang="scss">

</style>