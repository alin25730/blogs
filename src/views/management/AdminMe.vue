<template>
    <div class="info">
        <div class="infos">
            <img :src="user.avatar" alt="">
            <span>名字：{{user.name}}</span>
            <span>身份：{{user.identity}}</span>
            <i>头像用了Gravatar全球头像 没有的小伙伴可以去注册一下<a href="https://cn.gravatar.com/">Gravatar</a></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlogAdminme',

        data() {
            return {
                user: {}
            };
        },
        created() {
            this.user = this.$store.state.user;
        },
        methods: {

        },
    };
</script>

<style lang="scss" scoped>
    .info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .infos {
            position: absolute;
            top: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
                display: block;
                width: 180px;
                height: 180px;
                border-radius: 180px;
            }

            span {
                font-size: 20px;
                line-height: 50px;
                display: block;
            }
        }
    }

</style>
