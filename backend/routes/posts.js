/********** Ajout d'application ********/
const express = require('express');
const router = express.Router();

/********* Importation du controllers et des middlewares **********/
const postsCtrl = require('../controllers/posts');
const commsCtrl = require('../controllers/comms');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/********* Déclaration des routes POST ************/
router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.addPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.delete('/:id', auth, postsCtrl.deleteOnePost);

/********** Déclaration des routes COMMS **********/
router.get('/:id/comms', auth, commsCtrl.getAllComms);
router.post('/:id/comms', auth, commsCtrl.addComm);
router.delete('/:id/comms/:id', auth, commsCtrl.deleteComm);


/********* Envoi du router *********/
module.exports = router;