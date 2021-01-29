/********** Ajout d'application ********/
const express = require('express');
const router = express.Router();


/********* Importation du controllers et des middlewares **********/
const postsCtrl = require('../controllers/posts');
const commsCtrl = require('../controllers/comms');
const auth = require('../middleware/auth');

/********* Déclaration des routes POST ************/
router.get('/', auth, postsCtrl.getAllPosts);
router.post('/',  auth, postsCtrl.addPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.delete('/:id', auth, postsCtrl.deleteOnePost);
router.get('/user/:id', auth, postsCtrl.deleteVisible);

/********** Déclaration des routes COMMS **********/
router.get('/:id/comms', auth, commsCtrl.getAllComms);
router.post('/:id/comms', auth, commsCtrl.addComm);
router.delete('/comms/:id', auth, commsCtrl.deleteComm);


/********* Envoi du router *********/
module.exports = router;