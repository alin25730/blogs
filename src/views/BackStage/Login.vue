<template>
    <div class="loginCss">
        <div class="box">
            <h2>Bibooo BLOG</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button  @click="register">还没有注册！</el-button>
                </el-form-item>
              </el-form>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
    export default {
        name: 'BlogLogin',

        data() {
            return {
                ruleForm:{
                    email:"",
                    password:"",
                },
                rules:{
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                    password:{
                        required:true,message:"请输入密码",trigger:'blur'
                    }
                }
            };
        },

        methods: {
            submitForm(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('api/user/login', this.ruleForm)
                            .then((res) => {
                             
                                if (res.status == 200) {
                                    //   登录成功
                                    //   存储token
                                    //   jwt_decode解碼 Base64Url 編碼的 JWT 令牌
                                    //   存储vuex
                                    //   请求头带上token
                                    //   跳转到管理后台页
                                    let blogToken = res.data.token;
                                    localStorage.setItem('blogToken',blogToken);
                                    const decode = jwt_decode(blogToken);
                                    this.$store.dispatch('audpdateInfo',decode);
                                    this.$message({
                                        message: "登录成功",        
                                        type: "success"
                                    })
                                    this.$router.push('/Adminpage');
                                } else{
                                    this.$message({
                                        message: res.response.data,
                                        type: "warning"
                                    });
                                }  

                            })
                            .catch((err) => {
                               
                                throw err;
                            })

                    } else {
                        return false;
                    }
                });
            },
            register(){
                //  跳到注册页
                this.$router.push({path:"/register"})
            }
        },
    };
</script>

<style lang="scss" scoped>
    .loginCss {
        position: relative; 
        width: 100%;
        height: 100%;
        background: url("../../assets/image/Loginbg.jpg") no-repeat no-repeat center;
        background-size: 100% 100%;
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
