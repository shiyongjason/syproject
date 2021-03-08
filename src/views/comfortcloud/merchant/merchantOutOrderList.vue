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
                    <div class="flex-wrap-title">订单状态：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.orderStatus" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未付款" value=10></el-option>
                            <el-option label="待发货" value=20></el-option>
                            <el-option label="待收货" value=30></el-option>
                            <el-option label="已完成" value=40></el-option>
                            <el-option label="退款中" value=60></el-option>
                            <el-option label="已关闭" value=50></el-option>
                            <el-option label="已退款" value=70></el-option>
                        </el-select>
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
                        <el-date-picker v-model="queryParams.startOrderTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endOrderTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
                        </el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="flex-wrap-title">是否含舒适云产品：</div>
                    <div class="flex-wrap-cont">
                        <el-select v-model="queryParams.isShy" style="width: 100%">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value=true></el-option>
                            <el-option label="否" value=false></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">
                        <el-button type="primary" class="ml20" @click="onSearch">查 询</el-button>
                    </div>
                </div>
            </div>
<!--            <el-tag size="medium" class="eltagtop">-->
<!--                已筛选 {{cloudMerchantProductOutOrderPagination.total}} 项；-->
<!--                累计成交订单: {{cloudMerchantProductOutOrderTotal.totalOrderCount}}笔；-->
<!--                累计销售件数: {{cloudMerchantProductOutOrderTotal.totalProductCount}}单；-->
<!--                累计成交金额:{{cloudMerchantProductOutOrderTotal.totalOrderAmount}}元-->
<!--            </el-tag>-->
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="cloudMerchantProductOutOrderList" :isShowIndex='false' :pagination="cloudMerchantProductOutOrderPagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="payMethod" slot-scope="scope">
                    {{orderPayDesc(scope.data.row.payMethod)}}
                </template>
                <template slot="orderStatus" slot-scope="scope">
                    {{orderStatusDesc(scope.data.row.orderStatus)}}
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
                <basicTable style="margin: 20px 0" :tableLabel="prouctDetailTableLabel" :tableData="cloudMerchantProductOutOrderDetail" :isShowIndex='false'>
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
                orderStatus: '',
                productName: '',
                startOrderTime: '',
                endOrderTime: '',
                isShy: ''
            },
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '订单来源', prop: 'source' },
                { label: '订单号', prop: 'orderNo' },
                { label: '下单时间', prop: 'orderTime', formatters: 'dateTime' },
                { label: '订单状态', prop: 'orderStatus' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '销售顾问', prop: 'salerName' },
                { label: '销售顾问手机号', prop: 'salerPhone' },
                { label: '订单实际支付金额', prop: 'finalTotalAmount', formatters: 'money' },
                { label: '支付方式', prop: 'payMethod' },
                { label: '支付时间', prop: 'payTime', formatters: 'dateTime' }
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
            cloudMerchantProductOutOrderList: 'cloudMerchantProductOutOrderList',
            cloudMerchantProductOutOrderPagination: 'cloudMerchantProductOutOrderPagination',
            cloudMerchantProductOutOrderDetail: 'cloudMerchantProductOutOrderDetail',
            // cloudMerchantProductOutOrderTotal: 'cloudMerchantProductOutOrderTotal'
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
            findCloudMerchantProductOutOrderList: 'findCloudMerchantProductOutOrderList',
            findCloudMerchantProductOutOrderDetail: 'findCloudMerchantProductOutOrderDetail'
        }),
        async onQuery () {
            await this.findCloudMerchantProductOutOrderList(this.searchParams)
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
            await this.findCloudMerchantProductOutOrderDetail({ orderNo: val.orderNo })
            this.detailDialogVisible = true
        },
        orderStatusDesc (status) {
            if (status == 10) {
                return '待付款'
            } else if (status == 20) {
                return '待发货'
            } else if (status == 30) {
                return '待收货'
            } else if (status == 40) {
                return '已完成'
            } else if (status == 50) {
                return '已关闭'
            } else if (status == 60) {
                return '退款中'
            } else if (status == 70) {
                return '已退款'
            }
            return status
        },
        orderPayDesc (status) {
            console.log(status)
            if (status === '1') {
                return '账期支付'
            } else if (status === '2') {
                return '线下支付'
            } else if (status === '4') {
                return '在线支付'
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
