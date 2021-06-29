<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane label="商品明细" name="detail"></el-tab-pane>
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
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前额度<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总代采<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总预付<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总代付<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总回款<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前占用<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>当前逾期未还<span>（元）</span></p>
                            <p>{{}}</p>
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
                            <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">最近回款日期：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">最终回款日期：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">逾期否：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.yuqi">
                                <el-option v-for="item in overdueOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">资金状态：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.zijinzt">
                                <el-option v-for="item in capitalStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <h-button type='primary' @click="onQuery">查询</h-button>
                        <h-button @click="onReset">重置</h-button>
                        <h-button @click="onExport">导出</h-button>
                    </div>
                </div>
                <basicTable :tableData="tableDetailData" :tableLabel="tableDetailLabel" :pagination="paginationDetail" @onCurrentChange="onCurrentChange">
                </basicTable>
            </div>
            <div v-if="tabName == 'record'">
                <span class="title-cont__btn" style="float: right;">
                    <h-button type='assist' @click="onWithdrawal">提现</h-button>
                </span>
                <div class="balance-cont-row">
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>总回款<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>线下回款<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>线上回款<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>已提现<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>可提现<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                    <div class="balance-cont-col">
                        <div class="balance-col-icon">
                            <i class="iconfont icon-hosjoy_moneyall"></i>
                        </div>
                        <div class="balance-col-money">
                            <p>预付款<span>（元）</span></p>
                            <p>{{}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <el-tabs type="card" v-model="recordTabName" @tab-click="onRecordTab">
                        <el-tab-pane label="线上回款" name="isOnline"></el-tab-pane>
                        <el-tab-pane label="线下回款" name="isOffline"></el-tab-pane>
                        <el-tab-pane label="预付款" name="isAdvance"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="query-cont-row mt20">
                    <div class="query-cont-col">
                        <div class="query-col-title">时间：</div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                        </div>
                    </div>
                    <template v-if="recordTabName == 'isOnline'">
                        <div class="query-cont-col">
                            <div class="query-col-title">类型：</div>
                            <div class="query-col-input">
                                <el-select v-model="queryParams.businessType">
                                    <el-option v-for="item in businessDetaulOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">状态：</div>
                            <div class="query-col-input">
                                <el-select v-model="queryParams.status">
                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">回款订单号：</div>
                            <div class="query-col-input">
                                <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入回款订单号"></el-input>
                            </div>
                        </div>
                    </template>
                    <div class="query-cont-col" v-if="recordTabName == 'isOffline'">
                        <div class="query-col-title">回款代采订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入回款代采订单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col" v-if="recordTabName == 'isAdvance'">
                        <div class="query-col-title">代采订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入回款代采订单号"></el-input>
                        </div>
                    </div>
                    <template v-if="recordTabName == 'isOffline' || recordTabName=='isAdvance'">
                        <div class="query-cont-col">
                            <div class="query-col-title">商家：</div>
                            <div class="query-col-input">
                                <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">打款账户名称：</div>
                            <div class="query-col-input">
                                <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入打款账户名称"></el-input>
                            </div>
                        </div>
                        <div class="query-cont-col">
                            <div class="query-col-title">打款银行账号：</div>
                            <div class="query-col-input">
                                <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入打款银行账号"></el-input>
                            </div>
                        </div>
                    </template>
                    <div class="query-cont-col">
                        <div class="query-col-title">MIS订单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入MIS订单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <h-button type='primary' @click="onQuery">查询</h-button>
                        <h-button @click="onReset">重置</h-button>
                        <h-button @click="onExport">导出</h-button>
                    </div>
                </div>
                <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="onCurrentChange">
                </basicTable>
            </div>
        </div>
    </div>
</template>
<script>
import { BUSINESS_DETAIL_OPTIONS, BUSINESS_DETAIL_MAP, STAUTS_OPTIONS, STAUTS_MAP, OVERDUE_OPTIONS, OVERDUE_MAP, CAPITAL_STATUS_OPTIONS, CAPITAL_STATUS_MAP } from '../const.js'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'merchantsDetail',
    data () {
        return {
            tabName: 'detail',
            businessDetaulOptions: BUSINESS_DETAIL_OPTIONS,
            businessDetaulMap: BUSINESS_DETAIL_MAP,
            statusOptions: STAUTS_OPTIONS,
            statusMap: STAUTS_MAP,
            overdueOptions: OVERDUE_OPTIONS,
            overdueMap: OVERDUE_MAP,
            capitalStatusOptions: CAPITAL_STATUS_OPTIONS,
            capitalStatusMap: CAPITAL_STATUS_MAP,
            resetParams: {},
            queryParams: {
                businessType: '',
                updateTimeStart: '',
                updateTimeEnd: '',
                status: '',
                clientType: '',
                pageNumber: 1,
                pageSize: 10
            },
            recordTabName: 'isOnline',
            searchParams: {},
            tableDetailData: [],
            tableDetailLabel: [
                { label: '管理员账号', prop: 'updateTime' },
                { label: '企业名称', prop: 'changeAmount' },
                { label: '当前额度', prop: 'businessType' },
                { label: '总代采', prop: 'status' },
                { label: '总预付', prop: 'clientType' },
                { label: '总代付', prop: 'clientType' },
                { label: '总回款', prop: 'clientType' },
                { label: '当前占用', prop: 'clientType' },
                { label: '当前逾期未还', prop: 'clientType' },
                { label: '最终回款期限', prop: 'clientType' },
                { label: '最近还款日期', prop: 'clientType' },
                { label: '逾期否', prop: 'clientType' },
                { label: '资金状态', prop: 'clientType' }
            ],
            paginationDetail: {},
            tableData: [],
            tableLabel: [
                { label: '时间', prop: 'updateTime' },
                { label: '金额', prop: 'changeAmount' },
                { label: '类型', prop: 'businessType' },
                { label: '状态', prop: 'status' },
                { label: '回款订单号', prop: 'clientType' },
                { label: '回款代采订单号', prop: 'clientType' },
                { label: 'MIS订单号', prop: 'clientType' }
            ],
            pagination: {}
        }
    },
    computed: {
        pickerOptionsStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.updateTimeEnd
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.updateTimeStart
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo.principal
        })
    },
    methods: {
        async init () {
            this.resetParams = { ...this.queryParams }
            this.getRecord()
        },
        onTab (value) {
            this.queryParams = { ...this.resetParams }
            // this.onQuery()
        },
        onRecordTab (value) {
            this.onQuery()
            if (this.recordTabName == 'isOnline') {
                this.tableLabel = [
                    { label: '时间', prop: 'updateTime' },
                    { label: '金额', prop: 'changeAmount' },
                    { label: '类型', prop: 'businessType' },
                    { label: '状态', prop: 'status' },
                    { label: '回款订单号', prop: 'clientType' },
                    { label: '回款代采订单号', prop: 'clientType' },
                    { label: 'MIS订单号', prop: 'clientType' }
                ]
            } else if (this.recordTabName == 'isOffline') {
                this.tableLabel = [
                    { label: '时间', prop: 'updateTime' },
                    { label: '金额', prop: 'changeAmount' },
                    { label: '类型', prop: 'businessType' },
                    { label: '打款账户名称', prop: 'status' },
                    { label: '打款银行账号', prop: 'status' },
                    { label: '企业名称', prop: 'status' },
                    { label: '管理员账号', prop: 'status' },
                    { label: '回款代采订单号', prop: 'clientType' },
                    { label: 'MIS订单号', prop: 'clientType' }
                ]
            } else if (this.recordTabName == 'isAdvance') {
                this.tableLabel = [
                    { label: '时间', prop: 'updateTime' },
                    { label: '金额', prop: 'changeAmount' },
                    { label: '类型', prop: 'businessType' },
                    { label: '打款账户名称', prop: 'status' },
                    { label: '打款银行账号', prop: 'status' },
                    { label: '企业名称', prop: 'status' },
                    { label: '管理员账号', prop: 'status' },
                    { label: '代采订单号', prop: 'clientType' },
                    { label: 'MIS订单号', prop: 'clientType' }
                ]
            }
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.resetParams = { ...this.queryParams }
            // this.getisOnlineAccountBillInfo()
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.searchParams.pageNumber = val.pageNumber
            // this.getisOnlineAccountBillInfo()
        },
        getRecord () {

        },
        // 重置
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        // 导出
        onExport () {
            if (this.tableData.length <= 0) {
                this.$message.warning('无数据可导出！')
            } else {
                let url = ''
                for (const key in this.queryParams) {
                    if (this.queryParams[key] !== '') {
                        url += (`${key}=${this.queryParams[key]}&`)
                    }
                }
                window.location = interfaceUrl + '?' + url
            }
        },
        // 提现
        onWithdrawal () {
            this.$router.push('/b2b/finance/withdrawalMerchant')
        },
        ...mapActions([])
    },
    mounted () {
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
    padding: 10px 10px 40px 10px;
}
.balance-cont-col {
    display: inline-flex;
    flex: 1;
    align-items: center;

    .balance-col-icon {
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

    .balance-col-money {
        margin-left: 16px;
        display: inline-block;

        p:last-child {
            line-height: 45px;
            font-size: 32px;
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
