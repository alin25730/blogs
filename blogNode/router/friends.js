const express = require('express');
const passport = require('passport');
const router = express.Router();
const Friends = require("../model/friend");
// 添加友情链接
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const friend = new Friends({
        name: req.body.name,
        title: req.body.title,
        avatar: req.body.avatar,
        url:req.body.url,
    })
    friend.save()
    .then((remark) => res.json(remark))
    .catch((err) => console.log(err))
})
// 查看
router.get("/check", (req, res) => {
    Friends.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            } else {
                res.json(profile);
            }
        })
        .catch(err => res.status(404).json(err));
})
// 注册
module.exports = router;