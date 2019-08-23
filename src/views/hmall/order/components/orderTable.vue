<template>
    <div class="order-table">
        <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="paginationInfo" @onCurrentChange="handleCurrentChange" @onSizeChange="handleSizeChange" :isMultiple="false" :isAction="false" :actionMinWidth=250 :load="load" :rowKey="rowKey">
            <template slot-scope="scope" slot="orderNo">
                <span :class="scope.data.row.isSplit==1?'isLink':''">{{scope.data.row.orderNo}}</span>
            </template>
            <template slot-scope="scope" slot="couponCode" v-if="scope.data.row.orderDiscountInfoDTO">
                {{scope.data.row.orderDiscountInfoDTO.couponCode}}
            </template>
            <template slot-scope="scope" slot="couponSnNo" v-if="scope.data.row.orderDiscountInfoDTO">
                {{scope.data.row.orderDiscountInfoDTO.couponSnNo}}
            </template>
            <template slot-scope="scope" slot="couponType" v-if="scope.data.row.orderDiscountInfoDTO">
                <span v-if="scope.data.row.orderDiscountInfoDTO.couponType === 1">满减</span>
                <span v-if="scope.data.row.orderDiscountInfoDTO.couponType === 2">无门槛</span>
                <span v-if="scope.data.row.orderDiscountInfoDTO.couponType === 3">折扣</span>
            </template>
            <template slot-scope="scope" slot="couponAmount" v-if="scope.data.row.orderDiscountInfoDTO">
                {{scope.data.row.orderDiscountInfoDTO.couponAmount}}
            </template>
            <template slot-scope="scope" slot="activityCode" v-if="scope.data.row.orderDiscountInfoDTO">
                {{scope.data.row.orderDiscountInfoDTO.activityCode}}
            </template>
            <template slot-scope="scope" slot="activityType" v-if="scope.data.row.orderDiscountInfoDTO">
                <span v-if="scope.data.row.orderDiscountInfoDTO.activityType===0">-</span>
                <span v-if="scope.data.row.orderDiscountInfoDTO.activityType===1">满减活动</span>
                <span v-if="scope.data.row.orderDiscountInfoDTO.activityType===2">折扣活动</span>
                <!--{{scope.data.row.orderDiscountInfoDTO.activityType==1?'满减活动':'折扣活动'}}-->
            </template>
            <template slot-scope="scope" slot="activityAmount" v-if="scope.data.row.orderDiscountInfoDTO">
                {{scope.data.row.orderDiscountInfoDTO.activityAmount}}
            </template>
            <template slot-scope="scope" slot="orderType">
                {{scope.data.row.orderType==0?'普通订单':'组合订单'}}
            </template>
            <template slot-scope="scope" slot="orderStatus">
                <!--1:待审核, 2:待付款, 3:待发货, 4:已完成, 5:已关闭-->
                <p v-if="scope.data.row.isSplit==0&&scope.data.row.isParentOrder==1&&scope.data.row.orderStatus==3&&scope.data.row.orderType==1">
                    <span>待拆分</span>
                </p>
                <p v-else>
                    <span v-if="scope.data.row.orderStatus === 1">待审核</span>
                    <span v-if="scope.data.row.orderStatus === 2">待付款</span>
                    <span v-if="scope.data.row.orderStatus === 3">待发货</span>
                    <span v-if="scope.data.row.orderStatus === 4">已完成</span>
                    <span v-if="scope.data.row.orderStatus === 5">已关闭</span>
                </p>

            </template>
            <template slot-scope="scope" slot="orderTime">
                <span v-if="scope.data.row.orderTime">{{scope.data.row.orderTime | formatterTime}}</span>
                <span v-else v-text="'-'"></span>
            </template>
            <template slot-scope="scope" slot="completeTime">
                <span v-if="scope.data.row.completeTime">{{scope.data.row.completeTime | formatterTime}}</span>
                <span v-else v-text="'-'"></span>
            </template>
        </basicTable>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { findChildOrder } from '../api/index'
export default {
    name: 'orderTable',
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
    data () {
        return {
            tableLabel: [
                { label: '订单编号', prop: 'orderNo', width: '150' },
                { label: '拆分订单编号', prop: 'childOrderNo', width: '100' },
                { label: '订单金额', prop: 'totalAmount' },
                { label: '优惠劵编号', prop: 'couponCode' },
                { label: '优惠券流水号', prop: 'couponSnNo' },
                { label: '优惠券类型', prop: 'couponType' },
                { label: '优惠金额', prop: 'couponAmount' },
                { label: '活动编号', prop: 'activityCode' },
                { label: '活动类型', prop: 'activityType' },
                { label: '活动优惠金额', prop: 'activityAmount' },
                { label: '订单类型', prop: 'orderType' },
                { label: '订单状态', prop: 'orderStatus' },
                { label: '分部', prop: 'branchName' },
                { label: '平台公司名称', prop: 'merchantName' },
                { label: '会员店名称', prop: 'memberName' },
                { label: '下单时间', prop: 'orderTime' },
                { label: '完成时间', prop: 'completeTime' }
            ],
            rowKey: 'id'
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        paginationInfo () {
            return {
                pageNumber: this.paginationData.pageNumber,
                pageSize: this.paginationData.pageSize,
                total: this.paginationData.totalElements
            }
        }
    },
    mounted () {
    },
    methods: {
        onQuery () {
            this.$emit('onQuery')
        },
        handleSizeChange (val) {
            // this.loading = true
            this.$emit('onSizeChange', val, 'order')
        },
        handleCurrentChange (val) {
            this.loading = true
            this.$emit('onCurrentChange', val.pageNumber, 'order')
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchParams.pageNumber = val.pageNumber
            this.getOrderList()
        },
        async load (tree, treeNode, resolve) {
            const orderNo = tree.orderNo
            const { data } = await findChildOrder({ orderId: tree.id })
            const childData = data.map(item => {
                item.id = item.id + '_sub'
                item.childOrderNo = item.orderNo
                item.orderNo = orderNo
                return item
            })
            resolve(childData)
        }
    }
}
</script>
<style lang="scss">
.el-pagination__editor.el-input .el-input__inner {
    box-shadow: none;
}
.isLink {
    color: #409eff;
    font-weight: 600;
}
/deep/ .el-table__expand-icon{
    position: absolute;
    top: 14px;
    right: 1px;
}
</style>
