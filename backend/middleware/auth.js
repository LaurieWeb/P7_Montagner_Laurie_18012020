/*********** Ajout d'application *********/
const jwt = require('jsonwebtoken');

/********* Export du module *********/
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extraire le token du header Authorization de la requête entrante
    jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // Verification de la validité du token
    next(); // Passage à la suite des requêtes si le token est valide
    } catch { // sinon passage à l'erreur
    res.status(401).json({
      error: new Error('Session invalide') // Gestion d'erreurs
    });
  }
};