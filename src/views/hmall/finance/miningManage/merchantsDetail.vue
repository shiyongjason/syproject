<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane label="商家明细" name="detail"></el-tab-pane>
                    <el-tab-pane label="交易记录" name="record"></el-tab-pane>
                </el-tabs>
            </div>
            <div v-if="tabName == 'detail'">
                <div class="table-cont-title">
                    <span class="table-title-name">资金总览</span>
                </div>
                <div class="balance-cont-row">
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="icon iconfont hosjoy_money"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前额度<span>（元）</span></p>
                            <p>{{merchantStatistInfo.creditLimit|| 0 | moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_order"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总代采<span>（元）</span></p>
                            <p>{{merchantStatistInfo.totalAmount || 0 | moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_operation"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总预付<span>（元）</span></p>
                            <p>{{merchantStatistInfo.totalPrepayAmount|| 0 | moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_set"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总代付<span>（元）</span></p>
                            <p>{{merchantStatistInfo.totalRetainageAmount || 0 | moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_store"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总回款<span>（元）</span></p>
                            <p>{{merchantStatistInfo.totalRepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_jgzx"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前占用<span>（元）</span></p>
                            <p>{{merchantStatistInfo.occupationAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_goods"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前逾期未还<span>（元）</span></p>
                            <p>{{merchantStatistInfo.overdueAmount || 0| moneyShow}}</p>
                        </div>
                    </div>
                </div>
                <div class="table-cont-title">
                    <span class="table-title-name">商家明细</span>
                </div>
                <div class="query-cont-row mt20">
                    <div class="query-cont-col">
                        <div class="query-col-title">商家：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.username" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">
                            <el-select v-model="queryParams.timeQueryType" style="width:140px" class="pr10">
                                <el-option v-for="item in deadlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="query-col-input" >
                            <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-ddT00:00:00" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-ddT23:59:59" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd" default-time="23:59:59"></el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">逾期否：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.overdue">
                                <el-option v-for="item in overdueOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">资金状态：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.fundStatus">
                                <el-option v-for="item in capitalStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <h-button type='primary' @click="onQuery">查询</h-button>
                        <h-button @click="onReset">重置</h-button>
                    </div>
                </div>
                <basicTable :tableData="tableDetailData" :tableLabel="tableDetailLabel" :pagination="paginationDetail" @onCurrentChange="onCurrentChange" @onSizeChange="handleSizeChange" :isShowSum="true" :getSum="getSum">
                    <!-- 当前额度 -->
                    <template slot="creditLimit" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'creditLimit')">{{scope.data.row.creditLimit | moneyShow}}</a>
                    </template>
                    <template slot="totalAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'totalAmount')">{{scope.data.row.totalAmount| moneyShow}}</a>
                    </template>
                    <template slot="totalPrepayAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'totalPrepayAmount')">{{scope.data.row.totalPrepayAmount| moneyShow}}</a>
                    </template>
                    <template slot="totalRetaingeAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'totalRetaingeAmount')">{{scope.data.row.totalRetaingeAmount| moneyShow}}</a>
                    </template>
                    <template slot="totalRepayedAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'totalRepayedAmount')">{{scope.data.row.totalRepayedAmount| moneyShow}}</a>
                    </template>
                    <template slot="occupationAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'occupationAmount')">{{scope.data.row.occupationAmount| moneyShow}}</a>
                    </template>
                    <template slot="overdueAmount" slot-scope="scope">
                        <a class="isLink" @click="onInfo(scope.data.row,'overdueAmount')">{{scope.data.row.overdueAmount| moneyShow}}</a>
                    </template>
                    <template slot="overdue" slot-scope="scope">
                        <span>{{overdueMap.get(scope.data.row.overdue)}}</span>
                    </template>
                    <!-- <template slot="fundStatus" slot-scope="scope">
                        <span>{{capitalStatusMap.get(scope.data.row.fundStatus)}}</span>
                    </template> -->
                </basicTable>
            </div>
            <div v-if="tabName == 'record'">
                <span class="title-cont__btn" style="text-align: right;display: block;">
                    <h-button type='assist' @click="onWithdrawal">提现</h-button>
                </span>
                <div class="balance-cont-row">
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_money"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总回款<span>（元）</span></p>
                            <p>{{repayStatistInfo.totalRepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_order"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>线下提前还款<span>（元）</span></p>
                            <p>{{repayStatistInfo.offlineAdvanceRepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_operation"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>单分享订单回款<span>（元）</span></p>
                            <p>{{repayStatistInfo.saleRepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_set"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>已提现<span>（元）</span></p>
                            <p>{{repayStatistInfo.withdrawAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_store"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>可提现<span>（元）</span></p>
                            <p>{{repayStatistInfo.availableWithdrawAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_jgzx"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>线下转账预付款<span>（元）</span></p>
                            <p>{{repayStatistInfo.offlinePrepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_jgzx"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>网银支付预付款<span>（元）</span></p>
                            <p>{{repayStatistInfo.onlineBankingPrepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont hosjoy_order"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>网银支付提前还款<span>（元）</span></p>
                            <p>{{repayStatistInfo.onlineBankingAdvanceRepayAmount|| 0| moneyShow}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <el-tabs type="card" v-model="recordTabName" @tab-click="onRecordTab">
                        <el-tab-pane label="单分享订单回款" name="isOnline"></el-tab-pane>
                        <el-tab-pane label="线下提前还款" name="isOffline"></el-tab-pane>
                        <el-tab-pane label="线下转账预付款" name="isAdvance"></el-tab-pane>
                        <el-tab-pane label="网银支付预付款" name="isOnbank"></el-tab-pane>
                        <el-tab-pane label="网银支付提前还款" name="isOffbank"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="query-cont-row mt20">
                    <div class="query-cont-col">
                        <div class="query-col-title">时间：</div>
                        <div class="query-col-input" v-if="recordTabName == 'isOnline'||recordTabName == 'isOffline' || recordTabName=='isOffbank'">
                            <el-date-picker v-model="repayQueryParams.submitTimeFrom" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerStart"></el-date-picker>
                            <el-date-picker v-model="repayQueryParams.submitTimeTo" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                        </div>
                          <div class="query-col-input" v-if="recordTabName == 'isAdvance'||recordTabName == 'isOnbank'">
                            <el-date-picker v-model="repayQueryParams.prepayConfirmTimeFrom" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" :picker-options="pickerBankStart"></el-date-picker>
                            <el-date-picker v-model="repayQueryParams.prepayConfirmTimeTo" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" :picker-options="pickerBankEnd" default-time="23:59:59"></el-date-picker>
                        </div>
                    </div>
                    <template v-if="recordTabName == 'isOnline'">
                        <div class="query-cont-col">
                            <div class="query-col-title">状态：</div>
                            <div class="query-col-input">
                                <el-select v-model="repayQueryParams.status">
                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">回款订单号：</div>
                            <div class="query-col-input">
                                <el-input v-model="repayQueryParams.childOrderNo" maxlength="50" placeholder="请输入回款订单号"></el-input>
                            </div>
                        </div>
                    </template>
                    <div class="query-cont-col" v-if="recordTabName != 'isAdvance' && recordTabName != 'isOnbank'&& recordTabName != 'isOffbank'">
                        <div class="query-col-title">回款代采订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="repayQueryParams.agentOrderNo" maxlength="50" placeholder="请输入回款代采订单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col" v-if="recordTabName == 'isAdvance'|| recordTabName == 'isOnbank'|| recordTabName == 'isOffbank'">
                        <div class="query-col-title">代采订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="repayQueryParams.agentOrderNo" maxlength="50" placeholder="请输入代采订单号"></el-input>
                        </div>
                    </div>
                    <template v-if="recordTabName == 'isOffline' || recordTabName=='isAdvance'">
                        <div class="query-cont-col">
                            <div class="query-col-title">商家：</div>
                            <div class="query-col-input">
                                <el-input v-model="repayQueryParams.username" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">打款账户名称：</div>
                            <div class="query-col-input">
                                <el-input v-model="repayQueryParams.accountName" maxlength="50" placeholder="请输入打款账户名称"></el-input>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">打款银行账号：</div>
                            <div class="query-col-input">
                                <el-input v-model="repayQueryParams.bankCardNo" maxlength="50" placeholder="请输入打款银行账号"></el-input>
                            </div>
                        </div>
                    </template>
                    <div class="query-cont-col" v-if="recordTabName != 'isOnbank' && recordTabName != 'isOffbank'">
                        <div class="query-col-title">MIS订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="repayQueryParams.misOrderNo" maxlength="50" placeholder="请输入MIS订单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col" v-if="recordTabName == 'isOnbank' || recordTabName == 'isOffbank'">
                        <div class="query-col-title">企业名称：</div>
                        <div class="query-col-input">
                            <el-input v-model="repayQueryParams.companyName" maxlength="50" placeholder="请输入企业名称"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <h-button type='primary' @click="onQuery">查询</h-button>
                        <h-button @click="onReset">重置</h-button>
                    </div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="onCurrentChange" @onSizeChange="handleSizeChange" :isShowSum="true" :getSum="getSum">
                    <template slot="status" slot-scope="scope">
                        <span>{{statusMap.get(scope.data.row.status) || '-'}}</span>
                    </template>
                    <template slot="repayWay" slot-scope="scope">
                        <span>{{deaTypeMap.get(scope.data.row.repayWay) || '-'}}</span>
                    </template>
                </basicTable>
            </div>
        </div>
    </div>
</template>
<script>
import { BUSINESS_DETAIL_OPTIONS, BUSINESS_DETAIL_MAP, STAUTS_OPTIONS, STAUTS_MAP, OVERDUE_OPTIONS, OVERDUE_MAP, CAPITAL_STATUS_OPTIONS, CAPITAL_STATUS_MAP, DEADLINE_OPTIONS, DEA_TYPE_MAP, PAY_METHOD } from '../const.js'
import { clearCache, newCache } from '@/utils/index'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'merchantsDetail',
    data () {
        return {
            tabName: 'record',
            businessDetaulOptions: BUSINESS_DETAIL_OPTIONS,
            businessDetaulMap: BUSINESS_DETAIL_MAP,
            statusOptions: STAUTS_OPTIONS,
            statusMap: STAUTS_MAP,
            overdueOptions: OVERDUE_OPTIONS,
            overdueMap: OVERDUE_MAP,
            capitalStatusOptions: CAPITAL_STATUS_OPTIONS,
            capitalStatusMap: CAPITAL_STATUS_MAP,
            deadlineOptions: DEADLINE_OPTIONS,
            deaTypeMap: DEA_TYPE_MAP,
            payWay: PAY_METHOD,
            advanceRepayWay: PAY_METHOD,
            queryParams: {
                username: '',
                timeQueryType: '1',
                startTime: '',
                endTime: '',
                overdue: '',
                fundStatus: '0',
                pageNumber: 1,
                pageSize: 10
            },
            resetParams: {},
            recordTabName: 'isOnline',
            repayQueryParams: {
                status: '',
                startTime: '',
                endTime: '',
                submitTimeFrom: '',
                submitTimeTo: '',
                prepayConfirmTimeTo: '',
                prepayConfirmTimeFrom: '',
                childOrderNo: '',
                agentOrderNo: '',
                username: '',
                accountName: '',
                bankCardNo: '',
                payWay: '',
                advanceRepayWay: '',
                misOrderNo: '',
                pageNumber: 1,
                pageSize: 10
            },
            repayResetParams: {},
            tableLabel: [],
            tableData: [],
            pagination: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.repayQueryParams.submitTimeFrom
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.repayQueryParams.submitTimeTo
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        pickerBankStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.prepayConfirmTimeTo
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerBankEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.prepayConfirmTimeFrom
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo,
            merchantList: state => state.hmall.finance.merchantList,
            merchantStatistInfo: state => state.hmall.finance.merchantStatistInfo,
            merchantAllInfo: state => state.hmall.finance.merchantAllInfo,
            onlineRepayList: state => state.hmall.finance.onlineRepayList,
            offlineRepayList: state => state.hmall.finance.offlineRepayList,
            prepayRepayList: state => state.hmall.finance.prepayRepayList,
            repayStatistInfo: state => state.hmall.finance.repayStatistInfo,
            onlineRepayAll: state => state.hmall.finance.onlineRepayAll,
            offlineRepayAll: state => state.hmall.finance.offlineRepayAll,
            advanceRepayAll: state => state.hmall.finance.advanceRepayAll
        }),
        tableDetailLabel () {
            return [
                { label: '管理员账号', prop: 'username' },
                { label: '企业名称', prop: 'companyName' },
                { label: '当前额度', prop: 'creditLimit', formatters: 'moneyShow' },
                { label: '总代采', prop: 'totalAmount' },
                { label: '总预付', prop: 'totalPrepayAmount' },
                { label: '总代付', prop: 'totalRetaingeAmount' },
                { label: '总回款', prop: 'totalRepayedAmount' },
                { label: '当前占用', prop: 'occupationAmount' },
                { label: '当前逾期未还', prop: 'overdueAmount' },
                { label: '最终回款期限', prop: 'finalRepayTime', formatters: 'date' },
                { label: '最近还款日期', prop: 'lastRepayTime', formatters: 'date' },
                { label: '逾期否', prop: 'overdue' },
                { label: '资金状态', prop: 'fundStatus' }
            ]
        },
        paginationDetail () {
            return {
                total: this.merchantList.total,
                pageNumber: this.merchantList.current,
                pageSize: this.merchantList.size
            }
        },
        tableDetailData () {
            return this.merchantList.records
        }
    },
    methods: {
        init () {
            this.resetParams = { ...this.queryParams }
            this.repayResetParams = { ...this.repayQueryParams }
            this.onTab()
            this.onQuery()
        },
        onQuery () {
            if (this.tabName == 'detail') {
                this.queryParams.pageNumber = 1
                this.getMerchant()
            } else if (this.tabName == 'record') {
                if (this.recordTabName == 'isOnline') {
                    this.repayQueryParams.pageNumber = 1
                    this.getOnlineRepay()
                } else if (this.recordTabName == 'isOffline') {
                    this.repayQueryParams.pageNumber = 1
                    this.getOfflineRepay()
                } else if (this.recordTabName == 'isAdvance') {
                    this.repayQueryParams.pageNumber = 1
                    this.getPrepayRepay()
                } else if (this.recordTabName == 'isOnbank') {
                    this.repayQueryParams.pageNumber = 1
                    this.getOnbankRepay()
                } else if (this.recordTabName == 'isOffbank') {
                    this.repayQueryParams.pageNumber = 1
                    this.getOffbankRepay()
                }
            }
        },
        onTab () {
            if (this.tabName == 'detail') {
                this.queryParams.pageNumber = 1
                this.getMerchantStatistInfo()
                this.getMerchant()
            } else {
                this.recordTabName = 'isOnline'
                this.getRepayStatist()
                this.getOnlineRepay()
            }
        },
        onRecordTab () {
            if (this.recordTabName == 'isOnline') {
                this.repayQueryParams.pageNumber = 1
                this.getOnlineRepay()
            } else if (this.recordTabName == 'isOffline') {
                this.repayQueryParams.pageNumber = 1
                this.getOfflineRepay()
            } else if (this.recordTabName == 'isAdvance') {
                this.repayQueryParams.pageNumber = 1
                this.getPrepayRepay()
            } else if (this.recordTabName == 'isOnbank') {
                this.repayQueryParams.pageNumber = 1
                this.getOnbankRepay()
            } else if (this.recordTabName == 'isOffbank') {
                this.repayQueryParams.pageNumber = 1
                this.getOffbankRepay()
            }
            this.onReset()
        },
        onCurrentChange (val) {
            if (this.tabName == 'detail') {
                this.queryParams.pageNumber = val.pageNumber
                this.getMerchant()
            } else if (this.tabName == 'record') {
                if (this.recordTabName == 'isOnline') {
                    this.repayQueryParams.pageNumber = val.pageNumber
                    this.getOnlineRepay()
                } else if (this.recordTabName == 'isOffline') {
                    this.repayQueryParams.pageNumber = val.pageNumber
                    this.getOfflineRepay()
                } else if (this.recordTabName == 'isAdvance') {
                    this.repayQueryParams.pageNumber = val.pageNumber
                    this.getPrepayRepay()
                } else if (this.recordTabName == 'isOnbank') {
                    this.repayQueryParams.pageNumber = val.pageNumber
                    this.getOnbankRepay()
                } else if (this.recordTabName == 'isOffbank') {
                    this.repayQueryParams.pageNumber = val.pageNumber
                    this.getOffbankRepay()
                }
            }
        },
        handleSizeChange (val) {
            if (this.tabName == 'detail') {
                this.queryParams.pageSize = val
                this.getMerchant()
            } else if (this.tabName == 'record') {
                if (this.recordTabName == 'isOnline') {
                    this.repayQueryParams.pageSize = val
                    this.getOnlineRepay()
                } else if (this.recordTabName == 'isOffline') {
                    this.repayQueryParams.pageSize = val
                    this.getOfflineRepay()
                } else if (this.recordTabName == 'isAdvance') {
                    this.repayQueryParams.pageSize = val
                    this.getPrepayRepay()
                } else if (this.recordTabName == 'isOnbank') {
                    this.repayQueryParams.pageSize = val
                    this.getOnbankRepay()
                } else if (this.recordTabName == 'isOffbank') {
                    this.repayQueryParams.pageSize = val
                    this.getOffbankRepay()
                }
            }
        },
        // 重置
        onReset () {
            if (this.tabName == 'detail') {
                this.queryParams = { ...this.resetParams }
                this.getMerchant()
            } else if (this.tabName == 'record') {
                this.repayQueryParams = { ...this.repayResetParams }
                if (this.recordTabName == 'isOnline') {
                    this.getOnlineRepay()
                } else if (this.recordTabName == 'isOffline') {
                    this.getOfflineRepay()
                } else if (this.recordTabName == 'isAdvance') {
                    this.getPrepayRepay()
                } else if (this.recordTabName == 'isOnbank') {
                    this.getOnbankRepay()
                } else if (this.recordTabName == 'isOffbank') {
                    this.getOffbankRepay()
                }
            }
        },
        // 提现
        onWithdrawal () {
            this.$router.push('/b2b/fundAudit/withdrawalMerchant')
        },
        // 跳转商家详情
        onInfo (val, page) {
            this.$router.push({ path: '/b2b/fundAudit/merchantBehalf', query: { toId: val.username, page: page } })
        },
        // 商家明细合计
        getSum (param) {
            const { columns, data } = param
            const sums = []
            if (this.tableDetailData != [] && this.tabName == 'detail') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    if (column.property == 'creditLimit') {
                        sums[index] = this.merchantAllInfo.creditLimit
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'totalAmount') {
                        sums[index] = this.merchantAllInfo.totalAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'totalPrepayAmount') {
                        sums[index] = this.merchantAllInfo.prepayAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'totalRetaingeAmount') {
                        sums[index] = this.merchantAllInfo.retaingeAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'totalRepayedAmount') {
                        sums[index] = this.merchantAllInfo.repayedAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'occupationAmount') {
                        sums[index] = this.merchantAllInfo.occupationAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'overdueAmount') {
                        sums[index] = this.merchantAllInfo.overdueAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                })
                return sums
            } else if (this.tabName == 'record') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    if (this.recordTabName == 'isOnline') {
                        if (column.property == 'repayAmount') {
                            sums[index] = this.onlineRepayAll
                            if (sums[index] && sums[index] != '-') {
                                sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } else {
                                sums[index] = '-'
                            }
                        }
                    }
                    if (this.recordTabName == 'isOffline') {
                        if (column.property == 'repayAmount') {
                            sums[index] = this.offlineRepayAll
                            if (sums[index] && sums[index] != '-') {
                                sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } else {
                                sums[index] = '-'
                            }
                        }
                    }
                    if (this.recordTabName == 'isOffbank') {
                        if (column.property == 'repayAmount') {
                            sums[index] = this.offlineRepayAll
                            if (sums[index] && sums[index] != '-') {
                                sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } else {
                                sums[index] = '-'
                            }
                        }
                    }
                    if (this.recordTabName == 'isAdvance') {
                        if (column.property == 'prepayAmount') {
                            sums[index] = this.advanceRepayAll
                            if (sums[index] && sums[index] != '-') {
                                sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } else {
                                sums[index] = '-'
                            }
                        }
                    }
                    if (this.recordTabName == 'isOnbank') {
                        if (column.property == 'prepayAmount') {
                            sums[index] = this.advanceRepayAll
                            if (sums[index] && sums[index] != '-') {
                                sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } else {
                                sums[index] = '-'
                            }
                        }
                    }
                })
                return sums
            }
        },
        ...mapActions({
            findMerchantStatist: 'finance/findMerchantStatist',
            findMerchant: 'finance/findMerchant',
            findMerchantAll: 'finance/findMerchantAll',
            findRepayStatist: 'finance/findRepayStatist',
            findOnlineRepay: 'finance/findOnlineRepay',
            findOfflineRepay: 'finance/findOfflineRepay',
            findPrepayRepay: 'finance/findPrepayRepay',
            findOnlineRepayAll: 'finance/findOnlineRepayAll',
            findOfflineRepayAll: 'finance/findOfflineRepayAll',
            findAdvanceRepayAll: 'finance/findAdvanceRepayAll'
        }),
        async getMerchantStatistInfo () {
            await this.findMerchantStatist()
        },
        async getMerchant () {
            await this.findMerchant(this.queryParams)
            await this.findMerchantAll(this.queryParams)
        },
        async getRepayStatist () {
            await this.findRepayStatist()
        },
        async getOnlineRepay () {
            this.repayQueryParams.type = 1
            this.tableLabel = [
                { label: '时间', prop: 'submitTime', formatters: 'dateTime' },
                { label: '金额', prop: 'repayAmount', formatters: 'moneyShow' },
                { label: '状态', prop: 'status' },
                { label: '回款订单号', prop: 'childOrderNo' },
                { label: '回款代采订单号', prop: 'agentOrderNo' },
                { label: 'MIS订单号', prop: 'misOrderNo' }
            ]
            await this.findOnlineRepay(this.repayQueryParams)
            this.tableData = this.onlineRepayList.records
            this.pagination = {
                total: this.onlineRepayList.total,
                pageNumber: this.onlineRepayList.current,
                pageSize: this.onlineRepayList.size
            }
            await this.findOnlineRepayAll(this.repayQueryParams)
        },
        async getOfflineRepay () {
            this.repayQueryParams.advanceRepayWay = 10
            this.tableLabel = [
                { label: '时间', prop: 'submitTime', formatters: 'dateTime' },
                { label: '金额', prop: 'repayAmount', formatters: 'moneyShow' },
                { label: '类型', prop: 'repayWay' },
                { label: '打款账户名称', prop: 'accountName' },
                { label: '打款银行账号', prop: 'bankCardNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '回款代采订单号', prop: 'agentOrderNo' },
                { label: 'MIS订单号', prop: 'misOrderNo' }
            ]
            await this.findOfflineRepay(this.repayQueryParams)
            this.tableData = this.offlineRepayList.records
            this.pagination = {
                total: this.offlineRepayList.total,
                pageNumber: this.offlineRepayList.current,
                pageSize: this.offlineRepayList.size
            }
            await this.findOfflineRepayAll(this.repayQueryParams)
        },
        async getPrepayRepay () {
            this.repayQueryParams.payWay = 10
            this.tableLabel = [
                { label: '时间', prop: 'prepayConfirmTime', formatters: 'dateTime' },
                { label: '金额', prop: 'prepayAmount', formatters: 'moneyShow' },
                { label: '打款账户名称', prop: 'prepayAccountName' },
                { label: '打款银行账号', prop: 'prepayBankCardNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'MIS订单号', prop: 'misOrderNo' }
            ]
            await this.findPrepayRepay(this.repayQueryParams)
            this.tableData = this.prepayRepayList.records
            this.pagination = {
                total: this.prepayRepayList.total,
                pageNumber: this.prepayRepayList.current,
                pageSize: this.prepayRepayList.size
            }
            await this.findAdvanceRepayAll(this.repayQueryParams)
        },
        async getOnbankRepay () {
            this.repayQueryParams.payWay = 20
            this.tableLabel = [
                { label: '时间', prop: 'prepayConfirmTime', formatters: 'dateTime' },
                { label: '预付款支付金额', prop: 'prepayAmount', formatters: 'moneyShow' },
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: 'MIS订单号', prop: 'misOrderNo' }
            ]
            await this.findPrepayRepay(this.repayQueryParams)
            this.tableData = this.prepayRepayList.records
            this.pagination = {
                total: this.prepayRepayList.total,
                pageNumber: this.prepayRepayList.current,
                pageSize: this.prepayRepayList.size
            }
            await this.findAdvanceRepayAll(this.repayQueryParams)
        },
        async getOffbankRepay () {
            this.repayQueryParams.advanceRepayWay = 20
            this.tableLabel = [
                { label: '时间', prop: 'submitTime', formatters: 'dateTime' },
                { label: '预付款支付金额', prop: 'repayAmount', formatters: 'moneyShow' },
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: '企业名称', prop: 'companyName' },
                { label: '管理员账号', prop: 'username' },
                { label: 'MIS订单号', prop: 'misOrderNo' }
            ]
            await this.findOfflineRepay(this.repayQueryParams)
            this.tableData = this.offlineRepayList.records
            this.pagination = {
                total: this.offlineRepayList.total,
                pageNumber: this.offlineRepayList.current,
                pageSize: this.offlineRepayList.size
            }
            await this.findOfflineRepayAll(this.repayQueryParams)
        }
    },
    mounted () {
        this.init()
    },
    beforeRouteEnter (to, from, next) {
        newCache('merchantsDetail')
        next()
    },
    beforeRouteLeave (to, from, next) {
        if (!(to.name == 'merchantBehalf')) {
            clearCache('merchantsDetail')
        }
        next()
    },
    activated () {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.noInfo {
    padding: 200px 0;
    margin: 0 auto;
    width: 500px;
    text-align: center;
    height: 62px;
    line-height: 62px;

    span {
        float: left;
        margin-left: 21px;
        font-size: 16px;
        color: $grayLight;
    }
}
.balance-cont-row {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 20px 10px;
}
.balance-cont-col {
    display: inline-flex;
    // flex: 1;
    width: 250px;
    margin-right: 10px;
    margin-bottom: 20px;
    align-items: center;

    .balance-col-icon {
        flex-shrink: 0;
        display: inline-block;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

        i {
            font-size: 30px;
            color: $whiteColor;
        }
    }

    &:nth-child(1) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(2) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }
    &:nth-child(3) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(153, 153, 153, 1) 0%,
                rgba(102, 102, 102, 1) 100%
            );
        }
    }
    &:nth-child(4) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(105, 192, 255, 1) 0%,
                rgba(24, 144, 255, 1) 100%
            );
        }
    }
    &:nth-child(5) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(105, 192, 255, 1) 0%,
                rgba(24, 144, 255, 1) 100%
            );
        }
    }
    &:nth-child(6) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgb(175, 105, 255) 0%,
                rgb(105, 24, 255) 100%
            );
        }
    }
    &:nth-child(7) {
        .balance-col-icon {
            background: linear-gradient(
                135deg,
                rgba(255, 120, 117, 1) 0%,
                rgba(255, 77, 79, 1) 100%
            );
        }
    }

    .balance-col-money {
        margin-left: 16px;
        display: inline-block;

        p:last-child {
            line-height: 45px;
            font-size: 24px;
        }
        p:first-child {
            line-height: 20px;
            span {
                color: #666;
            }
        }
    }
}
</style>
