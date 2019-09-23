<template>
    <el-collapse-item name="6">
        <template slot="title">
            <p class="title-p">资金风险评估(必填)</p>
        </template>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="公司借款：">
                    <el-input v-model="form.dueFinanceBasic.companyDebt" placeholder="自动录入" maxlength="25" disabled>
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="股东借款：" prop="dueFinanceBasic.shareholdersDebt" :rules="rules.shareholdersDebt">
                    <el-input v-model="form.dueFinanceBasic.shareholdersDebt" placeholder="请输入金额" maxlength="25">
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="公司向股东借款：" prop="dueFinanceBasic.companyBorrowsShareholders" :rules="rules.companyBorrowsShareholders">
                    <el-input v-model="form.dueFinanceBasic.companyBorrowsShareholders" placeholder="请输入金额" maxlength="25">
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
        </div>
        <div class="form-cont-row">
            <div class="form-cont-col">
                <el-form-item label="股东向公司借款：" prop="dueFinanceBasic.shareholdersBorrowsCompany" :rules="rules.shareholdersBorrowsCompany">
                    <el-input v-model="form.dueFinanceBasic.shareholdersBorrowsCompany" placeholder="请输入金额" maxlength="25">
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="现金流量比率：" prop="dueFinanceBasic.cashFlowRatio" :rules="rules.cashFlowRatio">
                    <el-input v-model="form.dueFinanceBasic.cashFlowRatio" placeholder="请输入现金流量比率" maxlength="25">
                        <template slot="suffix">%</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="资金风险评估：" prop="dueFinanceBasic.capitalRiskAssessment">
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
                    <el-input v-model="form.dueFinanceBasic.actualControllerAndMateOperatingLoan" placeholder="自动录入" maxlength="25" disabled>
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form-cont-col">
                <el-form-item label="个人及公司担保：">
                    <el-input v-model="form.dueFinanceBasic.personalAndCompanyGuarantee" placeholder="自动录入" maxlength="25" disabled>
                        <template slot="suffix">万</template>
                    </el-input>
                </el-form-item>
            </div>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { RISK_OPTIONS } from '../const'
import { Money, IsFixedTwoNumber } from '@/utils/rules'
export default {
    data () {
        return {
            riskOptions: RISK_OPTIONS,
            rules: {
                shareholdersDebt: [
                    { required: true, message: '请输入股东借款金额', trigger: 'blur' },
                    { validator: Money }
                ],
                companyBorrowsShareholders: [
                    { required: true, message: '请输入股东借款金额', trigger: 'blur' },
                    { validator: Money }
                ],
                shareholdersBorrowsCompany: [
                    { required: true, message: '请输入股东向公司借款金额', trigger: 'blur' },
                    { validator: Money }
                ],
                cashFlowRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ]
            }
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
table,
tr,
td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
