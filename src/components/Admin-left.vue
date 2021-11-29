<template>
    <div class="submenu">
        <el-col :span="4">
            <el-menu default-active="2" class="el-menu-vertical-demo"
                :background-color="color" text-color="#fff" :default-openeds='["1","2","3","4"]'
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <div class="sub"></div>
                        <img :src="user.avatar" alt="">

                        <div class="name">&nbsp;&nbsp;&nbsp;&nbsp;{{user.name}} 你好!</div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="info">
                            <i class="iconfont icon-geren"></i>
                            个人资料
                        </el-menu-item>
                        <el-menu-item index="1-2" @click="quirt">
                            <i class="iconfont icon-tuichu"></i>
                            退出
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu class="load" index="2">
                    <template slot="title">
                        博客文章管理
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" :disabled="disabled" @click="EditMeditor">
                            <i class="iconfont icon-bianji"></i>
                            编辑文章
                        </el-menu-item>
                        <el-menu-item index="2-2" :disabled="disabled" @click="Meditor">
                            <i class="iconfont icon-tianjia"></i>
                            添加文章
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu class="load" index="3">
                    <template slot="title">
                        博客留言管理
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1" :disabled="disabled" @click="EditMessage">
                            <i class="iconfont icon-message"></i>
                            编辑留言
                        </el-menu-item>
                        <el-menu-item index="3-2" @click="leave">
                            <i class="iconfont icon-liuyan"></i>
                            留言区
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu class="load" index="4">
                    <template slot="title">
                        友情链接管理
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1" :disabled="disabled">
                            <i class="iconfont icon-lianjie"></i>
                            编辑链接
                        </el-menu-item>
                        <el-menu-item index="4-2" @click="friend" :disabled="disabled">
                            <i class="iconfont icon-charulianjie"></i>
                            添加链接
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu class="load" index="5">
                    <template slot="title">
                        <i class="iconfont icon-lianxiwomen"></i>
                        联系我
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">
                            <i class="iconfont icon-qq"></i>
                            QQ 2573018577
                        </el-menu-item>
                        <el-menu-item index="6-2">
                            <i class="iconfont icon-bilibilidonghua"></i>
                            哔哩哔哩 Bibooo
                        </el-menu-item>
                        <el-menu-item index="7-3">
                            <i class="iconfont icon-github1"></i>
                            Github https://github.com/alin25730
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: 'BlogAdminLeft',

        data() {
            return {
                src: require("../assets/image/friend.jpg"),
                color: '',
                user: '',
                // 管理员 游客的权限
                disabled: false
            };
        },
        created() {
            this.user = this.$store.state.user;
         
            if (this.user.identity == 'manager') {
                this.disabled = false
            } else {
                this.disabled = true
            }


        },
        mounted() {
            window.document.documentElement.setAttribute("data-theme", 'light');
            this.color = this.$store.state.color;
        },

        watch: {
            "$store.state.color": {
                handler(val, oldVal) {
                    this.color = val;
                },
                deep: true //true 深度监听
            }
        },
        methods: {
            info() {
                this.$router.push("/Adminme")
            },
            quirt() {
                this.$store.state.user = {};
                localStorage.removeItem('blogToken');
                this.$router.push("/Home")
            },
            leave() {
                this.$router.push("/Leave")
            },
            EditMessage() {
                this.$router.push("/EditMessage")
            },
            friend() {
                this.$router.push("/AddFtriend")
            },
            Meditor() {
                this.$router.push("/Meditor")
            },
            EditMeditor() {
                this.$router.push("/EditMeditor")
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/common/common';

    .el-menu {
        height: 867px;
    }

    .sub {
        @include background_image("page_bg");
        position: absolute;
        left: 0;
        transition: background 1s, color 0.6s;
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .load {
        ::v-deep .el-submenu__title {
            width: 100%;
            height: 50px;
        }
    }

    ::v-deep .el-submenu__title {
        width: 100%;
        height: 150px;

        .el-icon-arrow-down {

            position: absolute;
            bottom: 0;
            top: 70%;
            color: #fff;
        }

        .el-submenu__icon-arrow {
            position: absolute;
            bottom: 0;
            top: 85%;
            color: #fff;
        }

        img {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 60px;
            top: 10px;

        }

        .name {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 50px;
            background: rgba(90, 84, 84, 20%);
        }
    }

</style>
