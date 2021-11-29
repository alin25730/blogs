const mongoose = require('./db');
const friend = new mongoose.Schema({
    name: {
        type: String,
       
    },
    title: {
        type: String,
       
    },
    avatar: {
        type:String
    },
    url: {
        type:String
    }
})
module.exports = frien = mongoose.model('friend', friend);