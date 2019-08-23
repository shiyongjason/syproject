<template>
    <div class="jd-manage">
        <p>已提交 {{form.dueFinanceBasic.updateTime}} {{ form.dueFinanceBasic.updateUser}} </p>
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
        console.log(this.form)
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
