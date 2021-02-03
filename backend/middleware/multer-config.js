var multer = require('multer'); // Ajout de l'app multer

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

module.exports = multer({ storage: storage }).single('file');