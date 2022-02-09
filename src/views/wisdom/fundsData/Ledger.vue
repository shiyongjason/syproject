<template>
    <div class="tags-wrapper page-body amountImport amount">
        <div v-show="toggle"  class="page-body-cont query-cont">
            <div class="query-cont-col" v-if="region">
                <div class="query-col-title">大区：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="regionList" @back-event="backPlat($event,'D')" placeholder="请选择大区" :selectObj="selectAuth.regionObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col" v-if="branch">
                <div class="query-col-title">分部：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true' :remove-value='removeValue'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">平台公司：</div>
                <div class="query-col-input">
                    <HAutocomplete :selectArr="platformData" @back-event="backPlat($event,'P')" placeholder="请输入平台公司名称" :selectObj="selectAuth.platformObj" :maxlength='30' :canDoBlurMethos='true' :remove-value='removeValue'></HAutocomplete>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">MIS编码：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="5" v-model="queryParams.misCode" placeholder="请输入MIS编码" clearable>
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">台账编号：</div>
                <div class="query-col-input">
                    <el-input type="text" maxlength="20" v-model="queryParams.standingBookNo" placeholder="请输入台账编号" clearable>
                    </el-input>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType != 0 && accountType != 4">
                <div class="query-col-title">逾期：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.isOverdue" placeholder="请选择" :clearable=true>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="未逾期" :value="0"></el-option>
                        <el-option label="逾期" :value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType != 0 && accountType != 4">
                <div class="query-col-title">结清：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.settleType" placeholder="请选择" :clearable=true>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="本金结清" :value="1"></el-option>
                        <el-option label="本金未结清" :value="2"></el-option>
                        <el-option label="利息结清" :value="3"></el-option>
                        <el-option label="利息未结清" :value="4"></el-option>
                        <el-option label="本金或利息未结清" :value="5"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType != 0 && accountType != 4">
                <div class="query-col-title">放款日期查询：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.loanStartDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('loanEndDate')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.loanEndDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('loanStartDate')">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType != 0 && accountType != 4">
                <div class="query-col-title">应还款日期查询：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.repaymentStartDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('repaymentEndDate')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.repaymentEndDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('repaymentStartDate')">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType == 4">
                <div class="query-col-title">还款项目：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.repaymentType" placeholder="请选择" :clearable=true>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="还借款本金" :value="1"></el-option>
                        <el-option label="还借款利息" :value="2"></el-option>
                        <el-option label="还宽限期利息" :value="3"></el-option>
                        <el-option label="还逾期罚息" :value="4"></el-option>
                        <el-option label="还敞口本金" :value="5"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType == 4">
                <div class="query-col-title">还款状态：</div>
                <div class="query-col-input">
                    <el-select v-model="queryParams.repaymentStatus" placeholder="请选择" :clearable=true>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常" :value="1"></el-option>
                        <el-option label="逾期" :value="2"></el-option>
                        <el-option label="提前" :value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType == 4">
                <div class="query-col-title">还款日期：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.startDate" value-format="yyyy-MM-dd" placeholder="开始日期" :picker-options="pickerOptionsStart('endDate')">
                    </el-date-picker>
                    <span class="ml10 mr10">-</span>
                    <el-date-picker type="date" :editable="false" :clearable="true" v-model="queryParams.endDate" value-format="yyyy-MM-dd" placeholder="结束日期" :picker-options="pickerOptionsEnd('startDate')">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col" v-if="accountType == 0">
                <div class="query-col-title">截止日期：</div>
                <div class="query-col-input">
                    <el-date-picker type="date" :editable="false" :clearable="false" v-model="queryParams.queryEndDate" value-format="yyyy-MM-dd" placeholder="截止日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-cont-col">
                <div class="query-col-title">
                    <el-button type="primary" class="ml20" @click="onSearch">查询</el-button>
                </div>
                <div class="query-col-title">
                    <el-button type="default" class="ml20" @click="onReset">重置</el-button>
                </div>
                <div class="query-col-title" v-if="hosAuthCheck(account_export)">
                    <el-button type="default" class="ml20" @click="onExport">导出</el-button>
                </div>
            </div>
        </div>
        <searchBarOpenAndClose :amountResetTable="toggle" :status="toggle" @toggle="toggle = !toggle"></searchBarOpenAndClose>
        <div class="page-body-cont">
            <el-tabs v-model="accountType" type="card" @tab-click="handleClick(1)">
                <el-tab-pane v-if="tabAuth('台账汇总表')" label="资金支持余额汇总表" name="0"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('流贷台账')" label="流贷" name="1"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('敞口台账')" label="敞口" name="2"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('分授信台账')" label="分授信" name="3"></el-tab-pane>
                <el-tab-pane v-if="tabAuth('还款明细表')" label="还款明细表" name="4"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 1" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_good_credit)" label="好信用" name="1"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_supply_chain)" label="供应链" name="2"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(flowtoborrow_orange)" label="好橙工" name="3"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 2" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(exposure_good_credit)" label="好信用" key="好信用" name="1"></el-tab-pane>
                <el-tab-pane v-if="hosAuthCheck(exposure_orange)" label="好橙工" key="好橙工" name="3"></el-tab-pane>
            </el-tabs>
            <el-tabs v-model="productType" v-if="accountType == 3" type="card" @tab-click="handleClick(2)">
                <el-tab-pane v-if="hosAuthCheck(pointscredit_good_credit)" label="好信用" name="1"></el-tab-pane>
            </el-tabs>
            <div class="fundBtn">
                <el-button v-if="accountType == '1' && hosAuthCheck(addFundsData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
                <el-button v-if="accountType == '2' && hosAuthCheck(addExposureData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
                <el-button v-if="accountType == '3' && hosAuthCheck(addPointscreditData)" type="primary" @click="onLinddialog">{{accountName}}</el-button>
            </div>
            <complexTable :amountResetTable="toggle" ref="complexTable" v-show="!hasNoneAuth" :tableData='tableData' :pagination='pagination' :productType='productType' :source='accountType' @getList='getList' />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { interfaceUrl } from '@/api/config'
import complexTable from './components/complexTable.vue'
import { WISDOM_FLOWTOBORROW_FUNDSDATA_ADD, WISDOM_FLOWTOBORROW_GOOD_CREDIT, WISDOM_FLOWTOBORROW_SUPPLY_CHAIN, WISDOM_FLOWTOBORROW_ORANGE, WISDOM_EXPOSURE_GOOD_CREDIT, WISDOM_EXPOSURE_ORANGE, WISDOM_POINTSCREDIT_GOOD_CREDIT, WISDOM_POINTSCREDIT_FUNDSDATA_ADD, WISDOM_EXPOSURE_FUNDSDATA_ADD, WISDOM_ACCOUNT_EXPORT } from '@/utils/auth_const'
import { downloadCloudAlarmList } from './api/index'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import * as type from './const'
import { departmentAuth } from '@/mixins/userAuth'
import { createNamespacedHelpers, mapState } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('fundsData')
export default {
    name: 'standingBook',
    mixins: [departmentAuth],
    components: { complexTable, HAutocomplete },
    computed: {
        ...mapState({
            pagination: state => state.fundsData.pagination,
            regionList: state => state.regionList,
            branchList: state => state.branchList,
            platformData: state => state.platformData
        }),
        ...mapGetters(['platformData', 'tableData', 'tableDataTotal']),
        accountName () {
            return `新增${type.productName[this.productType - 1]}-${type.accountName[this.accountType - 1]}明细`
        }
    },
    data () {
        return {
            toggle: true,
            accountType: '0', // 1：流贷 2：敞口 3：分授信 4：还款明细表，0:汇总表
            productType: '1', // 1：好信用 2：供应链 3：好橙工
            interfaceUrl: interfaceUrl,
            queryParams: {
                regionCode: '',
                pageNumber: 1,
                pageSize: 10,
                misCode: '',
                customerName: '',
                subsectionCode: '',
                standingBookNo: '',
                accountType: '1',
                loanCompanyCode: '',
                loanCompanyName: '',
                productType: '1',
                isOverdue: '',
                settleType: '',
                loanStartDate: '',
                loanEndDate: '',
                repaymentStartDate: '',
                repaymentEndDate: '',
                repaymentType: '',
                startDate: '',
                endDate: '',
                repaymentStatus: '',
                queryEndDate: moment().format('YYYY-MM-DD')
            },
            searchParams: {},
            removeValue: false,
            accept: '.xlsx,.xls',
            loading: false,
            addFundsData: WISDOM_FLOWTOBORROW_FUNDSDATA_ADD,
            addExposureData: WISDOM_EXPOSURE_FUNDSDATA_ADD,
            addPointscreditData: WISDOM_POINTSCREDIT_FUNDSDATA_ADD,
            flowtoborrow_good_credit: WISDOM_FLOWTOBORROW_GOOD_CREDIT,
            flowtoborrow_supply_chain: WISDOM_FLOWTOBORROW_SUPPLY_CHAIN,
            flowtoborrow_orange: WISDOM_FLOWTOBORROW_ORANGE,
            exposure_good_credit: WISDOM_EXPOSURE_GOOD_CREDIT,
            exposure_orange: WISDOM_EXPOSURE_ORANGE,
            pointscredit_good_credit: WISDOM_POINTSCREDIT_GOOD_CREDIT,
            account_export: WISDOM_ACCOUNT_EXPORT,
            hasNoneAuth: false,
            selectAuth: {
                regionObj: {
                    selectCode: '',
                    selectName: ''
                },
                branchObj: {
                    selectCode: '',
                    selectName: ''
                },
                platformObj: {
                    selectCode: '',
                    selectName: ''
                }
            }
        }
    },
    mounted () {
        this.getUserTabAuth()
        this.onSearch()
        this.newBossAuth(['D', 'F', 'P'])
    },
    methods: {
        ...mapActions([
            'findPlatformslist',
            'getAccountList',
            'getAccountTotal',
            'getRepaymentList',
            'getRepaymentTotal',
            'findSummaryList',
            'findSummaryTotal'
        ]),
        pickerOptionsStart (val) {
            return {
                disabledDate: time => {
                    let endDateVal = this.queryParams[val]
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime()
                    }
                }
            }
        },
        pickerOptionsEnd (val) {
            return {
                disabledDate: time => {
                    let beginDateVal = this.queryParams[val]
                    if (beginDateVal) {
                        return time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7
                    }
                }
            }
        },
        linkage (dis) {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.queryParams.misCode = ''
            this.queryParams.loanCompanyCode = ''
            this.queryParams.loanCompanyName = ''
            this.selectAuth.areaObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
        },
        async backPlat (val, dis) {
            if (dis === 'D') {
                this.queryParams.regionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.queryParams.regionCodeName = val.value.deptName ? val.value.deptName : ''
                this.findAuthList({ deptType: 'F', pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'F') {
                this.queryParams.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.queryParams.subsectionCodeName = val.value.deptName ? val.value.deptName : ''
                if (val.value.pkDeptDoc) {
                    this.findPlatformslist({ subsectionCode: val.value.pkDeptDoc })
                } else {
                    !this.userInfo.deptType && this.findPlatformslist()
                }
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'P') {
                this.queryParams.misCode = val.value.misCode ? val.value.misCode : ''
                this.queryParams.loanCompanyCode = val.value.companyCode ? val.value.companyCode : ''
                this.queryParams.loanCompanyName = val.value.companyShortName ? val.value.companyShortName : ''
            }
        },
        findPlatformslistByBranchList () {
            let subsectionCode = this.queryParams.subsectionCode
            this.findPlatformslist({ subsectionCode })
        },
        handleClick (i) {
            if (i == 1) {
                this.hasNoneAuth = false
                this.productType = '1'
                this.$store.commit('fundsData/cleartableData')
                if (this.accountType == '1') this.flowtoborrowAuth()
                if (this.accountType == '2') this.exposureAuth()
                if (this.accountType == '3') this.pointscredit()
            }
            this.queryParams = { ...this.searchParams }
            this.onBackHAutocompleteDefaultValue()
            this.onQuery()
        },
        onBackHAutocompleteDefaultValue () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            if (!this.queryParams.regionCode) {
                this.selectAuth.regionObj = { ...obj }
            } else {
                this.selectAuth.regionObj.selectCode = this.queryParams.regionCode
                this.selectAuth.regionObj.selectName = this.queryParams.regionCodeName
                this.findAuthList({ deptType: 'F', pkDeptDoc: this.selectAuth.regionObj.selectCode })
                this.linkage('D')
            }
            if (!this.queryParams.subsectionCode) {
                this.selectAuth.branchObj = { ...obj }
            } else {
                this.selectAuth.branchObj.selectCode = this.queryParams.subsectionCode
                this.selectAuth.branchObj.selectName = this.queryParams.subsectionCodeName
                this.findPlatformslist({ subsectionCode: this.selectAuth.branchObj.selectCode })
                this.linkage('F')
            }
            if (!this.queryParams.loanCompanyCode) {
                this.selectAuth.platformObj = { ...obj }
            } else {
                this.selectAuth.platformObj.selectCode = this.queryParams.loanCompanyCode
                this.selectAuth.platformObj.selectCode = this.queryParams.loanCompanyName
            }
        },
        isSuccess (response) {
            this.$message({
                message: '批量导入成功！',
                type: 'success'
            })
            this.loading = false
            this.onSearch()
        },
        isError (response) {
            this.$message({
                message: '批量导入失败，' + JSON.parse(response.message).message,
                type: 'error'
            })
            this.loading = false
        },
        handleUpload (file) {
            // TODO: 目前只有一个文件,待优化
            if (file.size / (1024 * 1024) > 100) {
                this.$message({
                    message: '附件要保持100M以内',
                    type: 'warning'
                })
                return false
            }
            const fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
            if (this.accept.lastIndexOf(fileSuffix) == -1) {
                this.$message.error('格式不正确！')
                return false
            }
            this.loading = true
        },
        async onQuery () {
            this.searchParams.accountType = this.accountType
            this.searchParams.productType = this.productType
            let tableName = ''
            let isMore = false
            if (this.accountType == 4) {
                tableName = 'ReimbursementDetail'
                await Promise.all([this.getRepaymentList(this.searchParams),
                    this.getRepaymentTotal(this.searchParams)])
            } else if (this.accountType == 0) {
                tableName = 'TotalColumn'
                await Promise.all([this.findSummaryList(this.searchParams), this.findSummaryTotal(this.searchParams)])
            } else {
                if (this.accountType == 1) {
                    tableName = 'FlowToBorrow'
                } else if (this.accountType == 3) {
                    tableName = 'PointsCredit'
                } else if (this.accountType == 2) {
                    tableName = 'Exposure'
                }
                isMore = true
                await Promise.all([this.getAccountList(this.searchParams), this.getAccountTotal(this.searchParams)])
            }
            this.$refs.complexTable.totalColumnTotalDo(tableName, this.tableDataTotal, isMore)
        },
        onSearch () {
            this.searchParams = { ...this.queryParams }
            this.onQuery()
        },
        async onReset () {
            let obj = {
                selectCode: '',
                selectName: ''
            }
            this.removeValue = !this.removeValue
            this.$set(this.queryParams, 'regionCode', '')
            this.$set(this.queryParams, 'customerName', '')
            this.$set(this.queryParams, 'misCode', '')
            this.$set(this.queryParams, 'subsectionCode', '')
            this.$set(this.queryParams, 'standingBookNo', '')
            this.$set(this.queryParams, 'loanCompanyCode', '')
            this.$set(this.queryParams, 'loanCompanyName', '')
            this.$set(this.queryParams, 'isOverdue', '')
            this.$set(this.queryParams, 'settleType', '')
            this.$set(this.queryParams, 'loanStartDate', '')
            this.$set(this.queryParams, 'loanEndDate', '')
            this.$set(this.queryParams, 'repaymentStartDate', '')
            this.$set(this.queryParams, 'repaymentEndDate', '')
            this.$set(this.queryParams, 'repaymentType', '')
            this.$set(this.queryParams, 'startDate', '')
            this.$set(this.queryParams, 'endDate', '')
            this.$set(this.queryParams, 'repaymentStatus', '')
            this.$set(this.queryParams, 'queryEndDate', moment().format('YYYY-MM-DD'))
            this.selectAuth.regionObj = { ...obj }
            this.selectAuth.branchObj = { ...obj }
            this.selectAuth.platformObj = { ...obj }
            this.accountType = '0'
            await this.newBossAuth(['D', 'F', 'P'])
            this.onSearch()
        },
        getList (val) {
            this.searchParams = {
                ...this.searchParams,
                ...val
            }
            this.onQuery()
        },
        onLinddialog () {
            this.$router.push({ path: '/funds/fundsDataAnalysis/newFlowdialog', query: { accountType: this.accountType, productType: this.productType } })
        },
        getUserTabAuth () {
            let menuList = JSON.parse(sessionStorage.getItem('menuList'))
            let data = menuList.filter(i => {
                return i.path == '/funds'
            })[0].children
            this.router = data.filter(i => {
                return i.path == 'fundsDataAnalysis'
            })[0].children
            this.stairTab()
        },
        stairTab () {
            if (this.tabAuth('台账汇总表')) {
                this.accountType = '0'
            } else if (this.tabAuth('流贷台账')) {
                this.accountType = '1'
                this.flowtoborrowAuth()
            } else if (this.tabAuth('敞口台账')) {
                this.accountType = '2'
                this.exposureAuth()
            } else if (this.tabAuth('分授信台账')) {
                this.accountType = '3'
                this.pointscredit()
            } else if (this.tabAuth('还款明细表')) {
                this.accountType = '4'
            } else {
                this.hasNoneAuth = true
            }
        },
        // 1：好信用 2：供应链 3：好橙工
        flowtoborrowAuth () {
            if (this.hosAuthCheck(this.flowtoborrow_good_credit)) {
                this.productType = '1'
            } else if (this.hosAuthCheck(this.flowtoborrow_supply_chain)) {
                this.productType = '2'
            } else if (this.hosAuthCheck(this.flowtoborrow_orange)) {
                this.productType = '3'
            } else {
                this.hasNoneAuth = true
            }
        },
        exposureAuth () {
            if (this.hosAuthCheck(this.exposure_good_credit)) {
                this.productType = '1'
            } else if (this.hosAuthCheck(this.exposure_orange)) {
                this.productType = '3'
            } else {
                this.hasNoneAuth = true
            }
        },
        pointscredit () {
            if (this.hosAuthCheck(this.pointscredit_good_credit)) {
                this.productType = '1'
            } else {
                this.hasNoneAuth = true
            }
        },
        tabAuth (param) {
            let router = this.router
            return router && router.some(i => {
                return i.path == param
            })
        },
        onExport () {
            downloadCloudAlarmList(this.queryParams)
        }
    }
    // activated () {
    //     this.onQuery()
    // },
    // beforeRouteEnter (to, from, next) {
    //     newCache('standingBook')
    //     next()
    // },
    // beforeRouteLeave (to, from, next) {
    //     if (to.name != 'newFlowdialog') {
    //         clearCache('standingBook')
    //     }
    //     next()
    // }
}
</script>

<style lang='scss' scoped>
.amountImport {
    .add-tags-dialog {
        padding-top: 20px;
    }
    .downloadExcel {
        padding: 12px 20px;
        border-radius: 4px;
        background-color: #ff7a45;
        color: #fff;
    }
    /deep/ .el-dialog__body {
        min-height: 0 !important;
    }

    /deep/ .el-tabs--card > .el-tabs__header {
        border-bottom: 0;
    }

    /deep/ .el-tabs--card .el-tabs__nav {
        border-bottom: 1px solid #e4e7ed;
    }
    .m0 {
        margin: 0;
    }
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        border-bottom-color: #ff7a45;
    }
    .page-body {
        padding: 8px 0 20px 0;
    }
    /deep/.el-tabs__header {
        margin: 0 0 10px;
    }
    /deep/.el-tabs__item {
        height: 30px;
        line-height: 30px;
    }
    .fundBtn .el-button {
        padding: 7px 15px;
    }
}
</style>
