/******************* Architecture MVC exemple sur la fonction d'ajout de commentaire ****************/

const db = require("../models/db.js"); // Connexion à la BDD

exports.addComms = (userId, postId, commContent, result) => { // Fonction d'ajout d'un commentaire
    db.query(`INSERT INTO comms VALUES (NULL, ?, ?, NOW(), ?)`,  // Requête MySQL préparée
              [userId, postId, commContent], // Tableau contenant les éléments à ajouter à la requête
              function (err, res) { // Fonction de récupération des résultats de la requête MySQL à la BDD
                if (err) {
                    console.log(err);
                    result(null, err);
                    return; // Gestion d'erreurs
                }
                result(null, res); // Renvoi du résultat pour envoi du status
                
    }) 
};


