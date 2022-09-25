const express= require('express');
const router = express.Router();
const jwt_decode = require("jwt-decode");
//const { find } = require('../models/DB/cartschema');
const schemaCart = require('../models/DB/cartschema');
//const checkProduct = require('../middleware/checkProduct')

router.post('/' ,async(req,res,next) =>
{  

    if(req.body.productid == null || (req.body.productid).length == 0){
        return res.status(400).send({"error": "Invalid request"});
    }
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;

    console.log(JWT_usersId);

    console.log(req.body.productid)
    var cartList = req.body.productid;
    var idsnotremovedList = [];
    //var j = 0;
    for(var i=0; i<cartList.length; i++){
      console.log(cartList[i]);
      var element = cartList[i];
      let searchEle = await schemaCart.findOne({ userid:JWT_usersId, productid: element});
    console.log("ele", element, searchEle);
    if (searchEle == null || searchEle == "null"){
      console.log("im inside", searchEle, i);
      idsnotremovedList.push(element);
    }else{
      var list = removeItemAll(searchEle.productid, element)
      const deletedData = await schemaCart.findOneAndUpdate({ userid:JWT_usersId, productid: list});
      console.log(deletedData);
    }
    if(cartList.length == i+1)
    {
      console.log(idsnotremovedList);
      if(idsnotremovedList.length == cartList.length){
        res.send({"message": "ids not found in db", "idsnotfound": idsnotremovedList});
      }else{
        res.send({"message": "deleted successfully", "idsnotfound": idsnotremovedList});
      }
    }
    };
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