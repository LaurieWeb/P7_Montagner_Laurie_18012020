<script>
import axios from 'axios'; // importation du plugin axios pour appel de l'API

export default {
  name: 'addpost', // création de l'objet à exporter
  data(){
        return {
            file: '' // Déclaration de l'objet file
        }
        },
  methods: {
      handleFileUpload(){ // Fonction de gestion de l'ajout de fichier et formatage
            this.file = this.$refs.file.files[0];
        },

        addPost(){ // fonction d'ajout d'une publication

            let formData = new FormData(); // Formatage du formData 
            formData.append('file', this.file); // AJout du fichier au ForData
            formData.append('title', document.getElementById("postTitle").value) // Ajout du titre au FormData
            axios.post(`http://localhost:3000/posts/`, // Appel de l'API pour envoyer la publication
                    formData,
                    {
                        headers: { // headers de la requete dont le token d'authentification
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$token}`
                        }
                    }
                    ).then(res => {
                        if(res.status === 201) { // Requete réussie
                            document.location.reload();// Après suppression, redirection vers la page feed
                        }})
                    .catch(function(){
                    console.log('Une erreur est survenue.');
                    });
                 }
            
           }
}

</script>

<template>
     <div class="addpost__container">
    <h1 class="addpost__title">Partager un gif</h1>
    <form class="addpost" @submit.prevent="addPost()"><!-- Au clic, appel de la fonction addPost-->
      <div class="addpost__form">
        <input aria-label="Ajouter un titre" pattern="[A-Za-zÀ-ÖØ-öø-ÿ0-9' .!?-]+$" id="postTitle" type="text" class="addpost__form__title" formControlName="title" placeholder="Donnez un titre à votre gif !" minlength="3" maxlength = "80" required><!-- Input contenant les validations d'entrées de type RegEx, longueur min et max-->
      </div>
      <div class="addpost__form">
        <input aria-label="Ajouter une image" id="postImg" name="file" class="addpost__form__img" type="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" required><!-- Input contenant les validation d'entrées de type RegEx, longueur min et max + appel de la fonction handleFileUpload dès changement dans l'input-->
      </div>
      <button class="addpost__form__button">Partager</button>
    </form>
  </div>
</template>

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