<template>
    <el-table :data="message" style="width: 75%">
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
        <el-table-column label="留言" width="880">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.content }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    export default {
        data() {
            return {
                message:[],
            }
        },
        created() {
            this.request()
        },
        methods: {
          
            handleDelete(index, row) {
               
                this.$axios.post(`/api/remark/delete/${row._id}`)
                .then((res)=>{
                     if(res.status == 200){
                        this.$message({
                            message:"删除成功",
                            type:"success"
                        })
                        this.request()
                     }
                   
                })
            },
            request(){
                this.$axios.get("/api/remark/check")
                .then((res) => {
                    this.message = res.data;
                  
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
.el-table{
   padding: 20px;
   
}

</style>
