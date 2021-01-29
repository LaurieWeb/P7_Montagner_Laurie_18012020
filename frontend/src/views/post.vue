<template>
  <div class="home">
    <Header/>
    <onepost/>
    <comm/>
    <Footer/> <!-- Ajouts des composants dans le html-->
  </div>
</template>

<script>
/*********** Importation des différents composants *******/
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import onepost from '@/components/onepost.vue'
import comm from '@/components/comm.vue'

export default { // création de l'objet à exporter
  name: 'Feed',
  components: { // déclaration des composants utilisés
    Header,
    Footer,
    onepost,
    comm
  },
  data: () => ({
    connected: null, // déclaration de la variable connected
  }),
  methods: {
    checkConnect(){ // Fonction de vérification de connexion
      if(localStorage.user !== undefined){ // si un utilisateur est enregistré dans localStorage
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){ // si aucun utilisateur n'est enregistré dans localStorage
        this.connected = false;
        console.log('Utilisateur non connecté !');
        window.location.href = '/';  // Redirection vers la page d'acceuil de connexion
      }
    }
  },
  created(){
    this.checkConnect() // Appel de la fonction checkConnect dès que la page est created, appelé juste après que l’instance a été créée
  }
}
</script>

<style lang="scss">
a {
    text-decoration: none;
    color: black;
}
</style>