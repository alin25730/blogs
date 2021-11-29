const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogs', { useNewUrlParser: true })
    .then(() => console.log('连接成功'))
.catch(()=> console.log('连接失败'))
module.exports = mongoose;