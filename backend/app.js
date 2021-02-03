/***** Ajout d'applications ************/
const express = require('express');
const helmet = require("helmet");
const app = express(); // Mise en fonctionnement de Express
const bodyParser = require('body-parser');
var cors = require('cors') // Pour autoriser le cross-origin des serveurs
app.use(cors()); // Utilisation du Cross Origin Ressource Sharing
app.use(helmet()); // Ajout de helmet qui sécurise les headers http pour éviter d'exposer des failles Cross Site Scripting

/****** Déclaration des routes *********/
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const path = require('path');

/*********** Déclaration des Headers ******/
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accèder à l'API depuis n'importe quelle origine
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, HttpHeaders'); // Ajoute les types de headers mentionnés aux requêtes envoyées vers l'API
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées
   next();
 });

/******** Conversion du body *******/
app.use(bodyParser.json());

/******* Déclaration des fichiers routes *********/ 
app.use('/auth', userRoutes);
app.use('/posts', postsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

/********** Envoi de la requête *********/
module.exports = app;