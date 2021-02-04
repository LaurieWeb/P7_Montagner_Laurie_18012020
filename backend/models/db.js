/******** Import des plugins ******/
var mysql = require('mysql'); // plugin MySQL
require('dotenv').config(); // Plugin dotenv pour gérer les variables d'environnement

/******* Informations de connexion ********/
var db = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER, // à renseigner par vos informations dans un fichier .env situé dans le dossier backend
    password : process.env.DB_PASS, // à renseigner par vos informations dans un fichier .env situé dans le dossier backend
    database : 'Groupomania'
  });

/******** Tests de connexion **********/
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
   
  db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

/********* Exportation du module de connexion *************/
  module.exports = db;