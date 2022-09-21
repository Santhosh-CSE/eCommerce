const express = require('express');
const jwt_decode = require("jwt-decode");
const tokenschema = require('../models/DB/tokenschema.js');
const router = express.Router();

const checkuser = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    var JWT_email = decoded.email;
    try {
        const findUser = await tokenschema.find({ userid: JWT_usersId });
    }


    catch (err) {
        res.json({ message: "please login" })
    }

}
    module.exports = checkuser;