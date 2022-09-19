const schema = require('../models/DB/productschema');
//lodashmap
const checkProduct = async (req, res, next) => {
  console.log(req.body.productid);
const count = Object.keys(req.body.productid).length;
console.log(count);

for(var i=1; i<=count; i++){

    const temp = req.body.productid[i];
    console.log(count);
    try{
    const checkProduct1 = await schema.findOne({_id:temp});
    if(checkProduct1!==null)
    next();
    }
    catch(err) {
        res.status(404).json(
          {message: 'Incorrect Product ID'}
        );
};
}}

module.exports = checkProduct;
