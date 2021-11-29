<template>
    <div class="announce">

        <div class="input">
            <el-input placeholder="名字" v-model="name">
                <i slot="suffix" class="el-input__icon  el-icon-s-custom"></i>
            </el-input>
            <el-input placeholder="邮箱" v-model="email">
                <i slot="suffix" class="el-input__icon  el-icon-s-promotion
                            "></i>
            </el-input>
        </div>
        <el-input class="textarea" type="textarea" v-model="text" :rows="4" placeholder="请输入内容">
        </el-input>

        <el-button type="success" size="small" @click="sumbit()">提交评论</el-button>


    </div>
</template>

<script>
    export default {
        name: 'BlogComment',
        data() {
            return {
                name: '',
                email: '',
                text: '',
                refresh: true,
                dialogVisible: false
            };
        },
        created() {

        },

        methods: {
            sumbit() {
                if (this.name == '' || this.email == '' || this.text == '') {
                    this.$message({
                        message: '内容不能为空'
                    })
                } else {
                    let comment = {
                        name: this.name,
                        email: this.email,
                        reply: '',
                        content: this.text,
                    }
                    this.$axios.post("/api/remark/add", comment)
                        .then((res) => {
                            if (res.status == 200) {
                                this.text = '';
                                this.$message({
                                    message: '评论成功',
                                    type: 'success'
                                })
                            }
                            this.$emit('refresh', this.refresh);
                        })
                }
            },

        }


    };
</script>

<style lang="scss" scoped>
    .announce {
        margin-top: 20px;
        margin-bottom: 70px;

        h3 {
            font-size: 30px;
        }

        .input {
            width: 50%;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .el-button {
            margin-top: 5px;
            float: right;
            margin-left: 5px;
        }

        ::v-deep .el-textarea__inner {
            background-image: url(https://www.xiaofm.cn/usr/themes/Cuteen/assets/img/6643664.png);
            resize: none;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: right;
        }
    }

</style>
