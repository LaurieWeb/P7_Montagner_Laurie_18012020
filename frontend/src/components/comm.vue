<script>
export default {
  name: 'comm',
  props: {
    msg: String
  }
}
</script>

<template>
<div class="comm__container">
        <div class="comm__write">
            <h2 class="comm__write__title">Commenter la publication</h2>
            <form method="post" action="traitement.php" class="comm__block">
                <textarea class="comm__form" name="textarea" placeholder="Ecrivez ici votre commentaire" rows="5" cols="30" minlength="3" maxlength="254"></textarea>
                <button type="submit" name="button" class="comm__submit">Publier</button>
            </form>
        </div>
        <div class="comm__read">
            <h2 class="comm__read__title">00 Commentaires</h2>
            <div class="comm__getOne">
                <p class="comm__getOne__author">Prénom Nom</p>
                <p class="comm__getOne__date">00-00-0000</p>
                <p class="comm__getOne__containt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sem eros, rutrum at facilisis ut, vulputate eget neque. Maecenas pellentesque, eros ut iaculis tempor, magna magna dictum ipsum, ac maximus leo metus posuere augue. Mauris eget arcu ullamcorper, mattis neque a, molestie urna. Curabitur viverra, ligula non tempor pretium, quam arcu viverra mauris, nec egestas sem risus in sapien. Suspendisse fringilla metus nec diam dignissim, in laoreet nunc condimentum. Maecenas lectus odio, rhoncus vel facilisis non, pellentesque a purus.</p>
            </div>
            <div class="comm__getOne">
                <p class="comm__getOne__author">Prénom Nom</p>
                <p class="comm__getOne__date">00-00-0000</p>
                <p class="comm__getOne__containt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sem eros, rutrum at facilisis ut, vulputate eget neque. Maecenas pellentesque, eros ut iaculis tempor, magna magna dictum ipsum, ac maximus leo metus posuere augue. Mauris eget arcu ullamcorper, mattis neque a, molestie urna. Curabitur viverra, ligula non tempor pretium, quam arcu viverra mauris, nec egestas sem risus in sapien. Suspendisse fringilla metus nec diam dignissim, in laoreet nunc condimentum. Maecenas lectus odio, rhoncus vel facilisis non, pellentesque a purus.</p>
            </div>
            <div class="comm__getOne">
                <p class="comm__getOne__author">Prénom Nom</p>
                <p class="comm__getOne__date">00-00-0000</p>
                <p class="comm__getOne__containt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sem eros, rutrum at facilisis ut, vulputate eget neque. Maecenas pellentesque, eros ut iaculis tempor, magna magna dictum ipsum, ac maximus leo metus posuere augue. Mauris eget arcu ullamcorper, mattis neque a, molestie urna. Curabitur viverra, ligula non tempor pretium, quam arcu viverra mauris, nec egestas sem risus in sapien. Suspendisse fringilla metus nec diam dignissim, in laoreet nunc condimentum. Maecenas lectus odio, rhoncus vel facilisis non, pellentesque a purus.</p>
            </div>
        </div>
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

.comm {
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
    &__form {
        max-width: 100%;
        width: 100%;
        min-width: 100%;
        max-height: 100px;
        min-height: 40px;
        border-radius: 15px;
        padding: 15px;
        box-sizing: border-box;
    }
    &__submit {
    display: block;
    text-align: center;
    margin-bottom: 50px;
    background-color: $primary-color;
    padding: 5px;
    padding-right: 15px;
    padding-left: 15px;
    margin-top: 10px;
    border-radius: 5px;
    color: white;
    font-weight: bolder;
    transition: all 250ms;
    border: 0;
        &:hover {
            background-color: lighten($color: $primary-color, $amount: 10);
            box-shadow: 0px 0px 4px 0px #6f7070;
        }
    }
    &__getOne {
        background-color: white;
        border-radius: 15px;
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 30px;
        border-left: 1px solid $primary-color;
        border-bottom: 1px solid $primary-color;;
        &__author {
            margin: 0;
            font-weight: bold;
        }
        &__date {
            margin-top: 5px;
            font-weight: lighter;
        }
    }
}
</style>