const moment = require('moment')
moment.locale('zh-cn'); 
const mongoose = require('./db');
const comment = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type:String
    },
    content: {
        type:String
    },
    // 是否有子评论
    isShow: {
        type: Boolean,
        default:false
    },
    // 子评论
    reply: {
       
       
    },
    data: {
        type: String,
        default: () => {
            return moment().format('YYYY-MM-D,H:mm')}
    },
})
module.exports = remark = mongoose.model('discuss', comment);