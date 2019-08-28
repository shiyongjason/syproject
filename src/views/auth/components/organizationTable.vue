<template>
    <div class="content">
        <el-table :data="tableData" border stripe width="100%">
            <el-table-column type="index" :index="indexMethod" align="center" width="60" prop="date" label="序号">
            </el-table-column>
            <el-table-column prop="psncode" align="left" label="工号">
            </el-table-column>
            <el-table-column prop="psnname" align="left" label="姓名">
            </el-table-column>
            <el-table-column prop="mobile" align="left" label="登录名">
            </el-table-column>
            <el-table-column label="更新时间" align="center" width="200">
                <template slot-scope="scope">{{ scope.row.ts| formatterTime }}</template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="goTo(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'organizationTable',
    props: {
        tableData: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        paginationData: {
            type: Object,
            required: false,
            default () {
                return {
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    methods: {
        indexMethod (index) {
            return this.paginationData.pageSize * (this.paginationData.pageNum - 1) + index + 1
        },
        goTo (val) {
            this.$router.push({
                path: '/auth/role', query: { jobNumber: val.psncode, jobName: val.psnname }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding-top: 20px;
    box-sizing: border-box;
}
.modify {
    display: inline-block;
    width: 68px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid rgba(255, 122, 69, 1);
    font-size: 12px;
    color: #ff7a45;
    cursor: pointer;
}
/deep/ .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    background: rgba(242, 242, 244, 1);
}
</style>
