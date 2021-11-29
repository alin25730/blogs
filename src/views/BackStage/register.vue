<template>
    <div class="register">
        <div class="box">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password1">
                    <el-input type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="ruleForm.identity" placeholder="请选择身份">
                        <!-- <el-option disabled label="管理员" value="manager"></el-option> -->
                        <el-option label="游客" value="tourist"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlogRegister',

        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    email: "",
                    name: "",
                    password: "",
                    password1: "",
                    identity: ""
                },
                rules: {
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    name: [{ required: true, message: "用户名不能为空", trigger: 'blur' }, { min: 2, max: 30, message: "长度在2到30个字符之间", trigger: 'blur' }],
                    password: [{ required: true, message: "密码不能为空", trigger: 'blur' }, { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: 'blur' }],
                    password1: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('api/user/signin', this.ruleForm)
                            .then((res) => {
                           
                                if (res.status == 200) {
                                    //   注册成功 提示成功 跳转登录页面
                                    this.$message({
                                        message: "账号注册成功",
                                        type: "success"
                                    })
                                    this.$router.push('/Login');
                                } else {
                                    this.$message({
                                        message: res.response.data,
                                        type: "warning"
                                    });
                                 
                                }

                            })
                            .catch((err) => {
                                console.log(err.response)
                                throw err;
                            })

                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../assets/image/Loginbg.jpg") no-repeat no-repeat center;
        background-size: cover;

        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            padding: 40px;
            box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
            border-radius: 10px;
        }
    }

</style>
