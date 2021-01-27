/*********** Ajout d'application *********/
const bcrypt = require('bcrypt')        // Pour crypter string
const jwt = require('jsonwebtoken'); // Génère jeton token d'authentification
var db = require('../db'); // Connexion à la base de données 

/******** Fonction de création utilisateur *******/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe en faisant 10 passes
      .then(hash => {
        var sql = `INSERT INTO Users VALUES (NULL, '${req.body.nom}', '${req.body.prenom}', '${req.body.email}', '${hash}', 0)`;
        db.query  (sql, function (err, result) {
          if (err) {
            console.log(err);
            return res.status(400).json("erreur");
          } else {
            console.log("1 user inserted");
            db.query(`SELECT * FROM Users WHERE email = '${req.body.email}'`, function (err, result) {
              return res.status(200).json({
                userId: `${result[0].id}`, // Renvoi de l'id utilisateur
                nom: `${result[0].nom}`,
                prenom: `${result[0].prenom}`,
                admin: `${result[0].admin}`,
                token: jwt.sign( // Création d'un jeton token web JSON
                  { userId: result[0].id }, // Contenant l'id utilisateur
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' } // Avec une date d'expiration          
                )            
                                          });
              })
                }
                                        })
})};

/********** Fonction d'authentification *********/  
exports.login = (req, res, next) => {
    db.query(`SELECT * FROM Users WHERE email = '${req.body.email}'`, function (err, result) {
      if (result.length> 0) {
          bcrypt.compare(req.body.password, result[0].password) // Comparaison cryptée des mots de passe
                    .then(valid => {
                      if (!valid) { // Si mot de passe non valide
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                      } else {
                      console.log("Utilisateur connecté !");
                      return res.status(200).json({
                        userId: result[0].id, // Renvoi de l'id utilisateur
                        nom: result[0].nom,
                        prenom: result[0].prenom,
                        admin: result[0].admin,
                        token: jwt.sign( // Création d'un jeton token web JSON
                          { userId: result[0]._id }, // Contenant l'id utilisateur
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' } // Avec une date d'expiration
                        )
                       });
                      
                             }
                      })
                    }
        else {
            return res.status(404).json({ error: 'Utilisateur non trouvé !' });} 
             })
};

  /********* Fonction suppression utilisateur ******/
  exports.deleteUser = (req, res, next) => {
    var sql = `DELETE FROM Users WHERE id="${req.params.id}"`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json("erreur");
    } else {
      console.log("Utilisateur supprimé, nombre de lignes modifiées : " + result.affectedRows);
      return res.status(200).json(result);
    }
      });
  }