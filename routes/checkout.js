const jwt_decode = require("jwt-decode");
const express = require('express');
const router = express.Router();
const schemaCart = require('../models/DB/cartschema');
const productschema = require('../models/DB/productschema')
const userfetch=require('../models/DB/User')
router.post('/', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
    const cartdata = await schemaCart.findOne({ userid: JWT_usersId });
    var cartList = cartdata.productid;
    let amount=0;
    
    for (var i = 0; i < cartList.length; i++) {
        var pid = cartdata.productid[i];
        console.log("products in cart", pid);
        const productdata=await productschema.findOne({productid:pid})
        amount=amount+productdata.price;
        console.log("amount at checkout",amount);
    }
    const userdata = await userfetch.findOne({ userid: JWT_usersId });
    var wallet_after_purchase=userdata.wallet-amount;
    console.log("amount at wallet",wallet_after_purchase,userdata.wallet,userdata.email);
    
     if(wallet_after_purchase>0)
     {
    await userfetch.updateOne({ _id: JWT_usersId }, { wallet: wallet_after_purchase });
    await userdata.save();
    console.log("amount at user wallet after purchase",userdata.wallet);
    res.json({message:"checked out successfully"});
     }
     else{res.json({message:"Insufficient amount at wallet"})}
    })

module.exports = router



