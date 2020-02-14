<template>
    <div class="page-body">
        {{source}}
        <div class="page-table">
            <hosJoyTable v-if="changeTable" ref="hosjoyTable" align="center" border stripe showPagination :column="column" :data="tableData" :total="pagination.total" :pageNumber.sync="pagination.pageNumber" :pageSize.sync="pagination.pageSize" @pagination="getList">
            </hosJoyTable>
        </div>
        <!-- MIS编码Dialog -->
        <misDialog :detailData='rowData' :dialogVisible='misDialogVisible' @onClose="misDialogVisible=false" v-if='misDialogVisible' />
        <!-- 供货商Dialog -->
        <supplierDialog :detailData='rowData' :dialogVisible='supplierDialogVisible' @onClose="supplierDialogVisible=false" v-if="supplierDialogVisible"/>
        <!-- 年利率Dialog -->
        <AnnualInterestRateDialog :detailData='rowData' :dialogVisible='AnnualInterestRateDialogVisible' @onClose="AnnualInterestRateDialogVisible=false" v-if="AnnualInterestRateDialogVisible" />
        <!-- 台账档案编号 -->
        <fileInfoDialog :detailData='rowData' :dialogVisible='fileinfoDialogVisible' @onClose="onClose('fileinfoDialogVisible')" />
        <!-- 备注 -->
        <remarkDialog :detailData='rowData' :dialogVisible='remarkDialogVisible' @onClose="onClose('remarkDialogVisible')" />
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import remarkDialog from './dialog/remarkDialog.vue'
import fileInfoDialog from './dialog/fileInfoDialog.vue'
import misDialog from './dialog/misDialog.vue'
import supplierDialog from './dialog/supplierDialog.vue'
import AnnualInterestRateDialog from './dialog/AnnualInterestRateDialog.vue'
export default {
    name: 'complexTable',
    components: { hosJoyTable, remarkDialog, fileInfoDialog, misDialog, supplierDialog, AnnualInterestRateDialog },
    props: {
        tableData: {
            type: Array,
            default: []
        },
        source: {
            type: String,
            default: '流贷'
        },
        pagination: {
            type: Object,
            default: {
                pageNumber: 1,
                pageSize: 10,
                total: 0
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
            sizes: [10, 20, 50, 100],
            rowData: {},
            // 流贷
            FlowToBorrow: [
                {
                    label: '基础信息',
                    children: [
                        { prop: 'netProfitRate', label: '台账编号', width: '150' },
                        {
                            prop: 'netProfitRate',
                            label: 'MIS编码',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.source = 0; this.misDialogVisible = true }}></i></span>
                            }
                        },
                        { prop: 'netProfitRate', label: '借款单位', width: '150' },
                        { prop: 'netProfitRate', label: '分部', width: '150' }
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
                        { prop: 'netProfitRateLastMonth', label: '借款金额', sort: 1, width: '150' },
                        {
                            prop: 'netProfitRate',
                            label: '还款方式',
                            sort: 3,
                            width: '150'
                        },
                        {
                            prop: 'netProfitRate',
                            label: '放款日期',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '到期日',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '最新本金还款日',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '欠收本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onFileInfo(0, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(0, scope.row) }}></i></span>
                    }
                }
            ],
            // 分授信
            PointsCredit: [
                {
                    label: '基础信息',
                    children: [
                        {
                            prop: 'netProfitRate',
                            label: '台账编号',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
                            }
                        },
                        { prop: 'netProfitRate', label: 'MIS编码', width: '150' },
                        { prop: 'netProfitRate', label: '借款单位', width: '150' },
                        { prop: 'netProfitRate', label: '分部', width: '150' }
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
                            prop: 'netProfitRateLastMonth',
                            label: '开票金额',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '开票日期',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '供货商名称',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '借款金额',
                            sort: 4,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '到期日',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '还款方式',
                            sort: 8,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '剩余本金',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余利息',
                            sort: 7,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '剩余逾期罚息',
                            sort: 10,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onFileInfo(1, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(1, scope.row) }}></i></span>
                    }
                }
            ],
            // 敞口
            Exposure: [
                {
                    label: '基础信息',
                    children: [
                        {
                            prop: 'netProfitRate',
                            label: '台账编号',
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
                            }
                        },
                        { prop: 'netProfitRate', label: 'MIS编码', width: '150' },
                        { prop: 'netProfitRate', label: '借款单位', width: '150' },
                        { prop: 'netProfitRate', label: '分部', width: '150' }
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
                        {
                            prop: 'netProfitRateLastMonth',
                            label: '开票金额',
                            sort: 1,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '开票日期',
                            sort: 2,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '供货商名称',
                            sort: 3,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                            }
                        },
                        {
                            prop: 'netProfitRate',
                            label: '保证金缴纳',
                            sort: 5,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
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
                            prop: 'netProfitRateLastMonth',
                            label: '剩余逾期罚息',
                            sort: 6,
                            width: '150',
                            render: (h, scope) => {
                                return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '台账档案编号',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onFileInfo(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '备注',
                    width: '200',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
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
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: 'MIS编码',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '平台公司',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '分部',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '登记人',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '还款项目',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '还款时间',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '金额',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应还款日期',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '备注',
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.onAddRemark(2, scope.row) }}></i></span>
                    }
                }
            ],
            column: [],
            changeTable: true,
            // 流贷
            // 借款账目的展开
            FlowBorrowingBooks: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '供货商名称',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.source = 0; this.supplierDialogVisible = true }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '年利率',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { this.rowData = scope.row; this.rowData.source = 0; this.AnnualInterestRateDialogVisible = true }}></i></span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '借款期限',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '登记人',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                }
            ],
            // 还款账目的展开
            FlowRepaymentAccount: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实收借款本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '宽限还款日',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '最新利息还款日',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实收利息',
                    sort: 7,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '欠收利息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '年利率',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '借款期限',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '登记人',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                }
            ],
            // 分授信还款账目总计
            PointsRepaymentAccount: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '最新本金还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计已还本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收利息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '最新利息还款时间',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实收利息',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收逾期罚息',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '实收逾期罚息',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRateLastMonth',
                    label: '保证金比例',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '敞口金额',
                    sort: 6,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
                    prop: 'netProfitRate',
                    label: '到期日',
                    sort: 8,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRate',
                    label: '还款方式',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRate',
                    label: '登记人',
                    sort: 9,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRate == 0 ? 0 : scope.row.netProfitRate ? `${scope.row.netProfitRate}%` : '-'}<i class='el-icon-edit pointer' onClick={() => { console.log('备注') }}></i></span>
                    }
                }
            ],
            // 敞口还款账目总计的展开
            ExpoRepaymentAccount: [
                {
                    prop: 'netProfitRateLastMonth',
                    label: '最新还款时间',
                    sort: 1,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计已还敞口本金',
                    sort: 2,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '应收逾期罚息',
                    sort: 4,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
                    }
                },
                {
                    prop: 'netProfitRateLastMonth',
                    label: '累计实收逾期罚息',
                    sort: 5,
                    width: '150',
                    render: (h, scope) => {
                        return <span>{scope.row.netProfitRateLastMonth == 0 ? 0 : scope.row.netProfitRateLastMonth ? `${scope.row.netProfitRateLastMonth}%` : '-'}</span>
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
        },
        onAddRemark (val, row) {
            this.rowData = row
            this.rowData.source = val
            this.remarkDialogVisible = true // 备注dialog
        },
        onFileInfo (val, row) {
            this.rowData = row
            this.rowData.source = val
            this.fileinfoDialogVisible = true // 台账编号dialog
        },
        onClose (name) {
            this[name] = false
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
