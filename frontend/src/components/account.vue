<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
  name: 'account',
  data(){
        return{
            user: [] // déclaration de la variable user dans le data store
        }
    },
  methods: {
    getUser(){ // fonction de récupération d'un utilisateur
      const userId = this.$user.id; // récupération de l'id de l'user dans localstorage
      axios.get(`http://localhost:3000/auth/${userId}`, // Appel de l'API pour récupérer les informations de l'user
          {
            headers: { // headers de la requete dont le token d'authentification
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(res => {
                this.user = res.data; // récupération dans la réponse des data de l'user, stockés dans la variable user
            });
    }
  },
    deleteUser(){ // fonction de suppression d'un utilisateur
      const userId = this.$user.id; // récupération de l'id de l'user dans localstorage
      axios.delete(`http://localhost:3000/auth/${userId}`, // Appel de l'API pour supprimer l'user
          {
            headers: { // headers de la requete dont le token d'authentification
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(location.href = "/"); // Après suppression, redirection vers la page d'acceuil
    }
}

</script>

<template>
<div class="account__container">
  <img class="home__logo" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"/>
  <h1 class="account__name">{{ user.prenom }} {{ user.nom }}</h1> <!-- Récupération des prénom et nom dans la variable user -->
  <div class="account__delete" @click="deleteUser()">Supprimer mon compte</div> <!-- au clic, appel de la fonction de suppression de l'user -->
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

.account {
    width: 90%;
    max-width: 700px;
    margin: auto;
    margin-bottom: 30px;
    margin-top: -100px;
    min-height: 300px;
    &__name {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    &__delete {
        display: block;
        text-align: center;
        background-color: #ff0000;
        padding: 5px;
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 5px;
        color: white;
        font-weight: bolder;
        transition: all 250ms;
        border: 0;
        width: fit-content;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 100px;
        &:hover {
            background-color: lighten($color: $primary-color, $amount: 10);
            box-shadow: 0px 0px 4px 0px #6f7070;
        }
    }
}
</style>