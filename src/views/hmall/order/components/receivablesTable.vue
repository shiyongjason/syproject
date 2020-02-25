<template>
    <div class="order-table">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="paymentNo"
                align="center"
                label="支付流水号">
            </el-table-column>
            <el-table-column
                prop="orderNo"
                align="center"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="merchantName"
                align="center"
                label="平台公司名称">
            </el-table-column>
            <el-table-column
                prop="memberName"
                align="center"
                label="会员店名称">
            </el-table-column>
            <el-table-column
                align="center"
                label="支付时间">
                <template slot-scope="scope">
                    {{scope.row.paymentTime | formatterTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="支付方式"
                prop="paymentMethodDesc">
            </el-table-column>
            <el-table-column
                align="center"
                prop="paymentAmount"
                label="金额（元）">
            </el-table-column>
            <el-table-column
                align="center"
                label="收款状态"
                prop="statusDesc">
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
    name: 'receivablesTable',
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
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val, 'receivables')
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val, 'receivables')
        }
    }
}
</script>

<style scoped>

</style>
