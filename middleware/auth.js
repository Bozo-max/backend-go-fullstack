const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.secretKey);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'Bad User ID';
        }
        else{
            next();
        }
    }
    catch(error){
        res.status(401).json({error: error | 'Request not idenetified' });
    }
}