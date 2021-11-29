const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Register = require("../model/register.js");
const gravatar = require('gravatar');
// 注册
router.post("/signin", (req, res) => {
    if (req.body.identity == '') {
        req.body.identity = 'tourist'
    }
    Register.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册");
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new Register({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    identity: req.body.identity,
                    password: req.body.password,
                })
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch((err) => console.log(err))
                    });
                });
            }
        })
})
// 登录
router.post("/login", (req, res) => {
    Register.findOne({ email: req.body.email })
        .then((use) => {
            if (!use) {
                return res.status(400).json("用户不存在");
            } else {
                // 密码正确的话发送个token
                bcrypt.compare(req.body.password, use.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            const rule = { id: use.id, name: use.name, avatar: use.avatar, identity: use.identity };
                            //   jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule, 'secret', { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        } else {
                            return res.status(400).json('密码错误')
                        }
                    })
            }
        })
})
// 测试 携带token HTTP请求头Authorization
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        identity: req.user.identity
    })

})
module.exports = router;