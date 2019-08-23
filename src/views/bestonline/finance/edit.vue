<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" ref='form' :rules="rules" label-width="180px">
                <!-- KPI -->
                <KPI />
                <!-- 盈利能力 -->
                <Profitability />
                <!-- 费用结构 -->
                <CostStructure />
                <!-- 偿债能力 -->
                <Solvency />
                <!-- 营运能力 -->
                <Operational />
                <!-- 资金风险评估 -->
                <FinancialRisks />
                <!-- 税务合规 -->
                <TaxCompliance />
                <!-- 仓储 -->
                <Storage />
                <!-- 财务委派 -->
                <FinancialAppointment />
                <!-- 资产负债表 -->
                <BalanceSheet />
                <!-- 利润表 -->
                <Profit />
                <!-- 现金流量表 -->
                <CashFlow />
            </el-form>
        </el-collapse>

        <div class="flex-wrap-row top20 " v-show="!isdisabled">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSureHandle(0)">暂存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSureHandle(1)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { saveFinance } from '../api/index.js'
import { plusOrMinus } from '../../../rules.js'
import { mapState } from 'vuex'
import KPI from './components/kpi.vue'
import BalanceSheet from './components/balanceSheet.vue'
import CashFlow from './components/cashFlow.vue'
import CostStructure from './components/costStructure.vue'
import FinancialAppointment from './components/financialAppointment.vue'
import FinancialRisks from './components/financialRisks.vue'
import Operational from './components/operational.vue'
import Profit from './components/profit.vue'
import Profitability from './components/profitability.vue'
import Solvency from './components/solvency.vue'
import Storage from './components/storage.vue'
import TaxCompliance from './components/taxCompliance.vue'
export default {
    components: {
        BalanceSheet,
        CashFlow,
        CostStructure,
        FinancialAppointment,
        FinancialRisks,
        Operational,
        Profit,
        Profitability,
        Solvency,
        Storage,
        TaxCompliance,
        KPI
    },
    data () {
        return {
            activeName: '1',
            updateTime: '',
            updateUser: '',
            isdisabled: false,
            applyId: '',
            type: false,
            rules: {
                dueFinanceBasic: {
                    riskDisclosure: [
                        { required: true, message: '请输入风险揭示', trigger: 'blur' }
                    ],
                    analysisDescription: [
                        { required: true, message: '请输入分析描述', trigger: 'blur' }
                    ],
                    shareholdersDebt: [
                        { required: true, message: '请输入股东借款金额', trigger: 'blur' }
                    ],
                    companyBorrowsShareholders: [
                        { required: true, message: '请输入公司向股东借款金额', trigger: 'blur' }
                    ],
                    shareholdersBorrowsCompany: [
                        { required: true, message: '请输入股东向公司借款金额', trigger: 'blur' }
                    ],
                    capitalRiskAssessment: [
                        { required: true, message: '请选择资金风险评估', trigger: 'change' }
                    ]
                }
            },
            debtDialog: false,
            tabName: 'nowYear',
            onDebtDialog: false
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.financeData
        })
    },
    mounted () {
        this.applyId = this.$route.query.applyId
    },
    methods: {
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueFinanceBasic[value] = e.target.value
        },
        oninputAssets (list, index, value, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.assetsLiabilities[list][index][value] = e.target.value
        },
        oninputDueAndCase (index, value, e, n) {
            e.target.value = plusOrMinus(e.target.value.toString())
            if (n === 0) {
                this.dueFinanceProfit.contentList[index][value] = e.target.value
                return
            }
            if (n === 1) {
                this.caseFlow.contentList[index][value] = e.target.value
            }
        },
        // 整数验证
        // oninputInt (value, e) {
        //     e.target.value = e.target.value.replace(/[^\d]/g, '')
        //     this.dueFinanceBasic[value] = e.target.value
        // },
        onSureHandle (i) {
            const firstTime = this.form.dueFinanceBasic.id
            if (firstTime) {
                this.form.dueFinanceBasic.updateUser = this.userInfo.employeeName
            } else {
                this.form.dueFinanceBasic.createUser = this.userInfo.employeeName
            }
            console.log(this.form)
            // const type = i === 0 ? '保存' : '提交'
            // this.$confirm(`确定${type}?`, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'info'
            // }).then(() => {
            if (i === 0) return this.onSaveGood(firstTime)
            if (i === 1) return this.onSubmit(firstTime)
            // }).catch(() => {})
        },
        async onSaveGood (firstTime) {
            if (this.form.dueFinanceBasic.dateOfCustody) this.form.dueFinanceBasic.dateOfCustody = this.$options.filters.formatDate(this.form.dueFinanceBasic.dateOfCustody, 'YYYY-MM-DD')
            if (this.form.dueFinanceBasic.startDateOfDelegation) this.form.dueFinanceBasic.startDateOfDelegation = this.$options.filters.formatDate(this.form.dueFinanceBasic.startDateOfDelegation, 'YYYY-MM-DD')
            if (this.form.assetsLiabilities.recordTime) this.form.assetsLiabilities.recordTime = this.$options.filters.formatDate(this.form.assetsLiabilities.recordTime, 'YYYY-MM-DD')
            if (this.form.dueFinanceProfit.recordTime) this.form.dueFinanceProfit.recordTime = this.$options.filters.formatDate(this.form.dueFinanceProfit.recordTime, 'YYYY-MM-DD')
            if (this.form.caseFlow.recordTime) this.form.caseFlow.recordTime = this.$options.filters.formatDate(this.form.caseFlow.recordTime, 'YYYY-MM-DD')
            // console.log(this.form)
            this.form.dueFinanceBasic.type = 0
            await saveFinance({ ...this.form, type: 0 })
            this.$message({
                type: 'success',
                message: '暂存成功!'
            })
        },
        async onSubmit (firstTime) {
            /** activeName == 1 */
            for (const i of this.form.assessmentList) {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            if (
                this.form.dueFinanceYearOperatingCreateForms[0].assetLiabilityRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].assetLiabilityRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].assetLiabilityRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].assetLiabilityRatio === '' || this.form.dueFinanceYearOperatingCreateForms[0].profitRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].profitRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].profitRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].profitRatio === ''
            ) {
                this.$message.warning('请输入KPI')
                this.activeName = '1'
                return false
            }
            /** activeName == 2 */
            if (
                this.form.dueFinanceYearOperatingCreateForms[0].grossMargin === null || this.form.dueFinanceYearOperatingCreateForms[0].grossMargin === '' || this.form.dueFinanceYearOperatingCreateForms[1].grossMargin === null || this.form.dueFinanceYearOperatingCreateForms[1].grossMargin === '' || this.form.dueFinanceYearOperatingCreateForms[0].rate === null || this.form.dueFinanceYearOperatingCreateForms[0].rate === '' || this.form.dueFinanceYearOperatingCreateForms[1].rate === null || this.form.dueFinanceYearOperatingCreateForms[1].rate === '' || this.form.dueFinanceYearOperatingCreateForms[0].profitRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].profitRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].profitRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].profitRatio === ''
            ) {
                this.$message.warning('请输入盈利能力(必填)')
                this.activeName = '2'
                return false
            }
            /** activeName == 4 */
            if (
                this.form.dueFinanceYearOperatingCreateForms[0].liquidityRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].liquidityRatio === '' ||
                this.form.dueFinanceYearOperatingCreateForms[1].liquidityRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].liquidityRatio === '' || this.form.dueFinanceYearOperatingCreateForms[0].quickRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].quickRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].quickRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].quickRatio === '' || this.form.dueFinanceYearOperatingCreateForms[0].assetLiabilityRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].assetLiabilityRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].assetLiabilityRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].assetLiabilityRatio === ''
            ) {
                this.$message.warning('请输入偿债能力(必填)')
                this.activeName = '4'
                return false
            }
            /** activeName == 5 */
            if (
                this.form.dueFinanceYearOperatingCreateForms[0].daysOfReceivable === null || this.form.dueFinanceYearOperatingCreateForms[0].daysOfReceivable === '' ||
                this.form.dueFinanceYearOperatingCreateForms[1].daysOfReceivable === null || this.form.dueFinanceYearOperatingCreateForms[1].daysOfReceivable === '' || this.form.dueFinanceYearOperatingCreateForms[2].daysOfReceivable === null || this.form.dueFinanceYearOperatingCreateForms[2].daysOfReceivable === '' || this.form.dueFinanceYearOperatingCreateForms[0].daysOfInventory === null || this.form.dueFinanceYearOperatingCreateForms[0].daysOfInventory === '' || this.form.dueFinanceYearOperatingCreateForms[1].daysOfInventory === null || this.form.dueFinanceYearOperatingCreateForms[1].daysOfInventory === '' || this.form.dueFinanceYearOperatingCreateForms[2].daysOfInventory === null || this.form.dueFinanceYearOperatingCreateForms[2].daysOfInventory === '' || this.form.dueFinanceYearOperatingCreateForms[0].totalAssetsTurnover === null || this.form.dueFinanceYearOperatingCreateForms[0].totalAssetsTurnover === '' || this.form.dueFinanceYearOperatingCreateForms[1].totalAssetsTurnover === null || this.form.dueFinanceYearOperatingCreateForms[1].totalAssetsTurnover === '' || this.form.dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover === null || this.form.dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover === '' || this.form.dueFinanceYearOperatingCreateForms[0].returnOnEquity === null || this.form.dueFinanceYearOperatingCreateForms[0].returnOnEquity === '' || this.form.dueFinanceYearOperatingCreateForms[1].returnOnEquity === null || this.form.dueFinanceYearOperatingCreateForms[1].returnOnEquity === '' || this.form.dueFinanceYearOperatingCreateForms[2].returnOnEquity === null || this.form.dueFinanceYearOperatingCreateForms[2].returnOnEquity === ''
            ) {
                this.$message.warning('请输入营运能力(必填)')
                this.activeName = '5'
                return false
            }
            /** activeName == 7 */
            if (
                this.form.dueFinanceYearOperatingCreateForms[0].annualTaxableBusinessIncome === null || this.form.dueFinanceYearOperatingCreateForms[0].annualTaxableBusinessIncome === '' ||
                this.form.dueFinanceYearOperatingCreateForms[1].annualTaxableBusinessIncome === null || this.form.dueFinanceYearOperatingCreateForms[1].annualTaxableBusinessIncome === '' || this.form.dueFinanceYearOperatingCreateForms[0].taxableIncomeRatio === null || this.form.dueFinanceYearOperatingCreateForms[0].taxableIncomeRatio === '' || this.form.dueFinanceYearOperatingCreateForms[1].taxableIncomeRatio === null || this.form.dueFinanceYearOperatingCreateForms[1].taxableIncomeRatio === '' || this.form.dueFinanceYearOperatingCreateForms[0].taxBearingRate === null || this.form.dueFinanceYearOperatingCreateForms[0].taxBearingRate === '' || this.form.dueFinanceYearOperatingCreateForms[1].taxBearingRate === null || this.form.dueFinanceYearOperatingCreateForms[1].taxBearingRate === ''
            ) {
                this.$message.warning('请输入税务合规(必填)')
                this.activeName = '7'
                return false
            }
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.form.dueFinanceBasic.type = 1
                    await saveFinance({ ...this.form, type: 1 })
                    this.$message.success('提交成功')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 0 15px;
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
table {
    border-collapse: collapse;
}
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
.el-checkbox {
    margin-right: 20px;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
}
.supplier {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 25px;
    margin-bottom: 20px;
    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
    .table-row {
        position: relative;
        &:not(:first-child) {
            border-right: none !important;
        }
        > i {
            position: absolute;
            top: 10px;
            right: -50px;
            font-size: 20px;
        }
    }
}
.double-table {
    display: flex;
    margin: 15px;
    .table-flex {
        width: 50%;
        margin: 0;
    }
    .table-flex:nth-child(1) {
        .table-row {
            border-right: none;
        }
    }
    .table-flex:nth-child(2) {
        .table-row {
            border-left: none;
        }
    }
}
.table_left {
    .table-col {
        text-align: left !important;
    }
}
.subtitle {
    font-weight: 700;
    height: 40px;
}
.table_h {
    height: 80px;
    // line-height: 80px;
}
.assessmentTable {
    margin: 15px;
}
.assessmentRow {
    width: 360px;
    height: 36px;
}
/deep/ .textHeight {
    textarea {
        height: 210px;
        border: 0;
    }
}
.el-dialog span {
    text-align: center;
}
</style>
