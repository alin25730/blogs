<template>
    <div class="announce">
        <el-dialog title="发表评论" :visible.sync="dialog" width="30%" height="50%" :before-close="handleClose">
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
            <el-button size="small" @click="handleClose">取 消</el-button>
            <span style="width: 20%; height: 5px; display: inline-block;"></span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'BlogComment',
        props: { dialog: Boolean,id:String },
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
                        id:this.id,
                        name: this.name,
                        email: this.email,
                        reply: '',
                        content: this.text,
                    }
                    this.$axios.post("/api/remark/reply", comment)
                        .then((res) => {
                       
                            if (res.status == 200) {
                                this.text = '';
                              
                            }
                            this.$emit('refresh', this.refresh);
                        })
                    this.$axios.post("/api/remark/replys", comment)
                        .then((res) => {
                        
                            if (res.status == 200) {
                              
                                this.$message({
                                    message: '评论成功',
                                    type: 'success'
                                })
                            }
                           
                        })
                }
            },
            handleClose() {
                this.$emit('dialog', false);
            }
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
            margin: 0 auto;
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
