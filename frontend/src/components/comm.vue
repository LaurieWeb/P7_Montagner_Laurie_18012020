<template>
<div class="comm__container">
        <div class="comm__write">
            <h2 class="comm__write__title">Commenter la publication</h2>
            <form @submit.prevent="addComm()" class="comm__block"><!-- Au clic sur le bouton submit, appel de la fonction addComm -->
                <textarea id="new__comm" class="comm__form" name="textarea" placeholder="Ecrivez ici votre commentaire" rows="5" cols="30" minlength="3" maxlength="280"></textarea>
                <button type="submit" name="button" class="comm__submit">Publier</button>
            </form>
        </div>
        <div id="comm" class="comm__read">
           <h2 class="comm__read__title">{{ comm.lenght }} Commentaires</h2><!-- Récupération du nombre de commentaires -->
            <div class="comm__getOne" v-for="comm in comms" :key="comm.id"> <!-- div bouclée pour chaque commentaires comm trouvés dans la table comms de la BDD, dont la clé est leur id -->
                <p class="comm__getOne__author">{{ comm.prenom }} {{ comm.nom }}</p> <!-- Récupération des noms et prenoms de l'auteur du commentaire -->
                <p class="comm__getOne__date">{{ comm.date }}</p> <!-- Récupération de la date du commentaire -->
                <p class="comm__getOne__containt">{{ comm.content }}</p> <!-- Récupération du contenu du commentaire -->
                <button @click="deleteComm(comm.id)" v-if="comm.userId == $user.id || $user.admin == 1" :key="comment.id" class="comm__submit">Supprimer le commentaire</button> <!--Au clic, appel de la fonction deleteComm ; bouton visible uniquement si l'userId du rédacteur du commentaire correspond à l'userId connecté (stocké dans localStorage) OU si l'user dispose de l'attribut administrateur -->
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default { // création de l'objet à exporter
    name: 'comm',
    data(){
        return{
            comms: [] // déclaration de la variable comm dans le data store
        }
    },
    mounted(){
        this.getAllComms(); // Appel de la fonction getAllComms dès que la page est mounted, appelé juste après que l’instance a été montée
    },
    methods: {
        addComm(){ // Fonction d'ajout d'un commentaire
            const postId = parseInt(this.$route.params.id); // Récupération de l'id du post dans l'url de la page
            const userId = this.$user.id; // Récupération de l'userId dans localStorage
            const commContent = document.getElementById('new__comm').value; // Récupération du contenu du commentaire dans l'input d'new__comm
            let date = new Date(); // Récupération de la date du jour
            let dateLocale = date.toLocaleString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'}); // Mise en forme de la date
            axios.post(`http://localhost:3000/posts/${postId}/comms/`, // Appel de l'API pour envoyer le commentaire
                {
                    userId,
                    commContent,
                    dateLocale // Envoi des données
                },
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ${this.$token}'
                    }
                }
            )
            .then(this.getAllComms()); // Après ajout, relance de la fonction de récupération de tous les commentaires
        },
        getAllComms(){ // Fonction de récupération des commentaires
            const postId = parseInt(this.$route.params.id);  // Récupération de l'id du post dans l'url de la page
            axios.get(`http://localhost:3000/posts/${postId}/comms`, // Appel de l'API pour récupérer les commentaires du post
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.comms = res.data; // récupération dans la réponse des data de tous les commentaires, stockés dans le tableau comms
            });
        },
        deleteComm(commId){ // Fonction de suppression d'un commentaire
            axios.delete(`http://localhost:3000/posts/comment/${commId}`, // Appel de l'API pour supprimer le commentaire
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getAllComms()); // Après suppression, relance de la fonction de récupération de tous les commentaires
        }
    }
}
</script>

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