<template>
    <div class="wallet-pay-table">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="orderNo"
                align="center"
                label="平台公司">
            </el-table-column>
            <el-table-column
                prop="totalAmount"
                align="center"
                label="会员店名称">
            </el-table-column>
            <el-table-column
                align="center"
                label="法人联系方式">
            </el-table-column>
            <el-table-column
                prop="branchName"
                align="center"
                label="法人姓名">
            </el-table-column>
            <el-table-column
                prop="merchantName"
                align="center"
                label="单分享开通状态">
            </el-table-column>
            <el-table-column
                prop="memberName"
                align="center"
                label="单分享开通时间">
            </el-table-column>
            <el-table-column
                align="center"
                label="网商支付开通状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderTime">{{scope.row.orderTime | formatDate}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="网商支付开通时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.completeTime">{{scope.row.completeTime | formatDate}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
        </el-table>
        <div class="page clearfix" style="text-align: center;margin-top: 20px">
            <el-pagination
                class="el-page"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationData.pageNumber"
                :page-sizes="[10,20,30,40,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :onQuery="onQuery"
                :total="paginationData.totalElements">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wallerPayTable',
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
            default () {
                return {
                    totalElements: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    methods: {
        onQuery () {
            console.log(1)
        },
        handleSizeChange (val) {
            this.$emit('onSizeChange', val)
        },
        handleCurrentChange (val) {
            this.$emit('onCurrentChange', val)
        }
    }
}
</script>

<style scoped>

</style>
