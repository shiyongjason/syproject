<template>
    <div class="order-table">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="spuCode"
                align="center"
                label="商品编码">
            </el-table-column>
             <!--<el-table-column
                prop="productCode"
                align="center"
                label="商品编码SKU">
            </el-table-column> -->
            <el-table-column
                prop="orderNo"
                align="center"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="branchName"
                align="center"
                label="分部">
            </el-table-column>
            <el-table-column
                prop="merchantName"
                align="center"
                label="平台公司">
            </el-table-column>
            <el-table-column
                prop="memberName"
                align="center"
                label="会员店">
            </el-table-column>
            <el-table-column
                align="center"
                label="金额">
                <template slot-scope="scope">{{Number(scope.row.totalAmount).toFixed(2)}}</template>
            </el-table-column>
            <el-table-column
                align="center"
                label="订单状态">
                <template slot-scope="scope">
                    <!--1:待审核, 2:待付款, 3:待发货, 4:已完成, 5:已关闭-->
                    <span v-if="scope.row.orderStatus === 1">待审核</span>
                    <span v-if="scope.row.orderStatus === 2">待付款</span>
                    <span v-if="scope.row.orderStatus === 3">待发货</span>
                    <span v-if="scope.row.orderStatus === 4">已完成</span>
                    <span v-if="scope.row.orderStatus === 5">已关闭</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="下单时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderTime">{{scope.row.orderTime | formatterTime}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                align="center"
                label="商品数量">
            </el-table-column>
            <el-table-column
                prop="productName"
                align="center"
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="categoryName"
                align="center"
                label="商品类目">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                label="同步至mis状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.misStatus === 0">未同步</span>
                    <span v-if="scope.row.misStatus === 1">同步成功</span>
                    <span v-if="scope.row.misStatus === 2">同步失败</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="同步mis时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.misTime">{{scope.row.misTime | formatterTime}}</span>
                    <span v-else v-text="'-'"></span>
                </template>
            </el-table-column> -->
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
import { mapState } from 'vuex'
export default {
    name: 'productTotalTable',
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
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            this.loading = true
            this.$emit('onSizeChange', val, 'productTotal')
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val, 'productTotal')
        }
    }
}
</script>

<style>
    .el-pagination__editor.el-input .el-input__inner{
        box-shadow: none;
    }
</style>
