<template>
    <div class="jd-manage">
        <p v-if="form.dueFinanceBasic.type == 1">已提交 {{form.dueFinanceBasic.updateTime}} {{ form.dueFinanceBasic.updateUser}} </p>
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

        <div class="flex-wrap-row top20 ">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSureHandle(0)" v-if="hosAuthCheck(draftAuthCode)">暂存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSureHandle(1)" v-if="hosAuthCheck(commitAuthCode)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { saveFinance } from '../api/index.js'
import { mapState, mapActions } from 'vuex'
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
import { AUTH_BESTONLINE_REVIEW_FINANCE_DRAFT, AUTH_BESTONLINE_REVIEW_FINANCE_COMMIT } from '@/utils/auth_const'
import { kpiValidProps, profitabilityValidProps, solvencyValidProps, operationAbilityValidProps, capitalRiskAssessmentValidProps, taxComplianceValidProps, balanceSheetValidProps, profitStatementValidProps } from './const.js'
export default {
    components: {
        BalanceSheet, CashFlow, CostStructure, FinancialAppointment, FinancialRisks, Operational, Profit, Profitability, Solvency, Storage, TaxCompliance, KPI
    },
    data () {
        return {
            activeName: '1',
            rules: {
                dueFinanceBasic: {
                    riskDisclosure: [
                        { required: true, message: '请输入风险揭示', trigger: 'blur' }
                    ],
                    analysisDescription: [
                        { required: true, message: '请输入分析描述', trigger: 'blur' }
                    ],
                    capitalRiskAssessment: [
                        { required: true, message: '请选择资金风险评估', trigger: 'change' }
                    ]
                }
            },
            draftAuthCode: AUTH_BESTONLINE_REVIEW_FINANCE_DRAFT,
            commitAuthCode: AUTH_BESTONLINE_REVIEW_FINANCE_COMMIT
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.financeData
        })
    },
    methods: {
        ...mapActions([
            'findFinanceData'
        ]),
        onSureHandle (i) {
            this.form.dueFinanceBasic.applyId = this.$route.query.applyId
            this.form.dueFinanceBasic.profitRatio = this.form.dueFinanceYearOperatingCreateForms[0].profitRatio // 本年度净利率入库
            this.form.dueFinanceBasic.profitRatioL = this.form.dueFinanceYearOperatingCreateForms[1].profitRatio // 上年度净利率入库
            const firstTime = this.form.dueFinanceBasic.id
            if (firstTime) {
                this.form.dueFinanceBasic.updateUser = this.userInfo.employeeName
            } else {
                this.form.dueFinanceBasic.createUser = this.userInfo.employeeName
            }
            if (i === 0) return this.onSaveGood(firstTime)
            if (i === 1) return this.onSubmit(firstTime)
        },
        async onSaveGood (firstTime) {
            if (this.form.dueFinanceBasic.dateOfCustody) this.form.dueFinanceBasic.dateOfCustody = this.$options.filters.formatDate(this.form.dueFinanceBasic.dateOfCustody, 'YYYY-MM-DD')
            if (this.form.dueFinanceBasic.startDateOfDelegation) this.form.dueFinanceBasic.startDateOfDelegation = this.$options.filters.formatDate(this.form.dueFinanceBasic.startDateOfDelegation, 'YYYY-MM-DD')
            if (this.form.assetsLiabilities.recordTime) this.form.assetsLiabilities.recordTime = this.$options.filters.formatDate(this.form.assetsLiabilities.recordTime, 'YYYY-MM-DD')
            if (this.form.dueFinanceProfit.recordTime) this.form.dueFinanceProfit.recordTime = this.$options.filters.formatDate(this.form.dueFinanceProfit.recordTime, 'YYYY-MM-DD')
            if (this.form.caseFlow.recordTime) this.form.caseFlow.recordTime = this.$options.filters.formatDate(this.form.caseFlow.recordTime, 'YYYY-MM-DD')
            this.form.dueFinanceBasic.type = 0
            await saveFinance({ ...this.form, type: 0 })
            this.$message({
                type: 'success',
                message: '暂存成功!'
            })
            this.$router.go(-1)
        },
        async onSubmit (firstTime) {
            this.$refs['form'].validate(async (valid, errors) => {
                this.findValidFailIndex(errors)
                if (valid) {
                    this.form.dueFinanceBasic.type = 1
                    await saveFinance({ ...this.form, type: 1 })
                    await this.findFinanceData({ applyId: this.$route.query.applyId })
                    this.$message.success('提交成功')
                    this.$router.go(-1)
                }
            })
        },
        findValidFailIndex (errors) {
            const expandKpi = Object.keys(errors).filter(item => {
                const index = item.indexOf('[')
                return kpiValidProps.has(index == -1 ? item : item.substring(0, index))
            }).length > 0
            const expandController = Object.keys(errors).filter(item => {
                const index = item.indexOf('].') + 2
                return profitabilityValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandOrganization = Object.keys(errors).filter(item => {
                const index = item.indexOf('].') + 2
                return solvencyValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandMotivationRisk = Object.keys(errors).filter(item => {
                const index = item.indexOf('].') + 2
                return operationAbilityValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandCapitalRiskAssessment = Object.keys(errors).filter(item => {
                const index = item.indexOf('.') + 1
                return capitalRiskAssessmentValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandTaxCompliance = Object.keys(errors).filter(item => {
                const index = item.indexOf('].') + 2
                return taxComplianceValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandBalanceSheet = Object.keys(errors).filter(item => {
                const index = item.indexOf('[')
                return balanceSheetValidProps.has(index == -1 ? item : item.substring(0, index))
            }).length > 0
            const expandProfitStatement = Object.keys(errors).filter(item => {
                const index = item.indexOf('[')
                return profitStatementValidProps.has(index == -1 ? item : item.substring(0, index))
            }).length > 0
            if (expandKpi) {
                this.activeName = '1'
            } else if (expandController) {
                this.activeName = '2'
            } else if (expandOrganization) {
                this.activeName = '4'
            } else if (expandMotivationRisk) {
                this.activeName = '5'
            } else if (expandCapitalRiskAssessment) {
                this.activeName = '6'
            } else if (expandTaxCompliance) {
                this.activeName = '7'
            } else if (expandBalanceSheet) {
                this.activeName = '10'
            } else if (expandProfitStatement) {
                this.activeName = '11'
            }
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

/deep/ .item-wrapper {
    table {
        width: 100%;
    }
}
</style>
