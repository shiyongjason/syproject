<template>
    <div class="page-body">
        <div class="page-body-cont query-cont">
            <div class="query-cont-col">
                <div class="query-col-title">SKU编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuCode" placeholder="请输入SKU编码">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">子订单编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.childOrderNo" placeholder="请输入子订单编号">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品类目：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.categoryId" placeholder="请输入商品类目">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">商品SKU名称：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.skuName" placeholder="请输入商品SKU名称">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">会员店：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.memberName" placeholder="请输入会员店">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属品牌：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.brandName" placeholder="请输入所属品牌">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单状态：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.childOrderStatus">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待支付" value="10"></el-option>
                        <el-option label="待发货" value="20"></el-option>
                        <el-option label="待收货" value="30"></el-option>
                        <el-option label="已完成" value="40"></el-option>
                        <el-option label="已关闭" value="50"></el-option>
                        <el-option label="退款中" value="60"></el-option>
                        <el-option label="已退款" value="70"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">订单渠道：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.source">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="app" value="1"></el-option>
                        <el-option label="微信小程序" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="flex-wrap-title">支付方式：</div>
                <div class="flex-wrap-cont">
                    <el-select v-model="queryParams.payWay">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="账期支付" value="1"></el-option>
                        <el-option label="公司转账" value="2"></el-option>
                        <el-option label="余额支付" value="10"></el-option>
                        <el-option label="快捷支付" value="20"></el-option>
                        <el-option label="快捷支付(信用卡)" value="21"></el-option>
                        <el-option label="快捷支付(借记卡)" value="22"></el-option>
                        <el-option label="网银支付" value="30"></el-option>
                        <el-option label="微信支付" value="40"></el-option>
                        <el-option label="微信支付(小程序)" value="42"></el-option>
                        <el-option label="支付宝支付" value="50"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">所属商家：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="50" v-model="queryParams.merchantName" placeholder="请输入所属商家">
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">下单时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endCreateTime')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endCreateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startCreateTime')" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">支付时间：</div>
                <div class="query-col-input">
                    <el-date-picker v-model="queryParams.startPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsStart('endPayTime')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker v-model="queryParams.endPayTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束日期" :picker-options="pickerOptionsEnd('startPayTime')" default-time="23:59:59">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onExport">导出</el-button>
            </div>
        </div>
        <div class="page-body-cont">
            <basicTable :tableLabel="tableLabel" :tableData="tableData" :pagination='paginationData' @onSizeChange="onSizeChange" @onCurrentChange="onCurrentChange">

            </basicTable>
        </div>
    </div>
</template>
<script>
import { transactionInfoTableLabel } from './const'
import { downloadTransactionInfoList } from './api'
import { createNamespacedHelpers, mapState } from 'vuex'
const { mapActions } = createNamespacedHelpers('dataBoard')
export default {
    name: 'transactionInfo',
    data () {
        return {
            queryParams: {
                skuCode: '',
                childOrderNo: '',
                categoryId: '',
                skuName: '',
                memberName: '',
                brandName: '',
                childOrderStatus: '',
                source: '',
                payWay: '',
                merchantName: '',
                startCreateTime: '',
                endCreateTime: '',
                startPayTime: '',
                endPayTime: ''
            },
            searchParams: {},
            tableLabel: transactionInfoTableLabel
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            tableData: state => state.dataBoard.getTransactionInfoList,
            paginationData: state => state.dataBoard.transactionPaginationData
        })
    },
    methods: {
        pickerOptionsStart (end) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[end])
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal
                    }
                }
            }
        },
        pickerOptionsEnd (start) {
            return {
                disabledDate: (time) => {
                    let beginDateVal = new Date(this.queryParams[start])
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal
                    }
                }
            }
        },
        ...mapActions([
            'findTransactionInfo'
        ]),
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        onQuery () {
            this.findTransactionInfo(this.searchParams)
        },
        onReset () {
            this.queryParams = {
                skuCode: '',
                childOrderNo: '',
                categoryId: '',
                skuName: '',
                memberName: '',
                brandName: '',
                childOrderStatus: '',
                source: '',
                payWay: '',
                merchantName: '',
                startCreateTime: '',
                endCreateTime: '',
                startPayTime: '',
                endPayTime: ''
            }
            this.onSearch()
        },
        onExport () {
            downloadTransactionInfoList(this.searchParams)
        },
        onSizeChange (val) {
            this.searchParams.pageSize = val
            this.onQuery()
        },
        onCurrentChange (val) {
            this.searchParams.pageNumber = val.pageNumber
            this.onQuery()
        }
    },
    mounted () {
        this.onSearch()
    }
}
</script>
<style lang="scss" scoped>
</style>
