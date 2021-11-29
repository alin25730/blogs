<template>
    <div class="essays">
        <TopNav></TopNav>
        <div class="essay">
        <div class="title">
            <h2>{{essay.title}}</h2>
        </div>
        <div class="curt">
            <div class="author">
                <div class="name">
                    <span class="linHight">作者: </span><span>{{essay.name}} </span>
                    <span class="linHight">创建时间：</span><span> {{essay.data}}</span>
                </div>
                <span class="option">{{essay.type}}</span>
            </div>
            <div class="abstract"><span class="linHight">摘要：</span> {{essay.title}}</div>
        </div>
        <div class="container" v-html="essay.content">
            
        </div>
     
      <Base></Base>
    </div>
    </div>
</template>

<script>
import TopNav from "../components/Top-nav"
import Base from "../components/Base"
export default {

    name: 'BlogEssay',
    components:{TopNav,Base},
    data() {
        return {
            src:require("../assets/image/essay.jpg"),
            essay:{}
        }
    },
    created() {
        let srcs = {
                src:this.src,
                isShow:true
         }
        this.$store.commit('inBgSrc',srcs);
        this.$axios.get(`/api/Mkdown/FindMkdown?id=${this.$route.query.id}`)
                .then((res) => {
                  this.essay = res.data;
                })
    },
};
</script>

<style lang="scss" scoped>
.essay{
    width: 1200px;
    margin: 0 auto;
    @media screen and (max-width: 375px) {
                width: 9.583333rem;
                margin: 0 auto;
            }
    .container{
        margin-top: 20px;
    }
  .title{
      text-align: center;
      h2{
          font-size: 23px;
          font-weight: bolder;
      }
  }
  .curt{
    border-bottom: 1px solid #e9e9e9;
    background-color: #f1f1f1;
    span{
        line-height: 25px;
    }
  .author{
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  }
}
</style>