<template>
    <header>
        <router-link to='/feed' id="header__logo"><img class="header__logo" src="../assets/icon-left-font.png" alt="Logo de l'entreprise Groupomania"></router-link><!-- Lien routeur vers le feed lorsque l'on clique sur le logo de Groupomania-->
            <nav id="navigation">
                <router-link to='/myaccount' class="boutonnav">Mon compte</router-link> <!-- Lien routeur vers la page Mon Compte-->
                <div class="boutonnav__logout" @click="deconnexion()">Déconnexion</div><!-- Au clic, appel de la fonction deconnexion-->
            </nav>
    </header>
</template>

<script>
export default { // création de l'objet à exporter
  name: 'Header',
  methods: {
        deconnexion(){ // Fonction de déconnexion
            localStorage.removeItem('user'); // Suppression de l'user dans le localStorage
            location.href = "/"; // Redirection vers la page d'accueil de connexion
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

header {
	display: grid;
	grid-template-columns: auto auto auto 324px;
	grid-template-areas:  "logo . . navigation ";
    border-bottom: 2px solid $secondary-color;
    margin-bottom: 30px;
    position: sticky;
    top: 0px;
    background-color: white;
    z-index: 1;
    @media screen and (max-width: 659px) {
        display: grid;
		width: 100%;
		grid-template-columns: 50% 50%;
		grid-template-areas:  "logo logo""navigation navigation";
    }
}

.header__logo {
    width: 100%;
    min-width: 150px;
    max-width: 300px;
}
#header__logo {
	grid-area: logo;
    width: 100%;
    min-width: 150px;
    max-width: 300px;
    @media screen and (max-width: 659px) {
        margin: auto;
    }
}

#navigation
{
	display: flex;
	grid-area: navigation;
}

.boutonnav {
	display: block;
	width: 162px;
	margin: auto;
	text-align: center;
    &:hover {
     color: $primary-color!important;   
    }
    &:visited {
        text-decoration: none;
        color: black;
    }
    &__logout {
        display: block;
        width: 162px;
        margin: auto;
        text-align: center;
        border-left: 1px solid $secondary-color;
        &:hover {
            color: $primary-color!important;   
           }
        &:visited {
            text-decoration: none;
            color: black;
        }
        @media screen and (max-width: 659px) {
            width: 50%;
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }
    @media screen and (max-width: 659px) {
        width: 50%; 
        padding-top: 20px;
        padding-bottom: 20px;
        }
}

</style>