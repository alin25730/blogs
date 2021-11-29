<template>
    <div class="article">
        <TopNav></TopNav>
        <div class="article-lists">
        <div class="title">
            文章列表
        </div>
        <div class="list" v-for="(data,index) of article"  :key="index">
            <div class="list-title">
                <h4>
                    <router-link :to="{path:'/essay',query:{id:data._id}}">{{data.name}}</router-link> <span class="right">{{data.data}}</span>
                </h4>
            </div>
            <div class="list-section">
                <p>{{data.title}}</p>
            </div>
            <router-link to="/Home">
                <span class="option">{{data.type}}</span>
            </router-link>
        </div>
       </div>
       <Base></Base>
    </div>
</template>

<script>
import TopNav from "../components/Top-nav"
import Base from "../components/Base"
    export default {
        name: 'BlogHome',
        components:{TopNav,Base},
        data() {
            return {
                src: require("../assets/image/HomeBg.jpg"),
                article:[]
            }
        },
        created() {
            let srcs = {
                src:this.src,
                isShow:true
            }
            this.$store.commit('inBgSrc', srcs);
            this.$axios.post("/api/Mkdown/seek")
                .then((res) => {
                  this.article = res.data;
                })
        },
    };
</script>

<style lang="scss" scoped>
    .article-lists {
        width: 1200px;
        margin: 0 auto;

        @media screen and (max-width: 375px) {
            width: 100%;
            padding: 30px;
            margin: 0 auto;
        }

        .title {
            font-size: 30px;
            font-weight: bolder;
        }

        .list {
            margin-top: 20px;
            padding: 20px;

            .list-title {
                h4 {
                    line-height: 50px;
                }
            }

        }

    }

</style>
