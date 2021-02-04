/*********** Ajout d'application *********/
const fs = require('fs'); // Gestionnaire de fichiers
var db = require('../models/db'); // Connexion à la base de données 
const jwt = require('jsonwebtoken');  // Création et vérification de token
require('dotenv').config(); // Plugin dotenv pour gérer les variables d'environnement


/******** Fonction de création d'un post *******/
exports.addPost = (req, res, next) => {
  try {
    var title = req.body.title; // Récupération du titre du post dans l'object reçu dans la requête
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    var imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Récupération de l'URL où est stockée l'image
    db.query('INSERT INTO Posts VALUES (NULL, ?, ?, ?, NOW())', // Requête MySQL préparée
              [userId, title, imgUrl], // Tableau contenant les éléments à ajouter à la requête
              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
        if (err) {
          console.log(err);
          return res.status(400).json("erreur"); // Gestion d'erreurs
        } else {
            console.log("1 post inserted");
            res.status(201).json({ message: "1 posts inserted" }); // Envoi status 201 de requête réussie
        }
      })
     }
  catch {    
    res.status(401).json({
      error: new Error('Session invalide') // Gestion d'erreurs
    })
  }
}

/******** Fonction de récupération d'un post *******/
exports.getOnePost = (req, res, next) => {
  var postId = req.params.id; // Récupération de l'id du post dans les paramètres
  db.query(`SELECT users.nom, users.prenom, posts.id, posts.title, posts.imgURL, posts.date, posts.userId FROM users INNER JOIN posts ON users.id = posts.userId WHERE posts.id = ?`, // Requête MySQL préparée
            [postId], // Tableau contenant les éléments à ajouter à la requête
            function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
              if (err) {console.log(err);
                return res.status(400).json("erreur"); // Gestion d'erreurs
              } else {
                return res.status(200).json(result[0]);} // Envoi status 200 de requête réussie + résultat de la requête, [0] étant la première ligne
              })
};

/******** Fonction de supression d'un post *******/
exports.deleteOnePost = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
    var postId = req.params.id; // Récupération de l'id du post dans les paramètres
    db.query(`SELECT * FROM posts WHERE posts.id = ?`, // Requête MySQL préparée
              [postId], // Tableau contenant les éléments à ajouter à la requête
              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                if (err) {
                  console.log(err);
                  return res.status(400).json("erreur");} // Gestion d'erreurs
                if (decodedToken.userId == result[0].userId || decodedToken.isAdmin == 1) { // Vérification des droits de l'utilisateur pour effectuer cette requête
                  const filename = result[0].imgURL.split('/images/')[1]; // Supression du dossier image de l'URL
                  fs.unlink(`images/${filename}`, () => { // Supression du fichier par filename
                  db.query(`DELETE FROM posts WHERE posts.id = ?`, // Requête MySQL préparée
                            [postId], // Tableau contenant les éléments à ajouter à la requête
                             function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                                if (err) {
                                    return res.status(400).json({err}); // Gestion d'erreurs
                                }
                                return res.status(200).json(result);  // Envoi status 200 de requête réussie
                                      })
                    })  
                }
                else {
                  return res.status(400).json('Vous ne pouvez pas supprimer ce post')  // Gestion d'erreurs
                }
       })
  }
  catch {    
    res.status(401).json({
      error: new Error('Session invalide') // Gestion d'erreurs
    })
  }
}

/******** Fonction de récupération de tous les posts *******/
exports.getAllPosts = (req, res, next) => {
  var sql = `SELECT users.nom, users.prenom, posts.id, posts.title, posts.imgURL, posts.date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY posts.date DESC`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
  if (err) {console.log(err);
    return res.status(400).json("erreur"); // Gestion d'erreurs
  } else {
    return res.status(200).json(result);} // Envoi status 200 de requête réussie + résultats de la requête contenant tous les posts
  })
}

/********* Fonction de détermination de la visibilité du boutton pour supprimer un post ou un commentaire ************/
exports.deleteVisible = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    db.query(`SELECT users.id, users.admin FROM users WHERE users.id = ?`, // Requête MySQL préparée
              [userId], // Tableau contenant les éléments à ajouter à la requête
              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                if (err) {console.log(err);
                  return res.status(400).json("erreur"); // Gestion d'erreurs
                } else {
                  return res.status(200).json(result[0]);} // Envoi status 200 de requête réussie + résultats de la requête contenant l'user.id et l'user.admin permetant de définir la visibilité du bouton
      })
  }
  catch {    
    res.status(401).json({
      error: new Error('Session invalide') // Gestion d'erreurs
    })
  }
}