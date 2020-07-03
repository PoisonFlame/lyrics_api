const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Blacklist = require('../models/blacklist');

module.exports = (req,res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //Check here to see if token isnt blacklisted. If so, return Auth failed and invalid token message.
        Blacklist.find({token: token})
        .exec()
        .then(result => {
            if (result.length >=1) {
                return res.status(403).json({
                    message: "Invalid Token"
                });
            }else{
                const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
        
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

