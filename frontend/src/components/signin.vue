<template>
    <form class="signupForm">
    <div class="form-group">
      <label class="form-label" for="Nom">Nom</label>
      <input type="text" class="form-control" id="email" formControlName="email">
    </div>
    <div class="form-group">
      <label class="form-label" for="Prenom">Prénom</label>
      <input type="text" class="form-control" id="email" formControlName="email">
    </div>
    <div class="form-group">
      <label class="form-label" for="email">E-mail</label>
      <input type="email" class="form-control" id="email" formControlName="email">
    </div>
    <div class="form-group">
      <label class="form-label" for="password">Mot de passe</label>
      <input type="password" class="form-control" id="password" formControlName="password">
    </div>
    <router-link to='/feed'><button class="form__button">Inscription</button></router-link>
  </form>
</template>

<script>
export default {
  name: 'signin',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
$primary-color: #ff0000;
$secondary-color: #ffd5d7;

.home__logo {
    display: block;
    margin: auto;
    width: 80%;
    max-width: 500px;
    margin-top: -50px;
}

.home__buttons {
    display: block;
    margin: auto;
    width: 80%;
    max-width: 200px;
    text-align: center;
    margin-bottom: 50px; // à retirer
    &__login {
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
    &__signin {
        background-color: $secondary-color;
        padding: 5px;
        border-radius: 5px;
        transition: all 250ms;
        margin-top: 5px;
        &:hover {
            box-shadow: 0px 0px 4px 0px #6f7070;
            background-color: darken($color: $secondary-color, $amount: 10);
        }
    }
}

.loginForm {
    display: block;
    margin: auto;
    width: 80%;
    max-width: 200px;
}

.form-control {
    display: block;
    border-radius: 5px;
    border: 1px solid $secondary-color;
    margin-bottom: 10px;
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

.form__button {
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
    margin-bottom: 50px; // à supprimer
    &:hover {
        background-color: lighten($color: $primary-color, $amount: 10);
        box-shadow: 0px 0px 4px 0px #6f7070;
    }
}
</style>