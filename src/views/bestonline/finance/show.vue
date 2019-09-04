<template>
    <div class="jd-manage">
        <p v-if="form.dueFinanceBasic.type == 1">已提交 {{form.dueFinanceBasic.updateTime}} {{ form.dueFinanceBasic.updateUser}} </p>
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" ref='form' label-width="180px">
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
import { mapState } from 'vuex'
import KPI from './components_show/kpi.vue'
import BalanceSheet from './components_show/balanceSheet.vue'
import CashFlow from './components_show/cashFlow.vue'
import CostStructure from './components_show/costStructure.vue'
import FinancialAppointment from './components_show/financialAppointment.vue'
import FinancialRisks from './components_show/financialRisks.vue'
import Operational from './components_show/operational.vue'
import Profit from './components_show/profit.vue'
import Profitability from './components_show/profitability.vue'
import Solvency from './components_show/solvency.vue'
import Storage from './components_show/storage.vue'
import TaxCompliance from './components_show/taxCompliance.vue'
export default {
    components: {
        BalanceSheet, CashFlow, CostStructure, FinancialAppointment, FinancialRisks, Operational, Profit, Profitability, Solvency, Storage, TaxCompliance, KPI
    },
    data () {
        return {
            activeName: '1'
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.financeData
        })
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
