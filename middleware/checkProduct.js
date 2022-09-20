const jwt_decode = require("jwt-decode");
const schema = require('../models/DB/productschema');
<<<<<<< HEAD
const schemaCart = require('../models/DB/cartschema');

const checkProduct = async (req, res, next) => {
    const count = Object.keys(req.body.productid).length;
    console.log(count);

    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt_decode(token);
    const JWT_usersId = decoded.usersId;
    for (var i = 0; i < count; i++) {
        const temp = req.body.productid[i];
        try {
            const checkProduct1 = await schema.findOne({ _id: temp });
            if (checkProduct1 !== null)
                var upd = await schemaCart.findOneAndUpdate(
                    { userid: JWT_usersId }, {
                        $push: { productid: req.body.productid }
                })
            const uptdata = upd.save()
            next();
        }
        catch (err) {
            res.status(404).json(
                { message: 'Incorrect Product ID' }
            );
        };
    }
}
=======
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
>>>>>>> sanEcomm/master

module.exports = checkProduct;
