/***** Ajout d'applications ************/
const express = require('express');
const app = express(); // Mise en fonctionnement de Express
const bodyParser = require('body-parser');
const mysql = require('mysql'); 

/****** Déclaration des routes *********/
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const path = require('path');

/******** Connexion à la base de donnée MySQL ******/
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
db.connect();
 
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
db.end();

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
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

/********** Envoi de la requête *********/
module.exports = app;