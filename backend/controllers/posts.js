/*********** Ajout d'application *********/
const fs = require('fs'); // Gestionnaire de fichiers
var db = require('../db'); // Connexion à la base de données 
const jwt = require('jsonwebtoken');  // Création et décodage de token
var multer = require('multer'); // Gestion des fichiers


/******** Fonction de création d'un post *******/
      
      /*********** Fonction de stockage des fichiers *********/
          const MIME_TYPES = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': "gif"
          }; // Déclaration des formats d'image acceptés

          const storage = multer.diskStorage({
            destination: (req, file, callback) => {
              callback(null, 'images');
            }, // Déclaration du dossier de stockage des fichiers 
            filename: (req, file, callback) => {
              const name = file.originalname.split(' ').join('_'); //Nom du fichier = nom d'origine + remplacer les espaces par des underscores 
              const extension = MIME_TYPES[file.mimetype]; // Constante dictionnaire de type MIME pour résoudre l'extension de fichier 
              callback(null, name + Date.now() + '.' + extension); // Ajout d'un timestamp
            }
          });

      var upload = multer({ storage: storage }).single('file');

    exports.addPost = (req, res, next) => {
      upload(req,res, function (err) { // Appel de la fonction de stockage des fichiers
        if (err) {
          return res.status(400).json("Veuillez choisir une image"); // Gestion d'erreurs
        }
        var title = req.body.title; // Récupération du titre du post dans l'object reçu dans la requête
        const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction qui décode le token
        const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
        var imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Récupération de l'URL où est stockée l'image
        var sql = `INSERT INTO Posts VALUES (NULL, '${userId}',` + db.escape(title) + `,` + db.escape(imgUrl) + `, NOW())`; // Requête MySQL
          db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
            if (err) {
              console.log(err);
              return res.status(400).json("erreur"); // Gestion d'erreurs
            } else {
                console.log("1 post inserted");
                res.status(201).json({ message: "1 posts inserted" }); // Envoi status 201 de requête réussie
            }
      })
    })};

/******** Fonction de récupération d'un post *******/
exports.getOnePost = (req, res, next) => {
  var sql = `SELECT users.nom, users.prenom, posts.id, posts.title, posts.imgURL, posts.date, posts.userId FROM users INNER JOIN posts ON users.id = posts.userId WHERE posts.id = ${req.params.id}`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
  if (err) {console.log(err);
    return res.status(400).json("erreur"); // Gestion d'erreurs
  } else {
    return res.status(200).json(result[0]);} // Envoi status 200 de requête réussie + résultat de la requête, [0] étant la première ligne
  })
};

/******** Fonction de supression d'un post *******/
exports.deleteOnePost = (req, res, next) => {
  var sql = `SELECT * FROM posts WHERE posts.id = ${req.params.id}`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD pour récupérer l'url de l'image
  if (err) {
    console.log(err);
    return res.status(400).json("erreur");} // Gestion d'erreurs
  const filename = result[0].imgURL.split('/images/')[1]; // Supression du dossier image de l'URL
  fs.unlink(`images/${filename}`, () => { // Supression du fichier par filename
      db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, function (err, result) { // // Fonction d'envoi de la requête MySQL à la BDD pour supprimer le post
        if (err) {
            return res.status(400).json({err}); // Gestion d'erreurs
        }
        return res.status(200).json(result);  // Envoi status 200 de requête réussie
                        })
        })     
  });
};

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
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction qui décode le token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
  var sql = `SELECT users.id, users.admin FROM users WHERE users.id = ${userId}`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
  if (err) {console.log(err);
    return res.status(400).json("erreur"); // Gestion d'erreurs
  } else {
    return res.status(200).json(result[0]);} // Envoi status 200 de requête réussie + résultats de la requête contenant l'user.id et l'user.admin permetant de définir la visibilité du bouton
  })
};