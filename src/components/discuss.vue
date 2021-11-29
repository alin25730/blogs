<template>
    <div class="container">
        <div class="section" v-for="(item,index) in message" :key="index">
            <div class="info">
                <img :src="item.avatar" alt="">
                <div class="names">
                    <div class="name">{{item.name}}</div>
                    <div class="data">
                        <span>{{item.data}}</span>
                    </div>
                </div>
            </div>
           <div class="box-container">
                {{item.content}}&nbsp;&nbsp;&nbsp;&nbsp; <span class="reply" style="color: blue;"
                    @click="restore(item._id)">回复</span>
                <div class="writeback" v-show="item.isShow" v-for="(data,index) of item.reply" :key="index" >
                    <div class="info">
                       <img :src="data.avatar" alt=""> 
                        <div class="names">
                            <div  class="name"  >{{ data.name }}</div>
                            <div class="data">
                                <span>{{data.data}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="box-container">
                        {{data.content}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="reply" style="color: blue;"
                            @click="restore(data.id)">回复</span>
                    </div>
                </div>
            </div>
        </div>
        <announce  :id="id" :dialog="dialogVisible" @refresh="refresh" @dialog="show"></announce>
        <announces @refresh="refresh" ></announces>
    </div>
</template>

<script>
    import announce from "../components/comment"
    import announces from "../components/comments"
    export default {
        name: 'BlogDiscuss',
        components: { announce,announces},
        data() {
            return {
                message: {},
                reply:[],
                dialogVisible:false,
                id:''
            };
        },

        created() {
            this.request()
        },

        methods: {
            request() {
                this.$axios.get("/api/remark/check")
                    .then((res) => {
                        this.message = res.data;
                        // 回复
                        for(let i = 0;i<res.data.length;i++){
                            
                            this.reply.push(res.data[i].reply)
                        }
                     
                       
                    })
            },
            refresh(bol) {
                if (bol) {
                    this.request()
                }

            },
           
            restore(id){
                this.dialogVisible = true;
               
                this.id = id;
            },
            show(){
                this.dialogVisible = false
            }
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        width: 80%;
        height: 700px;
        overflow: scroll;
        overflow-y: scroll;
        overflow-x: none;
        margin: 20px auto;
        box-shadow: 1px 1px 5px #ccc;

        .section {
            margin-left: 50px;
        }

        .box-container {
            width: 80%;
            margin: 10px 0px 0px 70px;

        }

        .info {
            margin-top: 20px;
            display: flex;
            position: relative;

            .reply {}

            .names {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 10px;

                .data {
                    color: #ccc;
                }
            }

            img {
                display: block;
                width: 60px;
                height: 60px;
                border-radius: 60px;
            }

        }


    }

</style>
