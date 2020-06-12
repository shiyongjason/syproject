<template>
    <div class="baseInfo">
        <el-form ref="ruleForm" label-width="200px">
            <h3>基础信息</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司代码：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.misCode}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="平台公司名称：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.companyName}}</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item label="所属分部：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.subsectionName}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="申报填报人：">
                        <div class="w250">
                            <span>{{fundDetail.fundplanMain.applyType ? fundDetail.fundplanMain.createBy : userInfo.employeeName}}</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <h3>销售数据</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item :label="`${fundDetail.fundplanSale.commitmentAnnualYear}年承诺额：`">
                        <div class="w250">
                            <span>{{fundDetail.fundplanSale.commitmentAnnual || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${commimentLastMonthName}承诺额：`">
                        <div class="w250">
                            <span v-if="!fundDetail.fundplanSale.commimentLastMonthName">-</span>
                            <span v-else>{{fundDetail.fundplanSale.commimentLastMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${commimentNextMonthName}承诺额：`">
                        <div class="w250">
                            <span v-if="!fundDetail.fundplanSale.commimentNextMonthName">-</span>
                            <span v-else>{{fundDetail.fundplanSale.commimentNextMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item :label="`截止${totalSaleCurrentYearName}底销售额：`">
                        <div class="w250">
                            <span v-if="!fundDetail.fundplanSale.totalSaleCurrentYearName">-</span>
                            <span v-else>{{fundDetail.fundplanSale.totalSaleCurrentYear || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`${saleCurrentMonthName}实时销售额：`">
                        <div class="w250">
                            <span v-if="!fundDetail.fundplanSale.saleCurrentMonthName">-</span>
                            <span v-else>{{fundDetail.fundplanSale.saleCurrentMonth || 0}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <h3>借款情况</h3>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="在贷余额：">
                        <div class="w250">
                            <span v-if="!fundDetail.respFundPlanLoan">-</span>
                            <span v-else>{{fundDetail.respFundPlanLoan.loanBalance | fundMoney}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`当前是否有逾期：`">
                        <div class="w250">
                            <span v-if="fundDetail.respFundPlanLoan.isOverdue">是</span>
                            <span v-else>否</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <div class="query-cont-row">
                <div class="query-cont-col">
                    <el-form-item label="待还款明细：">
                        <div class="w250">
                            <el-button type="primary" size="small" @click="showRepaid">展开明细列表</el-button>
                        </div>
                    </el-form-item>
                </div>
                <div class="query-cont-col">
                    <el-form-item :label="`当前逾期余额：`">
                        <div class="w250">
                            <span>{{fundDetail.respFundPlanLoan.overdueAmount | fundMoney}}</span>
                            <span class="dw">万元</span>
                        </div>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <el-dialog title="待还款明细" :visible.sync="isOpen" :close-on-click-modal='false' width="50%">
            <div class="page-body-cont h400">
                <hosJoyTable ref="hosjoyTable" :showPagination='true' border stripe :column="columnData" :data="tableData" align="center" :total="pagination.total" :pageNumber.sync="pagination.pageNumber" :pageSize.sync="pagination.pageSize" @pagination='getList' height='577'>
                </hosJoyTable>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import hosJoyTable from '@/components/HosJoyTable/hosjoy-table'
import { mapState } from 'vuex'
import { repaidToDetailTable } from '../../const'
import { getLoanDetail } from '../../api'
import moment from 'moment'
export default {
    name: 'baseInfo',
    components: { hosJoyTable },
    props: {
        fundDetail: {
            type: Object,
            default: () => {
                return {
                    fundplanSale: {}
                }
            }
        }
    },
    data () {
        return {
            isOpen: false,
            pagination: {
                total: 0,
                pageNumber: 1,
                pageSize: 10
            },
            tableData: [],
            columnData: repaidToDetailTable
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        commimentLastMonthName () {
            if (!this.fundDetail.fundplanSale.commimentLastMonthName) {
                return 'XXXX年XX月'
            }
            if (this.fundDetail.fundplanSale.commimentLastMonthName.substring(4, 6) == '00') {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.commimentLastMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.commimentLastMonthName.substring(4, 6)}月`
        },
        commimentNextMonthName () {
            if (!this.fundDetail.fundplanSale.commimentNextMonthName) {
                return 'XXXX年XX月'
            }
            if (this.fundDetail.fundplanSale.commimentNextMonthName.substring(4, 6) == '00') {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.commimentNextMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.commimentNextMonthName.substring(4, 6)}月`
        },
        totalSaleCurrentYearName () {
            if (!this.fundDetail.fundplanSale.totalSaleCurrentYearName) {
                return 'XXXX年XX月'
            }
            if (this.fundDetail.fundplanSale.totalSaleCurrentYearName.substring(4, 6) == '00') {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.totalSaleCurrentYearName.substring(0, 4)}年${this.fundDetail.fundplanSale.totalSaleCurrentYearName.substring(4, 6)}月`
        },
        saleCurrentMonthName () {
            if (!this.fundDetail.fundplanSale.saleCurrentMonthName) {
                return 'XXXX年XX月'
            }
            if (this.fundDetail.fundplanSale.saleCurrentMonthName.substring(4, 6) == '00') {
                return 'XXXX年XX月'
            }
            return `${this.fundDetail.fundplanSale.saleCurrentMonthName.substring(0, 4)}年${this.fundDetail.fundplanSale.saleCurrentMonthName.substring(4, 6)}月`
        }
    },
    methods: {
        showRepaid () {
            this.onReset()
            this.onSearch()
            this.isOpen = true
        },
        onReset () {
            this.$set(this.pagination, 'pageNumber', 1)
            this.$set(this.pagination, 'pageSize', 10)
        },
        async onSearch () {
            const params = {
                misCode: this.fundDetail.fundplanMain.misCode,
                ...this.pagination
            }
            const { data } = await getLoanDetail(params)
            this.tableData = data.records
            this.tableData.map(i => {
                if (i.endTime) {
                    i.endTime = moment(i.endTime).format('YYYY-MM-DD')
                } else {
                    i.endTime = '-'
                }
                if (i.loanDateNum) {
                    i.loanDate = `${i.loanDateNum}${i.loanDateType === 1 ? '个月' : '天'}`
                } else {
                    i.loanDate = `-`
                }
            })
            console.log(this.tableData)
            this.pagination = {
                total: data.total,
                pageNumber: data.current,
                pageSize: data.size
            }
        },
        getList (val) {
            this.pagination = {
                ...this.pagination,
                ...val
            }
            this.onSearch()
        }
    }
}
</script>

<style lang='scss' scoped>
.baseInfo {
    padding: 0 24px;
    h3 {
        padding-bottom: 10px;
    }
    .dw {
        margin-left: 10px;
    }
    .w250 {
        width: 250px;
        padding: 0 16px;
        box-sizing: border-box;
    }
    .query-cont-col {
        margin-bottom: 0px;
    }
    .el-form .el-form-item {
        margin-bottom: 10px;
    }
    /deep/ .el-pagination__editor.el-input {
        width: 50px !important;
    }
    /deep/ .el-pagination__jump {
        margin-left: 10px;
    }
}
</style>
