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
                        <el-input v-model="queryParams.orderNo" placeholder="请输入订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <div class="query-col-title">商品名称：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.productName" placeholder="请输入商品名称"></el-input>
                    </div>
                </div>

                <div class="query-cont-col">
                    <div class="query-col-title">注册时间： </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="开始日期" :picker-options="pickerOptionsStart" default-time="00:00:00">
                        </el-date-picker>
                        <span class="ml10">-</span>
                        <el-date-picker v-model="queryParams.endRegisterTime" type="datetime" value-format='yyyy-MM-ddTHH:mm:ss' placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59">
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
                已筛选 {{merchantmemberData.total}} 项；
                累计成交订单: {{merchantmemberTotalData.registerCount}}笔；
                累计销售件数: {{merchantmemberTotalData.orderCount}}单；
                累计成交金额:{{merchantmemberTotalData.payAmountTotal}}元；
            </el-tag>
            <!-- 表格使用老毕的组件 -->
            <basicTable style="margin-top: 20px" :tableLabel="tableLabel" :tableData="tableData" :isShowIndex='false' :pagination="pagination" @onCurrentChange='onCurrentChange' @onSizeChange='onSizeChange' :isAction="true">
                <template slot="action" slot-scope="scope">
                    <el-button class="orangeBtn" @click="onEdit(scope.data.row)">查看详情</el-button>
                </template>
            </basicTable>

            <el-dialog title="订单详情" :modal-append-to-body=false :append-to-body=false :visible.sync="detailDialogVisible" width="50%">
                <h1>订单信息</h1>
                <p>商品总价 ￥1395.00 <br>
                    订单运费 ￥0.00<br>
                    优惠金额 -￥14.00<br>
                    商品改价 -￥261.00<br>
                    总11件，实付款￥1120.00
                </p>
                <h1>商品明细</h1>
                <basicTable style="margin-top: 20px" :tableLabel="prouctDetailTableLabel" :tableData="prouctDetailTableData" :isShowIndex='false'>
                </basicTable>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { clearCache, newCache } from '../../../utils'
export default {
    name: 'merchantOrderList',
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
                phone: this.$route.query.phone,
                endRegisterTime: '',
                startRegisterTime: ''
            },
            searchParams: {},
            tableData: [],
            pagination: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
            },
            tableLabel: [
                { label: '订单来源', prop: 'from' },
                { label: '订单号', prop: 'from' },
                { label: '下单时间', prop: 'from' },
                { label: '订单状态', prop: 'from' },
                { label: '会员账号', prop: 'phone' },
                { label: '会员昵称', prop: 'nickName' },
                { label: '收件人姓名', prop: 'nickName' },
                { label: '收件人地址', prop: 'nickName' },
                { label: '收件人手机', prop: 'nickName' },
                { label: '订单实际支付金额', prop: 'nickName' },
                { label: '订单运费', prop: 'nickName' },
                { label: '订单件数', prop: 'nickName' },
                { label: '支付方式', prop: 'nickName' },
                { label: '支付时间', prop: 'nickName' },
                { label: '物流公司', prop: 'nickName' },
                { label: '快递单号', prop: 'nickName' }
            ],
            prouctDetailTableLabel: [
                { label: '商品ID', prop: 'from' },
                { label: '商品名称', prop: 'from' },
                { label: '商品规格', prop: 'from' },
                { label: '商品价格（元）', prop: 'from' },
                { label: '商品数量（件）', prop: 'from' }
            ],
            prouctDetailTableData: [],
            detailDialogVisible: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            merchantmemberData: 'iotmerchantmemberData',
            merchantmemberTotalData: 'iotmerchantmemberTotalData'
        }),
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams.endRegisterTime
                    if (endDateVal) {
                        return time.getTime() < new Date(endDateVal).getTime() - 30 * 24 * 60 * 60 * 1000 || time.getTime() > new Date(endDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams.startRegisterTime
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < new Date(beginDateVal).getTime()
                    }
                    // return time.getTime() <= Date.now() - 8.64e7
                }
            }
        }
    },
    mounted () {
        // this.tableData = [{ productN: '123' }]
        this.onSearch()
    },
    activated () {
        this.onQuery()
    },
    beforeRouteEnter (to, from, next) {
        newCache('comfortcloudMembermanage')
        next()
    },
    beforeRouteLeave (to, from, next) {
        console.log(to.name)
        if (to.name != 'merchantMemberInvitation') {
            clearCache('comfortcloudMembermanage')
        }
        next()
    },
    methods: {
        ...mapActions({
            findMerchantMembersituation: 'findMerchantMembersituation',
            iotmerchantmemberDataPagination: 'iotmerchantmemberDataPagination',
            findMerchantMemberTotalsituation: 'findMerchantMemberTotalsituation'
        }),
        async onQuery () {
            await this.findMerchantMembersituation(this.searchParams)
            await this.findMerchantMemberTotalsituation()
            this.tableData = this.merchantmemberData.records
            this.pagination = {
                pageNumber: this.merchantmemberData.current,
                pageSize: this.merchantmemberData.size,
                total: this.merchantmemberData.total
            }
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onEdit (val) {
            this.$router.push({ path: '/comfortCloudMerchant/merchantVIP/merchantMemberInvitation', query: val })
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery(this.searchParams)
        },
        setMerchantType (val) {
            let type = ''
            if (val.role === 1) {
                type += '新人'
            } else if (val.role === 2) {
                type += '普通会员'
            }
            if (val.distributorStatus === 1) {
                type += '、分销员'
            }
            if (val.agentStatus === 10) {
                type += '、经销商'
            }

            return type
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
