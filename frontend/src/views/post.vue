<template>
  <div class="home">
    <Header/>
    <onepost/>
    <comm/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import onepost from '@/components/onepost.vue'
import comm from '@/components/comm.vue'

export default {
  name: 'Feed',
  components: {
    Header,
    Footer,
    onepost,
    comm
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
a {
    text-decoration: none;
}
</style>