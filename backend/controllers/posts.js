/*********** Ajout d'application *********/
const fs = require('fs'); // Gestionnaire de fichiers
var db = require('../db'); // Connexion à la base de données 

/******** Fonction de création d'un post *******/

exports.addPost = (req, res, next) => {
  var sql = "INSERT INTO Posts VALUES (NULL, '${req.body.userId}', '${req.body.title}', '${req.body.imgURL}', '${req.body.dateLocale}')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 posts inserted");
  })
};

/******** Fonction de récupération d'une sauce *******/
exports.getOneSauce = (req, res, next) => { 
  Sauce.findOne({ // Fonction de récupération
    _id: req.params.id // à partir de l'id de la requête
  }).then(
    (sauce) => {
      res.status(200).json(sauce); // Renvoi de la sauce
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

/******** Fonction de modification d'une sauce *******/
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // Recherche si un fichier image est envoyé
      {
        ...JSON.parse(req.body.sauce), 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Si il y a un fichier, sauceObject = sauce en format JSON + imageURL
      } : { ...req.body }; // Si il n'y a pas de fichier, sauceObject = corps de la demande req.body
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Fonction de modification en fonction de l'id, qui modifie sauceObject et non l'id
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

/******** Fonction de supression d'une sauce *******/
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // Fonction de récupération par id
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Supression du dossier image de l'URL
        fs.unlink(`images/${filename}`, () => { // Supression du fichier par filename
          Sauce.deleteOne({ _id: req.params.id }) // Fonction de supression par id
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

/******** Fonction de récupération de toutes les sauces *******/
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then( // Fonction de récupération de tous les objets
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

/******** Fonction de like/dislike d'une sauce *******/
exports.likeSauce = (req, res, next) => {
  if (req.body.like === 1) { // Si il s'agit d'un like
    Sauce.updateOne({ _id: req.params.id }, // Récupération de la sauce à update
      { $inc: { likes: req.body.like++ }, // On incrémente 1 like 
        $push: { usersLiked: req.body.userId } }) // On push l'id utilisateur

        .then(() => res.status(200).json({ message: 'Like ajouté !' }))
        .catch(error => res.status(400).json({ error }));

} else if (req.body.like === -1) { // Si il s'agit d'un dislike
    Sauce.updateOne({ _id: req.params.id },  // Récupération de la sauce à update 
      { $inc: { dislikes: -(req.body.like++) }, // On incrémente 1 dislike
        $push: { usersDisliked: req.body.userId } }) // On push l'id utilisateur

        .then(() => res.status(200).json({ message: 'Dislike ajouté  !' }))
        .catch(error => res.status(400).json({ error }));
                                              
} else { // Si l'utilisateur annule son like ou dislike
    Sauce.findOne({ _id: req.params.id }) // Récupération de la sauce

        .then(sauce => {
            if (sauce.usersLiked.includes(req.body.userId)) { // Si le tableau des utilisateurs qui ont liké contient l'id utilisateur
                Sauce.updateOne({ _id: req.params.id }, // Récupération de la sauce à update
                  { $pull: { usersLiked: req.body.userId }, // On pull (retire) l'id utilisateur
                  $inc: { likes: -1 } }) // On retire 1 like

                    .then(() => { res.status(200).json({ message: 'Like retiré  !' }) })
                    .catch(error => res.status(400).json({ error }))
            } 
            else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id },  // Récupération de la sauce à update
                  { $pull: { usersDisliked: req.body.userId }, // On pull (retire) l'id utilisateur
                    $inc: { dislikes: -1 } }) // On retire 1 dislike

                    .then(() => { res.status(200).json({ message: 'Dislike retiré  !' }) })
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error }));
  }
}