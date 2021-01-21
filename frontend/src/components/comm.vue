<template>
<div class="comm__container">
        <div class="comm__write">
            <h2 class="comm__write__title">Commenter la publication</h2>
            <form @submit.prevent="newComm()" class="comm__block">
                <textarea id="new__comm" class="comm__form" name="textarea" placeholder="Ecrivez ici votre commentaire" rows="5" cols="30" minlength="3" maxlength="254"></textarea>
                <button type="submit" name="button" class="comm__submit">Publier</button>
            </form>
        </div>
        <div class="comm__read">
           <h2 class="comm__read__title">{{ comm.lenght }} Commentaires</h2>
            <div class="comm__getOne" v-for="comm in comms" :key="comm.id">
                <p class="comm__getOne__author">{{ comm.prenom }} {{ comm.nom }}</p>
                <p class="comm__getOne__date">{{ comm.date }}</p>
                <p class="comm__getOne__containt">{{ comm.content }}</p>
                <button @click="deleteComment(comm.id)" v-if="comm.userId == $user.userId || $user.admin == 1" :key="comment.id" class="comm__submit">Supprimer le commentaire</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'comm',
    props: {
    msg: String
     },
    data(){
        return{
            comm: []
        }
    },
    mounted(){
        this.getAllComms();
    },
    methods: {
        newComm(){
            const postId = parseInt(this.$route.params.id);
            const userId = this.$user.userId;
            const commContent = document.getElementById('new__comm').value;
            let date = new Date();
            let dateLocale = date.toLocaleString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'});
            axios.post(`http://localhost:3000/posts/${postId}/comment/`,
                {
                    userId,
                    commContent,
                    dateLocale
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}` // à voir
                    }
                }
            )
            .then(this.getAllComms());
        },
        getAllComms(){
            const postId = parseInt(this.$route.params.id);
            axios.get(`http://localhost:3000/posts/${postId}/comments`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.comm = res.data;
            });
        },
        deleteComm(commId){
            axios.delete(`http://localhost:3000/posts/comment/${commId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getAllComms());
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