<template>
  <div class="home">
    <Header/>
    <account/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import account from '@/components/account.vue'

export default {
  name: 'Feed',
  components: {
    Header,
    Footer,
    account
  },
  data: () => ({
    connected: null,
  }),
  methods: {
    checkConnect(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
        window.location.href = '/';
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