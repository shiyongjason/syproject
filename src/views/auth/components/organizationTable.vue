<template>
    <div class="table">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="工号">
            </el-table-column>
            <el-table-column
                prop="address"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="登录名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="更新时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
            </el-table-column>
        </el-table>
        <div>
            <Pagination :paginationData="paginationData" @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange"></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/pagination/HPagination'
export default {
    name: 'organizationTable',
    components: {
        Pagination
    },
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            paginationData: {
                pageNumber: 1,
                totalElements: 0
            }
        }
    },
    methods: {
        onSizeChange (val) {
            console.log(val)
        },
        onCurrentChange (val) {
            console.log(val)
        }
    }
}
</script>

<style scoped>
.table{
    padding-top: 20px;
    padding-right: 12px;
    box-sizing: border-box;
}
</style>
