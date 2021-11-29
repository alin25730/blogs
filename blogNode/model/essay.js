const mongoose = require('./db');
const essay = new mongoose.Schema({
    name: {
        type: String,
    },
    data: {
        type: String,
    },
    title: {
        type:String
    },
    type: {
        type:String
    },
    content: {
        type:String
    }
})
module.exports = contents = mongoose.model('Mkdown', essay);