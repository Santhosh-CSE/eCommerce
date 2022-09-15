const jwt_decode = require("jwt-decode");
const Userfetch = require('../models/DB/User');
const Cartfetch = require('../models/DB/cartschema');

const cartMatch = async (req, res, next) => {
    //console.log("matchUser", req.params);
    //console.log("matchUser1", matchUser1);
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
    console.log("JWT_usersId", JWT_usersId);
    const matchUser1 = await Cartfetch.findOne({userid:JWT_usersId});
    console.log("matchuser1",matchUser1.userid);
        if(JWT_usersId === matchUser1.userid) {
            console.log("Success");
            next();     
        } 
    else { 
        //console.log("error", error);
        return res.status(403).json({
            message: 'Incorrect'
        })
    } 
}


module.exports = cartMatch;