<script>
export default {
  name: 'post',
  props: {
    msg: String
  }
}
</script>

<template>
<router-link to='/post'><div class="post__container">
    <div class="post">
      <div class="post__header">
          <h2 class="post__title">Titre</h2>
          <p class="post__author">Prénom Nom</p>
          <p class="post__date">00-00-0000</p>
      </div>
           <img class="post__img" src="../assets/unnamed.gif" alt="pikapika">
      </div>
      <div class="post__comm">
        <p class="post__comm__number">00 Commentaires</p>
        <p class="post__comm__add">Ajouter un commentaire</p>
      </div>
</div></router-link>
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

.post {
    &__container {
        width: 90%;
        max-width: 700px;
        margin: auto;
        background-color: $secondary-color;
        border-radius: 15px;
        padding: 30px;
        box-sizing: border-box;
        margin-bottom: 30px;
    }
    &__header {
        position: relative;
        margin-bottom: 20px;
    }
    &__title {
        margin: 0px;
    }
    &__author {
        margin: 0px;
        font-size: smaller;
    }
    &__date {
        right: 0;
        position: absolute;
        bottom: 0;
        margin: 0;
    }
    &__img {
        width: 100%;
    }
    &__comm {
        position: relative;
        &__add {
            position: absolute;
            right: 0;
            top: 0;
            margin: 0;
            @media screen and (max-width: 659px) {
                width: 100%;
                position: inherit;
            }
        }
    }

}
</style>