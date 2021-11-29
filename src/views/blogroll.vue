<template>
    <div class="friends">
        <TopNav></TopNav>
        <div class="friend">
            <div class="title">友情链接</div>
            <div class="container">
                <div class="curt" v-for="(item,index) of friend" :key="index">
                    <div class="left">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="right" style="margin-left: 10px;">
                        <div class="name"><a :href="item.url">{{item.name}}</a></div>
                        <div class="conta">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Base>
        </Base>
    </div>
</template>

<script>
    import TopNav from "../components/Top-nav"
    import Base from "../components/Base"
    export default {
        name: 'BlogBlogroll',
        components: { TopNav, Base },
        data() {
            return {
                src: require("../assets/image/friend.jpg"),
                friend:{}
            }
        },
        created() {
            this.$axios.get("/api/friend/check")
            .then((res)=>{
                this.friend = res.data
            
            })
                
                    let srcs = {
                        src: this.src,
                        isShow: false
                    }
                    this.$store.commit('inBgSrc', srcs);
                }
    };
</script>

<style lang="scss" scoped>
    .friend {
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%);
        border: 1px solid #ccc;
        padding: 20px;

        @media screen and (max-width: 375px) {
            width: 10rem;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%);
            border: 1px solid #ccc;
            padding: 20px;
        }

        .title {
            font-size: 30px;
            font-weight: bolder;
            text-align: center;
        }

        .container {
            width: 1100px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            @media screen and (max-width: 375px) {
                width: 8rem;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
            }

            .curt {
                width: 300px;
                position: relative;
                overflow: hidden;
                border-radius: 8px;
                line-height: 17px;
                -webkit-transform: translateZ(0);

                @media screen and (max-width: 375px) {
                    width: 7.583333rem;
                    height: 2rem;
                    position: relative;
                    overflow: hidden;
                    border-radius: .4rem;
                    line-height: .4rem;
                    -webkit-transform: translateZ(0);
                    display: flex;
                    align-items: center;
                }

                &::before {
                    content: "";
                    display: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background-image: linear-gradient(135deg, #FFF886 10%, #F072B6 100%);
                }

                &:hover::before {
                    display: block;

                }

                .name {
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #000;
                    font-weight: bolder;

                    @media screen and (max-width: 375px) {
                        width: 2rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #000;
                        font-weight: bolder;
                    }
                }

                .conta {
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    @media screen and (max-width: 375px) {
                        width: 2rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                padding-left: 40px;
                border-radius: 20px;
                padding-right:40px;
                padding-top:10px;
                padding-bottom:10px;
                display: flex;
                margin: 10px 20px;
                border: 1px solid #000;

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 60px;

                    @media screen and (max-width: 375px) {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 1rem;
                    }

                }

                .right {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    @media screen and (max-width: 375px) {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }

</style>
