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
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[0].annualTaxableBusinessIncome}}万
                    </td>
                    <td>
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[1].annualTaxableBusinessIncome}}万
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].annualTaxableBusinessIncome}}万
                    </td>
                </tr>
                <tr>
                    <td>纳税收入占比</td>
                    <td>
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[0].taxableIncomeRatio}}%
                    </td>
                    <td>
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[1].taxableIncomeRatio}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].taxableIncomeRatio}}%
                    </td>
                </tr>
                <tr>
                    <td>税负率</td>
                    <td>
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[0].taxBearingRate}}%
                    </td>
                    <td>
                        <span class="red-word">*</span>
                        {{form.dueFinanceYearOperatingCreateForms[1].taxBearingRate}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].taxBearingRate}}%
                    </td>
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'finance_profitability',
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
