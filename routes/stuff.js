const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.put('/:id', auth, stuffController.modifyThing)
    .delete('/:id', auth, stuffController.deleteThing)
    .post('/', auth, stuffController.createThing)
    .get('/:id', auth, stuffController.getOneThing)
    .get('/', auth, stuffController.getAllThings)

module.exports = router;