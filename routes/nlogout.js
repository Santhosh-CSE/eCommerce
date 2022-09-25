const express = require('express');
const jwt_decode = require("jwt-decode");
const tokenschema = require('../models/DB/tokenschema.js');
const router = express.Router();

router.get('/',async(req, res)=> {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    var JWT_usersId = decoded.usersId;
    console.log("userdetails", decoded)
    const removedPost = await tokenschema.findOneAndDelete({userid:JWT_usersId});
    res.json({message:"logged out succesfully"})
})

module.exports=router;