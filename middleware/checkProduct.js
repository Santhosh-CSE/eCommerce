var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
const schema = require('../models/DB/productschema');



const checkProduct = async (req, res, next) => {

const count = Object.keys(req.body.productid).length;

//console.log("count of products ",count);

var promises = [];
for (var i = 0; i <count;i++) {
    //promises.push(fs.readFileAsync(fileNames[i]));
    const temp = req.body.productid[i];
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