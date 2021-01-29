/********** Ajout d'application ********/
const express = require('express');
const router = express.Router();

/********* Importation du controllers **********/
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

/********* Déclaration des routes ************/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getOneUser);

/********* Envoi du router *********/
module.exports = router;