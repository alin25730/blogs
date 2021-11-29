<template>
    <div class="nav">
        <div class="letf">
            <div class="title">Blog后台管理系统</div>
        </div>
        <div class="right">
            <div class="curt">
                <el-dropdown :hide-on-click="false">
                    <i class="iconfont icon-beijingliangdu"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>请选择系统主题切换</el-dropdown-item>
                        <el-dropdown-item @click.native="pink" icon="el-icon-lollipop">粉涩</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-ice-cream-round" @click.native="
                    green">夏季</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-grape
                    " @click.native="blue">葡萄</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown >
                    <i class="iconfont icon-xuanxiangka"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  icon="el-icon-lollipop" @click.native="info" >个人信息</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-ice-cream-round" @click.native="quirt" >退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlogAdminTop',
       
        data() {
            return {

            };
        },

        mounted() {
            window.document.documentElement.setAttribute("data-theme", 'light');
        },

        methods: {
            pink() {
                window.document.documentElement.setAttribute("data-theme", 'light');
                this.$store.commit('COLOR','#F06292')
               
            },
            green() {
                window.document.documentElement.setAttribute("data-theme", 'dark');
                this.$store.commit('COLOR','#29A176')
              
            },
            blue() {
                window.document.documentElement.setAttribute("data-theme", 'blueness');
                this.$store.commit('COLOR','#0B8DE5')
               
            },
            info(){
                this.$router.push("/Adminme")
            },
            quirt(){
                //  清除vuex的用户数据
                //  清除本地存储 localStorage
                //  跳转到首页
                this.$store.state.user = {};
                localStorage.removeItem('blogToken');
                this.$router.push("/Home")
               
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/common/common';

    .nav {
        @include background_color("background_color");
        width: 100%;
        height: 70px;
        box-shadow: 1px 5px 5px #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: background 1s, color 0.6s;

        .title {
            margin-left: 40px;
            font-size: 18px;
            color: #fff;
        }

        .right {
            .curt {
                margin-left: -170px;

                i {
                    display: inline-block;
                    margin-left: 50px;
                    font-size: 25px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }

</style>
