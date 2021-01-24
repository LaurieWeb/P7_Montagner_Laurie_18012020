<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default {
  name: 'addpost', // création de l'objet à exporter
  methods: {
        addPost(){ // fonction d'ajout d'une publication
            const title = document.getElementById("postTitle").value; // récupération du titre dans l'input d'id postTitle
            const imgUrl = document.getElementById("postImg").value; // récupération de l'url de l'image dans l'input d'id postImg
            let date = new Date(); // Récupération de la date du jour
            let dateLocale = date.toLocaleString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'}); // Mise en forme de la date
            axios.post(`http://localhost:3000/posts/`, // Appel de l'API pour envoyer la publication
                    {
                        userId: this.$user.id, // Récupération de l'id de l'user dans localstorage et envoie
                        nom: this.$user.nom, // Récupération du nom de l'user dans localstorage et envoie
                        prenom: this.$user.prenom, // Récupération du prenom de l'user dans localstorage et envoie
                        title, // Envoi du titre
                        imgUrl, // Envoi de l'url de l'image
                        dateLocale // Envoi de la date
                    },
                    {
                        headers: { // headers de la requete dont le token d'authentification
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.$token}`
                        }
                    }
                )
                .then(document.location.reload()) // Après ajout, rafraichissement de la page
                     }   
           }
}

</script>

<template>
     <div class="addpost__container">
    <h1 class="addpost__title">Partager un gif</h1>
    <form class="addpost">
      <div class="addpost__form">
        <input id="postTitle" type="text" class="addpost__form__title" formControlName="title" placeholder="Donnez un titre à votre gif !" maxlength = "50" required>
      </div>
      <div class="addpost__form">
        <input id="postImg" class="addpost__form__img" type="file" accept="image/*" required>
      </div>
      <button class="addpost__form__button" @submit.prevent="addPost()">Partager</button><!-- Au clic, appel de la fonction addPost-->
    </form>
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


.addpost {
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
    &__title {
        margin: 0;
        margin-bottom: 15px;
    }
    &__form {
        &__title {
            width: 100%;
            border-radius: 15px;
            padding: 5px;
            box-sizing: border-box;
            border: 0;
            margin-bottom: 20px;
        }
        &__button {
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
            &:hover {
                background-color: lighten($color: $primary-color, $amount: 10);
                box-shadow: 0px 0px 4px 0px #6f7070;
            }
        }
    }

}
</style>