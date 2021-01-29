/*********** Ajout d'application *********/
const fs = require('fs'); // Gestionnaire de fichiers
var db = require('../db'); // Connexion à la base de données 
const jwt = require('jsonwebtoken'); // Création et décodage de token

/******** Fonction de création d'un commentaire *******/

exports.addComm = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction qui décode le token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    const commContent = req.body.commContent;
  var sql = `INSERT INTO comms VALUES (NULL, '${userId}', '${req.params.id}', NOW(),` + db.escape(commContent) + `)`; // Requête MySQL
  db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
    if (err) {
      console.log(err);
      return res.status(400).json("erreur"); // Gestion d'erreurs
    } else {
    console.log("1 comm inserted");
    res.status(201).json({ message: "1 comm inserted" }); // Envoi status 201 de requête réussie
    }
  })
};

/******** Fonction de supression d'un commentaire *******/

exports.deleteComm = (req, res, next) => {
  var sql = `DELETE FROM comms WHERE comms.id = ${req.params.id}`; // Requête MySQL
    db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
    if (err) {
        return res.status(400).json({err}); // Gestion d'erreurs
    }
    return res.status(200).json(result); // Envoi status 200 de requête réussie
                    })
};


/******** Fonction de récupération de toutes les commentaires *******/
exports.getAllComms = (req, res, next) => {
  var sql = `SELECT users.nom, users.prenom, comms.id, comms.content, comms.userId, comms.date FROM users INNER JOIN comms ON users.id = comms.userId WHERE comms.postId = ${req.params.id} ORDER BY date DESC`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
  if (err) {console.log(err);
    return res.status(400).json("erreur"); // Gestion d'erreurs
  } else {
    return res.status(200).json(result);} // Envoi status 200 de requête réussie
  })
};