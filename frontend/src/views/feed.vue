<template>
  <div class="home">
    <Header role="banner"/>
    <div role="main">
      <addpost/>
      <posts/>
    </div>
    <Footer role="contentinfo"/><!-- Ajouts des composants dans le html-->
  </div>
</template>

<script>
/*********** Importation des différents composants *******/
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import addpost from '@/components/addpost.vue'
import posts from '@/components/posts.vue'

export default { // création de l'objet à exporter
  name: 'Feed',
  components: { // déclaration des composants utilisés
    Header,
    Footer,
    addpost,
    posts
  },
  data: () => ({
    connected: null, // déclaration de la variable connected
  }),
  methods: {
    checkConnect(){ // Fonction de vérification de connexion
      if(localStorage.user !== undefined){ // si un utilisateur est enregistré dans localStorage
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){ // si aucun utilisateur n'est enregistré dans localStorage
        console.log('Utilisateur non connecté !');
        location.href = '../#/'; // Redirection vers la page d'accueil de connexion
      }
    }
  },
  created(){
    this.checkConnect() // Appel de la fonction checkConnect dès que la page est created, appelé juste après que l’instance a été créée
  }
}
</script>

<style lang="scss">

</style>