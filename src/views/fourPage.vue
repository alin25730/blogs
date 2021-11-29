<template>
    <div class="Four">
        <TopNav></TopNav>
        <div class="Fourpage">
        <div><h1>404错误</h1></div>
        <div><span>没有找到这个页面</span></div>
        <div><p>可能页面链接发生了变更你可以通过搜索关键字来查找</p></div>
       </div>
       <Base></Base>
    </div>
</template>

<script>
import TopNav from "../components/Top-nav"
import Base from "../components/Base"
export default {
    name: 'BlogFourpage',
    components:{TopNav,Base},
    data() {
        return {
            src:require("../assets/image/Fourbg.png"),
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
.Fourpage{
    width: 1200px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
   
    h1{
        font-size: 30px;
        line-height: 50px;
    }
}
</style>