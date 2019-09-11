<template>
    <el-collapse-item name="7">
        <template slot="title">
            <p class="title-p">税务合规(必填)</p>
        </template>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">-</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                    <td width="180">上上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td>年度纳税营业收入</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].annualTaxableBusinessIncome" :rules="rules.annualTaxableBusinessIncome">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].annualTaxableBusinessIncome">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">万</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].annualTaxableBusinessIncome" :rules="rules.annualTaxableBusinessIncome">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].annualTaxableBusinessIncome">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">万</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].annualTaxableBusinessIncome" :rules="rules.annualTaxableBusinessIncomeNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].annualTaxableBusinessIncome">
                                <template slot="suffix">万</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>纳税收入占比</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].taxableIncomeRatio" :rules="rules.taxableIncomeRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].taxableIncomeRatio">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].taxableIncomeRatio" :rules="rules.taxableIncomeRatio">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].taxableIncomeRatio">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].taxableIncomeRatio" :rules="rules.taxableIncomeRatioNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].taxableIncomeRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>税负率</td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[0].taxBearingRate" :rules="rules.taxBearingRate">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].taxBearingRate">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[1].taxBearingRate" :rules="rules.taxBearingRate">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].taxBearingRate">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label-width="0" prop="dueFinanceYearOperatingCreateForms[2].taxBearingRate" :rules="rules.taxBearingRateNORequired">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].taxBearingRate">
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { IsFixedTwoNumber } from '@/utils/rules'
export default {
    name: 'finance_profitability',
    computed: {
        ...mapState({
            form: state => state.dueDiligence.financeData
        })
    },
    data () {
        return {
            debtDialogVisible: false,
            rules: {
                annualTaxableBusinessIncome: [
                    { required: true, message: '请填写年度纳税营业收入', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                annualTaxableBusinessIncomeNORequired:[
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                taxableIncomeRatio: [
                    { required: true, message: '请填写纳税收入占比', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                taxableIncomeRatioNORequired:[
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                taxBearingRate: [
                    { required: true, message: '请填写税负率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                taxBearingRateNORequired: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ]
            }
        }
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
table {
    /deep/ .el-form-item__error {
        position: relative;
        text-align: left;
        padding-left: 10px;
        padding-bottom: 5px;
    }
}
</style>
