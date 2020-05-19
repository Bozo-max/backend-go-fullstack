const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');

router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Thing updated' }))
        .catch(error => res.status(400).json(error));
})
    .delete('/:id', (req, res, next) => {
        Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(201).json({ message: "Thing deleted" }))
            .catch(error => json.status(400).json({ error }));
    })
    .post('/', (req, res, next) => {
        delete req.body._id;
        const thing = new Thing({ ...req.body });
        thing.save()
            .then(() => res.status(201).json({ message: 'Thing created' }))
            .catch(error => res.status(400).json({ error }));
    })
    .get('/:id', (req, res, next) => {
        Thing.findOne({ _id: req.params.id })
            .then(thing => res.status(200).json(thing))
            .catch(error => res.status(404).json({ error }));
    })
    .get('/', (req, res, next) => {
        Thing.find()
            .then(things => res.status(200).json(things))
            .catch(error => res.status(400).json({ error }));
    })

module.exports = router;