const moment = require('moment')
moment.locale('zh-cn'); 
const mongoose = require('./db');
const register = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type:String
    },
    identity: {
        type: String,
        required:true, 
    },
    data: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-D,H:mm,A')}
    },
})
module.exports = Regi = mongoose.model('users', register);