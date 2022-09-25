const jwt_decode = require("jwt-decode");
const express = require('express');
const router = express.Router();
const schemaCart = require('../models/DB/cartschema');
const productschema = require('../models/DB/productschema')
const userfetch = require('../models/DB/User')
router.post('/', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    //console.log("tocken at checkout",decoded.usersId)
    const JWT_usersId = decoded.usersId;
    //console.log("tocken at checkout",JWT_usersId)
    try {
        const cartdata = await schemaCart.findOne({ userid: JWT_usersId });
        var cartList = cartdata.productid;
        let amount = 0;

        for (var i = 0; i < cartList.length; i++) {
            var pid = cartdata.productid[i];
            console.log("products in cart", pid);
            const productdata = await productschema.findOne({ _id: pid })
            console.log("price of product ", productdata.price, productdata.productname)
            amount = amount + productdata.price;
            console.log("amount at checkout", amount);
        }
        const userdata = await userfetch.findOne({ _id: JWT_usersId });
        console.log("userdata",userdata)
        var wallet_after_purchase = userdata.wallet - amount;
        console.log("amount in walletafter purchase",wallet_after_purchase)
        console.log("amount at wallet", userdata.wallet, userdata.email);
    } catch (err) {
        res.json({ message: "No product in the cart to checkout" })
        //console.log("error in checkout-catch",err)
    }
    if (wallet_after_purchase > 0) {
        await userfetch.updateOne({ _id: JWT_usersId }, { wallet: wallet_after_purchase });
        //await userdata.save();
        const userdata = await userfetch.findOne({ _id: JWT_usersId });
        console.log("amount at user wallet after purchase", userdata.wallet);
        res.json({ message: "checked out successfully" });
        const cartdata = await schemaCart.findOne({ userid: JWT_usersId });
        await schemaCart.findByIdAndDelete(cartdata._id);

    }
    else {
        res.json({ message: "Insufficient amount at wallet" })
    }
})

module.exports = router



