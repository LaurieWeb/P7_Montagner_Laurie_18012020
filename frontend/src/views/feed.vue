<template>
  <div class="home">
    <Header/>
    <addpost/>
    <posts/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import addpost from '@/components/addpost.vue'
import posts from '@/components/posts.vue'

export default {
  name: 'Feed',
  components: {
    Header,
    Footer,
    addpost,
    posts
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