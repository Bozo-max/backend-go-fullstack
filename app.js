const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Thing = require('./models/Thing');


mongoose.connect('mongodb://localhost/db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('Connecté à MongoDB'))
.catch(()=>console.log('Connection à MongoDB échouée'));

const app = express();
app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})
.use(bodyParser.json())
.post('/api/stuff/', (req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({...req.body});
    thing.save()
    .then(()=>res.status(201).json({message: 'Thing created'}))
    .catch(error=>res.status(400).json({error}));
})
.use('/api/stuff/',(req,res,next)=>{
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error=>res.status(400).json({error}));
});


module.exports = app;