<script>
export default { // création de l'objet à exporter
  name: 'Footer',
}
</script>

<template>
    <footer>
    <p class="footer__text">© Groupomania</p>
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
    padding: 2px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
</style>