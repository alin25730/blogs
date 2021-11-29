const express = require('express');
const passport = require('passport');
const router = express.Router();
const Mkdown = require("../model/essay");
const http = require("http");
const url = require("url");
const fs = require("fs");
// 添加文章
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const mkdown = new Mkdown({
        name: req.body.name,
        data: req.body.data,
        title: req.body.title,
        type: req.body.type,
        content: req.body.content
    })
    mkdown.save()
        .then((remark) => res.json(remark))
        .catch((err) => console.log(err))
})

// mkdown保存图片处理
router.post("/upload", passport.authenticate("jwt", { session: false }), (req, res) => {
    var imgData = req.body.imgs;
    var path = '../blogNode/public/image/' + Date.now() + req.body.name ;//路径
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(path, dataBuffer, function (err) {
        if (err) {
            res.send(err);
        } else {
            let paths = path.substr(19);
            console.log(paths)
            res.send(paths);
        }
    })
})
// mkdown删除图片处理
router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
    fs.unlink(`../blogNode/public${req.body.url}`, function (err) {
        if (err) {
            return console.error(err);
        }
       res.send("删除成功")
    })
})
// 查找文章
router.post("/seek", (req, res) => {
    Mkdown.find()
    .then((essay) => {
        if (essay) {
            return res.json(essay)
         }
    })
        .catch((err) => {
            if (err) throw err;
    })
})
//搜索文章模糊搜索
router.get("/SearchMkdon", (req, res) => {
   
    Mkdown.find({'content':{$regex:`${req.query.title}`}})
    .then((essay) => {
        if (essay) {
            return res.json(essay)
         }
    })
        .catch((err) => {
            if (err) throw err;
    })
})
// 编辑文章
router.post("/EditMkdown", passport.authenticate("jwt", { session: false }), (req, res) => {
   
    const profileFields = {};
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.data) profileFields.data= req.body.data;
    if (req.body.title) profileFields.name = req.body.title;
    if (req.body.type) profileFields.title = req.body.type;
    if (req.body.content) profileFields.content = req.body.content;
   

    Mkdown.findOneAndUpdate({ _id: req.body.id }, { $set: profileFields }, { new: true })
    .then(profile => res.json(profile))
    
})
//删除文章
router.get("/DetMkdown", passport.authenticate("jwt", { session: false }), (req, res) => {
    Mkdown.findOneAndRemove({ _id: req.query.id })
    .then(profile => { res.json(profile); })
    
})
// 根据文章搜索文章
router.get("/FindMkdown",  (req, res) => {
    Mkdown.findOne({ _id: req.query.id })
    .then(profile => { res.json(profile); })
    
})
module.exports = router;
