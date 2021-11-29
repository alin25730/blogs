<template>
    <div class="BlogMeditor">
        <div class="container">
            <el-form ref="sizeForm" :rules="rules" :model="sizeForm" label-width="70px" size="mini">
                <el-form-item label="作者" prop="name">
                    <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-col :span="4">
                        <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="4">
                        <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;">
                        </el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="item" label="摘要">
                    <el-input v-model="sizeForm.region"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="sizeForm.type" placeholder="请选择类型">
                        <el-option label="JavaScript" value="JavaScript"></el-option>
                        <el-option label="Vue" value="Vue"></el-option>
                        <el-option label="遇到的问题" value="遇到的问题"></el-option>
                        <el-option label="推荐" value="推荐"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <el-col :span="8">
                        <!-- mkd -->
                        <mavon-editor style="width: 1000px;height: 580px;" :toolbars="toolbars" v-model="context"
                            :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" />
                    </el-col>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="onSubmit('sizeForm')">{{create}}</el-button>
                    <el-button type="primary" v-show="$store.state.Ecreat" @click="cancel()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>

    export default {
        name: 'BlogMeditor',

        data() {
            return {
                create: "",
                rules: {
                    name: [{ required: true, message: '请输入作者名字   ', trigger: 'blur' },
                    ]
                },
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    type: [],
                },
                context: "", //输入的数据
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: false, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: false, // 上一步
                    redo: false, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },


            };
        },

        created() {
            if (this.$store.state.Ecreat == true) {
                this.sizeForm = {
                    name: this.$store.state.Meditor.name,
                    region: this.$store.state.Meditor.title,
                    type: this.$store.state.Meditor.type
                }
                this.context = this.$store.state.Meditor.content
                this.create = "确认编辑"
            } else {
                this.create = "立即创建"
            }
        },

        methods: {
            cancel() {
                this.$store.state.Ecreat = false,
                    this.$store.state.Meditor = '',
                    this.$router.push("/EditMeditor")
            },
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        var d = new Date(this.sizeForm.date1);
                        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        // 日期
                        var time = d.split(" ")[0]
                        var d1 = new Date(this.sizeForm.date2);
                        d1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();
                        // 具体时间
                        var time1 = d1.split(" ")[1]

                        var data = time + ' ' + time1
                        var Form = {
                            name: this.sizeForm.name,
                            data: data,
                            title: this.sizeForm.region,
                            type: this.sizeForm.type,
                            content: this.context
                        }
                        if (this.$store.state.Ecreat == false) {
                            this.$axios.post("/api/Mkdown/add", Form)
                                .then((res) => {
                                    if (res.status == 200) {
                                        this.sizeForm.name = '',

                                            this.sizeForm.region = '',
                                            this.sizeForm.type = '',
                                            this.context = '',
                                            this.$message({
                                                message: "添加文章成功",
                                                type: "success"
                                            })
                                    }
                                })

                        } else {
                            Form.id = this.$store.state.Meditor._id;
                         
                            this.$axios.post("/api/Mkdown/EditMkdown", Form)
                                .then((res) => {
                                    if (res.status == 200) {
                                       
                                        this.sizeForm.name = '',
                                            this.sizeForm.region = '',
                                            this.sizeForm.type = '',
                                            this.context = '',
                                            this.$message({
                                                message: "修改文章成功",
                                                type: "success"
                                            })
                                    }
                                })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            $imgAdd(pos, $file) {
                let img = {
                    imgs: $file.miniurl,
                    name: $file._name
                }
                this.$axios.post("/api/Mkdown/upload", img)
                    .then((res) => {
                        this.$refs.md.$img2Url(pos, `http://localhost:5000/${res.data}`)
                    })

            },
            $imgDel(pos) {
                let url = pos[0].split("5000")
                let urls = {
                    url: url[1]
                }
                this.$axios.post("/api/Mkdown/delete", urls)
                    .then((res) => {
                        console.log(res)
                    })

            }

        },
    };
</script>

<style lang="scss" scoped>
    .BlogMeditor {
        width: 80%;
        float: right;

        .container {
            .el-form {
                width: 60%;
                margin-left: 10px;
                margin-top: 10px;
            }

            .item {
                .el-input {
                    width: 40%;
                }
            }

            .el-input {
                width: 20%;
            }

            .line {
                text-align: center;
            }
        }

    }

</style>
