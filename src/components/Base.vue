<template>
    <footer class="footer">
        <div class="aplayer">
            <aplayer :music="videoUpload.muscis[0]" :list="videoUpload.muscis" :volume="videoUpload.volume"></aplayer>
        </div>
        <div class="title">Copyright © 2021 <router-link class="alabel" to="/Home">習慣の孤獨</router-link>
        </div>
        <div class="InternetContentProvider">
            <router-link class="alabel" to="/Home">蜀ICP备2021019028号</router-link>
        </div>
        <span ref="runtime_span"></span>
    </footer>
</template>

<script>
    import aplayer from 'vue-aplayer'
    export default {
        name: 'BlogFooter',
        components: { aplayer },
        data() {
            return {
                Gods: "",
                tiems: "",
                minutes: "",
                seconds: "",
                videoUpload: {
                    theme: '#ffc0cb',
                    mini: false, // 迷你模式
                    float: true, // 浮动模式。你可以在页面上随意拖放你的播放器
                    volume:  0.1,
                    muscis: [
                        {
                            title: '安妮',
                            artist: '王杰',
                            src: require("../assets/music/a.mp3"),
                            pic: require("../assets/music/a.jpg")// 封面图片

                        },
                        {
                            title: '不会改变',
                            artist: '谢天笑',
                            src: require("../assets/music/b.mp3"),
                            pic: require("../assets/music/b.jpg")// 封面图片

                        },
                        {
                            title: 'Зая',
                            artist: 'альбом года Дебютная пластинка',
                            src: require("../assets/music/c.mp3"),
                            pic: require("../assets/music/c.jpg")// 封面图片

                        },

                    ]
                }
            }
        },
        mounted() {
            this.Time();

        },

        methods: {

            Time() {
                window.setInterval(() => {
                    //    站开始的时间
                    let oldTime = new Date("11/19/2021 21:00:00");
                    //    当前时间
                    let newTime = new Date();
                    //   运行时间
                    let runningTime = (newTime.getTime() - oldTime.getTime());
                    //   将时间戳转化为时间
                    //  一天多少毫秒
                    let M = 24 * 60 * 60 * 1000
                    //  天
                    let God = runningTime / M;
                    this.Gods = Math.floor(God)
                    //  时
                    let tiem = (God - this.Gods) * 24;
                    this.tiems = Math.floor(tiem);
                    //  分
                    let minute = (tiem - this.tiems) * 60
                    this.minutes = Math.floor(minute)
                    //  秒
                    let second = (this.minutes - minute) * 60;
                    this.seconds = Math.floor(Math.abs(second));
                    this.$refs.runtime_span == undefined ? '' : this.$refs.runtime_span.innerHTML = "本站勉强运行: " + this.Gods + "天" + this.tiems + "小时" + this.minutes + "分" + this.seconds + "秒";

                }, 1000)
            }
        },

    };
</script>

<style lang="scss" scoped>
    .footer {
        width: 1400px;
        text-align: center;
        margin: 10px auto;
        border-top: 1px solid #F5F5F5;

        .aplayer {
            width: 580px;
            margin: 2px auto;

            @media screen and (max-width: 375px) {
                width: 7.583333rem;
                margin: 0 auto;
            }
        }

        .title {
            margin-top: 20px;
        }
    }

</style>
