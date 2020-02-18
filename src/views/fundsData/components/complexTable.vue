<template>
    <div class="page-body">
        {{source}}
        <div class="page-table">
            <hosJoyTable v-if="changeTable" ref="hosjoyTable" align="center" border stripe showPagination :column="column" :data="tableData" :total="pagination.total" :pageNumber.sync="pagination.pageNumber" :pageSize.sync="pagination.pageSize" @pagination="getList">
            </hosJoyTable>
        </div>
        <!-- 备注 -->
        <remarkDialog :detailData='rowData' :dialogVisible='remarkDialogVisible' @onClose="remarkDialogVisible=false" />
        <!-- 资金档案编号 -->
        <fileInfoDialog :detailData='rowData' :dialogVisible='fileinfoDialogVisible' @onClose="fileinfoDialogVisible=false" />
        <!-- 台账编号Dialog -->
        <misDialog :detailData='rowData' :dialogVisible='misDialogVisible' @onClose="misDialogVisible=false" />
        <!-- 供货商Dialog -->
        <supplierDialog :detailData='rowData' :dialogVisible='supplierDialogVisible' @onClose="supplierDialogVisible=false"  />
        <!-- 还款方式Dialog -流贷 -->
        <AnnualInterestRateDialog :detailData='rowData' :dialogVisible='AnnualInterestRateDialogVisible' @onClose="AnnualInterestRateDialogVisible=false"  />
        <!-- 开票日期Dialog -敞口 -->
        <billingDialog :detailData='rowData' :dialogVisible='billingDialogVisible' @onClose="billingDialogVisible=false"/>
        <!-- 还款方式Dialog -->
        <repaymentDialog :detailData='rowData' :dialogVisible='repaymentDialogVisible' @onClose="repaymentDialogVisible=false" />
        <!-- 开票日期Dialog-分授信Credit -->
        <pointsCreditBillingDialog :detailData='rowData' :dialogVisible='pointsCreditBillingDialogVisible' @onClose="pointsCreditBillingDialogVisible=false" />
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
                return '流贷'
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
            if (val == '流贷') this.$set(this, 'column', this.FlowToBorrow)
            if (val == '分授信') this.$set(this, 'column', this.PointsCredit)
            if (val == '敞口') this.$set(this, 'column', this.Exposure)
            if (val == '还款明细表') this.$set(this, 'column', this.ReimbursementDetail)
            this.changeTable = false
            this.$nextTick(() => { this.changeTable = true })
        }
    },
    data: function () {
        return {
            remarkDialogVisible: false,
            fileinfoDialogVisible: false,
            misDialogVisible: false,
            supplierDialogVisible: false,
            AnnualInterestRateDialogVisible: false,
            billingDialogVisible: false,
            repaymentDialogVisible: false,
            pointsCreditBillingDialogVisible: false,
            sizes: [10, 20, 50, 100],
            rowData: {},
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
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—流贷基础信息维护'; this.misDialogVisible = true }}></i></span>
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
                        { prop: 'loan_loanAmount', label: '借款金额', sort: 1, width: '150' },
                        {
                            prop: 'loan_repaymentType',
                            label: '还款方式',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—流贷还款信息维护'; this.AnnualInterestRateDialogVisible = true }}></i></span>
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
                            prop: 'plan_capitalTime',
                            label: '最新本金还款日',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.plan_capitalTime == 0 ? 0 : scope.row.plan_capitalTime ? `${scope.row.plan_capitalTime}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'plan_capitalOwe',
                            label: '欠收本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.plan_capitalOwe == 0 ? 0 : scope.row.plan_capitalOwe ? `${scope.row.plan_capitalOwe}` : '-'}</span>
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
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—流贷档案信息维护'; this.fileinfoDialogVisible = true }}></i></span>
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
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—分授信基础信息维护'; this.misDialogVisible = true }}></i></span>
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
                                return <span>{scope.row.loan_invoiceTime}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—分授信借款信息维护'; this.pointsCreditBillingDialogVisible = true }}></i></span>
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
                                return <span>{scope.row.loan_loanAmount == 0 ? 0 : scope.row.loan_loanAmount ? `${scope.row.loan_loanAmount}` : '-'}</span>
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
                                return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—分授信还款信息维护'; this.repaymentDialogVisible = true }}></i></span>
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
                            prop: 'plan_capitalOwe',
                            label: '剩余本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.plan_capitalOwe == 0 ? 0 : scope.row.plan_capitalOwe ? `${scope.row.plan_capitalOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'plan_interestOwe',
                            label: '剩余利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.plan_interestOwe == 0 ? 0 : scope.row.plan_interestOwe ? `${scope.row.plan_interestOwe}` : '-'}</span>
                            }
                        },
                        {
                            prop: 'plan_overDueInterestOwe',
                            label: '剩余逾期罚息',
                            sort: 10,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.plan_overDueInterestOwe == 0 ? 0 : scope.row.plan_overDueInterestOwe ? `${scope.row.plan_overDueInterestOwe}` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期1',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款本金金额',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余利息',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期2',
                            sort: 13,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限日期',
                            sort: 14,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款本金金额',
                            sort: 17,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 19,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 20,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期3',
                            sort: 24,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 25,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款本金金额',
                            sort: 28,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 30,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 31,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余逾期罚息',
                            sort: 34,
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
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—分授信档案信息维护'; this.fileinfoDialogVisible = true }}></i></span>
                    }
                },
                {
                    prop: 'account_remark',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_remark == 0 ? 0 : scope.row.account_remark ? `${scope.row.account_remark}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—分授信备注信息维护'; this.remarkDialogVisible = true }}></i></span>
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
                                return <span>{scope.row.account_standingBookNo}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—敞口基础信息维护'; this.misDialogVisible = true }}></i></span>
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
                                return <span>{scope.row.loan_invoiceTime == 0 ? 0 : scope.row.loan_invoiceTime ? `${scope.row.loan_invoiceTime}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—敞口借款信息维护'; this.billingDialogVisible = true }}></i></span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '剩余敞口',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'loan_overDueInterestOwe',
                            label: '剩余逾期罚息',
                            sort: 6,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.loan_overDueInterestOwe == 0 ? 0 : scope.row.loan_overDueInterestOwe ? `${scope.row.loan_overDueInterestOwe}` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期1',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款金额',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余利息',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期2',
                            sort: 13,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限日期',
                            sort: 14,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款本金金额',
                            sort: 17,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 19,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 20,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '约定还款日期3',
                            sort: 24,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '宽限还款日',
                            sort: 25,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余还款本金金额',
                            sort: 28,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '实收利息',
                            sort: 30,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '是否逾期',
                            sort: 31,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余逾期罚息',
                            sort: 34,
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
                        return <span>{scope.row.account_standingBookArchiveNo == 0 ? 0 : scope.row.account_standingBookArchiveNo ? `${scope.row.account_standingBookArchiveNo}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—敞口档案信息维护'; this.fileinfoDialogVisible = true }}></i></span>
                    }
                },
                {
                    prop: 'account_remark',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.account_remark == 0 ? 0 : scope.row.account_remark ? `${scope.row.account_remark}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—敞口备注信息维护'; this.remarkDialogVisible = true }}></i></span>
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
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => {}}></i></span>
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
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_supplier ? scope.row.loan_supplier : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—流贷借款信息维护'; this.supplierDialogVisible = true }}></i></span>
                    }
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
                    label: '应收利息合计',
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
                    prop: 'plan_capitalPaid',
                    label: '累计实收借款本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_capitalPaid == 0 ? 0 : scope.row.plan_capitalPaid ? `${scope.row.plan_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_graceInterestTime',
                    label: '宽限还款日',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_graceInterestTime == 0 ? 0 : scope.row.plan_graceInterestTime ? `${scope.row.plan_graceInterestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestAmount',
                    label: '累计应收利息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestAmount == 0 ? 0 : scope.row.plan_interestAmount ? `${scope.row.plan_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestTime',
                    label: '最新利息还款日',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestTime == 0 ? 0 : scope.row.plan_interestTime ? `${scope.row.plan_interestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestPaid',
                    label: '累计实收利息',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestPaid == 0 ? 0 : scope.row.plan_interestPaid ? `${scope.row.plan_interestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestOwe',
                    label: '欠收利息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestOwe == 0 ? 0 : scope.row.plan_interestOwe ? `${scope.row.plan_interestOwe}` : '-'}</span>
                    }
                }
            ],
            // 逾期账目的展开
            FlowOverdueAccounts: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收逾期罚息',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实收逾期罚息',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '欠收逾期罚息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'plan_capitalTime',
                    label: '最新本金还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_capitalTime == 0 ? 0 : scope.row.plan_capitalTime ? `${scope.row.plan_capitalTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_capitalPaid',
                    label: '累计已还本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_capitalPaid == 0 ? 0 : scope.row.plan_capitalPaid ? `${scope.row.plan_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestAmount',
                    label: '应收利息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestAmount == 0 ? 0 : scope.row.plan_interestAmount ? `${scope.row.plan_interestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestTime',
                    label: '最新利息还款时间',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestTime == 0 ? 0 : scope.row.plan_interestTime ? `${scope.row.plan_interestTime}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_interestPaid',
                    label: '累计实收利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_interestPaid == 0 ? 0 : scope.row.plan_interestPaid ? `${scope.row.plan_interestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_overDueInterestAmount',
                    label: '累计应收逾期罚息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_overDueInterestAmount == 0 ? 0 : scope.row.plan_overDueInterestAmount ? `${scope.row.plan_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_overDueInterestPaid',
                    label: '累计实收逾期罚息',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_overDueInterestPaid == 0 ? 0 : scope.row.plan_overDueInterestPaid ? `${scope.row.plan_overDueInterestPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'plan_overDueInterestOwe',
                    label: '剩余逾期罚息',
                    sort: 10,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.plan_overDueInterestOwe == 0 ? 0 : scope.row.plan_overDueInterestOwe ? `${scope.row.plan_overDueInterestOwe}` : '-'}</span>
                    }
                }
            ],
            // 分授信还款账目明细
            PointsRCDetail: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计还款本金金额',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾罚利息',
                    sort: 10,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 11,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '剩余逾期罚息',
                    sort: 12,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 15,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计还款本金金额',
                    sort: 16,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 18,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾期利息',
                    sort: 21,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 22,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '剩余逾期罚息',
                    sort: 23,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 26,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计还款本金金额',
                    sort: 27,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 29,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },

                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾期利息',
                    sort: 32,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 33,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                        return <span>{scope.row.loan_loanAmount == 0 ? 0 : scope.row.loan_loanAmount ? `${scope.row.loan_loanAmount}` : '-'}</span>
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
                        return <span>{scope.row.loan_repaymentType == 0 ? 0 : scope.row.loan_repaymentType ? `${scope.row.loan_repaymentType}` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.title = '好信用—敞口还款信息维护'; this.repaymentDialogVisible = true }}></i></span>
                    }
                },
                { prop: 'loan_registrant', label: '登记人', sort: 9, width: '150' }
            ],
            // 敞口还款账目总计的展开
            ExpoRepaymentAccount: [
                {
                    prop: 'loan_capitalTime',
                    label: '最新还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_capitalPaid',
                    label: '累计已还敞口本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_capitalPaid == 0 ? 0 : scope.row.loan_capitalPaid ? `${scope.row.loan_capitalPaid}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_overDueInterestAmount',
                    label: '累计应收逾期罚息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_overDueInterestAmount == 0 ? 0 : scope.row.loan_overDueInterestAmount ? `${scope.row.loan_overDueInterestAmount}` : '-'}</span>
                    }
                },
                {
                    prop: 'loan_overDueInterestPaid',
                    label: '累计实收逾期罚息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.loan_overDueInterestPaid == 0 ? 0 : scope.row.loan_overDueInterestPaid ? `${scope.row.loan_overDueInterestPaid}` : '-'}</span>
                    }
                }
            ],
            // 敞口还款账目明细的展开
            ExpoRCDetail: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 3,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实际还款金额',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾罚利息',
                    sort: 10,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 11,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '剩余逾期罚息',
                    sort: 12,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 15,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计还款本金金额',
                    sort: 16,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 18,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾期利息',
                    sort: 21,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 22,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '剩余逾期罚息',
                    sort: 23,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '约定还款本金金额',
                    sort: 26,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计还款本金金额',
                    sort: 27,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 29,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },

                {
                    prop: 'netProfitRateLastMonth',
                    label: '应缴逾期利息',
                    sort: 32,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实缴逾期罚息',
                    sort: 33,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
