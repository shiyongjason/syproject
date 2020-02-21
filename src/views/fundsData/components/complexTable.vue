<template>
    <div class="page-body">
        <div class="page-table">
            <hosJoyTable v-if="changeTable" ref="hosjoyTable" align="center" border stripe showPagination :column="column" :data="tableData" :total="pagination.total" :pageNumber.sync="pagination.pageNumber" :pageSize.sync="pagination.pageSize" @pagination="getList">
            </hosJoyTable>
        </div>
        <!-- 基本信息Dialog -台账编号 -->
        <misDialog :detailData='accountData' v-if='accountData' :dialogVisible='misDialogVisible' @onClose="misDialogVisible=false" @reload='getList' />
        <!-- 基本信息Dialog -资金档案编号 -->
        <fileInfoDialog :detailData='rowData' v-if='rowData&&fileinfoDialogVisible' :dialogVisible='fileinfoDialogVisible' @onClose="fileinfoDialogVisible=false" @reload='getList' />
        <!-- 基本信息Dialog -备注 -->
        <remarkDialog :detailData='rowData' v-if='rowData&&remarkDialogVisible' :dialogVisible='remarkDialogVisible' @onClose="remarkDialogVisible=false" @reload='getList' />

        <!-- 借款Dialog -流贷 -->
        <supplierDialog :detailData='loanData' v-if='loanData&&supplierDialogVisible' :dialogVisible='supplierDialogVisible' @onClose="supplierDialogVisible=false" @reload='getList' />
        <!-- 借款Dialog -分授信 -->
        <pointsCreditBillingDialog :detailData='loanData' v-if='loanData&&pointsCreditBillingDialogVisible' :dialogVisible='pointsCreditBillingDialogVisible' @onClose="pointsCreditBillingDialogVisible=false" @reload='getList' />
        <!-- 借款Dialog -敞口 -->
        <billingDialog :detailData='loanData' v-if='loanData&&billingDialogVisible' :dialogVisible='billingDialogVisible' @onClose="billingDialogVisible=false" @reload='getList' />
        <!-- 还款Dialog -流贷 -->
        <AnnualInterestRateDialog :detailData='respAccountRepaymentPlanData' v-if='respAccountRepaymentPlanData&&AnnualInterestRateDialogVisible' :dialogVisible='AnnualInterestRateDialogVisible' @onClose="AnnualInterestRateDialogVisible=false" @reload='getList' />
        <!-- 还款方式Dialog -->
        <repaymentDialog :detailData='rowData' v-if='rowData&&repaymentDialogVisible' :dialogVisible='repaymentDialogVisible' @onClose="repaymentDialogVisible=false" @reload='getList' @repaymentTypeChange="onRepaymentTypeChange" />
        <!-- 开票日期Dialog-分授信Credit -->
        <pointsCreditBillingDialog :detailData='rowData' v-if='rowData&&pointsCreditBillingDialogVisible' :dialogVisible='pointsCreditBillingDialogVisible' @onClose="pointsCreditBillingDialogVisible=false" @reload='getList' />
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import remarkDialog from './dialog/remarkDialog.vue'
import fileInfoDialog from './dialog/fileInfoDialog.vue'
import misDialog from './dialog/misDialog.vue'
import supplierDialog from './dialog/supplierDialog.vue'
import AnnualInterestRateDialog from './dialog/AnnualInterestRateDialog.vue'
import billingDialog from './dialog/billingDialog.vue'
import repaymentDialog from './dialog/repaymentDialog.vue'
import pointsCreditBillingDialog from './dialog/pointsCreditBillingDialog.vue'
import { getAccountBasic, getLoan, getRespAccountRepaymentPlan } from '../api/index'
import moment from 'moment'
export default {
    name: 'complexTable',
    components: { hosJoyTable, remarkDialog, fileInfoDialog, misDialog, supplierDialog, AnnualInterestRateDialog, billingDialog, repaymentDialog, pointsCreditBillingDialog },
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
        pagination: {
            type: Object,
            default: function () {
                return { pageNumber: 1, pageSize: 10, total: 0 }
            }

        }
    },
    watch: {
        source (val) {
            if (val == '1') this.$set(this, 'column', this.FlowToBorrow)
            if (val == '2') this.$set(this, 'column', this.Exposure)
            if (val == '3') this.$set(this, 'column', this.PointsCredit)
            if (val == '4') this.$set(this, 'column', this.ReimbursementDetail)
            this.changeTable = false
            this.$nextTick(() => { this.changeTable = true })
        }
    },
    data: function () {
        return {
            planListItem: {},
            remarkDialogVisible: false,
            fileinfoDialogVisible: false,
            misDialogVisible: false,
            supplierDialogVisible: false,
            AnnualInterestRateDialogVisible: false,
            billingDialogVisible: false,
            repaymentDialogVisible: false,
            pointsCreditBillingDialogVisible: false,
            sizes: [10, 20, 50, 100],
            rowData: null,
            accountData: {},
            loanData: {},
            respAccountRepaymentPlanData: null,
            // 流贷
            FlowToBorrow: [
                {
                    label: '基础信息',
                    children: [
                        {
                            prop: 'account_standingBookNo',
                            label: '台账编号',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getAccount(scope.row)
                                    this.accountData.title = '好信用—流贷基础信息维护'
                                    this.misDialogVisible = true
                                }}></i></span>
                            }
                        },
                        { prop: 'account_misCode', label: 'MIS编码', width: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', width: '150' },
                        { prop: 'account_subsectionName', label: '分部', width: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.FlowBorrowingBooks) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'loan_loanAmount',
                            label: '借款金额',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanAmount == 0 ? 0 : scope.row.loan_loanAmount ? `${scope.row.loan_loanAmount}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getLoan(scope.row)
                                    this.loanData.title = '好信用—流贷借款信息维护'
                                    this.supplierDialogVisible = true
                                }}></i></span>
                            }
                        },
                        {
                            prop: 'loan_repaymentType',
                            label: '还款方式',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}%` : '-'}<i class='el-icon-edit pointer' onClick={async () => {
                                    await this.getRespAccountRepaymentPlanData(scope.row)
                                    this.respAccountRepaymentPlanData[0].title = '好信用—流贷还款信息维护'
                                    this.AnnualInterestRateDialogVisible = true
                                }}></i></span>
                            }
                        },
                        {
                            prop: 'loan_loanStartTime',
                            label: '放款日期',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanStartTime == 0 ? 0 : scope.row.loan_loanStartTime ? `${scope.row.loan_loanStartTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_loanEndTime',
                            label: '到期日',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanEndTime == 0 ? 0 : scope.row.loan_loanEndTime ? `${scope.row.loan_loanEndTime}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '还款账目',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.FlowRepaymentAccount) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'planList_0_capitalTime',
                            label: '最新本金还款日',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_capitalTime == 0 ? 0 : scope.row.planList_0_capitalTime ? `${scope.row.planList_0_capitalTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_0_capitalOwe',
                            label: '欠收本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_capitalOwe == 0 ? 0 : scope.row.planList_0_capitalOwe ? `${scope.row.planList_0_capitalOwe}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '逾期账目',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.FlowOverdueAccounts) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    prop: 'account_standingBookArchiveNo',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getAccount(scope.row)
                            this.rowData = scope.row
                            this.rowData.title = '好信用—流贷档案信息维护'
                            this.fileinfoDialogVisible = true
                        }}></i></span>
                    }
                },
                {
                    prop: 'account_remark',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_remark == 0 ? 0 : scope.row.account_remark ? `${scope.row.account_remark}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—流贷备注信息维护'; this.remarkDialogVisible = true }}></i></span>
                    }
                }
            ],
            // 分授信
            PointsCredit: [
                {
                    label: '基础信息',
                    children: [
                        {
                            prop: 'account_standingBookNo',
                            label: '台账编号',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getAccount(scope.row)
                                    this.accountData.title = '好信用—分授信基础信息维护'
                                    this.misDialogVisible = true
                                }}></i></span>
                            }
                        },
                        { prop: 'account_misCode', label: 'MIS编码', width: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', width: '150' },
                        { prop: 'account_subsectionName', label: '分部', width: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.PointsBorrowingBooks) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'loan_invoiceAmount',
                            label: '开票金额',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_invoiceAmount == 0 ? 0 : scope.row.loan_invoiceAmount ? `${scope.row.loan_invoiceAmount}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_invoiceTime',
                            label: '开票日期',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_invoiceTime}</span>
                            }
                        },
                        {
                            prop: 'loan_supplier',
                            label: '供货商名称',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_supplier == 0 ? 0 : scope.row.loan_supplier ? `${scope.row.loan_supplier}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_loanStartTime',
                            label: '放款日期',
                            sort: 4,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanStartTime == 0 ? 0 : scope.row.loan_loanStartTime ? `${scope.row.loan_loanStartTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_loanAmount',
                            label: '借款金额',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanAmount == 0 ? 0 : scope.row.loan_loanAmount ? `${scope.row.loan_loanAmount}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getLoan(scope.row)
                                    this.loanData.title = '好信用—分授信借款信息维护'
                                    this.pointsCreditBillingDialogVisible = true
                                }}></i></span>
                            }
                        },
                        {
                            prop: 'loan_loanEndTime',
                            label: '到期日',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_loanEndTime == 0 ? 0 : scope.row.loan_loanEndTime ? `${scope.row.loan_loanEndTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_repaymentType',
                            label: '还款方式',
                            sort: 9,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                                    this.rowData = scope.row
                                    this.rowData.title = '好信用—分授信还款信息维护'
                                    this.repaymentDialogVisible = true
                                }}></i></span>
                            }
                        }
                    ]
                },
                {
                    label: '分授信还款账目总计',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.PointsRepaymentAccount) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'paymentStatic_capitalOwe',
                            label: '剩余本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_capitalOwe == 0 ? 0 : scope.row.paymentStatic_capitalOwe ? `${scope.row.paymentStatic_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'paymentStatic_interestOwe',
                            label: '剩余利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_interestOwe == 0 ? 0 : scope.row.paymentStatic_interestOwe ? `${scope.row.paymentStatic_interestOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'paymentStatic_overDueInterestOwe',
                            label: '剩余逾期罚息',
                            sort: 10,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_overDueInterestOwe == 0 ? 0 : scope.row.paymentStatic_overDueInterestOwe ? `${scope.row.paymentStatic_overDueInterestOwe}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '分授信还款账目明细',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.PointsRCDetail) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'planList_0_endTime',
                            label: '约定还款日期1',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_endTime == 0 ? 0 : scope.row.planList_0_endTime ? `${scope.row.planList_0_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_0_capitalOwe',
                            label: '剩余还款本金金额',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_capitalOwe == 0 ? 0 : scope.row.planList_0_capitalOwe ? `${scope.row.planList_0_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_0_interestPaid',
                            label: '累计正常实收利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_interestPaid == 0 ? 0 : scope.row.planList_0_interestPaid ? `${scope.row.planList_0_interestPaid}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_0_interestOwe',
                            label: '剩余正常利息',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_interestOwe == 0 ? 0 : scope.row.planList_0_interestOwe ? `${scope.row.planList_0_interestOwe}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 9,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_endTime',
                            label: '约定还款日期2',
                            sort: 13,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_endTime == 0 ? 0 : scope.row.planList_1_endTime ? `${scope.row.planList_1_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 14,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_capitalOwe',
                            label: '剩余还款本金金额',
                            sort: 17,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_capitalOwe == 0 ? 0 : scope.row.planList_1_capitalOwe ? `${scope.row.planList_1_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_interestPaid',
                            label: '累计正常实收利息',
                            sort: 19,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_interestPaid == 0 ? 0 : scope.row.planList_1_interestPaid ? `${scope.row.planList_1_interestPaid}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_interestOwe',
                            label: '剩余正常利息',
                            sort: 20,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_interestOwe == 0 ? 0 : scope.row.planList_1_interestOwe ? `${scope.row.planList_1_interestOwe}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 21,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_endTime',
                            label: '约定还款日期3',
                            sort: 25,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_endTime == 0 ? 0 : scope.row.planList_2_endTime ? `${scope.row.planList_2_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 26,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_capitalOwe',
                            label: '剩余还款本金金额',
                            sort: 29,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_capitalOwe == 0 ? 0 : scope.row.planList_2_capitalOwe ? `${scope.row.planList_2_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_interestPaid',
                            label: '累计正常实收利息',
                            sort: 31,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_interestPaid == 0 ? 0 : scope.row.planList_2_interestPaid ? `${scope.row.planList_2_interestPaid}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_interestOwe',
                            label: '剩余正常利息',
                            sort: 32,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_interestOwe == 0 ? 0 : scope.row.planList_2_interestOwe ? `${scope.row.planList_2_interestOwe}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 33,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    prop: 'account_standingBookArchiveNo',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.rowData = scope.row
                            this.rowData.title = '好信用—分授信档案信息维护'
                            this.fileinfoDialogVisible = true
                        }}></i></span>
                    }
                },
                {
                    prop: 'account_remark',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_remark == 0 ? 0 : scope.row.account_remark ? `${scope.row.account_remark}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.rowData = scope.row
                            this.rowData.title = '好信用—分授信备注信息维护'
                            this.remarkDialogVisible = true
                        }}></i></span>
                    }
                }
            ],
            // 敞口
            Exposure: [
                {
                    label: '基础信息',
                    children: [
                        {
                            prop: 'account_standingBookNo',
                            label: '台账编号',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => {
                                    this.getAccount(scope.row)
                                    this.accountData.title = '好信用—敞口基础信息维护'
                                    this.misDialogVisible = true
                                }}></i></span>
                            }
                        },
                        { prop: 'account_misCode', label: 'MIS编码', width: '150' },
                        { prop: 'account_loanCompanyName', label: '借款单位', width: '150' },
                        { prop: 'account_subsectionName', label: '分部', width: '150' }
                    ]
                },
                {
                    label: '借款账目',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.ExpoBorrowingBooks) }}></i></span>
                        )
                    },
                    children: [
                        { prop: 'loan_invoiceAmount', label: '开票金额', sort: 1, width: '150', displayAs: 'money' },
                        {
                            prop: 'loan_invoiceTime',
                            label: '开票日期',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_invoiceTime == 0 ? 0 : scope.row.loan_invoiceTime ? `${scope.row.loan_invoiceTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_supplier',
                            label: '供货商名称',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_supplier == 0 ? 0 : scope.row.loan_supplier ? `${scope.row.loan_supplier}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_depositPay',
                            label: '保证金缴纳',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_depositPay == 0 ? 0 : scope.row.loan_depositPay ? `${scope.row.loan_depositPay}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '敞口还款账目总计',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.ExpoRepaymentAccount) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'paymentStatic_capitalOwe',
                            label: '剩余敞口',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_capitalOwe == 0 ? 0 : scope.row.paymentStatic_capitalOwe ? `${scope.row.paymentStatic_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'paymentStatic_overDueInterestOwe',
                            label: '剩余逾期罚息',
                            sort: 6,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.paymentStatic_overDueInterestOwe == 0 ? 0 : scope.row.paymentStatic_overDueInterestOwe ? `${scope.row.paymentStatic_overDueInterestOwe}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    label: '敞口还款账目明细',
                    renderHeader: (h, scope) => {
                        return (
                            <span>{scope.column.label}<i class={this.column[scope.$index]._expand ? 'el-icon-minus pointer' : 'el-icon-plus pointer'} onClick={() => { this.handleExpand(scope, this.ExpoRCDetail) }}></i></span>
                        )
                    },
                    children: [
                        {
                            prop: 'planList_0_endTime',
                            label: '约定还款日期1',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_endTime == 0 ? 0 : scope.row.planList_0_endTime ? `${scope.row.planList_0_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限到期日',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_0_capitalOwe',
                            label: '剩余还款金额',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_0_capitalOwe == 0 ? 0 : scope.row.planList_0_capitalOwe ? `${scope.row.planList_0_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 6,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_endTime',
                            label: '约定还款日期2',
                            sort: 10,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_endTime == 0 ? 0 : scope.row.planList_1_endTime ? `${scope.row.planList_1_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限到期日',
                            sort: 11,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_1_capitalOwe',
                            label: '剩余还款金额',
                            sort: 14,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_1_capitalOwe == 0 ? 0 : scope.row.planList_1_capitalOwe ? `${scope.row.planList_1_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 15,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_endTime',
                            label: '约定还款日期3',
                            sort: 19,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_endTime == 0 ? 0 : scope.row.planList_2_endTime ? `${scope.row.planList_2_endTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限到期日',
                            sort: 20,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'planList_2_capitalOwe',
                            label: '剩余还款金额',
                            sort: 23,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.planList_2_capitalOwe == 0 ? 0 : scope.row.planList_2_capitalOwe ? `${scope.row.planList_2_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 24,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                            }
                        }
                    ]
                },
                {
                    prop: 'account_standingBookArchiveNo',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.rowData = scope.row
                            this.rowData.title = '好信用—敞口档案信息维护'
                            this.fileinfoDialogVisible = true
                        }}></i></span>
                    }
                },
                {
                    prop: 'account_remark',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_remark == 0 ? 0 : scope.row.account_remark ? `${scope.row.account_remark}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.rowData = scope.row
                            this.rowData.title = '好信用—敞口备注信息维护'
                            this.remarkDialogVisible = true
                        }}></i></span>
                    }
                }
            ],
            // 还款明细表
            ReimbursementDetail: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '台账编号',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: 'MIS编码',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '平台公司',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '分部',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '登记人',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '还款项目',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '还款时间',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '金额',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应还款日期',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '备注',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { }}></i></span>
                    }
                }
            ],
            column: [],
            changeTable: true,
            // 流贷
            // 借款账目的展开
            FlowBorrowingBooks: [
                {
                    prop: 'loan_supplier',
                    label: '供货商名称',
                    sort: 2,
                    width: '150'
                },
                { prop: 'loan_yearRate', label: '年利率', sort: 4, width: '150' },
                {
                    prop: 'loan_loanDateNum',
                    label: '借款期限',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_loanDateNum == 0 ? 0 : scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息（正常+宽限）',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_registrant',
                    label: '登记人',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_registrant == 0 ? 0 : scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                    }
                }
            ],
            // 还款账目的展开
            FlowRepaymentAccount: [
                {
                    prop: 'planList_0_capitalPaid',
                    label: '累计实收借款本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_capitalPaid == 0 ? 0 : scope.row.planList_0_capitalPaid ? `${scope.row.planList_0_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_graceInterestTime', // 待改
                    label: '宽限还款日',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_graceInterestTime == 0 ? 0 : scope.row.plan_graceInterestTime ? `${scope.row.plan_graceInterestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_graceInterestAmount',
                    label: '累计应收正常利息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_graceInterestAmount == 0 ? 0 : scope.row.planList_0_graceInterestAmount ? `${scope.row.planList_0_graceInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_graceInterestTime',
                    label: '最新正常利息还款日',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_graceInterestTime == 0 ? 0 : scope.row.planList_0_graceInterestTime ? `${scope.row.planList_0_graceInterestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_graceInterestPaid',
                    label: '累计实收正常利息',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_graceInterestPaid == 0 ? 0 : scope.row.planList_0_graceInterestPaid ? `${scope.row.planList_0_graceInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_graceInterestOwe',
                    label: '欠收正常利息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_graceInterestOwe == 0 ? 0 : scope.row.planList_0_graceInterestOwe ? `${scope.row.planList_0_graceInterestOwe}` : '-'}</span>
                    }
                }
            ],
            // 逾期账目的展开
            FlowOverdueAccounts: [
                {
                    prop: 'planList_0_overDueInterestAmount',
                    label: '应收逾期罚息',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestAmount == 0 ? 0 : scope.row.planList_0_overDueInterestAmount ? `${scope.row.planList_0_overDueInterestAmount}元` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestPaid',
                    label: '累计实收逾期罚息',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestPaid == 0 ? 0 : scope.row.planList_0_overDueInterestPaid ? `${scope.row.planList_0_overDueInterestPaid}元` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestOwe',
                    label: '欠收逾期罚息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestOwe == 0 ? 0 : scope.row.planList_0_overDueInterestOwe ? `${scope.row.planList_0_overDueInterestOwe}元` : '-'}</span>
                    }
                }
            ],
            // 分授信
            // 借款账目的展开
            PointsBorrowingBooks: [
                {
                    prop: 'loan_yearRate',
                    label: '年利率',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_yearRate == 0 ? 0 : scope.row.loan_yearRate ? `${scope.row.loan_yearRate}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_loanDateNum',
                    label: '借款期限',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_loanDateNum == 0 ? 0 : scope.row.loan_loanDateNum ? `${scope.row.loan_loanDateNum}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_registrant',
                    label: '登记人',
                    sort: 10,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_registrant == 0 ? 0 : scope.row.loan_registrant ? `${scope.row.loan_registrant}` : '-'}</span>
                    }
                }
            ],
            // 分授信还款账目总计
            PointsRepaymentAccount: [
                {
                    prop: 'paymentStatic_capitalTime',
                    label: '最新本金还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_capitalTime == 0 ? 0 : scope.row.paymentStatic_capitalTime ? `${scope.row.paymentStatic_capitalTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_capitalPaid',
                    label: '累计已还本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_capitalPaid == 0 ? 0 : scope.row.paymentStatic_capitalPaid ? `${scope.row.paymentStatic_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestAmount',
                    label: '应收利息（正常+宽限）',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestAmount == 0 ? 0 : scope.row.plan_interestAmount ? `${scope.row.plan_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_interestTime',
                    label: '最新正常利息还款时间',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_interestTime == 0 ? 0 : scope.row.paymentStatic_interestTime ? `${scope.row.paymentStatic_interestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_interestPaid',
                    label: '累计实收正常利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_interestPaid == 0 ? 0 : scope.row.paymentStatic_interestPaid ? `${scope.row.paymentStatic_interestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_overDueInterestAmount',
                    label: '累计应收逾期罚息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_overDueInterestAmount == 0 ? 0 : scope.row.paymentStatic_overDueInterestAmount ? `${scope.row.paymentStatic_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_overDueInterestPaid',
                    label: '累计实收逾期罚息',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_overDueInterestPaid == 0 ? 0 : scope.row.paymentStatic_overDueInterestPaid ? `${scope.row.paymentStatic_overDueInterestPaid}` : '-'}</span>
                    }
                }
            ],
            // 分授信还款账目明细
            PointsRCDetail: [
                {
                    prop: 'planList_0_capitalAmount',
                    label: '约定还款本金金额',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_capitalAmount == 0 ? 0 : scope.row.planList_0_capitalAmount ? `${scope.row.planList_0_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_capitalPaid',
                    label: '累计还款本金金额',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_capitalPaid == 0 ? 0 : scope.row.planList_0_capitalPaid ? `${scope.row.planList_0_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_interestAmount',
                    label: '应收正常利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_interestAmount == 0 ? 0 : scope.row.planList_0_interestAmount ? `${scope.row.planList_0_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 10,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestAmount == 0 ? 0 : scope.row.planList_0_overDueInterestAmount ? `${scope.row.planList_0_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 11,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestPaid == 0 ? 0 : scope.row.planList_0_overDueInterestPaid ? `${scope.row.planList_0_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 12,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestOwe == 0 ? 0 : scope.row.planList_0_overDueInterestOwe ? `${scope.row.planList_0_overDueInterestOwe}` : '-'}</span>
                    }
                },
                // 约定还款日2
                {
                    prop: 'planList_1_capitalAmount',
                    label: '约定还款本金金额',
                    sort: 15,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_capitalAmount == 0 ? 0 : scope.row.planList_1_capitalAmount ? `${scope.row.planList_1_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_capitalPaid',
                    label: '累计还款本金金额',
                    sort: 16,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_capitalPaid == 0 ? 0 : scope.row.planList_1_capitalPaid ? `${scope.row.planList_1_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_interestAmount',
                    label: '应收正常利息',
                    sort: 18,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_interestAmount == 0 ? 0 : scope.row.planList_1_interestAmount ? `${scope.row.planList_1_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 22,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestAmount == 0 ? 0 : scope.row.planList_1_overDueInterestAmount ? `${scope.row.planList_1_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 23,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestPaid == 0 ? 0 : scope.row.planList_1_overDueInterestPaid ? `${scope.row.planList_1_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 24,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestOwe == 0 ? 0 : scope.row.planList_1_overDueInterestOwe ? `${scope.row.planList_1_overDueInterestOwe}` : '-'}</span>
                    }
                },
                // 约定还款日3
                {
                    prop: 'planList_2_capitalAmount',
                    label: '约定还款本金金额',
                    sort: 27,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_capitalAmount == 0 ? 0 : scope.row.planList_2_capitalAmount ? `${scope.row.planList_2_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_capitalPaid',
                    label: '累计还款本金金额',
                    sort: 28,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_capitalPaid == 0 ? 0 : scope.row.planList_2_capitalPaid ? `${scope.row.planList_2_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_interestAmount',
                    label: '应收正常利息',
                    sort: 30,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_interestAmount == 0 ? 0 : scope.row.planList_2_interestAmount ? `${scope.row.planList_2_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 34,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestAmount == 0 ? 0 : scope.row.planList_2_overDueInterestAmount ? `${scope.row.planList_2_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 35,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestPaid == 0 ? 0 : scope.row.planList_2_overDueInterestPaid ? `${scope.row.planList_2_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 36,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestOwe == 0 ? 0 : scope.row.planList_2_overDueInterestOwe ? `${scope.row.planList_2_overDueInterestOwe}` : '-'}</span>
                    }
                }
            ],
            // 敞口
            // 借款账目的展开
            ExpoBorrowingBooks: [
                {
                    prop: 'loan_depositProportion',
                    label: '保证金比例',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_depositProportion == 0 ? 0 : scope.row.loan_depositProportion ? `${scope.row.loan_depositProportion}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_loanAmount',
                    label: '敞口金额',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_loanAmount == 0 ? 0 : scope.row.loan_loanAmount ? `${scope.row.loan_loanAmount}` : '-'}<i class='el-icon-edit pointer' onClick={() => {
                            this.getLoan(scope.row)
                            this.loanData.title = '好信用—敞口借款信息维护'
                            this.billingDialogVisible = true
                        }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '承兑期限',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_loanEndTime',
                    label: '到期日',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_loanEndTime == 0 ? 0 : scope.row.loan_loanEndTime ? `${scope.row.loan_loanEndTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_repaymentType',
                    label: '还款方式',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}` : '-'}<i class='el-icon-edit pointer'
                            onClick={() => {
                                this.getGrantPaymetPlanData(scope.row)
                                // this.rowData.title = '好信用—敞口还款信息维护222222'
                                this.repaymentDialogVisible = true
                            }}></i></span>
                    }
                },
                { prop: 'loan_registrant', label: '登记人', sort: 9, width: '150' }
            ],
            // 敞口还款账目总计的展开
            ExpoRepaymentAccount: [
                {
                    prop: 'paymentStatic_capitalTime',
                    label: '最新还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_capitalTime == 0 ? 0 : scope.row.paymentStatic_capitalTime ? `${scope.row.paymentStatic_capitalTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_capitalPaid',
                    label: '累计已还敞口本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_capitalPaid == 0 ? 0 : scope.row.paymentStatic_capitalPaid ? `${scope.row.paymentStatic_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_overDueInterestAmount',
                    label: '累计应收逾期罚息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_overDueInterestAmount == 0 ? 0 : scope.row.paymentStatic_overDueInterestAmount ? `${scope.row.paymentStatic_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'paymentStatic_overDueInterestPaid',
                    label: '累计实收逾期罚息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.paymentStatic_overDueInterestPaid == 0 ? 0 : scope.row.paymentStatic_overDueInterestPaid ? `${scope.row.paymentStatic_overDueInterestPaid}` : '-'}</span>
                    }
                }
            ],
            // 敞口还款账目明细的展开
            ExpoRCDetail: [
                {
                    prop: 'planList_0_capitalAmount',
                    label: '约定还款金额',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_capitalAmount == 0 ? 0 : scope.row.planList_0_capitalAmount ? `${scope.row.planList_0_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_capitalPaid',
                    label: '累计实际还款本金金额',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_capitalPaid == 0 ? 0 : scope.row.planList_0_capitalPaid ? `${scope.row.planList_0_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '是否逾期',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestAmount == 0 ? 0 : scope.row.planList_0_overDueInterestAmount ? `${scope.row.planList_0_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestPaid == 0 ? 0 : scope.row.planList_0_overDueInterestPaid ? `${scope.row.planList_0_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_0_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_0_overDueInterestOwe == 0 ? 0 : scope.row.planList_0_overDueInterestOwe ? `${scope.row.planList_0_overDueInterestOwe}` : '-'}</span>
                    }
                },
                // 约定日期2
                {
                    prop: 'planList_1_capitalAmount',
                    label: '约定还款金额',
                    sort: 12,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_capitalAmount == 0 ? 0 : scope.row.planList_1_capitalAmount ? `${scope.row.planList_1_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_capitalPaid',
                    label: '累计实际还款本金金额',
                    sort: 13,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_capitalPaid == 0 ? 0 : scope.row.planList_1_capitalPaid ? `${scope.row.planList_1_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '是否逾期',
                    sort: 15,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 16,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestAmount == 0 ? 0 : scope.row.planList_1_overDueInterestAmount ? `${scope.row.planList_1_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 17,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestPaid == 0 ? 0 : scope.row.planList_1_overDueInterestPaid ? `${scope.row.planList_1_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_1_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 18,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_1_overDueInterestOwe == 0 ? 0 : scope.row.planList_1_overDueInterestOwe ? `${scope.row.planList_1_overDueInterestOwe}` : '-'}</span>
                    }
                },
                // 约定日期3
                {
                    prop: 'planList_2_capitalAmount',
                    label: '约定还款金额',
                    sort: 21,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_capitalAmount == 0 ? 0 : scope.row.planList_2_capitalAmount ? `${scope.row.planList_2_capitalAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_capitalPaid',
                    label: '累计实际还款本金金额',
                    sort: 22,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_capitalPaid == 0 ? 0 : scope.row.planList_2_capitalPaid ? `${scope.row.planList_2_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '是否逾期',
                    sort: 24,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestAmount',
                    label: '应缴逾期罚息',
                    sort: 25,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestAmount == 0 ? 0 : scope.row.planList_2_overDueInterestAmount ? `${scope.row.planList_2_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestPaid',
                    label: '实缴逾期罚息',
                    sort: 26,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestPaid == 0 ? 0 : scope.row.planList_2_overDueInterestPaid ? `${scope.row.planList_2_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'planList_2_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 27,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.planList_2_overDueInterestOwe == 0 ? 0 : scope.row.planList_2_overDueInterestOwe ? `${scope.row.planList_2_overDueInterestOwe}` : '-'}</span>
                    }
                }
            ]
        }
    },
    methods: {
        handleExpand (scope, expandSellrr) {
            this.$set(this.column[scope.$index], '_expand', !this.column[scope.$index]._expand)
            if (this.column[scope.$index]._expand) {
                this.column[scope.$index].children = this.column[scope.$index].children.concat(expandSellrr)
                this.column[scope.$index].children.sort((a, b) => {
                    return a.sort - b.sort
                })
            } else {
                this.column[scope.$index].children = this.column[scope.$index].children.filter(_ => !expandSellrr.includes(_))
                this.changeTable = false
                this.$nextTick(() => { this.changeTable = true })
            }
        },
        async getList (val) {
            this.$emit('getList', val)
        },
        // 基本信息
        async getAccount (row) {
            const { data } = await getAccountBasic(row.account_id)
            console.log(data)
            this.accountData = { ...this.accountData, ...data }
            this.$set(this.accountData, 'selectName', data.loanCompanyName)
            this.$set(this.accountData, 'selectCode', data.loanCompanyCode)
        },
        // 借款信息
        async getLoan (row) {
            const { data } = await getLoan(row.loan_id)
            console.log(data)
            this.loanData = {
                ...this.loanData,
                ...data,
                loanDateNumM: '',
                loanDateNumD: ''
            }
            if (data.loanDateType == 1) {
                this.$set(this.loanData, 'loanDateNumM', data.loanDateNum)
                this.loanData.loanEndTime = moment(data.loanStartTime).add(data.loanDateNum, 'M').format('YYYY-MM-DD HH:mm:ss')
            }
            if (data.loanDateType == 2) {
                this.$set(this.loanData, 'loanDateNumD', data.loanDateNum)
                this.loanData.loanEndTime = moment(data.loanStartTime).add(data.loanDateNum, 'd').format('YYYY-MM-DD HH:mm:ss')
            }
        },
        // 还款信息
        async getRespAccountRepaymentPlanData (row) {
            console.log(row)
            const { data } = await getRespAccountRepaymentPlan(row.account_id)
            this.respAccountRepaymentPlanData = data
        },
        // 敞口还款
        async getGrantPaymetPlanData (row) {
            console.log(row)
            const { data } = await getRespAccountRepaymentPlan(row.account_id)
            this.rowData = [...data]
            // this.rowData.title = '好信用—敞口还款信息维护3333'
            this.$set(this.rowData[0], 'title', '好信用—敞口还款信息维护3333')
            this.$set(this.rowData[0], 'repaymentType', row.loan_repaymentType)
            console.log(this.rowData)
        },
        onRepaymentTypeChange (val) {
            this.planListItem = { ...this.rowData[0] }
            this.rowData = []
            if (val === 1) {
                this.rowData.push({ ...this.planListItem })
            } else if (val === 2) {
                for (let i = 0; i < 3; i++) {
                    this.rowData.push({ ...this.planListItem })
                }
            }
        }
    },
    mounted () {
        this.column = this.FlowToBorrow
    }
}
</script>

<style lang="scss" scoped>
/deep/.pointer {
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;
}
</style>