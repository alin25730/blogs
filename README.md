# blog

## Bibooo的博客
> 以前做过博客系统 http://8.129.228.103/#/Home 不好看,功能也少,现在重新做
> 希望功能做的全面点,为此也买了3年的服务器哈哈
> 壁纸来源 https://wall.alphacoders.com/ 感谢这个网站 
> 前后端分离 vue+饿了么 node mongdb

### 技术
```
使用amfe-flexible.js 移动端适配 苹果 6 7 8 
使用vuex
使用Vue-aplayer
使用npm i -S vue-meditor  <a href="https://github.com/zhaoxuhui1122/vue-markdown">文档地址</a>
```

### 功能
```
音乐播放器,404,选项卡 评论留言，vuex保存用户数据 axios请求拦截 加载动画 请求带请求头 token 请求注册的用户的数据  响应拦截 判断token是否过期  结束动画 vue-meditor 

```

### 问题
```
>出现的第一个问题就是 适配移动端和PC端因为我用了这个amfe-flexible.js 适配实在不好弄 它好像是做移动端的,于是我只能做出在我的PC 和 苹果6 7 8勉强能看!,我知道vue有个方法是移动端跟pc端都写,放弃了 因为博客就我一个人用.
>TypeError: req.logIn is not a function 后端 passport版本需要降到0.4.0

>meditor 上传本地图片 我是把图片转 base64编码上传到node node创建文件夹转成图片保存里面 app.use(express.static('public')); 静态目录访问 然后发送url 前端通过url 显示图片


```

## 评论模块

![QQ图片20211126114629](C:\Users\Niko'C'\Desktop\QQ图片20211126114629.png)

>  reply 为子评论
>
> 这是数据格式 isShow 决定的是有无子评论 可以查看后端代码
>
> 前端判断isShow 如果为false 子评论div就不显示 与之相反
>
> 点击回复的时候 后端 /reply 这个接口修改为真  /replys 这个接口向 reply push 数据
> 删除留言包括子留言一起删除


### 后端 + mongdb

```
>目录 blogNide
>moment 时间处理
```
> api http://localhost:5000/
```
app.use("/api/user", user);
app.use("/api/remark", remark);
app.use("/api/friend", friend);
app.use("/api/Mkdown", Mkdown);
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
