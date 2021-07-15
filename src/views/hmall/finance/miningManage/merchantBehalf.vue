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
                        <el-input v-model="queryParams.username" maxlength="50" placeholder="请输入管理员账号或者企业名称"></el-input>
                    </div>
                </div>
                <template v-if="tabName == 'apply'">
                    <div class="query-cont-col">
                        <div class="query-col-title">申请单号：</div>
                        <div class="query-col-input">
                            <el-input v-model="queryParams.applyNo" maxlength="50" placeholder="请输入申请单号"></el-input>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">
                            <el-select v-model="queryParams.timeQueryType" style="width:140px" class="pr10">
                                <el-option v-for="item in aduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="query-col-input">
                            <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-ddT00:00:00" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerStart"></el-date-picker>
                            <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-ddT23:59:59" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                        </div>
                    </div>
                </template>
                <div class="query-cont-col" v-if="tabName != 'apply'">
                    <div class="query-col-title">代采订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.agentOrderNo" maxlength="50" placeholder="请输入代采订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'returned'">
                    <div class="query-col-title">回款订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.childOrderNo" maxlength="50" placeholder="请输入回款订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'pay' || tabName == 'occupy'">
                    <div class="query-col-title">
                        <el-select v-model="queryParams.timeQueryType" style="width:140px" class="pr10">
                            <el-option v-for="item in minaduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-ddT00:00:00" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-ddT23:59:59" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'returned'">
                    <div class="query-col-title">
                        <el-select v-model="queryParams.timeQueryType" style="width:140px" class="pr10">
                            <el-option v-for="item in retaaduitlineOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="query-col-input">
                        <el-date-picker v-model="queryParams.startTime" type="date" value-format="yyyy-MM-ddT00:00:00" format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerStart"></el-date-picker>
                        <el-date-picker v-model="queryParams.endTime" type="date" value-format="yyyy-MM-ddT23:59:59" format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerEnd" default-time="23:59:59"></el-date-picker>
                    </div>
                </div>
                <template v-if="tabName == 'pay' || tabName == 'occupy'">
                    <div class="query-cont-col">
                        <div class="query-col-title">逾期否：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.overdue">
                                <el-option v-for="item in overdueOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
                <div class="query-cont-col" v-if="tabName == 'pay'">
                    <div class="query-col-title">资金状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.fundStatus">
                            <el-option v-for="item in capitalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="query-cont-col" v-if="tabName == 'occupy'">
                    <div class="query-col-title">资金状态：</div>
                    <div class="query-col-input">
                        <el-select v-model="queryParams.fundStatus">
                            <el-option v-for="item in capitalsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <template v-if="tabName == 'returned'">
                    <div class="query-cont-col">
                        <div class="query-col-title">回款类型：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.repayWay">
                                <el-option v-for="item in deadlineTypeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="query-cont-col">
                        <div class="query-col-title">资金同步状态：</div>
                        <div class="query-col-input">
                            <el-select v-model="queryParams.fundSyncStatus">
                                <el-option v-for="item in statusTogerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
                <div class="query-cont-col" v-if="tabName != 'apply'">
                    <div class="query-col-title">MIS订单号：</div>
                    <div class="query-col-input">
                        <el-input v-model="queryParams.misOrderNo" maxlength="50" placeholder="请输入MIS订单号"></el-input>
                    </div>
                </div>
                <div class="query-cont-col">
                    <h-button type='primary' @click="onQuery">查询</h-button>
                    <h-button @click="onReset">重置</h-button>

                </div>
            </div>
            <basicTable :tableData="tableData" :tableLabel="tableLabel" :pagination="pagination" @onCurrentChange="onCurrentChange" @onSizeChange="handleSizeChange" :isAction="tabName == 'returned'" :isShowSum="true" :getSum="getSum" :isfiexd="'right'">
                <template slot="overdue" slot-scope="scope">
                    <span>{{overdueMap.get(scope.data.row.overdue)}}</span>
                </template>
                <template slot="repayWay" slot-scope="scope">
                    <span>{{deadlineTypeMap.get(scope.data.row.repayWay)}}</span>
                </template>
                <template slot="fundSyncStatus" slot-scope="scope">
                    <span>{{statusTogerMap.get(scope.data.row.fundSyncStatus)}}</span>
                </template>
                <!-- 代采订单号 -->
                <template slot="agentOrderNo" slot-scope="scope">
                    <a class="isLink" @click="onInfo(scope.data.row)">{{scope.data.row.agentOrderNo}}</a>
                </template>
                <template slot="occupationAmount" slot-scope="scope">
                    <span v-if="Number(scope.data.row.occupationAmount)<0" style="color:red">{{scope.data.row.occupationAmount | moneyShow}}</span>
                    <span v-else>{{scope.data.row.occupationAmount| moneyShow}}</span>
                </template>
                <template slot="prepayPercentage" slot-scope="scope">
                    <span>{{scope.data.row.prepayPercentage|percenShow}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <h-button v-if='scope.data.row.fundSyncStatus!==40' table @click="onFund(scope.data.row)">资金同步</h-button>
                </template>
            </basicTable>
        </div>
    </div>
</template>
<script>
import { STAUTS_OPTIONS, STAUTS_MAP, OVERDUE_OPTIONS, OVERDUE_MAP, ADUITLINE_OPTIONS, MINADUITLINE_OPTIONS, RETAADUITLINE_OPTIONS, DEADLINE_TYPE_OPTIONS, DEADLINE_TYPE_MAP, STAUTS_TOGER_OPTIONS, STAUTS_TOGER_MAP, CAPITAL_OPTIONS, CAPITALS_OPTIONS, CAPITALS_MAP } from '../const.js'
import { mapState, mapActions } from 'vuex'
import { clearCache, newCache } from '@/utils/index'
import { syncFundMis } from '../api/index'
export default {
    name: 'merchantBehalf',
    data () {
        return {
            tabName: 'apply',
            statusOptions: STAUTS_OPTIONS,
            statusMap: STAUTS_MAP,
            overdueOptions: OVERDUE_OPTIONS,
            overdueMap: OVERDUE_MAP,
            aduitlineOptions: ADUITLINE_OPTIONS,
            minaduitlineOptions: MINADUITLINE_OPTIONS,
            retaaduitlineOptions: RETAADUITLINE_OPTIONS,
            deadlineTypeOptions: DEADLINE_TYPE_OPTIONS,
            deadlineTypeMap: DEADLINE_TYPE_MAP,
            statusTogerOptions: STAUTS_TOGER_OPTIONS,
            statusTogerMap: STAUTS_TOGER_MAP,
            capitalOptions: CAPITAL_OPTIONS,
            capitalsOptions: CAPITALS_OPTIONS,
            capitalMap: CAPITALS_MAP,
            resetParams: {},
            queryParams: {
                username: '',
                applyNo: '',
                timeQueryType: '1',
                agentOrderNo: '',
                childOrderNo: '',
                startTime: '',
                endTime: '',
                overdue: '',
                fundStatus: '0',
                repayWay: '',
                fundSyncStatus: '',
                misOrderNo: '',
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            tableLabel: [],
            pagination: {}
        }
    },
    computed: {
        pickerStart () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.endTime
                    if (beginDateVal) {
                        return time.getTime() >= new Date(beginDateVal).getTime()
                    }
                }
            }
        },
        pickerEnd () {
            return {
                disabledDate: (time) => {
                    const beginDateVal = this.queryParams.startTime
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        ...mapState({
            userInfo: state => state.userInfo,
            applyList: state => state.hmall.finance.applyList,
            prepayList: state => state.hmall.finance.prepayList,
            occupationList: state => state.hmall.finance.occupationList,
            applyAllInfo: state => state.hmall.finance.applyAllInfo,
            prepayAllInfo: state => state.hmall.finance.prepayAllInfo,
            occupationAllInfo: state => state.hmall.finance.occupationAllInfo
        }),
        page () {
            return this.$route.query.page
        },
        pageId () {
            return this.$route.query.toId
        }
    },
    methods: {
        async init () {
            if (this.page == 'creditLimit') {
                this.tabName = 'apply'
                this.queryParams.username = this.pageId
            } else if (this.page == 'overdueAmount') {
                this.tabName = 'occupy'
                this.queryParams.username = this.pageId
                this.queryParams.overdue = true
            } else if (this.page == 'occupationAmount') {
                this.tabName = 'occupy'
                this.queryParams.username = this.pageId
            } else if (this.page == 'totalRepayedAmount') {
                this.tabName = 'returned'
                this.queryParams.username = this.pageId
            } else {
                this.tabName = 'pay'
                this.queryParams.username = this.pageId
            }
            this.tabParam(this.tabName)
        },
        onTab () {
            this.queryParams = { ...this.resetParams }
            this.tabParam(this.tabName)
            this.onReset()
        },
        onQuery () {
            this.queryParams.pageNumber = 1
            this.tabParam(this.tabName)
        },
        handleSizeChange (val) {
            this.queryParams.pageSize = val
            this.tabParam(this.tabName)
        },
        onCurrentChange (val) {
            this.queryParams.pageNumber = val.pageNumber
            this.tabParam(this.tabName)
        },
        tabParam (tabName) {
            if (tabName == 'apply') {
                this.getApplyList()
                this.getApplyAll()
            } else if (tabName == 'returned') {
                this.getOccupationList()
                this.getOccupationAll()
            } else if (tabName == 'pay' || tabName == 'occupy') {
                this.getPrepayList()
                this.getPrepayAll()
            }
        },
        // 重置
        onReset () {
            this.queryParams = { ...this.resetParams }
            this.onQuery()
        },
        // 跳转boss代采订单详情
        onInfo (val) {
            this.$router.push({ path: '/b2b/fundAudit/statusFundInfo', query: { id: val.agentOrderId, pageType: 'auditFundStatus' } })
        },
        // 资金同步
        async onFund (val) {
            try {
                await syncFundMis(val.id)
                this.getOccupationList()
            } catch (e) {
                this.getOccupationList()
            }
        },
        ...mapActions({
            findApplyList: 'finance/findApplyList',
            findPrepayList: 'finance/findPrepayList',
            findOccupationList: 'finance/findOccupationList',
            findApplyAll: 'finance/findApplyAll',
            findPrepayAll: 'finance/findPrepayAll',
            findOccupationAll: 'finance/findOccupationAll'
        }),
        async getApplyList () {
            this.tableLabel = [
                { label: '管理员账号', prop: 'username' },
                { label: '企业名称', prop: 'companyName' },
                { label: '申请单号', prop: 'applyNo' },
                { label: '申请日期', prop: 'createTime', formatters: 'date' },
                { label: '审核日期', prop: 'auditTime', formatters: 'date' },
                { label: '授信额度', prop: 'creditLimit', formatters: 'moneyShow' },
                { label: '授信截止日期', prop: 'expireTime', formatters: 'date' },
                { label: '预付款比例', prop: 'prepayPercentage' }
            ]
            await this.findApplyList(this.queryParams)
            this.tableData = this.applyList.records
            this.pagination = {
                total: this.applyList.total,
                pageNumber: this.applyList.current,
                pageSize: this.applyList.size
            }
        },
        async getApplyAll () {
            await this.findApplyAll(this.queryParams)
        },
        async getPrepayList () {
            this.tableLabel = [
                { label: '管理员账号', prop: 'username' },
                { label: '企业名称', prop: 'companyName' },
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'MIS订单号', prop: 'misOrderNo' },
                { label: '代采提交日期', prop: 'createTime', formatters: 'date' },
                { label: '出款确认日期', prop: 'auditTime', formatters: 'date' },
                { label: '代采金额', prop: 'totalAmount', formatters: 'moneyShow' },
                { label: '预付款', prop: 'prepayAmount', formatters: 'moneyShow' },
                { label: '代付金额', prop: 'retainageAmount', formatters: 'moneyShow' },
                { label: '回款金额', prop: 'repayedAmount', formatters: 'moneyShow' },
                { label: '占用金额', prop: 'occupationAmount' },
                { label: '逾期未还金额', prop: 'overdueAmount', formatters: 'moneyShow' },
                { label: '最终回款期限', prop: 'finalRepayTime', formatters: 'date' },
                { label: '最近回款日期', prop: 'lastRepayTime', formatters: 'date' },
                { label: '逾期否', prop: 'overdue' },
                { label: '资金状态', prop: 'fundStatus' }
            ]
            if (this.tabName == 'pay') {
                this.queryParams.type = 1
            } else if (this.tabName == 'occupy') {
                this.queryParams.type = 2
            }
            await this.findPrepayList(this.queryParams)
            this.tableData = this.prepayList.records
            this.pagination = {
                total: this.prepayList.total,
                pageNumber: this.prepayList.current,
                pageSize: this.prepayList.size
            }
        },
        async getPrepayAll () {
            if (this.tabName == 'pay') {
                this.queryParams.type = 1
            } else if (this.tabName == 'occupy') {
                this.queryParams.type = 2
            }
            await this.findPrepayAll(this.queryParams)
        },
        async getOccupationList () {
            this.tableLabel = [
                { label: '管理员账号', prop: 'username' },
                { label: '企业名称', prop: 'companyName' },
                { label: '代采订单号', prop: 'agentOrderNo' },
                { label: 'MIS订单号', prop: 'misOrderNo' },
                { label: '代采提交日期', prop: 'createTime', formatters: 'date' },
                { label: '出款确认日期', prop: 'auditTime', formatters: 'date' },
                { label: '代采金额', prop: 'totalAmount', formatters: 'moneyShow' },
                { label: '预付款', prop: 'prepayAmount', formatters: 'moneyShow' },
                { label: '代付金额', prop: 'retainageAmount', formatters: 'moneyShow' },
                { label: '回款类型', prop: 'repayWay' },
                { label: '回款订单号', prop: 'childOrderNo' },
                { label: '最终回款期限', prop: 'finalRepayTime', formatters: 'date' },
                { label: '回款日期', prop: 'repayTime', formatters: 'date' },
                { label: '回款金额', prop: 'repayAmount', formatters: 'moneyShow' },
                { label: '资金同步状态', prop: 'fundSyncStatus' },
                { label: '同步备注', prop: 'fundSyncFailureReason' }
            ]
            await this.findOccupationList(this.queryParams)
            this.tableData = this.occupationList.records
            this.pagination = {
                total: this.occupationList.total,
                pageNumber: this.occupationList.current,
                pageSize: this.occupationList.size
            }
        },
        async getOccupationAll () {
            await this.findOccupationAll(this.queryParams)
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
                    if (column.property == 'creditLimit') {
                        sums[index] = this.applyAllInfo
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                })
                return sums
            } else if (this.tabName == 'pay' || this.tabName == 'occupy') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    if (column.property == 'totalAmount') {
                        sums[index] = this.prepayAllInfo.totalAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'prepayAmount') {
                        sums[index] = this.prepayAllInfo.prepayAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'retainageAmount') {
                        sums[index] = this.prepayAllInfo.retaingeAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'repayedAmount') {
                        sums[index] = this.prepayAllInfo.repayedAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'occupationAmount') {
                        sums[index] = this.prepayAllInfo.occupationAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                    if (column.property == 'overdueAmount') {
                        sums[index] = this.prepayAllInfo.overdueAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                })
                return sums
            } else if (this.tabName == 'returned') {
                columns.forEach((column, index) => {
                    if (index == 0) {
                        sums[index] = '合计'
                    }
                    if (column.property == 'repayAmount') {
                        sums[index] = this.occupationAllInfo.repayAmount
                        if (sums[index] && sums[index] != '-') {
                            sums[index] = Number(sums[index]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } else {
                            sums[index] = '-'
                        }
                    }
                })
                return sums
            }
        },
        ...mapActions([])
    },
    mounted () {
        this.resetParams = { ...this.queryParams }
        this.init()
    },
    beforeRouteEnter (to, from, next) {
        newCache('merchantBehalf')
        next()
    },
    beforeRouteLeave (to, from, next) {
        newCache('merchantBehalf')
        if (!(to.name == 'fundInfo')) {
            clearCache('merchantBehalf')
        } else if (!(to.name == 'merchantsDetail')) {
            clearCache('merchantsDetail')
        }
        next()
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
