const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Thing = require('./models/Thing');
const Product = require('./models/Product');

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
.put('/api/stuff/:id', (req,res,next)=>{
    Thing.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(()=>res.status(201).json({message:'Thing updated'}))
    .catch(error=>res.status(400).json(error));
})
.delete('/api/stuff/:id', (req,res,next)=>{
    Thing.deleteOne({_id: req.params.id})
    .then(()=>res.status(201).json({message: "Thing deleted"}))
    .catch(error=>json.status(400).json({error}));
})
.post('/api/stuff/', (req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({...req.body});
    thing.save()
    .then(()=>res.status(201).json({message: 'Thing created'}))
    .catch(error=>res.status(400).json({error}));
})
.get('/api/stuff/:id', (req, res ,next)=>{
    Thing.findOne({_id:req.params.id})
    .then(thing=>res.status(200).json(thing))
    .catch(error=>res.status(404).json({error}));
})
.get('/api/stuff/', (req,res,next)=>{
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error=>res.status(400).json({error}));
})
.get('/api/products/', (req, res, next)=>{
    Product.find()
    .then(products=>res.status(200).json({products}))
    .catch(error=>res.status(400).json({error}));
})
.get('/api/products/:id', (req,res,next)=>{
    Product.findOne({_id: req.params.id})
    .then(product=>res.status(200).json({product}))
    .catch(error=>res.status(400).json({error}));
})
.post('/api/products/', (req,res,next)=>{
    delete req.body._id;
    const product = new Product({...req.body});
    product.save()
    .then(()=>res.status(201).json({product}))
    .catch(error=>res.status(400).json({error}));
})
.put('/api/products/:id', (req,res,next)=>{
    Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(()=>res.status(201).json({message: "Modified!"}))
    .catch(error=>res.status(400).json({error}));
})
.delete('/api/products/:id', (req, res, next)=>{
    Product.deleteOne({_id: req.params.id})
    .then(()=>res.status(200).json({message: "Deleted!"}))
    
    .catch(error=>res.status(400).json({error}));
})
;


module.exports = app;