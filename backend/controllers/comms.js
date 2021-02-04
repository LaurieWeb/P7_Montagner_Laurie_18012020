/*********** Ajout d'application *********/
const fs = require('fs'); // Gestionnaire de fichiers
var db = require('../models/db'); // Connexion à la base de données 
const jwt = require('jsonwebtoken'); // Création et verification de token
require('dotenv').config(); // Plugin dotenv pour gérer les variables d'environnement
const Comms = require("../models/comms-manager"); // Ajout du manager de requêtes SQL suivant l'architecture MVC

/******** Fonction de création d'un commentaire - architecture MVC exemple *******/

exports.addComm = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    const commContent = req.body.commContent;
    const postId = req.params.id; // Récupération des variables dans les params
    
    Comms.addComms(userId, postId, commContent, (err, data) => {
      if (err) {
          res.status(400).json("erreur")
      }
       else {         
        console.log("1 comm inserted");
        res.status(201).json({ message: "1 comm inserted" }); // Envoi status 201 de requête réussie
       }  
          })
  
}


/******** Fonction de supression d'un commentaire *******/

exports.deleteComm = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui décode le token
    const commId = req.params.id; // Récupération des variables dans les params
    db.query(`SELECT comms.userId FROM comms WHERE comms.id = ?`,  // Requête MySQL préparée
              [commId], // Tableau contenant les éléments à ajouter à la requête
               function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                  if (decodedToken.userId == result[0].userId || decodedToken.isAdmin == 1) { // Vérification des droits de l'utilisateur pour effectuer cette requête
                    db.query(`DELETE FROM comms WHERE comms.id = ?`, // Requête MySQL préparée
                              [commId], // Tableau contenant les éléments à ajouter à la requête
                              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                                if (err) {
                                    return res.status(400).json({err}); // Gestion d'erreurs
                                } else {
                                  return res.status(200).json(result);  // Envoi status 200 de requête réussie
                                }
                              })
                    }
                  else {
                    return res.status(400).json('Vous ne pouvez pas supprimer ce commentaire')  // Gestion d'erreurs
                  }
                })
  }
  catch {    
    res.status(401).json({
      error: new Error('Session invalide') // Gestion d'erreurs
    })
  }
}


/******** Fonction de récupération de toutes les commentaires *******/
exports.getAllComms = (req, res, next) => {
  const postId = req.params.id; // Récupération des variables dans les params
  db.query(`SELECT users.nom, users.prenom, comms.id, comms.content, comms.userId, comms.date FROM users INNER JOIN comms ON users.id = comms.userId WHERE comms.postId = ? ORDER BY date DESC`, // Requête MySQL préparée
            [postId], // Tableau contenant les éléments à ajouter à la requête
            function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
              if (err) {console.log(err);
                return res.status(400).json("erreur"); // Gestion d'erreurs
              } else {
                return res.status(200).json(result);} // Envoi status 200 de requête réussie
              }
          )
}