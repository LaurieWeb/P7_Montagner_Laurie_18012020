/*********** Ajout d'application *********/
const bcrypt = require('bcrypt')        // Pour crypter string
const jwt = require('jsonwebtoken'); // Génère jeton token d'authentification
var db = require('../db'); // Connexion à la base de données 
require('dotenv').config(); // Plugin dotenv pour gérer les variables d'environnement

/******** Fonction de création utilisateur *******/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe en faisant 10 passes
      .then(hash => {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email; // Récupération des variables dans la requête
        db.query  (`INSERT INTO Users VALUES (NULL, ?, ?, ?, ?, 0)`, // Requête MySQL préparée
                    [nom, prenom, email, hash], // Tableau contenant les éléments à ajouter à la requête
                    function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                        if (err) {
                          console.log(err);
                          return res.status(400).json("erreur"); // Gestion d'erreurs
                        } else {
                          console.log("1 user inserted"); // Confirmation d'user ajouté
                          db.query(`SELECT * FROM Users WHERE email = ?`, // Requête MySQL préparée
                                    [email], // Tableau contenant les éléments à ajouter à la requête
                                     function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                                        return res.status(200).json({ //Envoi status 200 de requête réussie + token
                                          token: jwt.sign( // Création d'un jeton token web JSON
                                            { userId: result[0].id, isAdmin: result[0].admin}, // Contenant l'id utilisateur et sa valeur admin
                                            process.env.RANDOM_TOKEN_SECRET, // Utilisant la clé déclarée dans les variables d'environnement
                                            { expiresIn: '24h' } // Avec une date d'expiration          
                                                        )             
                                                  });
                                  })
                         }
        })
})};

/********** Fonction d'authentification *********/  
exports.login = (req, res, next) => {
    const email = req.body.email // Récupération des variables dans la requête
    db.query(`SELECT * FROM Users WHERE email =?`, // Requête MySQL préparée
              [email], // Tableau contenant les éléments à ajouter à la requête
              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                if (result.length> 0) { // Comparaison pour déterminer si un utilisateur existe pour ce mail
                    bcrypt.compare(req.body.password, result[0].password) // Comparaison hashée des mots de passe
                              .then(valid => {
                                if (!valid) { // Si mot de passe non valide
                                  return res.status(401).json({ error: 'Mot de passe incorrect !' }); // Renvoie status 401
                                } else {
                                console.log("Utilisateur connecté !");
                                return res.status(200).json({ // Envoi status 200 de requête réussie + token
                                  token: jwt.sign( // Création d'un jeton token web JSON
                                    { userId: result[0].id, isAdmin: result[0].admin}, // Contenant l'id utilisateur et sa valeur admin
                                    process.env.RANDOM_TOKEN_SECRET, // Utilisant la clé déclarée dans les variables d'environnement
                                    { expiresIn: '24h' } // Avec une date d'expiration
                                  )
                                });
                            }})}
        else {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });} // Renvoi status 404 car l'utilisateur n'a pas été trouvé
             })
};

/************ Fonction récupération info utilisateur ***********/

exports.getOneUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    db.query(`SELECT users.nom, users.prenom, posts.id, posts.title FROM users LEFT JOIN posts ON users.id = posts.userId WHERE users.id = ?`, // Requête MySQL préparée
              [userId], // Tableau contenant les éléments à ajouter à la requête
              function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                  if (err) {console.log(err);
                    return res.status(400).json("erreur"); // Gestion d'erreurs
                  } else {
                    return res.status(200).json(result);} // Envoi status 200 de requête réussie + résultat des infos récupérées
                  })
    }
  catch {    
    res.status(401).json({
    error: new Error('Session invalide') // Gestion d'erreurs
      })
    }
}
    
/********* Fonction suppression utilisateur ******/
 exports.deleteUser = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
      const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Fonction qui vérifie la validité du token
      const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
      db.query(`DELETE FROM Users WHERE id=?`, // Requête MySQL préparée
                [userId], // Tableau contenant les éléments à ajouter à la requête
                function (err, result) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                  if (err) {
                    console.log(err);
                    return res.status(400).json("erreur"); // Gestion d'erreurs
                  } else {
                    console.log("Utilisateur supprimé, nombre de lignes modifiées : " + result.affectedRows);
                    return res.status(200).json(result); // Envoi status 200 de requête réussie
                  }
          })
    }   
  catch {    
    res.status(401).json({
     error: new Error('Session invalide') // Gestion d'erreurs
        })
      }
  }