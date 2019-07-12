<template>
    <div class="content">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                type="index"
                :index="indexMethod"
                align="left"
               width="100"
                prop="date"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="psncode"
                 align="left"
                 width="180"
                label="工号">
            </el-table-column>
            <el-table-column
                prop="psnname"
                 align="center"
                 width="180"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="mobile"
                 align="center"
                 width="180"
                label="登录名">
            </el-table-column>
            <el-table-column
                label="更新时间"
                 align="center"
                 width="200">
                <template slot-scope="scope">{{ scope.row.ts| formatterTime }}</template>
            </el-table-column>
            <el-table-column
                prop="address"
                 align="center"

                label="操作">
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

<style scoped>
.content{
    padding-top: 20px;
    box-sizing: border-box;
}
    .modify{
        display: inline-block;
        width:68px;
        height:24px;
        line-height: 24px;
        border-radius:4px;
        border:1px solid rgba(255,122,69,1);
        font-size: 12px;
        color: #FF7A45;
        cursor: pointer;
    }
</style>
