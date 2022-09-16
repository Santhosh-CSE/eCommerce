const express= require('express');
const router = express.Router();
const jwt_decode = require("jwt-decode");
const { find } = require('../models/DB/cartschema');
const schemaCart = require('../models/DB/cartschema');
//const checkProduct = require('../middleware/checkProduct')

router.post('/' ,async(req,res,next) =>
{  
   
    if(req.body.productid == null || (req.body.productid).length == 0){
        return res.status(400).send({"error": "Invalid request"});
    }
    // console.log(req.headers);
    // process.exit(0);
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;

    console.log(JWT_usersId);
    const findcart = await schemaCart.findOne({ userid:JWT_usersId})
    if(findcart == null){
        return res.status(400).send({"error": "No records found"});
    }
    console.log("dbdata", findcart.productid)
    var availableindb =  findcart.productid;
    var reqpayload  = req.body.productid;


    console.log(reqpayload.length);
    let finalarray = availableindb;
    for(var i=0; i < reqpayload.length; i++){
        console.log(reqpayload[i]);
        finalarray = removeItemAll(finalarray, reqpayload[i])
    }
     console.log(finalarray);
     console.log(JWT_usersId)
    let updated = await schemaCart.findOneAndUpdate({ userid:JWT_usersId},{ productid: finalarray })
    res.send({
        "message": "deleted successfully",
        "idsremaining": finalarray
    });
})

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

module.exports=router;