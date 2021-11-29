<template>
    <div class="Abouts">
        <TopNav></TopNav>
        <div class="About">
        <div class="title">关于我</div>
        <div class="Me">
            Hi，我是Bibooo，学习前端爱好者 ，喜欢看文学的书，喜欢听谢天笑的歌，风是外衣哈哈，从小玩电脑 · CSKZ联盟Bibooo名号就是我· Bibo是我偶像、爱好CS系列游戏 · 18年CSGO大地球 · 天才少年、相信只要付出时间努力就能有成就 · 熬夜的神 · 肝帝 等。
        </div>
        <div class="Mes">
            哔哩哔哩大学毕业,常在小黑盒,博客,贴吧出没,我们的尊严虽然不值什么钱,但那是我们唯一值得拥有的东西！
        </div>
        <div class="call"><h2>call</h2>
            <a href="tencent://message/?uin=951225758"> <i class="iconfont icon-QQ"></i></a>
            <a href="https://space.bilibili.com/101289155"> <i class="iconfont icon-bilibili1"></i></a>
            <a href="https://github.com/alin25730">   <i class="iconfont icon-github"></i></a>
        </div>
      </div>
      <Base></Base>
    </div>
</template>

<script>
import TopNav from "../components/Top-nav"
import Base from "../components/Base"
export default {
    name: 'BlogAbout',
    components:{TopNav,Base},
    data() {
        return {
            src:require("../assets/image/Abot.jpg"),
        }
    },
    created() {
        let srcs = {
                src:this.src,
                isShow:false
         }
        this.$store.commit('inBgSrc',srcs);
    },
};
</script>

<style lang="scss" scoped>
.About{
    width: 1200px;
    margin: 0 auto;
    .title{
        font-size: 30px;
        font-weight: bolder;
    }
    .Me{
        margin-top: 20px;
    }
    .Mes{
        margin-top: 20px;
    }
    .call{
        margin-top: 20px;
        h2{
            font-size: 20px;
        }
        i{
            margin-left: 20px;
            font-size: 30px;
        }
    }
}
</style>