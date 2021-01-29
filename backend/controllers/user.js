/*********** Ajout d'application *********/
const bcrypt = require('bcrypt')        // Pour crypter string
const jwt = require('jsonwebtoken'); // Génère jeton token d'authentification
var db = require('../db'); // Connexion à la base de données 

/******** Fonction de création utilisateur *******/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe en faisant 10 passes
      .then(hash => {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        var sql = `INSERT INTO Users VALUES (NULL,` + db.escape(nom) + `, ` + db.escape(prenom) + `,` + db.escape(email) + `, '${hash}', 0)`; // Requête MySQL
        db.query  (sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
          if (err) {
            console.log(err);
            return res.status(400).json("erreur"); // Gestion d'erreurs
          } else {
            console.log("1 user inserted"); // Confirmation d'user ajouté
            db.query(`SELECT * FROM Users WHERE email = '${req.body.email}'`, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD pour récupérer l'user.id
              return res.status(200).json({ // // Envoi status 200 de requête réussie + token
                token: jwt.sign( // Création d'un jeton token web JSON
                  { userId: result[0].id }, // Contenant l'id utilisateur
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' } // Avec une date d'expiration          
                               )             
                        });
                    })
          }})
})};

/********** Fonction d'authentification *********/  
exports.login = (req, res, next) => {
    const email = req.body.email
    db.query(`SELECT * FROM Users WHERE email =` + db.escape(email), function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
      if (result.length> 0) { // Comparaison pour déterminer si un utilisateur existe pour ce mail
          bcrypt.compare(req.body.password, result[0].password) // Comparaison cryptée des mots de passe
                    .then(valid => {
                      if (!valid) { // Si mot de passe non valide
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); // Renvoie status 401
                      } else {
                      console.log("Utilisateur connecté !");
                      return res.status(200).json({ // Envoi status 200 de requête réussie + token
                        token: jwt.sign( // Création d'un jeton token web JSON
                          { userId: result[0].id }, // Contenant l'id utilisateur
                          'RANDOM_TOKEN_SECRET',
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
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction qui décode le token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
  var sql = `SELECT users.nom, users.prenom, posts.id, posts.title FROM users LEFT JOIN posts ON users.id = posts.userId WHERE users.id = ${userId}`; // Requête MySQL
db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
  if (err) {console.log(err);
    return res.status(400).json("erreur"); // Gestion d'erreurs
  } else {
    return res.status(200).json(result);} // Envoi status 200 de requête réussie + résultat des infos récupérées
  })
};

  /********* Fonction suppression utilisateur ******/
  exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction qui décode le token
    const userId = decodedToken.userId; // Extraction de l'id utilisateur du token
    var sql = `DELETE FROM Users WHERE id="${userId}"`; // Requête MySQL
  db.query(sql, function (err, result) { // Fonction d'envoi de la requête MySQL à la BDD
    if (err) {
      console.log(err);
      return res.status(400).json("erreur"); // Gestion d'erreurs
    } else {
      console.log("Utilisateur supprimé, nombre de lignes modifiées : " + result.affectedRows);
      return res.status(200).json(result); // Envoi status 200 de requête réussie
    }
      });
  }
  

  