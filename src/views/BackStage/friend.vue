<template>
    <div class="Container-add">
        <h2>添加你的友情链接</h2>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像链接" prop="avatar">
                <el-input v-model.number="ruleForm.avatar"></el-input>
            </el-form-item>
            <el-form-item label="博客地址" prop="url">
                <el-input v-model.number="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'BlogFriend',

        data() {
            return {
                rules: {
                    name: [{ required: true, message: "姓名不能为空", trigger: 'blur' }, { min: 2, max: 15, message: "长度在2到15个字符之间", trigger: 'blur' }],
                    title: [{ required: true, message: "标题不能为空", trigger: 'blur' }, { min: 3, max: 20, message: "长度在5到20个字符之间", trigger: 'blur' }],
                    avatar: [{ type: "url", required: true, message: "必须为链接地址", trigger: 'blur' }],
                    url: [{ type: "url", required: true, message: "必须为链接地址", trigger: 'blur' }],
                },
                ruleForm: {
                    name: "",
                    title: "",
                    avatar: "",
                    url: ""
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/friend/add", this.ruleForm)
                            .then((res) => {
                              
                                if (res.status == 200) {

                                    this.$message({
                                        message: '成功',
                                        type: 'success'
                                    })

                                }
                                this.ruleForm.name = '',
                                    this.ruleForm.title = '',
                                    this.ruleForm.avatar = '',
                                    this.ruleForm.url = ''
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .Container-add {
        width: 80%;
        float: right;
        padding: 20px;

        h2 {
            font-size: 22px;
        }

        .el-form {
            width: 60%;
            margin-top: 10px;
        }
    }

</style>
