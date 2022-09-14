const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');
cartSchema = mongoose.Schema({
productid: {
type: Array,
required: true
},
userid:{
    type:string,
    required:true
}
});
module.exports = mongoose.model('Cart', cartSchema);