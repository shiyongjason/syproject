<template>
    <div class="order-table">
        <!-- <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column
                prop="spuCode"
                align="center"
                label="商品编码">
            </el-table-column>
           <el-table-column
                prop="productCode"
                align="center"
                label="商品编码SKU">
            </el-table-column>
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

        </el-table> -->

        <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250  >
            <template slot-scope="scope" solt="orderStatus">
                <!--10:待支付，20:待发货，30:待收货，40:已完成，50:已关闭-->
                <span v-if="scope.data.row.orderStatus === 10">待支付</span>
                <span v-if="scope.data.row.orderStatus === 20">待发货</span>
                <span v-if="scope.data.row.orderStatus === 30">待收货</span>
                <span v-if="scope.data.row.orderStatus === 40">已完成</span>
                <span v-if="scope.data.row.orderStatus === 50">已关闭</span>
            </template>
        </basicTable>
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
                    total: 0,
                    pageSize: 10,
                    pageNumber: 1
                }
            }
        }
    },
    data () {
        return {
            tableLabel: [
                { label: '商品编码', prop: 'spuCode' },
                { label: '订单编号', prop: 'orderNo' },
                { label: '分部', prop: 'branchName' },
                { label: '平台公司', prop: 'merchantName' },
                { label: '会员店', prop: 'memberName' },
                { label: '金额', prop: 'totalAmount' },
                { label: '订单状态', prop: 'orderStatus' },
                { label: '下单时间', prop: 'orderTime' },
                { label: '商品数量', prop: 'quantity' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品类目', prop: 'categoryName' }

            ]
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
            this.$emit('onCurrentChange', val.pageNumber, 'productTotal')
        }
    }
}
</script>

<style>
.el-pagination__editor.el-input .el-input__inner {
    box-shadow: none;
}
</style>
