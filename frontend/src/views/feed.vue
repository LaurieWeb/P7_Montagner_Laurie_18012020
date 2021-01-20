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
  }
}
</script>

<style lang="scss">

</style>