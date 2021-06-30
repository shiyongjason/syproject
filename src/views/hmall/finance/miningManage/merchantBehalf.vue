<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <div class="table-cont-tabs">
                <el-tabs type="card" v-model="tabName" @tab-click="onTab">
                    <el-tab-pane label="资金申请详情" name="apply"></el-tab-pane>
                    <el-tab-pane label="资金代付详情" name="pay"></el-tab-pane>
                    <el-tab-pane label="资金回款详情" name="returned"></el-tab-pane>
                    <el-tab-pane label="资金占用详情" name="occupy"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="query-cont-row mt20">
                <div class="query-cont-col">
                    <div class="query-col-title">商家：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                    </div>
                </div>
                <template v-if="tabName == 'apply'">
                    <div class="query-cont-col">
                        <div class="query-col-title">申请单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入申请单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">
                            <el-select v-model="queryParams.time" style="width:140px" class="pr10">
                                <el-option v-for="item in aduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                        </div>
                    </div>
                </template>
                <div class="query-cont-col" v-if="tabName != 'apply'">
                    <div class="query-col-title">代采订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入代采订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'returned'">
                    <div class="query-col-title">回款订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.clientType" maxlength="50" placeholder="请输入回款订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'pay' || tabName == 'occupy'">
                    <div class="query-col-title">
                        <el-select v-model="queryParams.time" style="width:140px" class="pr10">
                            <el-option v-for="item in minaduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'returned'">
                    <div class="query-col-title">
                        <el-select v-model="queryParams.time" style="width:140px" class="pr10">
                            <el-option v-for="item in retaaduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.updateTimeStart" type="date" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.updateTimeEnd" type="date" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
                    </div>
                </div>
                <template v-if="tabName == 'pay' || tabName == 'occupy'">
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
                                <el-option v-for="item in capitalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
                <template v-if="tabName == 'returned'">
                    <div class="query-cont-col">
                        <div class="query-col-title">回款类型：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.yuqi">
                                <el-option v-for="item in deadlineTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">资金同步状态：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.zijinzt">
                                <el-option v-for="item in statusTogerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
                <div class="query-cont-col" v-if="tabName != 'apply'">
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
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="onCurrentChange" :isAction="tabName == 'returned'" :isShowSum="true" :getSum="getSum">
                <template slot="action" slot-scope="scope">
                    <el-button @click="onFund(scope.data.row)">资金同步</el-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { BUSINESS_DETAIL_OPTIONS, BUSINESS_DETAIL_MAP, STAUTS_OPTIONS, STAUTS_MAP, OVERDUE_OPTIONS, OVERDUE_MAP, CAPITAL_STATUS_OPTIONS, CAPITAL_STATUS_MAP, ADUITLINE_OPTIONS, MINADUITLINE_OPTIONS, RETAADUITLINE_OPTIONS, DEADLINE_TYPE_OPTIONS, DEADLINE_TYPE_MAP, STAUTS_TOGER_OPTIONS, STAUTS_TOGER_MAP, CAPITALS_OPTIONS, CAPITALS_MAP } from '../const.js'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'merchantBehalf',
    data () {
        return {
            tabName: 'apply',
            businessDetaulOptions: BUSINESS_DETAIL_OPTIONS,
            businessDetaulMap: BUSINESS_DETAIL_MAP,
            statusOptions: STAUTS_OPTIONS,
            statusMap: STAUTS_MAP,
            overdueOptions: OVERDUE_OPTIONS,
            overdueMap: OVERDUE_MAP,
            capitalStatusOptions: CAPITAL_STATUS_OPTIONS,
            capitalStatusMap: CAPITAL_STATUS_MAP,
            aduitlineOptions: ADUITLINE_OPTIONS,
            minaduitlineOptions: MINADUITLINE_OPTIONS,
            retaaduitlineOptions: RETAADUITLINE_OPTIONS,
            deadlineTypeOptions: DEADLINE_TYPE_OPTIONS,
            deadlineTypeMap: DEADLINE_TYPE_MAP,
            statusTogerOptions: STAUTS_TOGER_OPTIONS,
            statusTogerMap: STAUTS_TOGER_MAP,
            capitalOptions: CAPITALS_OPTIONS,
            capitalMap: CAPITALS_MAP,
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
            searchParams: {},
            tableData: [],
            tableLabel: [
                { label: '管理员账号', prop: 'updateTime' },
                { label: '企业名称', prop: 'changeAmount' },
                { label: '申请单号', prop: 'businessType' },
                { label: '申请日期', prop: 'status' },
                { label: '审核日期', prop: 'clientType' },
                { label: '授信额度', prop: 'clientType' },
                { label: '授信截止日期', prop: 'clientType' },
                { label: '预付款比例', prop: 'clientType' }

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
            this.onQuery()
            if (this.tabName == 'apply') {
                this.tableLabel = [
                    { label: '管理员账号', prop: 'updateTime' },
                    { label: '企业名称', prop: 'changeAmount' },
                    { label: '申请单号', prop: 'businessType' },
                    { label: '申请日期', prop: 'status' },
                    { label: '审核日期', prop: 'clientType' },
                    { label: '授信额度', prop: 'clientType' },
                    { label: '授信截止日期', prop: 'clientType' },
                    { label: '预付款比例', prop: 'clientType' }
                ]
            } else if (this.tabName == 'pay') {
                this.tableLabel = [
                    { label: '管理员账号', prop: 'updateTime' },
                    { label: '企业名称', prop: 'changeAmount' },
                    { label: '代采订单号', prop: 'businessType' },
                    { label: 'MIS订单号', prop: 'status' },
                    { label: '代采提交日期', prop: 'clientType' },
                    { label: '出款确认日期', prop: 'clientType' },
                    { label: '代采金额', prop: 'clientType' },
                    { label: '预付款', prop: 'clientType' },
                    { label: '代付金额', prop: 'updateTime' },
                    { label: '回款金额', prop: 'changeAmount' },
                    { label: '占用金额', prop: 'businessType' },
                    { label: '逾期未还金额', prop: 'status' },
                    { label: '最终回款期限', prop: 'status' },
                    { label: '最近回款日期', prop: 'status' },
                    { label: '逾期否', prop: 'status' },
                    { label: '资金状态', prop: 'clientType' }
                ]
            } else if (this.tabName == 'returned') {
                this.tableLabel = [
                    { label: '管理员账号', prop: 'updateTime' },
                    { label: '企业名称', prop: 'changeAmount' },
                    { label: '代采订单号', prop: 'businessType' },
                    { label: 'MIS订单号', prop: 'status' },
                    { label: '代采提交日期', prop: 'clientType' },
                    { label: '出款确认日期', prop: 'clientType' },
                    { label: '代采金额', prop: 'clientType' },
                    { label: '预付款', prop: 'clientType' },
                    { label: '代付金额', prop: 'updateTime' },
                    { label: '回款类型', prop: 'changeAmount' },
                    { label: '回款订单号', prop: 'changeAmount' },
                    { label: '最终回款期限', prop: 'status' },
                    { label: '回款日期', prop: 'status' },
                    { label: '回款金额', prop: 'businessType' },
                    { label: '资金同步状态', prop: 'clientType' },
                    { label: '同步备注', prop: 'clientType' }
                ]
            } else if (this.tabName == 'occupy') {
                this.tableLabel = [
                    { label: '管理员账号', prop: 'updateTime' },
                    { label: '企业名称', prop: 'changeAmount' },
                    { label: '代采订单号', prop: 'businessType' },
                    { label: 'MIS订单号', prop: 'status' },
                    { label: '代采提交日期', prop: 'clientType' },
                    { label: '出款确认日期', prop: 'clientType' },
                    { label: '代采金额', prop: 'clientType' },
                    { label: '预付款', prop: 'clientType' },
                    { label: '代付金额', prop: 'updateTime' },
                    { label: '回款金额', prop: 'changeAmount' },
                    { label: '占用金额', prop: 'changeAmount' },
                    { label: '逾期未还金额', prop: 'status' },
                    { label: '最终回款期限', prop: 'status' },
                    { label: '最近回款日期', prop: 'status' },
                    { label: '逾期否', prop: 'status' },
                    { label: '资金状态', prop: 'clientType' }
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
        // 跳转商家详情
        onInfo (val) {
            this.$router.push({ path: '/b2b/finance/merchantBehalf', query: { id: val } })
        },
        // 资金同步
        onFund (val) {
        },
        // 合计
        getSum (param) {
            const { columns, data } = param
            const sums = []
            if (this.tabName == 'apply') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    // 授信额度
                    if (column.property == 'totalAmount') {
                        sums[index] = this.childOrderStatistics.totalAmount
                    }
                })
                return sums
            } else if (this.tabName == 'pay') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    // 代采金额 预付款 代付金额 回款金额 占用金额 逾期未还金额
                    if (column.property == 'totalAmount') {
                        sums[index] = this.childOrderStatistics.totalAmount
                    }
                })
                return sums
            } else if (this.tabName == 'returned') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    // 代付金额 回款金额
                    if (column.property == 'totalAmount') {
                        sums[index] = this.childOrderStatistics.totalAmount
                    }
                })
                return sums
            } else if (this.tabName == 'occupy') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    // 代采金额 预付款 代付金额 回款金额 占用金额 逾期未还金额
                    if (column.property == 'totalAmount') {
                        sums[index] = this.childOrderStatistics.totalAmount
                    }
                })
                return sums
            }
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
