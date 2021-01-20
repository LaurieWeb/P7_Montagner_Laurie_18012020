<template>
<div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
$primary-color: #ff0000;
$secondary-color: #ffd5d7;

body {
    font-family: Roboto;
    margin: 0px;
}

a {
    text-decoration: none;
}
</style>

<script>
export default {
  data: function () {
    return {
      title: 'Groupomania'
    }
  },
  head: {
    title: function () {
      return {
        inner: this.title
      }
    },
    meta: [
      { name: 'description', content: 'Réseau social de Groupomania', id: 'desc' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,  shrink-to-fit=no' }
    ],
    link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Shrikhand&display=swap'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500&display=swap'}
      ]
  }
}
</script>
