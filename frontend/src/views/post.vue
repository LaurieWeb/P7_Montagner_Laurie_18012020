<template>
  <div class="home">
    <Header/>
    <posts/>
    <suppbutton/>
    <comm/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import posts from '@/components/posts.vue'
import comm from '@/components/comm.vue'
import suppbutton from '@/components/suppbutton.vue'

export default {
  name: 'Feed',
  components: {
    Header,
    Footer,
    posts,
    comm,
    suppbutton
  }
}
</script>

<style lang="scss">

</style>