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
  }
}
</script>

<style lang="scss">

</style>