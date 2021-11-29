<template>
    <div class="Edit">
        <div class="container">
            <el-input placeholder="模糊搜索文章" @change="searchEd" suffix-icon="el-icon-search" v-model="search">
            </el-input>
        </div>
        <div class="table">
            <el-table :data="table" style="width: 100%">
                <el-table-column label="日期" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.data }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>

                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="180">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.type }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="内容" width="700">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.content }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="page_size" :layout="layout" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlogEditmeditor',

        data() {
            return {
                search: "",
                tableData: [],
                table: [],
                page_size: 5,//一页5条，
                total: 0,//总共20条,
                currentPage: 1,
                layout: "total, prev, pager, next, jumper"
            };
        },
        created() {
           this.data()
        },

        methods: {
            // 表格数据
            data(){
                this.$axios.post("/api/Mkdown/seek")
                .then((res) => {
                    this.tableData = res.data;
                    // 分页初始化
                    // 总共条数
                    this.total = this.tableData.length;
                    // 一页显示五条
                    this.page_size = 5;
                    // this.table =
                    this.table = this.tableData.filter((item, index) => {
                        return index < this.page_size
                    })

                })
            },
            // 当前页
            handleCurrentChange(val) {
                this.page_size = 5;
              
                if(val == 1){
                    this.table = this.tableData.filter((item, index) => {
                        return index < this.page_size
                    })   
                }
                // 当前页
                let page = this.page_size * (val - 1); 
                // 条数
                let tables = [];
                let nums = this.page_size * val;
                for (let i = page; i < nums; i++) {
                    if (this.tableData[i]) {
                        tables.push(this.tableData[i])
                    }
                    this.table = tables
                }
            },
            searchEd(){
                this.$axios.get(`/api/Mkdown/SearchMkdon?title=${this.search}`)
                .then((res)=>{
                      if(res.data.length == 0){
                          this.$message({
                              message:"抱歉没有找到相关的文章"
                          })
                      }else{
                          this.tableData = res.data;
                          this.currentPage = 1;
                          this.total = res.data.length;
                          this.page_size = 5;
                          this.table = this.tableData.filter((item,index)=>{
                              return index < this.page_size
                          });
                      }
                })
            },
            // 删除
            handleDelete(index,row){
                this.$axios.get(`/api/Mkdown/DetMkdown?id=${row._id}`)
                .then((res)=>{
                     this.$message({
                         message:"删除成功"
                     })
                     this.data()
                })
              
            },
            // 编辑
            handleEdit(index,row){
                this.$store.commit("Mkdown",row);
                this.$router.push("/Meditor")
            }

        },
    };
</script>

<style lang="scss" scoped>
    .Edit {
        width: 80%;
        float: right;

        .container {
            width: 20%;
            margin-top: 10px;
        }

        .el-pagination {
            float: right;
            margin-top: 10px;
        }
    }

</style>
