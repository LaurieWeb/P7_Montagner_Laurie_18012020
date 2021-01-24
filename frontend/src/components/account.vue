<script>
import axios from 'axios';

export default {
  name: 'account',
  data(){
        return{
            user: []
        }
    },
  methods: {
    getUser(){
      const userId = this.$user.id;
      axios.get(`http://localhost:3000/auth/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(res => {
                this.user = res.data;
            });
    }
  },
    deleteUser(){
      const userId = this.$user.id;
      axios.delete(`http://localhost:3000/auth/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(location.href = "/");
    }
}

</script>

<template>
<div class="account__container">
  <img class="home__logo" src="../assets/icon-above-font.svg" alt="Logo de l'entreprise Groupomania"/>
  <h1 class="account__name">{{ user.prenom }} {{ user.nom }}</h1>
  <div class="account__delete" @click="deleteUser()">Supprimer mon compte</div>
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