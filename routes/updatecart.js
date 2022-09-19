const _ = require('lodash');
const express= require('express');
const router = express.Router();
const jwt_decode = require("jwt-decode");
const schemaCart = require('../models/DB/cartschema');
const checkProduct = require('../middleware/checkProduct')

//loadash map,promise.map bluebird
//var array = [1];
//var other = _.concat(array, 2, [3], [[4]]);




router.post('/' ,checkProduct,async(req,res,next) =>
{  //res.json("hi");
     try{
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
    //const upd= await schemaCart.findOneAndUpdate( { userid:JWT_usersId},{$push:{ productid: req.body.productid }} )
    //const uptdata=upd.save()
    const data = await schemaCart.findOne({userid:JWT_usersId});
    let cartArray=data.productid;
         cartArray=_.concat(cartArray,req.body.productid);
        // const a1 = await schemaCart.save()
     console.log("cart array after updating ",cartArray);
    res.json({message:"updated succesfully"})
}
catch(err){
    console.log(err);
}
})


module.exports=router;