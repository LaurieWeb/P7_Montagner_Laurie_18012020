<script>
import axios from 'axios';

export default {
  name: 'posts',
  props: {
    msg: String
  },
  data(){
        return {
            posts: [],
        }
    },
    mounted() {
            this.getAllPost();
    },
    methods: {
        getAllPost(){
            axios.get(`http://localhost:3000/posts/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.posts = res.data;
            })
        }
    }
}
</script>

<template>
<div>
    <router-link to='{ name: "Post", params: { id: post.id } }' v-for="post in posts" :key="post.id">
        <div class="post__container">
            <div class="post">
            <div class="post__header">
                <h2 class="post__title">{{post.title}}</h2>
                <p class="post__author"> {{post.prenom}} {{post.nom}}</p>
                <p class="post__date">{{post.date}}</p>
            </div>
                <img class="post__img" :src="post.imgURL" :alt="post.title">
            </div>
            <div class="post__comm">
                <router-link to='{ name: "Post", params: { id: post.id } }/#comm'><p class="post__comm__add">Ajouter un commentaire</p></router-link>
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