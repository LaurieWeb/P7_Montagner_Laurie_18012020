<template>
  <div>
      <form class="signupForm" @submit.prevent="signup()"> <!-- Au clic sur le bouton submit, appel de la fonction signup -->
          <div class="form-group">
            <label class="form-label" for="nom">Nom</label>
            <input type="text" pattern="[A-Za-zÀ-ÖØ-öø-ÿ' ._-]+$" minlength="2" maxlength="40" class="form-control" id="nom" formControlName="nom" required><!-- Inputs contenant les validations d'entrées de type RegEx, longueur min et max-->
          </div>
          <div class="form-group">
            <label class="form-label" for="prenom">Prénom</label>
            <input type="text" pattern="[A-Za-zÀ-ÖØ-öø-ÿ' ._-]+$" minlength="2" maxlength="40" class="form-control" id="prenom" formControlName="prenom" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">E-mail</label>
            <input type="email" class="form-control" id="email" minlength="2" maxlength="40" formControlName="email" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Mot de passe</label>
            <input type="password" minlength="2" maxlength="40" class="form-control" id="password" formControlName="password" required>
          </div>
          <button class="form__button">Inscription</button>
    </form>
    <div class="error-message">{{message}}</div> <!-- Affichage du message d'erreur -->
  </div>
</template>

<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
  name: 'signup',
  data() {
        return {
            message: "", // déclaration de la variable message dans le data store
        };
    },
  methods: {
        signup(){ // Fonction de création de compte 
            const nom = document.getElementById("nom").value; // récupération du nom dans l'input d'id nom
            const prenom = document.getElementById("prenom").value; // récupération du prenom dans l'input d'id prenom
            const password = document.getElementById("password").value; // récupération du mot de passe dans l'input d'id password
            const email = document.getElementById("email").value; // récupération de l'email dans l'input d'id email
            axios.post(`http://localhost:3000/auth/signup`, // Appel de l'API pour envoyer les infos de création de compte
                        {
                            nom,
                            prenom,
                            password,
                            email // Envoie des données
                        },
                        {
                            headers: { // headers de la requete
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(res => {
                        if(res.status === 200) { // Requete réussie
                            localStorage.setItem('user', JSON.stringify(res.data)); // stockage de la réponse dans localStorage
                            location.reload() // redirection vers la page feed
                        }
                    })
                    .catch(res => {
                        if (res.status === 401) { // Requete non autorisée
                            this.message = "Un utilisateur existe déjà pour cet email.";
                        }  
                    });
                 }
            }
}
</script>

<style lang="scss">
$primary-color: #ec0000;
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