<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
  name: 'account',
  data(){
        return{
            users: [], // déclaration de la variable user dans le data store
            NULL: null // déclaration de NULL pour le v-if
        }
    },
      created (){
            this.getOneUser(); // Appel de la fonction getOnePost dès que la page est created
        },
  methods: {
          getOneUser() {
             axios.get(`http://localhost:3000/auth`, // Appel de l'API pour récupérer les commentaires du post
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.users = res.data; // récupération dans la réponse des data de tous les commentaires, stockés dans le tableau comms
            });
          },
          deleteUser(){ // fonction de suppression d'un utilisateur
                axios.delete(`http://localhost:3000/auth`, // Appel de l'API pour supprimer l'user
                    {
                      headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                      }
                    }
                )
                .then(
                localStorage.removeItem('user'), // Suppression de l'user dans le localStorage
                location.href = "/"); // Après suppression, redirection vers la page d'acceuil
              }
  }
    
}

</script>

<template>
<div class="account__container">
  <img class="home__logo" src="../assets/icon-above-font.svg" alt="Grand logo de l'entreprise Groupomania"/>
  <div v-if="users[0]">
        <h1 class="account__name">{{ this.users[0].prenom }} {{ this.users[0].nom }}</h1> <!-- Récupération des prénom et nom dans la variable user -->
        <div v-if="users[0].id!=NULL" class="account__post"><!-- Si la première ligne ne contient pas d'id de post, il n'y a donc pas de publication, cette section ne s'affiche pas-->
                    <h2 class="account__post__title">Mes publications</h2>
                    <div v-for="user in users" :key="user.id"> <!-- Pour chaque occurence dans le tableau users, répéter la div sur la base de user.id-->
                    <router-link :to="{ name: 'Post', params: { id: user.id }}" class="account__post__link">{{ user.title }}</router-link> <!-- Lien routeur vers le post à l'id correspondant-->
                    </div>
        </div>
  </div>
  <div class="account__delete" @click="deleteUser()">Supprimer mon compte</div> <!-- au clic, appel de la fonction de suppression de l'user -->
</div>
</template>

<style lang="scss">
$primary-color: #ec0000;
$secondary-color: #ffd5d7;

a {
    text-decoration: none;
    color: black;
}

body {
    font-family: Roboto;
    margin: 0px;
}

.home__logo {
    display: block;
    margin: auto;
    width: 80%;
    max-width: 500px;
    margin-top: -50px;
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
        margin-bottom: 50px;
    }
    &__post {
        width: 80%;
        max-width: 500px;
        margin: auto;
        &__link {
            display: block;
            width: 100%;
            background-color: $secondary-color;
            border-radius: 15px;
            padding: 15px;
            box-sizing: border-box;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    &__delete {
        display: block;
        text-align: center;
        background-color: $primary-color;
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
        &:hover {
            background-color: lighten($color: $primary-color, $amount: 10);
            box-shadow: 0px 0px 4px 0px #6f7070;
        }
    }
}
</style>