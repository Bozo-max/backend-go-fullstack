const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');
const userRoutes  =require('./routes/user');
const path = require('path');


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
.use('/images', express.static(path.join(__dirname, 'images')))
.use('/api/stuff', stuffRoutes)
.use('/api/auth', userRoutes)

module.exports = app;