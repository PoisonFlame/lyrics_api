const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_signup = (req,res,next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >=1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }else{
                bcrypt.hash(req.body.password,10, (err, hash) =>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        }); 
                    }
                
                });
            }
        })
    
}

exports.user_login = (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length <1){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Auth failed"
                }); 
            }
            if (result){
                const token = jwt.sign({
                    email: user[0].email,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    userId: user[0]._id,
                    role: user[0].role,
                    type: "login",
                    apiKey: user[0].apiKey,
                    apiKeyExpiry: user[0].apiKeyExpiry
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    })
}

exports.user_pwd_change = (req,res,next) => {
    User.find({email: req.userData.email})
    .exec()
    .then( user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "User not found"
            });
        }
        console.log(req.userData);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }
            if(result){
                //Password is correct perform password change here.
                //Need to use bcrypt hash function here to make a hash of req.body.newPassword
                if(!req.body.newPassword){
                    return res.status(201).json({
                        passCheck: 'Valid Pass'
                    });
                }
                bcrypt.hash(req.body.newPassword,10, (err2, hash) =>{
                    if(err2){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        User.findOneAndUpdate({email: req.userData.email},{password: hash,apiKey: 'None'})
                        .exec()
                        .then(result => {
                            res.status(201).json({
                                message: 'Password updated'
                            });
                        })
                        .catch(err3 => {
                            res.status(500).json({
                                error: err3
                            });
                        }); 
                    }
                });
            }else{
                return res.status(401).json({
                    passCheck: "Invalid Password"
                });
            }
        });
    });
}

exports.user_delete = (req,res,next) => {
    console.log(req.userData);
    User.remove({_id: req.userData.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User Deleted"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}


