const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    mobno: {
        type: String,
        required: true,
        match: /^\+?([0-9]{3})\)?[ -]?([0-9]{3})[ -]?([0-9]{4})$/
    },
    wallet: {
    type:String,
    default:1000,
    required:true
}
});


module.exports = mongoose.model('User', userSchema);