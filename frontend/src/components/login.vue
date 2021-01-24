<template>
<div>
    <form class="loginForm" @submit.prevent="login()">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" formControlName="email" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" formControlName="password" required>
      </div>
      <button type="submit" class="form__button">Se connecter</button>
    </form>
    <div class="error-message">{{message}}</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
        return {
            message: "",
        };
    },
    methods: {
        login(){
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            axios.post(`http://localhost:3000/auth/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                document.location.href="./feed";
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur non trouvé";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide.";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur.";
                }
            });
        }
    }
}
</script>

<style lang="scss">
$primary-color: #ff0000;
$secondary-color: #ffd5d7;

body {
    font-family: Roboto;
    margin: 0px;
}

a {
    text-decoration: none;
    &:visited {
        color: inherit;
    }
}

.error-message {
    text-align: center;
    margin-bottom: 30px;
}

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
    margin-bottom: 50px;
    margin-top: 5px;
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

.signupForm {
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