const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');


exports.add = (req,res,next) => {
    if(!(req.body.token)){
        return res.status(401).json({
            message: "Token required"
        });
    }
    try{
        const payload = jwt.verify(req.body.token, process.env.JWT_KEY, {
            complete: true
          });
          var exp = new Date(payload.payload.exp * 1000);
          var now = new Date();
          if(exp < now){
              return res.status(500).json({
                message: "Token expired"
              });
          }
    }catch(err){
        return res.status(500).json({
            error: err
        });
    }
    Blacklist.find({token: req.body.token})
        .exec()
        .then(result => {
            if (result.length >=1) {
                return res.status(409).json({
                    message: "Token already blacklisted."
                });
            }else{
                const blacklist = new Blacklist({
                    _id: new mongoose.Types.ObjectId(),
                    token: req.body.token,
                    expiry: exp //Get JWT Expiry Date.
                });
                blacklist
                .save()
                .then(result => {
                    return res.status(201).json({
                        message: 'Added to blacklist'
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    });
                });
            }
        })
    
}


exports.check = (req,res,next) => {
    if(!(req.body.token)){
        res.status(401).json({
            message: "Token required"
        });
    }
    Blacklist.find({token: req.body.token})
        .exec()
        .then(result => {
            if (result.length >=1) {
                return res.status(200).json({
                    message: "Blacklisted"
                });
            }else{
                return res.status(200).json({
                    message: "Clean"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.all = (req,res,next) => {
    Blacklist
    .find()
    .exec()
    .then(docs => {
        const response = {
            tokens: docs.map(doc => {
                return {
                    token: doc.token,
                    expiry: doc.expiry
                }
            }),
            count: docs.length,
            status: 'Success'
        };
        res.status(201).json(response);
    })
    .catch( err => {
        res.status(500).json({
            errors: err,
            status: 'Fail'
        });
    });
}

exports.delete = (req,res,next) => {
    if(!req.body.token){
        return res.status(500).json({
            error: 'Token not specified',
            status: 'Fail'
        });
    }
    Blacklist.findOneAndDelete({token: req.body.token})
    .exec()
    .then(result => {
        res.status(201).json({
            result,
            message : 'Token removed sucessfully',
            status: 'Success'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errors: err,
            status: 'Fail'
        });
    });
}