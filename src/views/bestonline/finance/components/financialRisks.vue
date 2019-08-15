<template>
<el-collapse-item name="6">
    <template slot="title">
        <p class="title-p">资金风险评估(必填)</p>
    </template>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="公司借款：">
                <el-input v-model="form.dueFinanceBasic.companyDebt" placeholder="请输入金额" maxlength="25" @keyup.native="oninput('companyDebt',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="股东借款：" prop="shareholdersDebt">
                <el-input v-model="form.dueFinanceBasic.shareholdersDebt" placeholder="请输入金额" maxlength="25" @keyup.native="oninput('shareholdersDebt',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="公司向股东借款：" prop="companyBorrowsShareholders">
                <el-input v-model="form.dueFinanceBasic.companyBorrowsShareholders" placeholder="请输入金额" maxlength="25" @keyup.native="oninput('companyBorrowsShareholders',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="股东向公司借款：" prop="shareholdersBorrowsCompany">
                <el-input v-model="form.dueFinanceBasic.shareholdersBorrowsCompany" placeholder="请输入金额" maxlength="25" @keyup.native="oninput('shareholdersBorrowsCompany',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="现金流量比率：">
                <el-input v-model="form.dueFinanceBasic.cashFlowRatio" placeholder="请输入现金流量比率" maxlength="25" @keyup.native="oninput('cashFlowRatio',$event)">
                    <template slot="suffix">%</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="资金风险评估：" prop="capitalRiskAssessment">
                <el-select v-model="form.dueFinanceBasic.capitalRiskAssessment" placeholder="请选择资金风险评估">
                    <el-option v-for="item in riskOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
    </div>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <el-form-item label="实际控制人及配偶经营性借款：" label-width="220px">
                <el-input v-model="form.dueFinanceBasic.actualControllerAndMateOperatingLoan" placeholder="请输入金额" maxlength="25" @keyup.native="oninput('shareholdersBorrowsCompany',$event)">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <div class="form-cont-col">
            <el-form-item label="个人及公司担保：">
                <el-input v-model="form.dueFinanceBasic.cashFlowRatio" placeholder="请输入比例" maxlength="25" @keyup.native="oninput('cashFlowRatio',$event)">
                    <template slot="suffix">%</template>
                </el-input>
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
