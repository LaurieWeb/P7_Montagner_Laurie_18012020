<template>
<div class="comm__container">
        <div class="comm__write">
            <h2 class="comm__write__title">Commenter la publication</h2>
            <form @submit.prevent="addComm()" id="commForm" class="comm__block"><!-- Au clic sur le bouton submit, appel de la fonction addComm -->
                <input aria-label="Ecrire un commentaire" pattern="[A-Za-zÀ-ÖØ-öø-ÿ0-9' .:;!?()-]+$" id="new__comm" class="comm__form" name="textarea" placeholder="Ecrivez ici votre commentaire" minlength="3" maxlength="280"><!-- Input contenant les validation d'entrées de type RegEx, longueur min et max-->
                <button type="submit" name="button" class="comm__submit">Publier</button>
            </form>
        </div>
        <div id="comm" class="comm__read">
           <h2 class="comm__read__title">{{ comms.length }} Commentaires</h2><!-- Récupération du nombre de commentaires -->
            <div class="comm__getOne" v-for="comm in comms" :key="comm.id"> <!-- div bouclée pour chaque commentaires comm trouvés dans la table comms de la BDD, dont la clé est leur id -->
                <p class="comm__getOne__author">{{ comm.prenom }} {{ comm.nom }}</p> <!-- Récupération des noms et prenoms de l'auteur du commentaire -->
                <p class="comm__getOne__date">{{dateLocale(comm.date)}}</p> <!-- Récupération de la date du commentaire via la fonction de formatage -->
                <p class="comm__getOne__containt">{{ comm.content }}</p> <!-- Récupération du contenu du commentaire -->
                <button aria-label="Supprimer le commentaire" @click="deleteComm(comm.id)" v-if="comm.userId == user.id || user.admin == 1" :key="comm.id" class="comm__delete"><i class="far fa-trash-alt"></i></button> <!--Au clic, appel de la fonction deleteComm ; bouton visible uniquement si l'userId du rédacteur du commentaire correspond à l'userId connecté OU si l'user dispose de l'attribut administrateur -->
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
            comms: [], // déclaration de la variable comms dans le data store
            user: []
        }
    },
    created (){
        this.getAllComms(); // Appel de la fonction getAllComms dès que la page est created, appelé juste après que l’instance a été créée
        this.deleteVisible(); // Appel de la fonction deleteVisible dès que la page est created, appelé juste après que l’instance a été créée
    },
    methods: {
        addComm(){ // Fonction d'ajout d'un commentaire
            const postId = parseInt(this.$route.params.id); // Récupération de l'id du post dans l'url de la page
            const commContent = document.getElementById('new__comm').value; // Récupération du contenu du commentaire dans l'input d'new__comm
            axios.post(`http://localhost:3000/posts/${postId}/comms`, // Appel de l'API pour envoyer le commentaire
                {
                    commContent // Envoi des données
                },
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                        if(res.status === 201) { // Requete réussie
                            document.getElementById('commForm').reset(); // Vider l'input
                            this.getAllComms() // Après ajout, relance de la fonction de récupération de tous les commentaires
                        }});
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
            axios.delete(`http://localhost:3000/posts/comms/${commId}`, // Appel de l'API pour supprimer le commentaire
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getAllComms()); // Après suppression, relance de la fonction de récupération de tous les commentaires
        },
        dateLocale(date){ // fonction de formatage de la date
            const dateFormat = new Date(date); // formatage en Date
            const options = { year: 'numeric', month: 'long', day: 'numeric'}; // Option du formatage
            return dateFormat.toLocaleDateString('fr-FR', options); // Retour de la date formatée
        },
        deleteVisible(){ // fonction de détermination si le boutton pour supprimer doit être visible ou non (renvoi user.id et user.admin)
            const postId = this.$route.params.id; // Récupération de l'id du post dans l'url de la page   
            axios.get(`http://localhost:3000/posts/user/${postId}`, // Appel de l'API pour récupérer le post
                {
                    headers: { // headers de la requete dont le token d'authentification
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.user = res.data; // récupération dans la réponse des data de l'user, stockés dans le tableau user
                })
        }
    }
}
</script>

<style lang="scss">
$primary-color: #ec0000;
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
        position: relative;
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
        &__containt {
            overflow: hidden;
            overflow-wrap: anywhere;
        }
    }
    &__delete {
        background: none;
        border: none;
        position: absolute;
        right: 15px;
        top: 15px;
    }
}
</style>