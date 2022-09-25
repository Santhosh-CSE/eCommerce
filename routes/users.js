const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {addUserValidation} = require('../middleware/validation');

//var isNullOrEmpty = require('check-null-or-empty');

const User = require('../models/DB/User');

router.post('/signup', addUserValidation, (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if(req.body.email===''){
            res.status(404).json({
            message: 'Incorrect Input for Email'
            });
        }
        if(req.body.password===''){
            res.status(404).json({
            message: 'Incorrect Input for Password'
            });
        }
        if(req.body.mobno===''){
            res.status(404).json({
            message: 'Incorrect Input for Mobile Number'
            });
        }
        if(users.length>=1) {
            return res.status(409).json({
                message: 'Mail already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(404).json({
                        error : err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        mobno: req.body.mobno
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json({
                            error: err.message
                        });
                    }); 
                }
            });
        }
    })
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(users => {
        if(users.length<1){
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result){
              const token = jwt.sign(
                {
                    email: users[0].email,
                    usersId: users[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    token: token
                });
            }
            res.status(401).json({
            message: 'Auth Failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            error: err
        });
});
});

router.post('/logout', (req, res, next) => {
token = undefined;
res.send("Logged out Successfully");
});

module.exports = router;