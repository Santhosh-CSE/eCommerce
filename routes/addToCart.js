const express= require('express');
const jwt_decode = require("jwt-decode");
const router = express.Router();
const schemaCart = require('../models/DB/cartschema');
const checkProduct = require('../middleware/checkProduct')
const authenticate = require('../middleware/authenticate')
const Cartfetch = require('../models/DB/cartschema');


router.post('/', checkProduct, async (req,res) =>
{
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
    const postdata = new schemaCart({
    productid: req.body.productid,
    userid:decoded.usersId
})
try{
//console.log("add to cart first element ",req.body.productid[0])
const a1 = await postdata.save()
//const message="product is added"
res.json({message:"Products are added to the Cart"});
}catch(err){
res.send(`error:${err}`)
}
})








//GET the Cart
router.get('/', async(req,res) => {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
try{
    const data = await schemaCart.findOne({userid:JWT_usersId});
res.json({cart:data.productid})

}catch(err){
res.send('Error ' + err)
}
})


//UPDATE the Cart
router.put('/:id',checkProduct,async(req,res)=>
{
let id=req.params.id;
try{

const count = Object.keys(req.body.productid).length;
const cartdata=await schemaCart.findByIdAndUpdate(id)
for(var i=0; i<count; i++){
cartdata.productid[i]=req.body.productid[i];
}

const putdata=cartdata.save()
res.json({message:"Cart has been updated succesully"})
}
catch(err){
res.send('Error ' + err)
console.log(err)
}
})

module.exports=router;