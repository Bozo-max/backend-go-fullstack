const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');

router.put('/:id', stuffController.modifyThing)
    .delete('/:id', stuffController.deleteThing)
    .post('/', stuffController.createThing)
    .get('/:id', stuffController.getOneThing)
    .get('/', stuffController.getAllThings)

module.exports = router;