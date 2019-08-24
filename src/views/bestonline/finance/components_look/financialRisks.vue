<template>
<el-collapse-item name="6">
    <template slot="title">
        <p class="title-p">资金风险评估(必填)</p>
    </template>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="公司借款：">
                {{form.dueFinanceBasic.companyDebt}}万
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="股东借款：" prop="dueFinanceBasic.shareholdersDebt">
                {{form.dueFinanceBasic.shareholdersDebt}}万
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="公司向股东借款：" prop="dueFinanceBasic.companyBorrowsShareholders">
                {{form.dueFinanceBasic.companyBorrowsShareholders}}万
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="股东向公司借款：" prop="dueFinanceBasic.shareholdersBorrowsCompany">
                {{form.dueFinanceBasic.shareholdersBorrowsCompany}}万
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="现金流量比率：">
                {{form.dueFinanceBasic.cashFlowRatio}}%
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="资金风险评估：" prop="dueFinanceBasic.capitalRiskAssessment">
                {{form.dueFinanceBasic.capitalRiskAssessment == 0?'高':form.dueFinanceBasic.capitalRiskAssessment == 1?'中':'低'}}
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="实际控制人及配偶经营性借款：" label-width="220px">
                {{form.dueFinanceBasic.actualControllerAndMateOperatingLoan}}万
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="个人及公司担保：">
                {{form.dueFinanceBasic.personalAndCompanyGuarantee}}%
            </el-form-item>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { RISK_OPTIONS } from '../const'
export default {
    data () {
        return {
            riskOptions: RISK_OPTIONS
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    }
}
</script>

<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
.item-wrapper {
    margin: 20px 0 20px;
}
table {
    border-collapse: collapse;
}
table, tr, td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
