const express= require('express');
const router = express.Router();
const schema = require('../models/DB/productschema');
//const { request } = require('express');
const whitelist = require('../middleware/whitelist');


//GET
router.get('/', async(req,res) => {
try{
const data=await schema.find()
res.json(data)
}catch(err){
res.send('Error ' + err)
}
})

//POST
router.post('/', whitelist,async(req,res) => {
if(req.body.productname==='')
{
console.log("product name cannot be empty");
return res.status(404).json({message:"product name cannot be empty"});
}
else if(req.body.price==='')
{
console.log("price cannot be empty");
return res.status(404).json({message:"price cannot be empty"});
}
else{
const postdata = new schema({
productname: req.body.productname,
price: req.body.price
})
try{
const a1 = await postdata.save()
//const message="product is added"
res.json({message:"Product is added"});
}catch(err){
res.send(`error:${err}`)
}
}
})
//Delete a Post
router.delete('/:id',whitelist, async (req,res)=>{
/*if(req.params.id===null)
{
res.json({message:"product id cannot be empty"})
}*/
try{
const removedPost = await schema.findByIdAndDelete( req.params.id);
res.json(removedPost);
} catch(err){
res.json({message: err});
}
});
router.delete('/',whitelist, (req,res)=>{
res.json({message:"product id cannot be empty"})
})
module.exports=router