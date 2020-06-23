<template>
    <div class="page-body">
        <div class="page-table">
            <hosJoyTable v-if="isShowParent" :collapseShow="collapseShow" ref="hosjoyTable"
                         align="center" border stripe showPagination :column="column"
                         :data="tableData" :total="pagination.total"
                         :pageNumber.sync="pagination.pageNumber"
                         :pageSize.sync="pagination.pageSize" @pagination="getList"
                         @updateLabel="updateLabel" :toggleTable="toggleTable"
                         @toggleTableHandler="toggleTableHandler" :localName="localName">
            </hosJoyTable>
        </div>
        <!-- 基本信息Dialog -台账编号 -->
        <misDialog :detailData='accountData' v-if='accountData&&misDialogVisible' :dialogVisible='misDialogVisible' @onClose="misDialogVisible=false" @reload='getList' />
        <!-- 基本信息Dialog -资金档案编号 -->
        <fileInfoDialog :detailData='accountData' v-if='accountData&&fileinfoDialogVisible' :dialogVisible='fileinfoDialogVisible' @onClose="fileinfoDialogVisible=false" @reload='getList' />
        <!-- 基本信息Dialog -备注 -->
        <remarkDialog :detailData='accountData' v-if='accountData&&remarkDialogVisible' :dialogVisible='remarkDialogVisible' @onClose="remarkDialogVisible=false" @reload='getList' />
        <!-- 借款Dialog -流贷 -->
        <supplierDialog :detailData='loanData' v-if='loanData&&supplierDialogVisible' :dialogVisible='supplierDialogVisible' @onClose="supplierDialogVisible=false" @reload='getList' />
        <!-- 借款Dialog -分授信 -->
        <pointsCreditBillingDialog :detailData='loanData' v-if='loanData&&pointsCreditBillingDialogVisible' :dialogVisible='pointsCreditBillingDialogVisible' @onClose="pointsCreditBillingDialogVisible=false" @reload='getList' />
        <!-- 借款Dialog -敞口 -->
        <billingDialog :detailData='loanData' v-if='loanData&&billingDialogVisible' :dialogVisible='billingDialogVisible' @onClose="billingDialogVisible=false" @reload='getList' />
        <!-- 还款Dialog -手动调息 -->
        <regulatingBreathingDialog :detailData='regulatingBreathingDialogData' v-if='regulatingBreathingDialogData&&regulatingBreathingDialogVisible' :dialogVisible='regulatingBreathingDialogVisible' @onClose="regulatingBreathingDialogVisible=false" @reload='getList' />
        <!-- 还款Dialog -流贷 -->
        <AnnualInterestRateDialog :detailData='respAccountRepaymentPlanData' v-if='respAccountRepaymentPlanData&&AnnualInterestRateDialogVisible' :dialogVisible='AnnualInterestRateDialogVisible' @onClose="AnnualInterestRateDialogVisible=false" @reload='getList' />
        <!-- 还款Dialog -敞口&&分授信 -->
        <repaymentDialog ref="repayment" :detailData='rowData' v-if='rowData&&repaymentDialogVisible' :dialogVisible='repaymentDialogVisible' @onClose="repaymentDialogVisible=false" @reload='getList' @repaymentTypeChange="onRepaymentTypeChange" @stepOver="onStepOver" />
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import misDialog from './dialog/account/misDialog.vue'
import fileInfoDialog from './dialog/account/fileInfoDialog.vue'
import remarkDialog from './dialog/account/remarkDialog.vue'
import supplierDialog from './dialog/loan/supplierDialog.vue'
import billingDialog from './dialog/loan/billingDialog.vue'
import pointsCreditBillingDialog from './dialog/loan/pointsCreditBillingDialog.vue'
import regulatingBreathingDialog from './dialog/plan/regulatingBreathingDialog.vue'
import AnnualInterestRateDialog from './dialog/plan/AnnualInterestRateDialog.vue'
import repaymentDialog from './dialog/plan/repaymentDialog.vue'
import { getAccountBasic, getLoan, getRespAccountRepaymentPlan, transformPlanType } from '../api/index'
import moment from 'moment'
import { mapState } from 'vuex'
import filters from '@/utils/filters.js'
import {
    WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA,
    WISDOM_EXPOSURE_FUNDSDATA_UPDATA,
    WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA,
    WISDOM_FLOWTOBORROW_SHOW_LINE,
    WISDOM_EXPOSURE_SHOW_LINE,
    WISDOM_POINTSCREDIT_SHOW_LINE
} from '@/utils/auth_const'
export default {
    name: 'complexTable',
    components: { hosJoyTable, remarkDialog, fileInfoDialog, misDialog, supplierDialog, AnnualInterestRateDialog, billingDialog, repaymentDialog, pointsCreditBillingDialog, regulatingBreathingDialog },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            overdueList: state => state.fundsData.overdueList
        })
    },
    props: {
        tableData: {
            type: Array,
            default: function () {
                return []
            }
        },
        source: {
            type: String,
            default: function () {
                return '1'
            }
        },
        productType: {
            type: String,
            default: function () {
                return '1'
            }
        },
        pagination: {
            type: Object,
            default: function () {
                return { pageNumber: 1, pageSize: 10, total: 0 }
            }

        }
    },
    watch: {
        source: {
            handler (val) {
                if (val === '0') {
                    this.localName = 'TotalColumnTable::'
                    this.$set(this, 'column', this.TotalColumn)
                    this.collapseShow = true
                }
                if (val === '1') {
                    this.localName = 'FlowToBorrowTable::'
                    this.$set(this, 'column', this.FlowToBorrow)
                    this.collapseShow = true
                }
                if (val === '2') {
                    this.localName = 'ExposureTable::'
                    this.$set(this, 'column', this.Exposure)
                    this.collapseShow = true
                }
                if (val === '3') {
                    this.localName = 'PointsCreditTable::'
                    this.$set(this, 'column', this.PointsCredit)
                    this.collapseShow = true
                }
                if (val === '4') {
                    this.localName = 'ReimbursementDetailTable::'
                    this.$set(this, 'column', this.ReimbursementDetail)
                    this.collapseShow = false
                }
            },
            deep: true,
            immediate: true
        },
        productType (val) {
            if (val == '1') this.product = '好信用'
            if (val == '2') this.product = '供应链'
            if (val == '3') this.product = '好橙工'
        }
    },
    data: function () {
        return {
            localName: '',
            toggleTable: false,
            collapseShow: false,
            planListItem: {},
            copyGrantdata: [],
            remarkDialogVisible: false,
            fileinfoDialogVisible: false,
            misDialogVisible: false,
            supplierDialogVisible: false,
            AnnualInterestRateDialogVisible: false,
            billingDialogVisible: false,
            repaymentDialogVisible: false,
            pointsCreditBillingDialogVisible: false,
            regulatingBreathingDialogVisible: false,
            product: '好信用',
            sizes: [10, 20, 50, 100],
            accountData: {}, // 基本信息数据
            loanData: {}, // 借款信息数据
            rowData: null, // 敞口分授信还款信息数据
            respAccountRepaymentPlanData: null, // 流贷还款信息数据
            regulatingBreathingDialogData: [], // 手动调息数据
            // 台账汇总表
            TotalColumn: [
                {
                    label: 'MIS编码',
                    fixed: true,
                    width: '150',
                    render: (h, scope) => {
                        return (
                            <el-tooltip placement="top" effect='light'>
                                <div slot="content">MIS编码：{scope.row.misCode ? scope.row.misCode : '-'}
                                    <br />平台公司：{scope.row.loanCompanyName ? scope.row.loanCompanyName : '-'}</div>
                                <span>{scope.row.misCode ? scope.row.misCode : '-'}</span>
                            </el-tooltip>
                        )
                    }
                },
                { prop: 'loanCompanyName', label: '平台公司', minWidth: '150' },
                { prop: 'subsectionName', label: '分部', minWidth: '150' },
                {
                    label: '好信用-流贷',
                    children: [
                        {
                            label: '累计借款金额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyLiquidityLoansAmount)}</span>
                                )
                            }
                        },
                        {
                            label: '累计还款本金',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyLiquidityLoansPrincipalPaid)}</span>
                                )
                            }
                        },
                        {
                            label: '本金余额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyLiquidityLoansOwedPrincipal)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '好信用-敞口',
                    children: [
                        {
                            label: '累计敞口借款金额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyExposureAmount)}</span>
                                )
                            }
                        },
                        {
                            label: '累计归还敞口',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyExposurePrincipalPaid)}</span>
                                )
                            }
                        },
                        {
                            label: '剩余敞口',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxyExposureOwedPrincipal)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '好信用-分授信',
                    children: [
                        {
                            label: '累计借款金额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxySeparateCreditAmount)}</span>
                                )
                            }
                        },
                        {
                            label: '累计还款金额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxySeparateCreditPrincipalPaid)}</span>
                                )
                            }
                        },
                        {
                            label: '本金余额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hxySeparateCreditOwedPrincipal)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '供应链-流贷',
                    children: [
                        {
                            label: '供应链本金余额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.supplyChainLiquidityLoansOwedPrincipal)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '好橙工',
                    children: [
                        {
                            label: '好橙工本金余额',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hcgOwedPrincipal)}</span>
                                )
                            }
                        },
                        {
                            label: '好橙工剩余敞口',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.hcgRemainingExposure)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '流贷、敞口余额合计',
                    children: [
                        {
                            label: '流贷余额合计',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.liquidityLoansOwedPrincipal)}</span>
                                )
                            }
                        },
                        {
                            label: '敞口余额合计',
                            minWidth: '150',
                            render: (h, scope) => {
                                return (
                                    <span>{filters.fundMoney(scope.row.remainingExposure)}</span>
                                )
                            }
                        }
                    ]
                },
                {
                    label: '余额总计',
                    minWidth: '150',
                    render: (h, scope) => {
                        return (
                            <span>{filters.fundMoney(scope.row.balanceTotal)}</span>
                        )
                    }
                }
            ],
            // 流贷
            FlowToBorrow: [
                {
                    prop: 'account_standingBookNo',
                    fixed: true,
                    width: '200',
                    children: [
                        {
                            label: '台账编号',
                            width: '200',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                return render ? <div>
                                    <el-tooltip effect="light" placement="top">
                                        <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                            <br />借款单位：{scope.row.account_loanCompanyName}
                                            <br />欠收本金：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                        <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                    </el-tooltip>
                                    <i class='el-icon-edit pointer' onClick={() => {
                                        this.getAccount(scope.row)
                                        this.accountData.title = `${this.product}-流贷基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                        this.misDialogVisible = true
                                    }}></i></div> : <el-tooltip effect="light" placement="top">
                                    <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                        <br />借款单位：{scope.row.account_loanCompanyName}
                                        <br />欠收本金：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                    <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                </el-tooltip>
                            }
                        }
                    ]
                },
                {
                    label: '基础信息',
                    minWidth: '450',
                    // fixed: false,
                    children: [
                        { prop: 'account_misCode', label: 'MIS编码', minWidth: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', minWidth: '150' },
                        { prop: 'account_subsectionName', label: '分部', minWidth: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '借款金额',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                return render ? <span>{filters.fundMoney(scope.row.loan_loanAmount)}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getLoan(scope.row)
                                    this.loanData.title = `${this.product}—流贷借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                    this.supplierDialogVisible = true
                                }}></i></span> : <span>{filters.fundMoney(scope.row.loan_loanAmount)}</span>
                            }
                        },
                        {
                            label: '供货商名称',
                            showOverflowTooltip: true,
                            sort: 2,
                            minWidth: '150',
                            isHidden: false
                        },
                        {
                            label: '还款方式',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i
                                    class={
                                        scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_loanStartTime && scope.row.loan_yearRate !== null
                                            ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                    onClick={async () => {
                                        await this.getRespAccountRepaymentPlanData(scope.row)
                                        this.respAccountRepaymentPlanData[0].title = `${this.product}-流贷还款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                        this.respAccountRepaymentPlanData[0].accountId = scope.row.account_id
                                        this.AnnualInterestRateDialogVisible = true
                                    }}></i></span> : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                            }
                        },
                        {
                            label: '年利率',
                            sort: 4,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{scope.row.loan_yearRate ? `${scope.row.loan_yearRate}%` : '-'}</span>
                            }
                        },
                        {
                            label: '借款期限',
                            sort: 5,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>
                                    {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                    {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                                </span>
                            }
                        },
                        {
                            label: '应收利息（正常+宽限）',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            sort: 6,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestAmount + scope.row.paymentStatic_graceInterestAmount)}{scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${(scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) > 0 ? '+' + (scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) : (scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal)})` : ''}</span>
                            }
                        },
                        {
                            label: '放款日期',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanStartTime ? moment(scope.row.loan_loanStartTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '登记人',
                            sort: 9,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '还款账目',
                    children: [
                        {
                            label: '最新本金还款日',
                            sort: 1,
                            minWidth: '150',
                            displayAs: 'YYYY-MM-DD'
                        },
                        {
                            label: '累计实收借款本金',
                            sort: 2,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '欠收本金',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '宽限还款日',
                            sort: 4,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            label: '累计应收正常利息',
                            sort: 5,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestAmount)}{scope.row.planList_0_normalInterestPranayama ? `(${scope.row.planList_0_normalInterestPranayama > 0 ? '+' + scope.row.planList_0_normalInterestPranayama : scope.row.planList_0_normalInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '最新正常利息还款日',
                            sort: 6,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_interestTime ? moment(scope.row.planList_0_interestTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '累计实收正常利息',
                            sort: 7,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestPaid)}</span>
                            }
                        },
                        {
                            label: '欠收正常利息',
                            sort: 8,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestOwe)}</span>
                            }
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            sort: 9,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestAmount)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 10,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '欠收宽限期利息',
                            sort: 11,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestOwe)}</span>
                            }
                        }
                    ]
                },
                {
                    label: '逾期账目',
                    children: [
                        {
                            label: '是否逾期',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '应收逾期罚息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            sort: 2,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestAmount)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收逾期罚息',
                            sort: 3,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '欠收逾期罚息',
                            sort: 4,
                            minWidth: '150',
                            isHidden: true,
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestOwe)}</span>
                            }
                        }
                    ]
                },
                {
                    label: '手动调息',
                    selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                    minWidth: '100',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                        return render ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i class='el-icon-edit pointer' onClick={async () => {
                            await this.getRespAccountRepaymentPlanData(scope.row)
                            this.respAccountRepaymentPlanData[0].otherTitle = `${this.product}-手动调息（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                            this.respAccountRepaymentPlanData[0].accountId = scope.row.account_id
                            this.regulatingBreathingDialogData = JSON.parse(JSON.stringify(this.respAccountRepaymentPlanData))
                            this.regulatingBreathingDialogVisible = true
                        }}></i></span> : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                    }
                },
                {
                    label: '台账档案编号',
                    minWidth: '200',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-流贷档案信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                            this.fileinfoDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                    }
                },
                {
                    label: '备注',
                    minWidth: '200',
                    selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_remark ? scope.row.account_remark.substring(0, 6) + '...' : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-流贷备注信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                            this.remarkDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_remark ? scope.row.account_remark.substring(0, 6) + '...' : '-'}</span>
                    }
                }
            ],
            // 分授信
            PointsCredit: [
                {
                    width: '200',
                    fixed: true,
                    prop: 'account_standingBookNo',
                    children: [
                        {
                            label: '台账编号',
                            width: '200',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                return render ? <div>
                                    <el-tooltip effect="light" placement="top">
                                        <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                            <br />借款单位：{scope.row.account_loanCompanyName}
                                            <br />剩余本金：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                        <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                    </el-tooltip>
                                    <i class='el-icon-edit pointer' onClick={() => {
                                        this.getAccount(scope.row)
                                        this.accountData.title = `${this.product}-分授信基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                        this.misDialogVisible = true
                                    }}></i></div> : <div>
                                    <el-tooltip effect="light" placement="top">
                                        <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                            <br />借款单位：{scope.row.account_loanCompanyName}
                                            <br />剩余本金：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                        <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                    </el-tooltip></div>
                            }
                        }
                    ]
                },
                {
                    label: '基础信息',
                    minWidth: '450',
                    // fixed: true,
                    children: [
                        { prop: 'account_misCode', label: 'MIS编码', minWidth: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', minWidth: '150' },
                        { prop: 'account_subsectionName', label: '分部', minWidth: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '开票金额',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.loan_invoiceAmount)}</span>
                            }
                        },
                        {
                            label: '开票日期',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_invoiceTime ? moment(scope.row.loan_invoiceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '供货商名称',
                            showOverflowTooltip: true,
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_supplier ? `${scope.row.loan_supplier}` : '-'}</span>
                            }
                        },
                        {
                            label: '借款日期',
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanStartTime ? moment(scope.row.loan_loanStartTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '借款金额',
                            sort: 5,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                return render ? <span>{filters.fundMoney(scope.row.loan_loanAmount)}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getLoan(scope.row)
                                    this.loanData.title = `${this.product}-分授信借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                    this.pointsCreditBillingDialogVisible = true
                                }}></i></span> : <span>{filters.fundMoney(scope.row.loan_loanAmount)}</span>
                            }
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '还款方式',
                            sort: 9,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i
                                    class={
                                        scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_loanStartTime && scope.row.loan_yearRate !== null
                                            ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                    onClick={async () => {
                                        await this.getGrantPaymetPlanData(scope.row)
                                        this.repaymentDialogVisible = true
                                    }}></i></span> : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                            }
                        },
                        {
                            label: '年利率',
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_yearRate ? `${scope.row.loan_yearRate}%` : '-'}</span>
                            }
                        },
                        {
                            label: '借款期限',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>
                                {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                            </span>
                            }
                        },
                        {
                            label: '登记人',
                            sort: 10,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '分授信还款账目总计',
                    children: [
                        {
                            label: '剩余本金',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '剩余正常利息',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestOwe)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            sort: 14,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestOwe)}</span>
                            }
                        },
                        {
                            label: '最新本金还款时间',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_capitalTime ? moment(scope.row.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '累计已还本金',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '应收利息（正常+宽限）',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestAmount + scope.row.paymentStatic_graceInterestAmount)}{scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${(scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) > 0 ? '+' + (scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) : (scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal)})` : ''}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '累计应收正常利息',
                            sort: 5,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestAmount)}{scope.row.paymentStatic_normalInterestPranayamaTotal ? `(${scope.row.paymentStatic_normalInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_normalInterestPranayamaTotal : scope.row.paymentStatic_normalInterestPranayamaTotal})` : ''}</span>
                            }
                        },
                        {
                            label: '最新正常利息还款时间',
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_interestTime ? moment(scope.row.paymentStatic_interestTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '累计实收正常利息',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_interestPaid)}</span>
                            }
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            sort: 9,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestAmount)}{scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${scope.row.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_graceInterestPranayamaTotal : scope.row.paymentStatic_graceInterestPranayamaTotal})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 10,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 11,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '累计应收逾期罚息',
                            sort: 12,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestAmount)}{scope.row.paymentStatic_overDueInterestPranayamaTotal ? `(${scope.row.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_overDueInterestPranayamaTotal : scope.row.paymentStatic_overDueInterestPranayamaTotal})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收逾期罚息',
                            sort: 13,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestPaid)}</span>
                            }
                        }
                    ]
                },
                {
                    label: '分授信还款账目明细',
                    children: [
                        {
                            label: '约定还款日期1',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_endTime ? moment(scope.row.planList_0_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日1',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款本金金额',
                            sort: 5,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '累计正常实收利息',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_interestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余正常利息',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_interestOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            sort: 12,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款日期2',
                            sort: 16,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_endTime ? moment(scope.row.planList_1_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日2',
                            sort: 17,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_graceTime ? moment(scope.row.planList_1_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款本金金额',
                            sort: 20,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '累计正常实收利息',
                            sort: 22,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_interestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余正常利息',
                            sort: 23,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_interestOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            sort: 27,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_1_isOverDue ? 'red' : ''}>{scope.row.planList_1_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款日期3',
                            sort: 31,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_endTime ? moment(scope.row.planList_2_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日2',
                            sort: 32,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_graceTime ? moment(scope.row.planList_2_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款本金金额',
                            sort: 35,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '累计正常实收利息',
                            sort: 37,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_interestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余正常利息',
                            sort: 38,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_interestOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            sort: 42,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_2_isOverDue ? 'red' : ''}>{scope.row.planList_2_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款本金金额',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计还款本金金额',
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalPaid)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_interestAmount)}{scope.row.planList_0_normalInterestPranayama ? `(${scope.row.planList_0_normalInterestPranayama > 0 ? '+' + scope.row.planList_0_normalInterestPranayama : scope.row.planList_0_normalInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息1',
                            sort: 9,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestAmount)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 10,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 11,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            sort: 13,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestAmount)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            sort: 14,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息1',
                            sort: 15,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestOwe)}</span>
                            }
                        },
                        // 约定还款日2
                        {
                            label: '约定还款本金金额',
                            sort: 18,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计还款本金金额',
                            sort: 19,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalPaid)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            sort: 21,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_interestAmount)}{scope.row.planList_1_normalInterestPranayama ? `(${scope.row.planList_1_normalInterestPranayama > 0 ? '+' + scope.row.planList_1_normalInterestPranayama : scope.row.planList_1_normalInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息2',
                            sort: 24,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestAmount)}{scope.row.planList_1_graceInterestPranayama ? `(${scope.row.planList_1_graceInterestPranayama > 0 ? '+' + scope.row.planList_1_graceInterestPranayama : scope.row.planList_1_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 25,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 26,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            sort: 28,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestAmount)}{scope.row.planList_1_overDueInterestPranayama ? `(${scope.row.planList_1_overDueInterestPranayama > 0 ? '+' + scope.row.planList_1_overDueInterestPranayama : scope.row.planList_1_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            sort: 29,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            sort: 30,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestOwe)}</span>
                            }
                        },
                        // 约定还款日3
                        {
                            label: '约定还款本金金额',
                            sort: 33,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计还款本金金额',
                            sort: 34,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalPaid)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            sort: 36,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_interestAmount)}{scope.row.planList_2_normalInterestPranayama ? `(${scope.row.planList_2_normalInterestPranayama > 0 ? '+' + scope.row.planList_2_normalInterestPranayama : scope.row.planList_2_normalInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息3',
                            sort: 39,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestAmount)}{scope.row.planList_2_graceInterestPranayama ? `(${scope.row.planList_2_graceInterestPranayama > 0 ? '+' + scope.row.planList_2_graceInterestPranayama : scope.row.planList_2_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 40,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 41,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            sort: 43,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestAmount)}{scope.row.planList_2_overDueInterestPranayama ? `(${scope.row.planList_2_overDueInterestPranayama > 0 ? '+' + scope.row.planList_2_overDueInterestPranayama : scope.row.planList_2_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            sort: 44,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            sort: 45,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestOwe)}</span>
                            }
                        }
                    ]
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                    label: '手动调息',
                    minWidth: '100',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                        return render ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i class='el-icon-edit pointer' onClick={async () => {
                            await this.getGrantPaymetPlanData(scope.row)
                            this.regulatingBreathingDialogVisible = true
                        }}></i></span> : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                    }
                },
                {
                    label: '台账档案编号',
                    minWidth: '200',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-分授信档案信息维护`
                            this.fileinfoDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                    }
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                    label: '备注',
                    minWidth: '200',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-分授信备注信息维护`
                            this.remarkDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}</span>
                    }
                }
            ],
            // 敞口
            Exposure: [
                {
                    width: '200',
                    fixed: true,
                    children: [
                        {
                            label: '台账编号',
                            width: '200',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                return render ? <div>
                                    <el-tooltip effect="light" placement="top">
                                        <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                            <br />借款单位：{scope.row.account_loanCompanyName}
                                            <br />剩余敞口：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                        <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                    </el-tooltip>
                                    <i class='el-icon-edit pointer' onClick={() => {
                                        this.getAccount(scope.row)
                                        this.accountData.title = `${this.product}-敞口基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                        this.misDialogVisible = true
                                    }}></i></div> : <div>
                                    <el-tooltip effect="light" placement="top">
                                        <div slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                            <br />借款单位：{scope.row.account_loanCompanyName}
                                            <br />剩余敞口：{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</div>
                                        <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                    </el-tooltip>
                                </div>
                            }
                        }
                    ]
                },
                {
                    label: '基础信息',
                    minWidth: '450',
                    // fixed: true,
                    children: [
                        { prop: 'account_misCode', label: 'MIS编码', minWidth: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', minWidth: '150' },
                        { prop: 'account_subsectionName', label: '分部', minWidth: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '开票金额',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.loan_invoiceAmount)}</span>
                            }
                        },
                        {
                            label: '开票日期',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_invoiceTime ? moment(scope.row.loan_invoiceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '供货商名称',
                            showOverflowTooltip: true,
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_supplier ? `${scope.row.loan_supplier}` : '-'}</span>
                            }
                        },
                        {
                            label: '保证金缴纳',
                            sort: 5,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.loan_depositPay)}</span>
                            }
                        },
                        {
                            label: '保证金比例',
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_depositProportion ? `${scope.row.loan_depositProportion}%` : '-'}</span>
                            }
                        },
                        {
                            label: '敞口金额',
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                return render ? <span>{filters.fundMoney(scope.row.loan_loanAmount)}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getLoan(scope.row)
                                    this.loanData.title = `${this.product}-敞口借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`
                                    this.billingDialogVisible = true
                                }}></i></span> : <span>{filters.fundMoney(scope.row.loan_loanAmount)}</span>
                            }
                        },
                        {
                            label: '承兑期限',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>
                                {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                            </span>
                            }
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '还款方式',
                            sort: 9,
                            minWidth: '150',
                            render: (h, scope) => {
                                let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i
                            class={
                                    scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_invoiceTime
                                        ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                onClick={async () => {
                                    await this.getGrantPaymetPlanData(scope.row)
                                    this.repaymentDialogVisible = true
                                }}></i></span> : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                            }
                        },
                        { prop: 'loan_registrant', label: '登记人', sort: 9, width: '150' }
                    ]
                },
                {
                    label: '敞口还款账目总计',
                    children: [
                        {
                            label: '剩余敞口',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            sort: 9,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestOwe)}</span>
                            }
                        },
                        {
                            label: '最新还款时间',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_capitalTime ? moment(scope.row.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '累计已还敞口本金',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestAmount)}{scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${scope.row.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_graceInterestPranayamaTotal : scope.row.paymentStatic_graceInterestPranayamaTotal})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 5,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_graceInterestOwe)}</span>
                            }
                        },
                        {
                            label: '累计应收逾期罚息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestAmount)}{scope.row.paymentStatic_overDueInterestPranayamaTotal ? `(${scope.row.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_overDueInterestPranayamaTotal : scope.row.paymentStatic_overDueInterestPranayamaTotal})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收逾期罚息',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.paymentStatic_overDueInterestPaid)}</span>
                            }
                        }
                    ]
                },
                {
                    label: '敞口还款账目明细',
                    children: [
                        {
                            label: '约定还款日期1',
                            sort: 1,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_endTime ? moment(scope.row.planList_0_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日1',
                            sort: 2,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额1',
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期1',
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款日期2',
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_endTime ? moment(scope.row.planList_1_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日2',
                            sort: 14,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_graceTime ? moment(scope.row.planList_1_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额2',
                            sort: 17,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期2',
                            sort: 21,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_1_isOverDue ? 'red' : ''}>{scope.row.planList_1_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款日期3',
                            sort: 25,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_endTime ? moment(scope.row.planList_2_endTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日3',
                            sort: 26,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_graceTime ? moment(scope.row.planList_2_graceTime).format('YYYY-MM-DD') : '-'}</span>
                            }
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额3',
                            sort: 29,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalOwe)}</span>
                            }
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期3',
                            sort: 33,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span class={scope.row.planList_2_isOverDue ? 'red' : ''}>{scope.row.planList_2_isOverDue ? '是' : '否'}</span>
                            }
                        },
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额1',
                            sort: 3,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额1',
                            sort: 4,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息1',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 6,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestAmount)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息1',
                            sort: 7,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息1',
                            sort: 8,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息1',
                            sort: 10,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestAmount)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息1',
                            sort: 11,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息1',
                            sort: 12,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_0_overDueInterestOwe)}</span>
                            }
                        },
                        // 约定日期2
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额2',
                            sort: 15,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额2',
                            sort: 16,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息2',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 18,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestAmount)}{scope.row.planList_1_graceInterestPranayama ? `(${scope.row.planList_1_graceInterestPranayama > 0 ? '+' + scope.row.planList_1_graceInterestPranayama : scope.row.planList_1_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息2',
                            sort: 19,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息2',
                            sort: 20,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息2',
                            sort: 22,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestAmount)}{scope.row.planList_1_overDueInterestPranayama ? `(${scope.row.planList_1_overDueInterestPranayama > 0 ? '+' + scope.row.planList_1_overDueInterestPranayama : scope.row.planList_1_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息2',
                            sort: 23,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息2',
                            sort: 24,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_1_overDueInterestOwe)}</span>
                            }
                        },
                        // 约定日期3
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额3',
                            sort: 27,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalAmount)}</span>
                            }
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额3',
                            sort: 28,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_capitalPaid)}</span>
                            }
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息3',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 30,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestAmount)}{scope.row.planList_2_graceInterestPranayama ? `(${scope.row.planList_2_graceInterestPranayama > 0 ? '+' + scope.row.planList_2_graceInterestPranayama : scope.row.planList_2_graceInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息3',
                            sort: 31,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息3',
                            sort: 32,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_graceInterestOwe)}</span>
                            }
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息3',
                            sort: 34,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestAmount)}{scope.row.planList_2_overDueInterestPranayama ? `(${scope.row.planList_2_overDueInterestPranayama > 0 ? '+' + scope.row.planList_2_overDueInterestPranayama : scope.row.planList_2_overDueInterestPranayama})` : ''}</span>
                            }
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息3',
                            sort: 35,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestPaid)}</span>
                            }
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息3',
                            sort: 36,
                            minWidth: '150',
                            render: (h, scope) => {
                                return <span>{filters.fundMoney(scope.row.planList_2_overDueInterestOwe)}</span>
                            }
                        }
                    ]
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                    label: '手动调息',
                    minWidth: '100',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                        return render ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i class='el-icon-edit pointer' onClick={async () => {
                            await this.getGrantPaymetPlanData(scope.row, true)
                            this.regulatingBreathingDialogVisible = true
                        }}></i></span> : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                    }
                },
                {
                    label: '台账档案编号',
                    minWidth: '200',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-敞口基础信息维护`
                            this.fileinfoDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                    }
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                    label: '备注',
                    minWidth: '200',
                    render: (h, scope) => {
                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                        return render ? <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.accountData.title = `${this.product}-敞口备注信息维护`
                            this.remarkDialogVisible = true
                        }}></i></span> : <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}</span>
                    }
                }
            ],
            // 还款明细表
            ReimbursementDetail: [
                {
                    prop: 'standingBookNo',
                    label: '台账编号',
                    showOverflowTooltip: true,
                    render: (h, scope) => {
                        return <span>{scope.row.standingBookNo ? `${scope.row.standingBookNo}` : '-'}</span>
                    }
                },
                {
                    prop: 'misCode',
                    label: 'MIS编码',
                    render: (h, scope) => {
                        return <span>{scope.row.misCode ? `${scope.row.misCode}` : '-'}</span>
                    }
                },
                {
                    prop: 'loanCompanyName',
                    label: '平台公司',
                    showOverflowTooltip: true,
                    render: (h, scope) => {
                        return <span>{scope.row.loanCompanyName ? `${scope.row.loanCompanyName}` : '-'}</span>
                    }
                },
                {
                    prop: 'subsectionName',
                    label: '分部',
                    showOverflowTooltip: true,
                    render: (h, scope) => {
                        return <span>{scope.row.subsectionName ? `${scope.row.subsectionName}` : '-'}</span>
                    }
                },
                {
                    prop: 'createBy',
                    label: '登记人',
                    render: (h, scope) => {
                        return <span>{scope.row.createBy ? `${scope.row.createBy}` : '-'}</span>
                    }
                },
                {
                    prop: 'accountType',
                    label: '还款项目',
                    render: (h, scope) => {
                        return <span>{
                            scope.row.accountType == 1 ? (scope.row.type == 1 ? '还借款本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息')
                                : scope.row.accountType == 2 ? (scope.row.type == 1 ? '还敞口本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息')
                                    : scope.row.accountType == 3 ? (scope.row.type == 1 ? '还借款本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息') : '-'
                        }</span>
                    }
                },
                {
                    prop: 'paidTime',
                    label: '还款时间',
                    render: (h, scope) => {
                        return <span>{scope.row.paidTime ? moment(scope.row.paidTime).format('YYYY-MM-DD') : '-'}</span>
                    }
                },
                {
                    prop: 'paidAmount',
                    label: '金额',
                    render: (h, scope) => {
                        return <span>{filters.fundMoney(scope.row.paidAmount)}</span>
                    }
                },
                {
                    prop: 'shouldRepayTime',
                    label: '应还款日期',
                    render: (h, scope) => {
                        return <span>{scope.row.shouldRepayTime ? moment(scope.row.shouldRepayTime).format('YYYY-MM-DD') : '-'}</span>
                    }
                }
                // {
                //     prop: 'remark',
                //     label: '备注',
                //     width: '150',
                //     render: (h, scope) => {
                //         return <span>{scope.row.remark ? `${scope.row.remark.substring(0, 6)}...` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                //             this.getAccount(scope.row)
                //             this.accountData.title = '备注信息维护'
                //             this.remarkDialogVisible = true
                //         }}></i></span>
                //     }
                // }
            ],
            column: [],
            isShowParent: true
        }
    },
    methods: {
        findLabelIndex (labelName) {
            return this.column.findIndex((item) => item.label === labelName)
        },
        showTable () {
            const haveLabel = JSON.parse(localStorage.getItem(this.localName + this.userInfo.user_name))
            if (haveLabel && haveLabel.length > 0) {
                this.updateLabel(haveLabel)
            } else {
                this.toggleTable = true
                this.$nextTick(() => {
                    this.$refs.hosjoyTable && this.$refs.hosjoyTable.doLayout()
                })
            }
        },
        async getList (val) {
            this.$emit('getList', val)
        },
        // 基本信息
        async getAccount (row) {
            const accountId = row.account_id || row.accountId
            const { data } = await getAccountBasic(accountId)
            this.accountData = { ...this.accountData, ...data }
            this.$set(this.accountData, 'selectName', data.loanCompanyName)
            this.$set(this.accountData, 'selectCode', data.loanCompanyCode)
        },
        // 借款信息
        async getLoan (row) {
            const { data } = await getLoan(row.loan_id)
            this.loanData = {
                ...this.loanData,
                ...data,
                loanDateNumM: '',
                loanDateNumD: '',
                registrant: this.userInfo.employeeName
            }
            if (data.loanDateType == 1) {
                this.$set(this.loanData, 'loanDateNumM', data.loanDateNum)
                this.loanData.loanEndTimeLoan = data.loanStartTime ? moment(data.loanStartTime).add(data.loanDateNum, 'M').format('YYYY-MM-DD') : '-'
                this.loanData.loanEndTimeInvoice = data.invoiceTime ? moment(data.invoiceTime).add(data.loanDateNum, 'M').format('YYYY-MM-DD') : '-'
            }
            if (data.loanDateType == 2) {
                this.$set(this.loanData, 'loanDateNumD', data.loanDateNum)
                this.loanData.loanEndTimeLoan = data.loanStartTime ? moment(data.loanStartTime).add(data.loanDateNum, 'd').format('YYYY-MM-DD') : '-'
                this.loanData.loanEndTimeInvoice = data.invoiceTime ? moment(data.invoiceTime).add(data.loanDateNum, 'd').format('YYYY-MM-DD') : '-'
            }
            if (!data.loanDateType) {
                this.loanData.loanEndTimeLoan = '-'
                this.loanData.loanEndTimeInvoice = '-'
            }
        },
        // 流贷还款信息 流贷没有334还款，只有一次性的
        async getRespAccountRepaymentPlanData (row) {
            const { data } = await getRespAccountRepaymentPlan(row.account_id)
            this.respAccountRepaymentPlanData = data
        },
        // 敞口和分授信还款
        async getGrantPaymetPlanData (row, type) {
            const { data } = await getRespAccountRepaymentPlan(row.account_id)
            this.loanAmount = data.reduce((val, item, index) => {
                return val + item.capitalAmount
            }, 0)
            this.rowData = [...data]
            if (row.account_accountType == 2) {
                this.$set(this.rowData[0], 'title', `${this.product}-敞口还款信息维护（${row.account_standingBookNo} ${row.account_loanCompanyName}）`)
            } else if (row.account_accountType == 3) {
                this.$set(this.rowData[0], 'title', `${this.product}-分授信还款信息维护（${row.account_standingBookNo} ${row.account_loanCompanyName}）`)
                this.$set(this.rowData[0], 'account_accountType', 3)
            }
            this.$set(this.rowData[0], 'otherTitle', `${this.product}-手动调息（${row.account_standingBookNo} ${row.account_loanCompanyName}）`)
            this.$set(this.rowData[0], 'repaymentType', row.loan_repaymentType)
            this.$set(this.rowData[0], 'accountId', row.account_id)
            this.rowData[2] && this.$set(this.rowData[2], 'accountId', row.account_id)
            type && this.$set(this.rowData[0], 'regulatingBreathingType', type) // 敞口无正常利息
            this.regulatingBreathingDialogData = JSON.parse(JSON.stringify(this.rowData))
            // 重新保留一份数据
            this.copyGrantdata = [...this.rowData]
            // 是否需要增加计息---
        },
        async onRepaymentTypeChange (item) {
            const params = {
                accountId: item.accountId,
                registrant: this.userInfo.employeeName
            }
            const { data } = await transformPlanType(params)
            if (data.length == 1) {
                data[0].repaymentType = 1
            } else {
                data.map((val) => {
                    val.repaymentType = 2
                })
            }
            data[0].accountId = this.rowData[0].accountId
            data[0].account_accountType = item.account_accountType
            this.rowData = data
            this.getList()
        },
        onStepOver (val, item) {
            if (val == 2 && item.overdueList.length < 2) {
                item.overdueList = this.overdueList
            } else if (val == 1) {
                item.overDueInterest = 12
            }
        },
        toggleTableHandler () {
            this.toggleTable = false
        },
        updateLabel (showColumnLabel) {
            this.column.forEach(value => {
                value.isHidden = showColumnLabel.indexOf(value.prop || value.label) === -1
                if (value.children) {
                    let number = 0
                    value.children.forEach(value1 => {
                        value1.isHidden = showColumnLabel.indexOf(value1.prop) === -1
                        if (!value1.isHidden) number++
                    })
                    value.isHidden = !(number > 0)
                }
            })
            this.toggleTable = true
            this.$nextTick(() => {
                this.$refs.hosjoyTable && this.$refs.hosjoyTable.doLayout()
            })
        }
    },
    mounted () {
        // this.column = this.FlowToBorrow
        this.column = this.TotalColumn
    }
}
</script>

<style lang="scss" scoped>
.red {
    color: red;
}
/deep/ .cell .hidden {
    display: none !important;
}
.page-table {
    width: calc(100% - 1px);
    margin: 0 auto;
}
/deep/.pointer {
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
}
// // 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-color: rgba(33, 37, 43, 0.26);
}
// 台账专属表格样式
/deep/.el-table td,
/deep/ .el-table th {
    padding: 7px 0;
}
</style>
