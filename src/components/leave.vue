<template>
    <div class="message">
        <div class="title">
            如果你有想对我说的话，或者交换友情链接，欢迎在下方留言。
        </div>
        <div class="Comments_supnum">
            <strong>
                <p>—— 收到<span>{{message.length}}</span>条评论 —— </p>
            </strong>
        </div>
        <disuss></disuss>
    </div>
</template>

<script>
  
    import disuss from "../components/discuss"
 
    export default {
        name: 'BlogLeave',
        components: {disuss},
        data() {
            return {
                isShow: false,
                message: {}
            };
        },
       created() {
        this.request()
       },
        methods: {
           
            request(){
                this.$axios.get("/api/remark/check")
                .then((res) => {
                    this.message = res.data;
                  
                })
            },
            restore(){
                this.isShow = true
            }
            
        },
    };
</script>

<style lang="scss" scoped>
    .message {
        width: 80%;
        height: 100%;
        float: right;

        .title {
            background-color: #fff;
            width: 30%;
            box-shadow: 1px 1px 5px #ccc;
            line-height: 50px;
            margin: 20px auto;
        }

        .Comments_supnum {
            width: 100%;
            margin: 0 auto;
            text-align: center;

            p {
                font-weight: bolder;
            }
        }

      
    }

</style>
