<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
  name: 'onepost',
  data(){
        return{
            post: [] // déclaration de la variable post dans le data store
        }
    },
  mounted(){
        this.getOnePost(); // Appel de la fonction getOnePost dès que la page est mounted, appelé juste après que l’instance a été montée
    },
    methods: {
        getOnePost(){ // fonction de récupération d'un post
            const postId = this.$route.params.id; // Récupération de l'id du post dans l'url de la page            
            axios.get(`http://localhost:3000/posts/${postId}`, // Appel de l'API pour récupérer le post
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.post = res.data; // récupération dans la réponse des data du post, stockés dans le tableau post
                })
        },
        deleteOnePost(){ // Fonction de suppression d'un post
            const postId = this.$route.params.id; // Récupération de l'id du post dans l'url de la page   
            
            axios.delete(`http://localhost:3000/posts/${postId}`, // Appel de l'API pour supprimer le post de l'id en question
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(location.href = "./feed"); // Après suppression, redirection vers la page feed
        },
    }
}
</script>

<template>
<div id="onepost">
<div class="onepost__container">
    <div class="onepost">
      <div class="onepost__header">
          <h2 class="onepost__title">{{post.title}}</h2><!-- Récupération du titre du post -->
          <p class="onepost__author"> {{post.prenom}} {{post.nom}}</p> <!-- Récupération des noms et prénoms de l'auteur du post -->
          <p class="onepost__date">{{post.dateLocale}}</p><!-- Récupération de la date-->
      </div>
           <img class="onepost__img" :src="post.imgURL" :alt="post.title"><!--Récupération de l'url de l'image et de son texte alternatif-->
      </div>
      <div class="onepost__comm">
        <router-link to='post/:id/#comm'><p class="onepost__comm__add">Ajouter un commentaire</p></router-link> <!-- Routeur link vers la section d'ajout de commentaire-->
      </div>
</div>
<div id="post__delete" @click="deleteOnePost()" v-if="post.userId == $user.userId || $user.admin == 1"> <!--Au clic, appel de la fonction deleteOnePost ; bouton visible uniquement si l'userId du rédacteur du post correspond à l'userId connecté (stocké dans localStorage) OU si l'user dispose de l'attribut administrateur-->
        Supprimer la publication
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

.onepost {
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