<script>
export default {
  name: 'suppbutton',
  props: {
    msg: String
  }
}
</script>

<template>
<div id="post__delete">
        Supprimer la publication
  </div>
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

#post__delete {
    display: block;
    margin: auto;
    width: 80%;
    max-width: 200px;
    text-align: center;
    margin-bottom: 50px;
    background-color: $primary-color;
    padding: 5px;
    margin-top: 20px;
    border-radius: 5px;
    color: white;
    font-weight: bolder;
    transition: all 250ms;
        &:hover {
            background-color: lighten($color: $primary-color, $amount: 10);
            box-shadow: 0px 0px 4px 0px #6f7070;
        }
}
</style>