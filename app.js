const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');


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
.use('/api/stuff', stuffRoutes);


module.exports = app;