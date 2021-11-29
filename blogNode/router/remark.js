const express = require('express');
const router = express.Router();
const passport = require('passport');
const gravatar = require('gravatar');
const Remark = require("../model/comment");


//评论
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
   
    const remark = new Remark({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        reply: [],
      
        content: req.body.content
    })
    remark.save()
        .then((remark) => res.json(remark))
        .catch((err) => console.log(err))

})
// 子评论
router.post("/reply", passport.authenticate("jwt", { session: false }), (req, res) => {

    const profileFields = {};
  
    profileFields.isShow = true;;
    console.log(profileFields)
    Remark.findOneAndUpdate({ _id: req.body.id },{ $set:profileFields},{new : true})
    .then(profile => res.json(profile))

    
})
// 回复评论
router.post("/replys", passport.authenticate("jwt", { session: false }), (req, res) => {
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
    let date = new Date()
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    let datas = Y + M + D + h + m + s;

    let replys = {
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        content: req.body.content,
        reply: [],
     
        id: req.body.id,
        data:datas
    };
  
    Remark.findOneAndUpdate({ _id: req.body.id }, { $push: { 'reply':  replys, } })
     .then(profile => res.json(profile))
    
})
// 查看评论
router.get("/check", passport.authenticate("jwt", { session: false }), (req, res) => {
    Remark.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            } else {
                res.json(profile);
            }
        })
        .catch(err => res.status(404).json(err));
})
// 删除评论
router.post("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Remark.findOneAndRemove(
        { _id: req.params.id },
    ).then(profile => { res.json(profile); })

})
module.exports = router;