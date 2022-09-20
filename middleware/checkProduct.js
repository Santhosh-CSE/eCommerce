var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
const schema = require('../models/DB/productschema');



const checkProduct = async (req, res, next) => {

    const count = Object.keys(req.body.productid).length;
    //<<<<<<< HEAD

    //console.log("count of products ",count);

    var promises = [];
    for (var i = 0; i < count; i++) {
        //promises.push(fs.readFileAsync(fileNames[i]));
        //=======
        //console.log(count);
        //>>>>>>> 13a732c4443b7c9600e47b111c6d59446b212893
        const temp = req.body.productid[i];
        try {

            const checkProduct1 = await schema.findOne({ _id: temp });

            if (checkProduct1 !== null)
                next();
        }

        catch (err) {

            res.status(404).json(

                { message: 'Incorrect Product ID' }

            );

        };

    }
}

//<<<<<<< HEAD


module.exports = checkProduct;
//=======
//>>>>>>> 13a732c4443b7c9600e47b111c6d59446b212893
