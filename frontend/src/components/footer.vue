<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<template>
    <footer>
    <p class="footer__text">© Groupomania 0000 </p>
  </footer>
</template>

<style lang="scss">
$primary-color: #ff0000;
$secondary-color: #ffd5d7;

a {
    text-decoration: none;
}

body {
    font-family: Roboto;
    margin: 0px;
}

footer {
    background-color: $primary-color;
    color: white;
    width: 100%;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
}
</style>