const mongoose = require('mongoose');
tokenschema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    token: {
        type:String,
        text:true,
        required: true
    },
    expiresIn: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose.model('tokenschema', tokenschema)