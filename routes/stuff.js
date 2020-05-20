const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffController.createThing)
    .put('/:id', auth, multer, stuffController.modifyThing)
    .delete('/:id', auth, stuffController.deleteThing)
    .get('/:id', auth, stuffController.getOneThing)
    .get('/', auth, stuffController.getAllThings)

module.exports = router;