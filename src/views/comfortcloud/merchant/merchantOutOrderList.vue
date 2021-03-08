<template>
    <div class="page-body B2b">
        <div class="page-body-cont ">
            <div class="query-cont__row">
                <div class="query-cont-col">
                    <div class="query-col-title">会员账号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.phone" placeholder="请输入手机号" maxlength="50"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.orderId" placeholder="请输入订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" placeholder="请输入商品名称"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">下单时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                </div>
            </div>
            <el-tag size="medium" class="eltagtop">
                已筛选 {{cloudMerchantProductOrderPagination.total}} 项；
                累计成交订单: {{cloudMerchantProductOrderTotal.totalOrderCount}}笔；
                累计销售件数: {{cloudMerchantProductOrderTotal.totalProductCount}}单；
                累计成交金额:{{cloudMerchantProductOrderTotal.totalOrderAmount}}元
            </el-tag>
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="cloudMerchantProductOrderList" :isShowIndex='false' :pagination="cloudMerchantProductOrderPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="status" slot-scope="scope">
                    {{orderStatusDesc(scope.data.row.status)}}
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onDetail(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>

            <el-dialog title="订单详情" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="50%">
                <h1 style="padding-bottom: 10px">订单信息</h1>
                <p style="line-height: 25px">商品总价 ￥{{focusDetailOrder.orderProductAmount}} <br>
                    订单运费 ￥{{focusDetailOrder.freight}}<br>
                    优惠金额 -￥{{focusDetailOrder.discountAmount}}<br>
                    商品改价 -￥{{focusDetailOrder.changePrice}}<br>
                    总{{focusDetailOrder.orderProductCount}}件，实付款￥{{focusDetailOrder.payAmount}}
                </p>
                <h1 style="padding-top: 20px">商品明细</h1>
                <basicTable style="margin: 20px 0" :tableLabel="prouctDetailTableLabel" :tableData="cloudMerchantProductOrderDetail" :isShowIndex='false'>
                </basicTable>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'merchantOutOrderList',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
                orderId: '',
                productName: '',
                startTime: '',
                endTime: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '订单来源', prop: 'source' },
                { label: '订单号', prop: 'orderId' },
                { label: '下单时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '订单状态', prop: 'status' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '收件人姓名', prop: 'consigneeName' },
                { label: '收件人地址', prop: 'consigneeAddress' },
                { label: '收件人手机', prop: 'consigneePhone' },
                { label: '订单实际支付金额', prop: 'payAmount', formatters: 'money' },
                { label: '订单运费', prop: 'freight' },
                { label: '订单件数', prop: 'orderProductCount' },
                { label: '支付方式', prop: 'payMethod' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' },
                { label: '物流公司', prop: 'deliveryName' },
                { label: '快递单号', prop: 'waybillId' }
            ],
            prouctDetailTableLabel: [
                { label: '商品ID', prop: 'productId' },
                { label: '商品名称', prop: 'productName' },
                { label: '商品规格', prop: 'wxSpecification' },
                { label: '商品价格（元）', prop: 'productPrice' },
                { label: '商品数量（件）', prop: 'productCount' }
            ],
            prouctDetailTableData: [],
            detailDialogVisible: false,
            focusDetailOrder: {}
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantProductOrderList: 'cloudMerchantProductOrderList',
            cloudMerchantProductOrderPagination: 'cloudMerchantProductOrderPagination',
            cloudMerchantProductOrderDetail: 'cloudMerchantProductOrderDetail',
            cloudMerchantProductOrderTotal: 'cloudMerchantProductOrderTotal'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                }
            }
        }
    },
    mounted () {
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    methods: {
        ...mapActions({
            findCloudMerchantProductOrderList: 'findCloudMerchantProductOrderList',
            findCloudMerchantProductOrderDetail: 'findCloudMerchantProductOrderDetail'
        }),
        async onQuery () {
            await this.findCloudMerchantProductOrderList(this.searchParams)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        async onDetail (val) {
            this.focusDetailOrder = val
            await this.findCloudMerchantProductOrderDetail({ orderId: val.orderId })
            this.detailDialogVisible = true
        },
        orderStatusDesc (status) {
            if (status == 10) {
                return '待付款'
            } else if (status == 20) {
                return '待发货'
            } else if (status == 30) {
                return '待收货'
            } else if (status == 100) {
                return '已完成'
            } else if (status == 200) {
                return '已退货退款'
            } else if (status == 250) {
                return '已取消'
            }
            return status
        }
    }
}
</script>

<style lang='scss' scoped>
    .spanflex {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        span {
            flex: 1;
            &:first-child {
                font-size: 16px;
            }
            &:last-child {
                text-align: right;
            }
        }
    }
    .topTitle{
        margin-right: 2rem;
        font-weight:bold;
    }
    .colred {
        color: #ff7a45;
        cursor: pointer;
    }.topColred {
         color: #ff7a45;
         cursor: pointer;
     }
    /deep/.el-dialog__body {
        padding-top: 10px;
    }
</style>
