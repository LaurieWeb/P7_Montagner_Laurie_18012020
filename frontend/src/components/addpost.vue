<script>
export default {
  name: 'addpost',
  props: {
    msg: String
  }
}
</script>

<template>
     <div class="addpost__container">
    <h1 class="addpost__title">Partager un gif</h1>
    <form class="addpost">
      <div class="addpost__form">
        <input type="text" class="addpost__form__title" formControlName="title" placeholder="Donnez un titre à votre gif !">
      </div>
      <div class="addpost__form">
        <input class="addpost__form__img" type="file" accept="image/*">
      </div>
      <button class="addpost__form__button">Partager</button>
    </form>
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


.addpost {
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
    &__title {
        margin: 0;
        margin-bottom: 15px;
    }
    &__form {
        &__title {
            width: 100%;
            border-radius: 15px;
            padding: 5px;
            box-sizing: border-box;
            border: 0;
            margin-bottom: 20px;
        }
        &__button {
            text-decoration: none;
            background-color: $primary-color;
            padding: 5px;
            margin-top: 20px;
            border-radius: 5px;
            color: white;
            font-weight: bolder;
            transition: all 250ms;
            width: 100%;
            border: none;
            &:hover {
                background-color: lighten($color: $primary-color, $amount: 10);
                box-shadow: 0px 0px 4px 0px #6f7070;
            }
        }
    }

}
</style>