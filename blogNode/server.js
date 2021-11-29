const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
//  静态目录访问
app.use(express.static('public'));
// 用户
const user = require("./router/users");
// 评论
const remark = require("./router/remark");
// 友情
const friend = require("./router/friends");
//  文章
const Mkdown = require("./router/Mkdown");
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use("/api/user", user);
app.use("/api/remark", remark);
app.use("/api/friend", friend);
app.use("/api/Mkdown", Mkdown);
//  passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

