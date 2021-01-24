<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
  name: 'posts',
  data(){
        return {
            posts: [], // déclaration de la variable posts dans le data store
        }
    },
    mounted() {
            this.getAllPost(); // Appel de la fonction getAllPost dès que la page est mounted, appelé juste après que l’instance a été montée
    },
    methods: {
        getAllPost(){ // Fonction de récupération de tous les posts
            axios.get(`http://localhost:3000/posts/`, // Appel de l'API pour récupérer tous les posts
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.posts = res.data; // récupération dans la réponse des data de tous les posts, stockés dans le tableau posts
            })
        }
    }
}
</script>

<template>
<div>
    <router-link to='{ name: "Post", params: { id: post.id } }' v-for="post in posts" :key="post.id"><!-- lien routeur vers la page post avec pour paramètres l'id du post ; balise et son contenant bouclée pour chaque post trouvés dans la table posts de la BDD, dont la clé est leur id -->
        <div class="post__container">
            <div class="post">
            <div class="post__header">
                <h2 class="post__title">{{post.title}}</h2><!-- Récupération du titre du post-->
                <p class="post__author"> {{post.prenom}} {{post.nom}}</p><!--Récupération du prénom et du nom de l'auteur du post-->
                <p class="post__date">{{post.date}}</p><!-- Récupération de la date du post -->
            </div>
                <img class="post__img" :src="post.imgURL" :alt="post.title"> <!--Récupération de l'url de l'image et de son texte alternatif-->
            </div>
            <div class="post__comm">
                <router-link to='{ name: "Post", params: { id: post.id } }/#comm'><p class="post__comm__add">Ajouter un commentaire</p></router-link> <!-- Routeur link vers la section d'ajout de commentaire-->
            </div>
        </div>
    </router-link>
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