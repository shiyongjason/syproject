<template>
    <div class="page-body">
        <div class="page-table">
            <hosJoyTable :amountResetTable="amountResetTable" v-if="isShowParent" :collapseShow="collapseShow" ref="hosjoyTable" align="center" border stripe showPagination :column="column" :data="tableData" :total="pagination.total" :pageNumber.sync="pagination.pageNumber" :isAction='["1","2", "3"].includes(source)'
                :pageSize.sync="pagination.pageSize" @pagination="getList" :toggleTable="toggleTable" :localName="localName" :prevLocalName="prevLocalName" :isActionFixed='tableData&&tableData.length>0' actionWidth='120' >
                <template #action="slotProps">
                    <h-button  table @click="onLook(slotProps.data.row)" >查看详情</h-button>
                </template>
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
        <el-dialog title="供货商名称" :visible.sync="tipsDialogVisible" :close-on-click-modal='false' width="50%">
            <span class="max-height">{{tipsDialogVisibleContent}}</span>
        </el-dialog>
        <!-- 重构组件组合 -->
        <allDialog ref="allDialog" @backGetAccount=getAccount @backLoan = getLoan @backGetRespAccountRepaymentPlanData = getRespAccountRepaymentPlanData
        @backGetGrantPaymetPlanData = getGrantPaymetPlanData  :soure=source></allDialog>
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
import allDialog from './allDialog.vue'
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
    components: {
        hosJoyTable,
        remarkDialog,
        fileInfoDialog,
        misDialog,
        supplierDialog,
        AnnualInterestRateDialog,
        billingDialog,
        repaymentDialog,
        pointsCreditBillingDialog,
        regulatingBreathingDialog,
        allDialog
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            overdueList: state => state.fundsData.overdueList
        }),
        getAction () {
            return [2, 3, 4].includes(this.source)
        }
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

        },
        amountResetTable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    watch: {
        source: {
            handler (val) {
                if (val === '0') {
                    this.prevLocalName = 'TotalColumnTable::'
                    this.localName = 'TotalColumnTable::V2.3.2_2'
                    this.$set(this, 'column', this.TotalColumn)
                    this.collapseShow = true
                }
                if (val === '1') {
                    this.prevLocalName = 'FlowToBorrowTable::'
                    this.localName = 'FlowToBorrowTable::V2.3.2_2'
                    this.$set(this, 'column', this.FlowToBorrow)
                    this.collapseShow = true
                }
                if (val === '2') {
                    this.prevLocalName = 'ExposureTable::'
                    this.localName = 'ExposureTable::V2.3.2_2'
                    this.$set(this, 'column', this.Exposure)
                    this.collapseShow = true
                }
                if (val === '3') {
                    this.prevLocalName = 'PointsCreditTable::'
                    this.localName = 'PointsCreditTable::V2.3.2_2'
                    this.$set(this, 'column', this.PointsCredit)
                    this.collapseShow = true
                }
                if (val === '4') {
                    this.prevLocalName = 'ReimbursementDetailTable::'
                    this.localName = 'ReimbursementDetailTable::V2.3.2_2'
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
            isShowAction: false,
            tipsDialogVisible: false,
            tipsDialogVisibleContent: '',
            localName: '',
            prevLocalName: '',
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
                    label: '',
                    fixed: true,
                    minWidth: '80',
                    selfProp: 'misCode',
                    showOverflowTooltip: true,
                    children: [{
                        label: 'MIS编码',
                        prop: 'misCode',
                        minWidth: '80',
                        showOverflowTooltip: true,
                        render: (h, scope) => {
                            return (
                                <el-tooltip placement="top" effect='light'>
                                    <div slot="content">MIS编码：{scope.row.misCode ? scope.row.misCode : '-'}
                                        <br />平台公司：{scope.row.loanCompanyName ? scope.row.loanCompanyName : '-'}</div>
                                    <span>{scope.row.misCode ? scope.row.misCode : '-'}</span>
                                </el-tooltip>
                            )
                        }
                    }]
                },
                {
                    label: '',
                    fixed: true,
                    minWidth: '120',
                    showOverflowTooltip: true,
                    selfProp: 'loanCompanyName',
                    children: [{
                        prop: 'loanCompanyName',
                        minWidth: '120',
                        showOverflowTooltip: true,
                        label: '平台公司'
                    }]
                },
                {
                    prop: 'subsectionName',
                    label: '',
                    children: [{
                        label: '分部',
                        prop: 'subsectionName',
                        children: [
                            {
                                prop: 'subsectionName',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '合计'
                            }
                        ]
                    }]
                },
                {
                    label: '好信用-流贷',
                    children: [
                        {
                            label: '累计借款金额',
                            minWidth: '120',
                            prop: 'hxyLiquidityLoansAmount',
                            children: [{
                                prop: 'hxyLiquidityLoansAmount',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        },
                        {
                            label: '累计还款本金',
                            minWidth: '120',
                            prop: 'hxyLiquidityLoansPrincipalPaid',
                            children: [{
                                prop: 'hxyLiquidityLoansPrincipalPaid',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        },
                        {
                            label: '本金余额',
                            minWidth: '120',
                            prop: 'hxyLiquidityLoansOwedPrincipal',
                            children: [{
                                prop: 'hxyLiquidityLoansOwedPrincipal',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '好信用-敞口',
                    children: [
                        {
                            label: '累计敞口借款金额',
                            minWidth: '120',
                            prop: 'hxyExposureAmount',
                            children: [{
                                prop: 'hxyExposureAmount',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        },
                        {
                            label: '累计归还敞口',
                            minWidth: '120',
                            prop: 'hxyExposurePrincipalPaid',
                            children: [{
                                prop: 'hxyExposurePrincipalPaid',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        },
                        {
                            label: '剩余敞口',
                            minWidth: '150',
                            prop: 'hxyExposureOwedPrincipal',
                            children: [{
                                prop: 'hxyExposureOwedPrincipal',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '好信用-分授信',
                    children: [
                        {
                            label: '累计借款金额',
                            minWidth: '120',
                            prop: 'hxySeparateCreditAmount',
                            children: [{
                                prop: 'hxySeparateCreditAmount',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        },
                        {
                            label: '累计还款金额',
                            minWidth: '120',
                            prop: 'hxySeparateCreditPrincipalPaid',
                            children: [{
                                prop: 'hxySeparateCreditPrincipalPaid',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        },
                        {
                            label: '本金余额',
                            minWidth: '120',
                            prop: 'hxySeparateCreditOwedPrincipal',
                            children: [{
                                prop: 'hxySeparateCreditOwedPrincipal',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '供应链-流贷',
                    children: [
                        {
                            label: '供应链本金余额',
                            minWidth: '120',
                            prop: 'supplyChainLiquidityLoansOwedPrincipal',
                            children: [{
                                prop: 'supplyChainLiquidityLoansOwedPrincipal',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '好橙工',
                    children: [
                        {
                            label: '好橙工本金余额',
                            minWidth: '120',
                            prop: 'hcgOwedPrincipal',
                            children: [{
                                prop: 'hcgOwedPrincipal',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        },
                        {
                            label: '好橙工剩余敞口',
                            minWidth: '120',
                            prop: 'hcgRemainingExposure',
                            children: [{
                                prop: 'hcgRemainingExposure',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '流贷、敞口余额合计',
                    children: [
                        {
                            label: '流贷余额合计',
                            minWidth: '120',
                            prop: 'liquidityLoansOwedPrincipal',
                            children: [{
                                prop: 'liquidityLoansOwedPrincipal',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        },
                        {
                            label: '敞口余额合计',
                            minWidth: '120',
                            prop: 'remainingExposure',
                            children: [{
                                prop: 'remainingExposure',
                                displayAs: 'fundMoneyHaveSpot',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                label: '-'
                            }]
                        }
                    ]
                },
                {
                    label: '',
                    selfProp: 'balanceTotal',
                    prop: 'balanceTotal',
                    children: [{
                        prop: 'balanceTotal',
                        minWidth: '120',
                        showOverflowTooltip: true,
                        label: '余额总计',
                        children: [
                            {
                                prop: 'balanceTotal',
                                minWidth: '120',
                                showOverflowTooltip: true,
                                displayAs: 'fundMoneyHaveSpot',
                                label: '-'
                            }
                        ]
                    }]
                }
            ],
            // 流贷
            FlowToBorrow: [
                {
                    label: '',
                    minWidth: '120',
                    prop: 'account_remark',
                    selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                    children: [
                        {
                            prop: 'account_remark',
                            label: '备注',
                            minWidth: '120',
                            children: [
                                {
                                    prop: 'account_remark',
                                    label: '备注',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_remark ? scope.row.account_remark.substring(0, 6) + '...' : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-流贷备注信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, 'remarkDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_remark ? scope.row.account_remark.substring(0, 6) + '...' : '-'}</span>
                                    },
                                    minWidth: '120'
                                }
                            ]
                        }
                    ]
                },
                {
                    prop: 'account_standingBookNo',
                    fixed: true,
                    minWidth: '150',
                    label: '',
                    children: [
                        {
                            label: '台账编号',
                            prop: 'account_standingBookNo',
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'account_standingBookNo',
                                    label: '台账编号',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render ? <div>
                                            <el-tooltip effect="light" placement="top">
                                                <div
                                                    slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                    <br />借款单位：{scope.row.account_loanCompanyName}
                                                    <br />欠收本金：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                                <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                            </el-tooltip>
                                            <i class='el-icon-edit pointer' onClick={() => {
                                                this.getAccount(scope.row, `${this.product}-流贷基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, 'misDialogVisible')
                                            }}></i></div> : <el-tooltip effect="light" placement="top">
                                            <div
                                                slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                <br />借款单位：{scope.row.account_loanCompanyName}
                                                <br />欠收本金：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                            <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                        </el-tooltip>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '基础信息',
                    fixed: true,
                    minWidth: 340,
                    children: [
                        {
                            prop: 'account_misCode',
                            label: 'MIS编码',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'account_misCode',
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            prop: 'account_loanCompanyName',
                            label: '借款单位',
                            minWidth: '120',
                            children: [
                                {
                                    prop: 'account_loanCompanyName',
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            prop: 'account_subsectionName',
                            label: '分部',
                            minWidth: '120',
                            children: [
                                {
                                    prop: 'account_subsectionName',
                                    label: '合计',
                                    minWidth: '120'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '借款金额',
                            minWidth: '120',
                            prop: 'loan_loanAmount',
                            children: [
                                {
                                    prop: 'loan_loanAmount',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render ? <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}<i
                                            class='el-icon-edit pointer' onClick={() => {
                                                this.getLoan(scope.row, 'supplierDialogVisible', `${this.product}—流贷借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`)
                                            }}></i></span> : <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '供货商名称',
                            prop: 'loan_supplier',
                            minWidth: '120',
                            isHidden: false,
                            children: [
                                {
                                    prop: 'loan_supplier',
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span onClick={() => {
                                            this.tipsDialogVisible = true
                                            this.tipsDialogVisibleContent = scope.row.loan_supplier
                                        }}>{(scope.row.loan_supplier && scope.row.loan_supplier.length > 7) ? scope.row.loan_supplier.substr(0, 7) + '...' : (scope.row.loan_supplier ? scope.row.loan_supplier : '-')}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '还款方式',
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'loan_repaymentType',
                                    label: '-',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i
                                            class={
                                                scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_loanStartTime && scope.row.loan_yearRate !== null
                                                    ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                            onClick={ () => {
                                                this.getRespAccountRepaymentPlanData(scope.row, `${this.product}-流贷还款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, scope.row.account_id, 'AnnualInterestRateDialogVisible')
                                            }}></i></span>
                                            : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                                    },
                                    minWidth: '150'
                                }
                            ]
                        },
                        {
                            label: '年利率',
                            sort: 4,
                            minWidth: '100',
                            isHidden: true,
                            children: [
                                {
                                    prop: 'loan_yearRate',
                                    label: '-',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_yearRate ? `${scope.row.loan_yearRate}%` : '-'}</span>
                                    },
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '借款期限',
                            sort: 5,
                            minWidth: '100',
                            isHidden: true,
                            children: [
                                {
                                    prop: 'loan_loanDateNum',
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>
                                            {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                            {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                                        </span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '应收利息（正常+宽限）',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            minWidth: '160',
                            isHidden: true,
                            prop: 'paymentStatic_interestTotalAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_interestTotalAmount',
                                    label: '-',
                                    minWidth: '160',
                                    render: (h, scope) => {
                                        return <span>
                                            {filters.moneyFormat(
                                                this.$plus(scope.row.paymentStatic_interestAmount, scope.row.paymentStatic_graceInterestAmount), 2, false
                                            )}
                                            {scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal
                                                ? `(${(scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) > 0
                                                    ? '+' + (this.$plus(scope.row.paymentStatic_normalInterestPranayamaTotal, scope.row.paymentStatic_graceInterestPranayamaTotal))
                                                    : (this.$plus(scope.row.paymentStatic_normalInterestPranayamaTotal, scope.row.paymentStatic_graceInterestPranayamaTotal))})`
                                                : ''
                                            }
                                        </span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '放款日期',
                            sort: 7,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanStartTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_loanStartTime ? moment(scope.row.loan_loanStartTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanEndTime',
                                    showOverflowTooltip: true,
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '登记人',
                            sort: 9,
                            minWidth: '100',
                            isHidden: true,
                            children: [
                                {
                                    prop: 'loan_registrant',
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '还款账目',
                    children: [
                        {
                            label: '最新本金还款日',
                            prop: 'paymentStatic_capitalTime',
                            minWidth: '120',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalTime',
                                    showOverflowTooltip: true,
                                    displayAs: 'YYYY-MM-DD',
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '累计实收借款本金',
                            minWidth: '120',
                            prop: 'planList_0_capitalPaid',
                            isHidden: true,
                            children: [
                                {
                                    prop: 'planList_0_capitalPaid',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalPaid, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '欠收本金',
                            minWidth: '120',
                            prop: 'paymentStatic_capitalOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalOwe',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '宽限还款日',
                            minWidth: '100',
                            isHidden: true,
                            children: [
                                {
                                    prop: 'planList_0_graceTime',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    },
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            label: '累计应收正常利息',
                            minWidth: '120',
                            isHidden: true,
                            prop: 'paymentStatic_interestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_interestAmount',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestAmount, 2, false)}{scope.row.planList_0_normalInterestPranayama ? `(${scope.row.planList_0_normalInterestPranayama > 0 ? '+' + scope.row.planList_0_normalInterestPranayama : scope.row.planList_0_normalInterestPranayama})` : ''}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '最新正常利息还款日',
                            minWidth: '130',
                            isHidden: true,
                            prop: 'planList_0_interestTime',
                            children: [
                                {
                                    prop: 'planList_0_interestTime',
                                    showOverflowTooltip: true,
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_interestTime ? moment(scope.row.planList_0_interestTime).format('YYYY-MM-DD') : '-'}</span>
                                    },
                                    label: '-',
                                    minWidth: '130'
                                }
                            ]
                        },
                        {
                            label: '累计实收正常利息',
                            minWidth: '120',
                            isHidden: true,
                            prop: 'paymentStatic_interestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_interestPaid',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestPaid, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '欠收正常利息',
                            minWidth: '100',
                            isHidden: true,
                            prop: 'paymentStatic_interestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_interestOwe',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestOwe, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            minWidth: '150',
                            isHidden: true,
                            prop: 'paymentStatic_graceInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestAmount',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestAmount, 2, false)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                                    },
                                    label: '-',
                                    minWidth: '150'
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            minWidth: '150',
                            isHidden: true,
                            prop: 'paymentStatic_graceInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestPaid',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestPaid, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '150'
                                }
                            ]
                        },
                        {
                            label: '欠收宽限期利息',
                            minWidth: '120',
                            isHidden: true,
                            prop: 'paymentStatic_graceInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestOwe',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestOwe, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '逾期账目',
                    children: [
                        {
                            label: '是否逾期',
                            sort: 1,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'planList_0_isOverDue',
                                    label: '-',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                                    },
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '应收逾期罚息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            minWidth: '100',
                            isHidden: true,
                            prop: 'paymentStatic_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestAmount',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestAmount, 2, false)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '累计实收逾期罚息',
                            minWidth: '120',
                            isHidden: true,
                            prop: 'paymentStatic_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestPaid',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestPaid, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '欠收逾期罚息',
                            minWidth: '100',
                            isHidden: true,
                            prop: 'paymentStatic_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestOwe',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestOwe, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '',
                    selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                    minWidth: '100',
                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                    children: [
                        {
                            label: '手动调息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_FLOWTOBORROW_SHOW_LINE),
                            minWidth: '100',
                            prop: 'paymentStatic_normalInterestPranayamaTotal',
                            children: [
                                {
                                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i
                                                class='el-icon-edit pointer' onClick={ () => {
                                                    this.getRespAccountRepaymentPlanData(scope.row, `${this.product}-手动调息（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, scope.row.account_id, 'regulatingBreathingDialogVisible')
                                                }}></i></span>
                                            : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '',
                    prop: 'account_standingBookArchiveNo',
                    children: [
                        {
                            prop: 'account_standingBookArchiveNo',
                            label: '台账档案编号',
                            minWidth: '180',
                            children: [
                                {
                                    prop: 'account_standingBookArchiveNo',
                                    label: '-',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_FLOWTOBORROW_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-流贷档案信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, 'fileinfoDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                                    },
                                    minWidth: '180'
                                }
                            ]
                        }
                    ]
                }
            ],
            // 分授信
            PointsCredit: [
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                    label: '',
                    prop: 'account_remark',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'account_remark',
                            label: '备注',
                            showOverflowTooltip: true,
                            minWidth: '100',
                            children: [
                                {
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-分授信备注信息维护`, 'remarkDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}</span>
                                    },
                                    prop: 'account_remark',
                                    label: '备注-',
                                    showOverflowTooltip: true,
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    fixed: true,
                    prop: '台账编号',
                    minWidth: '150',
                    children: [
                        {
                            label: '台账编号',
                            children: [
                                {
                                    prop: 'account_standingBookNo',
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render ? <div>
                                            <el-tooltip effect="light" placement="top">
                                                <div
                                                    slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                    <br />借款单位：{scope.row.account_loanCompanyName}
                                                    <br />剩余本金：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                                <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                            </el-tooltip>
                                            <i class='el-icon-edit pointer' onClick={() => {
                                                this.getAccount(scope.row, `${this.product}-分授信基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, 'misDialogVisible')
                                            }}></i></div> : <div>
                                            <el-tooltip effect="light" placement="top">
                                                <div
                                                    slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                    <br />借款单位：{scope.row.account_loanCompanyName}
                                                    <br />剩余本金：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                                <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                            </el-tooltip>
                                        </div>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '基础信息',
                    fixed: true,
                    minWidth: '300',
                    children: [
                        {
                            prop: 'account_misCode',
                            label: 'MIS编码',
                            children: [
                                {
                                    prop: 'account_misCode',
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            prop: 'account_loanCompanyName',
                            label: '借款单位',
                            children: [
                                {
                                    prop: 'account_loanCompanyName',
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            prop: 'account_subsectionName',
                            label: '分部',
                            children: [
                                {
                                    prop: 'account_subsectionName',
                                    label: '合计',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '开票金额',
                            sort: 1,
                            minWidth: '150',
                            prop: 'loan_invoiceAmount',
                            children: [
                                {
                                    prop: 'loan_invoiceAmount',
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.loan_invoiceAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '开票日期',
                            sort: 2,
                            minWidth: '100',
                            prop: 'loan_invoiceTime',
                            children: [
                                {
                                    prop: 'loan_invoiceTime',
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_invoiceTime ? moment(scope.row.loan_invoiceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '供货商名称',
                            minWidth: '120',
                            children: [
                                {
                                    prop: 'loan_supplier',
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span onClick={() => {
                                            this.tipsDialogVisible = true
                                            this.tipsDialogVisibleContent = scope.row.loan_supplier
                                        }}>{(scope.row.loan_supplier && scope.row.loan_supplier.length > 7) ? scope.row.loan_supplier.substr(0, 7) + '...' : (scope.row.loan_supplier ? scope.row.loan_supplier : '-')}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '借款日期',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanStartTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_loanStartTime ? moment(scope.row.loan_loanStartTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '借款金额',
                            minWidth: '150',
                            prop: 'loan_loanAmount',
                            children: [
                                {
                                    prop: 'loan_loanAmount',
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render ? <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}<i
                                            class='el-icon-edit pointer' onClick={() => {
                                                this.getLoan(scope.row, 'pointsCreditBillingDialogVisible', `${this.product}-分授信借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`)
                                            }}></i></span> : <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '年利率',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_yearRate',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_yearRate ? `${scope.row.loan_yearRate}%` : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '借款期限',
                            sort: 7,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanDateType',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>
                                            {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                            {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                                        </span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanEndTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '还款方式',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_repaymentType',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i
                                            class={
                                                scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_loanStartTime && scope.row.loan_yearRate !== null
                                                    ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                            onClick={async () => {
                                                await this.getGrantPaymetPlanData(scope.row, 'repaymentDialogVisible')
                                            }}></i></span>
                                            : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '登记人',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_registrant',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '分授信还款账目总计',
                    children: [
                        {
                            label: '最新本金还款时间',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.paymentStatic_capitalTime ? moment(scope.row.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计已还本金',
                            minWidth: '100',
                            prop: 'paymentStatic_capitalPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余本金',
                            minWidth: '100',
                            prop: 'paymentStatic_capitalOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</span>
                                    },
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '应收利息（正常+宽限）',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            prop: 'paymentStatic_interestTotalAmount', // 自己算的
                            children: [
                                {
                                    prop: 'paymentStatic_interestTotalAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>
                                            {
                                                filters.moneyFormat(
                                                    this.$plus(scope.row.paymentStatic_interestTotalAmount, scope.row.paymentStatic_graceInterestAmount), 2, false
                                                )}
                                            {scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal
                                                ? `(${(scope.row.paymentStatic_normalInterestPranayamaTotal + scope.row.paymentStatic_graceInterestPranayamaTotal) > 0
                                                    ? '+' + (this.$plus(scope.row.paymentStatic_normalInterestPranayamaTotal, scope.row.paymentStatic_graceInterestPranayamaTotal))
                                                    : (this.$plus(scope.row.paymentStatic_normalInterestPranayamaTotal, scope.row.paymentStatic_graceInterestPranayamaTotal))})`
                                                : ''
                                            }
                                        </span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '累计应收正常利息',
                            prop: 'paymentStatic_interestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_interestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestAmount, 2, false)}{scope.row.paymentStatic_normalInterestPranayamaTotal ? `(${scope.row.paymentStatic_normalInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_normalInterestPranayamaTotal : scope.row.paymentStatic_normalInterestPranayamaTotal})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '最新正常利息还款时间',
                            children: [
                                {
                                    prop: 'paymentStatic_interestTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.paymentStatic_interestTime ? moment(scope.row.paymentStatic_interestTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收正常利息',
                            prop: 'paymentStatic_interestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_interestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余正常利息',
                            prop: 'paymentStatic_interestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_interestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_interestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            prop: 'paymentStatic_graceInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestAmount, 2, false)}{scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${scope.row.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_graceInterestPranayamaTotal : scope.row.paymentStatic_graceInterestPranayamaTotal})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            prop: 'paymentStatic_graceInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            minWidth: '120',
                            prop: 'paymentStatic_graceInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '累计应收逾期罚息',
                            minWidth: '120',
                            prop: 'paymentStatic_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestAmount, 2, false)}{scope.row.paymentStatic_overDueInterestPranayamaTotal ? `(${scope.row.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_overDueInterestPranayamaTotal : scope.row.paymentStatic_overDueInterestPranayamaTotal})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收逾期罚息',
                            prop: 'paymentStatic_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            minWidth: '100',
                            prop: 'paymentStatic_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '分授信还款账目明细',
                    children: [
                        {
                            label: '约定还款日期1',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'planList_0_endTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_endTime ? moment(scope.row.planList_0_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日1',
                            sort: 2,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'planList_0_graceTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款本金金额',
                            uniqueLabel: '约定还款本金金额1',
                            sort: 3,
                            prop: 'planList_0_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_0_capitalAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计还款本金金额',
                            uniqueLabel: '累计还款本金金额1',
                            prop: 'planList_0_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_0_capitalPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款本金金额',
                            uniqueLabel: '剩余还款本金金额1',
                            prop: 'planList_0_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_0_capitalOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            uniqueLabel: '应收正常利息1',
                            prop: 'planList_0_interestAmount',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'planList_0_interestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_interestAmount, 2, false)}{scope.row.planList_0_normalInterestPranayama ? `(${scope.row.planList_0_normalInterestPranayama > 0 ? '+' + scope.row.planList_0_normalInterestPranayama : scope.row.planList_0_normalInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计正常实收利息',
                            uniqueLabel: '累计正常实收利息1',
                            prop: 'planList_0_interestPaid',
                            children: [
                                {
                                    prop: 'planList_0_interestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_interestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余正常利息',
                            uniqueLabel: '剩余正常利息1',
                            prop: 'planList_0_interestOwe',
                            children: [
                                {
                                    prop: 'planList_0_interestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_interestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息1',
                            prop: 'planList_0_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestAmount, 2, false)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息1',
                            minWidth: '150',
                            prop: 'planList_0_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息1',
                            sort: 11,
                            minWidth: '150',
                            prop: 'planList_0_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期1',
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_0_isOverDue',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息1',
                            sort: 13,
                            minWidth: '150',
                            prop: 'planList_0_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestAmount, 2, false)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息1',
                            sort: 14,
                            minWidth: '150',
                            prop: 'planList_0_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息1',
                            sort: 15,
                            minWidth: '150',
                            prop: 'planList_0_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款日期2',
                            sort: 16,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_1_endTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_1_endTime ? moment(scope.row.planList_1_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日2',
                            sort: 17,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_1_graceTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_1_graceTime ? moment(scope.row.planList_1_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        // 约定还款日2
                        {
                            label: '约定还款本金金额',
                            uniqueLabel: '约定还款本金金额2',
                            sort: 18,
                            minWidth: '150',
                            prop: 'planList_1_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_1_capitalAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计还款本金金额',
                            uniqueLabel: '累计还款本金金额2',
                            sort: 19,
                            minWidth: '150',
                            prop: 'planList_1_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_1_capitalPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款本金金额',
                            uniqueLabel: '剩余还款本金金额2',
                            sort: 20,
                            minWidth: '150',
                            prop: 'planList_1_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_1_capitalOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            uniqueLabel: '应收正常利息2',
                            minWidth: '150',
                            prop: 'planList_1_interestAmount',
                            children: [
                                {
                                    prop: 'planList_1_interestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_interestAmount, 2, false)}{scope.row.planList_1_normalInterestPranayama ? `(${scope.row.planList_1_normalInterestPranayama > 0 ? '+' + scope.row.planList_1_normalInterestPranayama : scope.row.planList_1_normalInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计正常实收利息',
                            uniqueLabel: '累计正常实收利息2',
                            sort: 22,
                            minWidth: '150',
                            prop: 'planList_1_interestPaid',
                            children: [
                                {
                                    prop: 'planList_1_interestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_interestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余正常利息',
                            uniqueLabel: '剩余正常利息2',
                            sort: 23,
                            minWidth: '150',
                            prop: 'planList_1_interestOwe',
                            children: [
                                {
                                    prop: 'planList_1_interestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_interestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息2',
                            minWidth: '150',
                            prop: 'planList_1_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestAmount, 2, false)}{scope.row.planList_1_graceInterestPranayama ? `(${scope.row.planList_1_graceInterestPranayama > 0 ? '+' + scope.row.planList_1_graceInterestPranayama : scope.row.planList_1_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息2',
                            sort: 25,
                            minWidth: '150',
                            prop: 'planList_1_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息2',
                            sort: 26,
                            minWidth: '150',
                            prop: 'planList_1_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期2',
                            sort: 27,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_1_isOverDue',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_1_isOverDue ? 'red' : ''}>{scope.row.planList_1_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息2',
                            sort: 28,
                            minWidth: '150',
                            prop: 'planList_1_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestAmount, 2, false)}{scope.row.planList_1_overDueInterestPranayama ? `(${scope.row.planList_1_overDueInterestPranayama > 0 ? '+' + scope.row.planList_1_overDueInterestPranayama : scope.row.planList_1_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息2',
                            sort: 29,
                            minWidth: '150',
                            prop: 'planList_1_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息2',
                            sort: 30,
                            minWidth: '150',
                            prop: 'planList_1_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款日期3',
                            sort: 31,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_2_endTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_2_endTime ? moment(scope.row.planList_2_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限还款日',
                            uniqueLabel: '宽限还款日3',
                            sort: 32,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_2_graceTime',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_2_graceTime ? moment(scope.row.planList_2_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        // 约定还款日3
                        {
                            label: '约定还款本金金额',
                            uniqueLabel: '约定还款本金金额3',
                            sort: 33,
                            minWidth: '150',
                            prop: 'planList_2_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_2_capitalAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计还款本金金额',
                            uniqueLabel: '累计还款本金金额3',
                            sort: 34,
                            minWidth: '150',
                            prop: 'planList_2_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_2_capitalPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款本金金额',
                            uniqueLabel: '剩余还款本金金额3',
                            sort: 35,
                            minWidth: '150',
                            prop: 'planList_2_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_2_capitalOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收正常利息',
                            uniqueLabel: '应收正常利息3',
                            sort: 36,
                            minWidth: '150',
                            prop: 'planList_2_interestAmount',
                            children: [
                                {
                                    prop: 'planList_2_interestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_interestAmount, 2, false)}{scope.row.planList_2_normalInterestPranayama ? `(${scope.row.planList_2_normalInterestPranayama > 0 ? '+' + scope.row.planList_2_normalInterestPranayama : scope.row.planList_2_normalInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计正常实收利息',
                            uniqueLabel: '累计正常实收利息3',
                            sort: 37,
                            minWidth: '150',
                            prop: 'planList_2_interestPaid',
                            children: [
                                {
                                    prop: 'planList_2_interestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_interestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余正常利息',
                            uniqueLabel: '剩余正常利息3',
                            minWidth: '150',
                            prop: 'planList_2_interestOwe',
                            children: [
                                {
                                    prop: 'planList_2_interestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_interestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息3',
                            minWidth: '150',
                            prop: 'planList_2_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestAmount, 2, false)}{scope.row.planList_2_graceInterestPranayama ? `(${scope.row.planList_2_graceInterestPranayama > 0 ? '+' + scope.row.planList_2_graceInterestPranayama : scope.row.planList_2_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息3',
                            sort: 40,
                            minWidth: '150',
                            prop: 'planList_2_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息3',
                            sort: 41,
                            minWidth: '150',
                            prop: 'planList_2_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期3',
                            sort: 42,
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'planList_2_isOverDue',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_2_isOverDue ? 'red' : ''}>{scope.row.planList_2_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息3',
                            sort: 43,
                            minWidth: '150',
                            prop: 'planList_2_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestAmount',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestAmount, 2, false)}{scope.row.planList_2_overDueInterestPranayama ? `(${scope.row.planList_2_overDueInterestPranayama > 0 ? '+' + scope.row.planList_2_overDueInterestPranayama : scope.row.planList_2_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息3',
                            sort: 44,
                            minWidth: '150',
                            prop: 'planList_2_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestPaid',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息3',
                            sort: 45,
                            minWidth: '150',
                            prop: 'planList_2_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestOwe',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_POINTSCREDIT_SHOW_LINE),
                    label: '',
                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                    minWidth: '100',
                    children: [
                        {
                            prop: 'paymentStatic_normalInterestPranayamaTotal',
                            label: '手动调息',
                            showOverflowTooltip: true,
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i
                                                class='el-icon-edit pointer' onClick={async () => {
                                                    await this.getGrantPaymetPlanData(scope.row, 'regulatingBreathingDialogVisible')
                                                }}></i></span>
                                            : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    prop: 'account_standingBookArchiveNo',
                    label: '',
                    minWidth: '200',
                    children: [
                        {
                            prop: 'account_standingBookArchiveNo',
                            label: '台账档案编号',
                            showOverflowTooltip: true,
                            minWidth: '200',
                            children: [
                                {
                                    prop: 'account_standingBookArchiveNo',
                                    label: '-',
                                    showOverflowTooltip: true,
                                    minWidth: '200',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_POINTSCREDIT_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-分授信档案信息维护`, 'fileinfoDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            // 敞口
            Exposure: [
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                    label: '',
                    minWidth: '100',
                    prop: 'account_remark',
                    children: [
                        {
                            prop: 'account_remark',
                            showOverflowTooltip: true,
                            label: '备注',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'account_remark',
                                    showOverflowTooltip: true,
                                    label: '备注',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-敞口备注信息维护`, 'remarkDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_remark ? `${scope.row.account_remark.substring(0, 6)}...` : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    fixed: true,
                    prop: '台账编号',
                    minWidth: 100,
                    children: [
                        {
                            label: '台账编号',
                            children: [
                                {
                                    prop: 'account_standingBookNo',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render ? <div>
                                            <el-tooltip effect="light" placement="top">
                                                <div
                                                    slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                    <br />借款单位：{scope.row.account_loanCompanyName}
                                                    <br />剩余敞口：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                                <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                            </el-tooltip>
                                            <i class='el-icon-edit pointer' onClick={() => {
                                                this.getAccount(scope.row, `${this.product}-敞口基础信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`, 'misDialogVisible')
                                            }}></i></div> : <div>
                                            <el-tooltip effect="light" placement="top">
                                                <div
                                                    slot="content">台账编号：{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}
                                                    <br />借款单位：{scope.row.account_loanCompanyName}
                                                    <br />剩余敞口：{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</div>
                                                <span>{scope.row.account_standingBookNo ? scope.row.account_standingBookNo : '-'}</span>
                                            </el-tooltip>
                                        </div>
                                    },
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '基础信息',
                    minWidth: '300',
                    fixed: true,
                    children: [
                        {
                            prop: 'account_misCode',
                            label: 'MIS编码',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'account_misCode',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            prop: 'account_loanCompanyName',
                            label: '借款单位',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'account_loanCompanyName',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            prop: 'account_subsectionName',
                            label: '分部',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'account_subsectionName',
                                    showOverflowTooltip: true,
                                    label: '合计',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '借款账目',
                    children: [
                        {
                            label: '开票金额',
                            minWidth: '120',
                            prop: 'loan_invoiceAmount',
                            children: [
                                {
                                    prop: 'loan_invoiceAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.loan_invoiceAmount, 2, false)}</span>
                                    },
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '开票日期',
                            sort: 2,
                            minWidth: '100',
                            prop: 'loan_invoiceTime',
                            children: [
                                {
                                    prop: 'loan_invoiceTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_invoiceTime ? moment(scope.row.loan_invoiceTime).format('YYYY-MM-DD') : '-'}</span>
                                    },
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '供货商名称',
                            minWidth: '120',
                            prop: 'loan_supplier',
                            children: [
                                {
                                    prop: 'loan_supplier',
                                    render: (h, scope) => {
                                        return <span
                                            className='loan-supplier' onClick={() => {
                                                this.tipsDialogVisible = true
                                                this.tipsDialogVisibleContent = scope.row.loan_supplier
                                            }}>{(scope.row.loan_supplier && scope.row.loan_supplier.length > 7) ? scope.row.loan_supplier.substr(0, 7) + '...' : (scope.row.loan_supplier ? scope.row.loan_supplier : '-')}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '保证金比例',
                            sort: 4,
                            minWidth: '100',
                            prop: 'loan_depositProportion',
                            children: [
                                {
                                    prop: 'loan_depositProportion',
                                    showOverflowTooltip: true,
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_depositProportion ? `${scope.row.loan_depositProportion}%` : '-'}</span>
                                    },
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        },
                        {
                            label: '保证金缴纳',
                            minWidth: '120',
                            prop: 'loan_depositPay',
                            children: [
                                {
                                    prop: 'loan_depositPay',
                                    showOverflowTooltip: true,
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.loan_depositPay, 2, false)}</span>
                                    },
                                    label: '-',
                                    minWidth: '120'
                                }
                            ]
                        },
                        {
                            label: '敞口金额',
                            minWidth: '120',
                            prop: 'loan_loanAmount',
                            children: [
                                {
                                    prop: 'loan_loanAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render ? <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}<i
                                            class='el-icon-edit pointer' onClick={() => {
                                                this.getLoan(scope.row, 'billingDialogVisible', `${this.product}-敞口借款信息维护（${scope.row.account_standingBookNo} ${scope.row.account_loanCompanyName}）`)
                                            }}></i></span> : <span>{filters.moneyFormat(scope.row.loan_loanAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '承兑期限',
                            minWidth: '100',
                            children: [
                                {
                                    prop: 'loan_loanDateType',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>
                                            {scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}
                                            {scope.row.loan_loanDateType == 1 ? '个月' : scope.row.loan_loanDateType == 2 ? '天' : ''}
                                        </span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '到期日',
                            sort: 8,
                            minWidth: '150',
                            prop: 'loan_loanEndTime',
                            children: [
                                {
                                    prop: 'loan_loanEndTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.loan_loanEndTime ? moment(scope.row.loan_loanEndTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '还款方式',
                            sort: 9,
                            minWidth: '150',
                            prop: 'loan_repaymentType',
                            children: [
                                {
                                    prop: 'loan_repaymentType',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render ? <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}<i class={scope.row.loan_loanAmount && scope.row.loan_loanDateNum && scope.row.loan_invoiceTime
                                            ? 'el-icon-edit pointer' : 'el-icon-edit pointer hidden'}
                                        onClick={async () => {
                                            await this.getGrantPaymetPlanData(scope.row, 'repaymentDialogVisible')
                                        }}></i></span>
                                            : <span>{scope.row.loan_repaymentType == 1 ? '一次性还款' : '334还款'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            prop: 'loan_registrant',
                            label: '登记人',
                            sort: 10,
                            width: '150',
                            children: [
                                {
                                    prop: 'loan_registrant',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '敞口还款账目总计',
                    children: [
                        {
                            label: '最新还款时间',
                            sort: 1,
                            width: '150',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{scope.row.paymentStatic_capitalTime ? moment(scope.row.paymentStatic_capitalTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计已还敞口本金',
                            minWidth: '150',
                            prop: 'paymentStatic_capitalPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余敞口',
                            sort: 3,
                            minWidth: '150',
                            prop: 'paymentStatic_capitalOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_capitalOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计应收宽限期利息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 4,
                            minWidth: '150',
                            prop: 'paymentStatic_graceInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestAmount, 2, false)}{scope.row.paymentStatic_graceInterestPranayamaTotal ? `(${scope.row.paymentStatic_graceInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_graceInterestPranayamaTotal : scope.row.paymentStatic_graceInterestPranayamaTotal})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            sort: 5,
                            minWidth: '150',
                            prop: 'paymentStatic_graceInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            sort: 6,
                            minWidth: '150',
                            prop: 'paymentStatic_graceInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_graceInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计应收逾期罚息',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            sort: 7,
                            minWidth: '150',
                            prop: 'paymentStatic_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestAmount, 2, false)}{scope.row.paymentStatic_overDueInterestPranayamaTotal ? `(${scope.row.paymentStatic_overDueInterestPranayamaTotal > 0 ? '+' + scope.row.paymentStatic_overDueInterestPranayamaTotal : scope.row.paymentStatic_overDueInterestPranayamaTotal})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收逾期罚息',
                            sort: 8,
                            minWidth: '150',
                            prop: 'paymentStatic_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            sort: 9,
                            minWidth: '150',
                            prop: 'paymentStatic_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'paymentStatic_overDueInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.paymentStatic_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '敞口还款账目明细',
                    children: [
                        {
                            label: '约定还款日期1',
                            minWidth: '150',
                            prop: 'planList_0_endTime',
                            children: [
                                {
                                    prop: 'planList_0_endTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_endTime ? moment(scope.row.planList_0_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日1',
                            minWidth: '150',
                            prop: 'planList_0_graceTime',
                            children: [
                                {
                                    prop: 'planList_0_graceTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_0_graceTime ? moment(scope.row.planList_0_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额1',
                            minWidth: '150',
                            prop: 'planList_0_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_0_capitalOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期1',
                            minWidth: '100',
                            prop: 'planList_0_isOverDue',
                            children: [
                                {
                                    prop: 'planList_0_isOverDue',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_0_isOverDue ? 'red' : ''}>{scope.row.planList_0_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额1',
                            minWidth: '100',
                            prop: 'planList_0_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_0_capitalAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额1',
                            minWidth: '150',
                            prop: 'planList_0_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_0_capitalPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息1',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            minWidth: '120',
                            prop: 'planList_0_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestAmount, 2, false)}{scope.row.planList_0_graceInterestPranayama ? `(${scope.row.planList_0_graceInterestPranayama > 0 ? '+' + scope.row.planList_0_graceInterestPranayama : scope.row.planList_0_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息1',
                            minWidth: '150',
                            prop: 'planList_0_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息1',
                            minWidth: '120',
                            prop: 'planList_0_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_0_graceInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息1',
                            minWidth: '120',
                            prop: 'planList_0_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestAmount, 2, false)}{scope.row.planList_0_overDueInterestPranayama ? `(${scope.row.planList_0_overDueInterestPranayama > 0 ? '+' + scope.row.planList_0_overDueInterestPranayama : scope.row.planList_0_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息1',
                            minWidth: '120',
                            prop: 'planList_0_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息1',
                            sort: 12,
                            minWidth: '120',
                            prop: 'planList_0_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_0_overDueInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_0_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日2',
                            sort: 14,
                            minWidth: '120',
                            prop: 'planList_1_graceTime',
                            children: [
                                {
                                    prop: 'planList_1_graceTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_1_graceTime ? moment(scope.row.planList_1_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款日期2',
                            minWidth: '120',
                            prop: 'planList_1_endTime',
                            children: [
                                {
                                    prop: 'planList_1_endTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_1_endTime ? moment(scope.row.planList_1_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        // 约定日期2
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额2',
                            minWidth: '120',
                            prop: 'planList_1_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_1_capitalAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额2',
                            sort: 16,
                            minWidth: '150',
                            prop: 'planList_1_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_1_capitalPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额2',
                            minWidth: '120',
                            prop: 'planList_1_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_1_capitalOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息2',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            minWidth: '150',
                            prop: 'planList_1_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestAmount, 2, false)}{scope.row.planList_1_graceInterestPranayama ? `(${scope.row.planList_1_graceInterestPranayama > 0 ? '+' + scope.row.planList_1_graceInterestPranayama : scope.row.planList_1_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息2',
                            minWidth: '150',
                            prop: 'planList_1_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息2',
                            minWidth: '120',
                            prop: 'planList_1_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_1_graceInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期2',
                            minWidth: '150',
                            prop: 'planList_1_isOverDue',
                            children: [
                                {
                                    prop: 'planList_1_isOverDue',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_1_isOverDue ? 'red' : ''}>{scope.row.planList_1_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息2',
                            prop: 'planList_1_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestAmount, 2, false)}{scope.row.planList_1_overDueInterestPranayama ? `(${scope.row.planList_1_overDueInterestPranayama > 0 ? '+' + scope.row.planList_1_overDueInterestPranayama : scope.row.planList_1_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息2',
                            sort: 23,
                            prop: 'planList_1_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息2',
                            prop: 'planList_1_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_1_overDueInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_1_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '约定还款日期3',
                            prop: 'planList_2_endTime',
                            children: [
                                {
                                    prop: 'planList_2_endTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_2_endTime ? moment(scope.row.planList_2_endTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '宽限到期日',
                            uniqueLabel: '宽限到期日3',
                            minWidth: '120',
                            prop: 'planList_2_graceTime',
                            children: [
                                {
                                    prop: 'planList_2_graceTime',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{scope.row.planList_2_graceTime ? moment(scope.row.planList_2_graceTime).format('YYYY-MM-DD') : '-'}</span>
                                    }
                                }
                            ]
                        },
                        // 约定日期3
                        {
                            label: '约定还款金额',
                            uniqueLabel: '约定还款金额3',
                            prop: 'planList_2_capitalAmount',
                            children: [
                                {
                                    prop: 'planList_2_capitalAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalAmount, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实际还款本金金额',
                            uniqueLabel: '累计实际还款本金金额3',
                            minWidth: '150',
                            prop: 'planList_2_capitalPaid',
                            children: [
                                {
                                    prop: 'planList_2_capitalPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余还款金额',
                            uniqueLabel: '剩余还款金额3',
                            minWidth: '120',
                            prop: 'planList_2_capitalOwe',
                            children: [
                                {
                                    prop: 'planList_2_capitalOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_capitalOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '是否逾期',
                            uniqueLabel: '是否逾期3',
                            minWidth: '100',
                            prop: 'planList_2_isOverDue',
                            children: [
                                {
                                    prop: 'planList_2_isOverDue',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '100',
                                    render: (h, scope) => {
                                        return <span
                                            class={scope.row.planList_2_isOverDue ? 'red' : ''}>{scope.row.planList_2_isOverDue ? '是' : '否'}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '应收宽限期利息',
                            uniqueLabel: '应收宽限期利息3',
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            minWidth: '150',
                            prop: 'planList_2_graceInterestAmount',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestAmount, 2, false)}{scope.row.planList_2_graceInterestPranayama ? `(${scope.row.planList_2_graceInterestPranayama > 0 ? '+' + scope.row.planList_2_graceInterestPranayama : scope.row.planList_2_graceInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '累计实收宽限期利息',
                            uniqueLabel: '累计实收宽限期利息3',
                            minWidth: '150',
                            prop: 'planList_2_graceInterestPaid',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余宽限期利息',
                            uniqueLabel: '剩余宽限期利息3',
                            minWidth: '120',
                            prop: 'planList_2_graceInterestOwe',
                            children: [
                                {
                                    prop: 'planList_2_graceInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_graceInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                            label: '应缴逾期罚息',
                            uniqueLabel: '应缴逾期罚息3',
                            minWidth: '120',
                            prop: 'planList_2_overDueInterestAmount',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestAmount',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestAmount, 2, false)}{scope.row.planList_2_overDueInterestPranayama ? `(${scope.row.planList_2_overDueInterestPranayama > 0 ? '+' + scope.row.planList_2_overDueInterestPranayama : scope.row.planList_2_overDueInterestPranayama})` : ''}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '实缴逾期罚息',
                            uniqueLabel: '实缴逾期罚息3',
                            minWidth: '120',
                            prop: 'planList_2_overDueInterestPaid',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestPaid',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestPaid, 2, false)}</span>
                                    }
                                }
                            ]
                        },
                        {
                            label: '剩余逾期罚息',
                            uniqueLabel: '剩余逾期罚息3',
                            minWidth: '120',
                            prop: 'planList_2_overDueInterestOwe',
                            children: [
                                {
                                    prop: 'planList_2_overDueInterestOwe',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '120',
                                    render: (h, scope) => {
                                        return <span>{filters.moneyFormat(scope.row.planList_2_overDueInterestOwe, 2, false)}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    selfSettingHidden: this.hosAuthCheck(WISDOM_EXPOSURE_SHOW_LINE),
                    label: '',
                    minWidth: '150',
                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                    children: [
                        {
                            prop: 'paymentStatic_normalInterestPranayamaTotal',
                            showOverflowTooltip: true,
                            label: '手动调息',
                            minWidth: '150',
                            children: [
                                {
                                    prop: 'paymentStatic_normalInterestPranayamaTotal',
                                    showOverflowTooltip: true,
                                    label: '-',
                                    minWidth: '150',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}<i
                                                class='el-icon-edit pointer' onClick={async () => {
                                                    await this.getGrantPaymetPlanData(scope.row, 'regulatingBreathingDialogVisible', true)
                                                }}></i></span>
                                            : <span>{(scope.row.paymentStatic_normalInterestPranayamaTotal || scope.row.paymentStatic_graceInterestPranayamaTotal || scope.row.paymentStatic_overDueInterestPranayamaTotal) ? '已调息' : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '',
                    minWidth: '200',
                    prop: 'account_standingBookArchiveNo',
                    children: [
                        {
                            prop: 'account_standingBookArchiveNo',
                            showOverflowTooltip: true,
                            label: '台账档案编号',
                            minWidth: '200',
                            children: [
                                {
                                    prop: 'account_standingBookArchiveNo',
                                    showOverflowTooltip: true,
                                    label: '台账档案编号',
                                    minWidth: '200',
                                    render: (h, scope) => {
                                        let render = this.hosAuthCheck(WISDOM_EXPOSURE_FUNDSDATA_UPDATA)
                                        return render
                                            ? <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}<i
                                                class='el-icon-edit pointer' onClick={() => {
                                                    this.getAccount(scope.row, `${this.product}-敞口基础信息维护`, 'fileinfoDialogVisible')
                                                }}></i></span>
                                            : <span>{scope.row.account_standingBookArchiveNo ? scope.row.account_standingBookArchiveNo.substring(0, 6) + '...' : '-'}</span>
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            // 还款明细表
            ReimbursementDetail: [
                {
                    prop: 'standingBookNo',
                    label: '台账编号',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'standingBookNo',
                            label: '合计'
                        }
                    ]
                },
                {
                    prop: 'misCode',
                    label: 'MIS编码',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'misCode',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'loanCompanyName',
                    label: '平台公司',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'loanCompanyName',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'subsectionName',
                    label: '分部',
                    showOverflowTooltip: true,
                    children: [
                        {
                            prop: 'subsectionName',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'createBy',
                    label: '登记人',
                    children: [
                        {
                            prop: 'createBy',
                            label: '-'
                        }
                    ]
                },
                {
                    label: '还款项目',
                    children: [
                        {
                            prop: 'accountType',
                            render: (h, scope) => {
                                return <span>{
                                    scope.row.accountType == 1 ? (scope.row.type == 1 ? '还借款本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息')
                                        : scope.row.accountType == 2 ? (scope.row.type == 1 ? '还敞口本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息')
                                            : scope.row.accountType == 3 ? (scope.row.type == 1 ? '还借款本金' : scope.row.type == 2 ? '还借款利息' : scope.row.type == 3 ? '还宽限期利息' : '还逾期罚息') : '-'
                                }</span>
                            },
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'repaymentStatusName', // 后台转换过
                    label: '还款状态',
                    children: [
                        {
                            prop: 'repaymentStatusName',
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'paidTime',
                    label: '还款日期',
                    children: [
                        {
                            prop: 'paidTime',
                            render: (h, scope) => {
                                return <span>{scope.row.paidTime ? moment(scope.row.paidTime).format('YYYY-MM-DD') : '-'}</span>
                            },
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'paidAmount',
                    label: '还款金额',
                    children: [
                        {
                            prop: 'paidAmount',
                            render: (h, scope) => {
                                return <span>{filters.moneyFormat(scope.row.paidAmount, 2, false)}</span>
                            },
                            label: '-'
                        }
                    ]
                },
                {
                    prop: 'shouldRepayTime',
                    label: '应还款日期',
                    children: [
                        {
                            prop: 'shouldRepayTime',
                            render: (h, scope) => {
                                return <span>{scope.row.shouldRepayTime ? moment(scope.row.shouldRepayTime).format('YYYY-MM-DD') : '-'}</span>
                            },
                            label: '-'
                        }
                    ]
                }
            ],
            column: [],
            isShowParent: true
        }
    },
    methods: {
        totalColumnTotalDo (tableName, tableDataTotal, more) {
            let newTableDataTotal = { ...tableDataTotal }
            if (more) {
                newTableDataTotal = {}
                for (const key in tableDataTotal.loan) {
                    newTableDataTotal['loan_' + key] = tableDataTotal.loan[key]
                }
                for (const key in tableDataTotal.paymentStatic) {
                    newTableDataTotal['paymentStatic_' + key] = tableDataTotal.paymentStatic[key]
                }
                tableDataTotal.planList.forEach((value, index) => {
                    for (const key in value) {
                        let newKey = 'planList_' + index + '_' + key
                        newTableDataTotal[newKey] = value[key]
                    }
                })
            }
            this[tableName].forEach((value) => {
                value.children.forEach((val) => {
                    if (newTableDataTotal[val.prop || val.selfProp] !== null && newTableDataTotal[val.prop || val.selfProp] !== undefined) {
                        if (val.children) {
                            val.children[0].label = String(filters.moneyFormat(newTableDataTotal[val.prop || val.selfProp], 2, false))
                        } else { // 合计有3行和2行的 （重构有帮助）
                            val.label = String(filters.moneyFormat(newTableDataTotal[val.prop || val.selfProp], 2, false))
                        }
                    } else {
                        if (val.children) {
                            if (val.children[0].label !== '合计') {
                                val.children[0].label = '-'
                            }
                        } else if (tableName === 'ReimbursementDetail') {
                            if (val.label !== '合计') {
                                val.label = '-'
                            }
                        }
                    }
                })
            })
            this.$set(this, 'column', this[tableName])
        },
        onLook (val) {
            this.$refs.allDialog.findDetail(val)
        },
        async getList (val) {
            this.$emit('getList', val)
        },
        // 基本信息
        async getAccount (row, title, type) {
            console.log('row, title, type: ', row, title, type)
            const accountId = row.account_id || row.accountId
            const { data } = await getAccountBasic(accountId)
            this.accountData = { ...this.accountData, ...data, title }
            this.$set(this.accountData, 'selectName', data.loanCompanyName)
            this.$set(this.accountData, 'selectCode', data.loanCompanyCode)
            this[`${type}`] = true
        },
        // 借款信息
        async getLoan (row, type, title) {
            console.log('row, type, title: ', row, type, title)
            const { data } = await getLoan(row.loan_id)
            this.loanData = {
                ...this.loanData,
                ...data,
                title,
                loanDateNumM: '',
                loanDateNumD: '',
                registrant: this.userInfo.employeeName
            }
            this[`${type}`] = true
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
        async getRespAccountRepaymentPlanData (row, title, id, type) {
            console.log(title)
            const { data } = await getRespAccountRepaymentPlan(row.account_id)
            this.respAccountRepaymentPlanData = data
            this.$set(this.respAccountRepaymentPlanData[0], 'title', title)
            this.respAccountRepaymentPlanData[0].accountId = id
            this.regulatingBreathingDialogData = JSON.parse(JSON.stringify(this.respAccountRepaymentPlanData))
            this[`${type}`] = true
        },
        // 敞口和分授信还款
        async getGrantPaymetPlanData (row, type, isShow = false) {
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
            isShow && this.$set(this.rowData[0], 'regulatingBreathingType', isShow) // 敞口无正常利息
            this.regulatingBreathingDialogData = JSON.parse(JSON.stringify(this.rowData))
            // 重新保留一份数据
            this.copyGrantdata = [...this.rowData]
            // 是否需要增加计息---
            this[`${type}`] = true
        },
        // 重置
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

/deep/ .pointer {
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
    color:#FF7A45
}

// // 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-color: rgba(33, 37, 43, 0.26);
}

// 台账专属表格样式
/deep/ .el-table td,
/deep/ .el-table th {
    padding: 7px 0;
}
.max-height {
    display: block;
    margin: 20px auto;
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
    min-height: 100px;
}
</style>
