<template>
    <div class="order-table">
        <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationData" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250>
            <template slot-scope="scope" slot="orderStatus">
                <!--10:待支付，20:待发货，30:待收货，40:已完成，50:已关闭-->
                <span v-if="scope.data.row.orderStatus === 10">待支付</span>
                <span v-if="scope.data.row.orderStatus === 20">待发货</span>
                <span v-if="scope.data.row.orderStatus === 30">待收货</span>
                <span v-if="scope.data.row.orderStatus === 40">已完成</span>
                <span v-if="scope.data.row.orderStatus == 50">已关闭</span>
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
                { label: 'SPU编码', prop: 'spuCode' },
                { label: 'SKU编码', prop: 'skuCode' },
                { label: '订单编号', prop: 'orderNo' },
                { label: '分部', prop: 'branchName' },
                { label: '平台公司', prop: 'merchantName' },
                { label: '会员店', prop: 'memberName' },
                { label: '金额', prop: 'totalAmount' },
                { label: '订单状态', prop: 'orderStatus' },
                { label: '下单时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '商品数量', prop: 'quantity' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品类目', prop: 'category' }
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
