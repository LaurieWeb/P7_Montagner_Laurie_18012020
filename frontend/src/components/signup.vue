<template>
  <div>
      <form class="signupForm" @submit.prevent = signup()>
          <div class="form-group">
            <label class="form-label" for="Nom">Nom</label>
            <input type="text" class="form-control" id="nom" formControlName="nom" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="Prenom">Prénom</label>
            <input type="text" class="form-control" id="prenom" formControlName="prenom" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">E-mail</label>
            <input type="email" class="form-control" id="email" formControlName="email" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" formControlName="password" required>
          </div>
          <button class="form__button">Inscription</button>
    </form>
    <div class="error-message">{{message}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signup',
  props: {
    msg: String
  },
  data() {
        return {
            message: "",
        };
    },
  methods: {
        signup(){
            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const password = document.getElementById("password").value;
            const email = document.getElementById("email").value;
            axios.post(`http://localhost:3000/auth/signup`,
                        {
                            nom,
                            prenom,
                            password,
                            email
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(res => {
                        if(res.status === 201) {
                            location.href = './feed';
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            this.message = "Un utilisateur existe déjà pour cet email.";
                        }  
                    });
                 }
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
    &__signup {
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

.error-message {
    text-align: center;
    margin-bottom: 30px;
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