<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">盈利能力</p>
        </template>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="25%">指标</td>
                    <td width="25%">本年度</td>
                    <td width="25%">上年度</td>
                    <td width="25%">上上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td width="25%">销售毛利率</td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[0].grossMargin?form.dueFinanceYearOperatingCreateForms[0].grossMargin + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[1].grossMargin?form.dueFinanceYearOperatingCreateForms[1].grossMargin + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[2].grossMargin?form.dueFinanceYearOperatingCreateForms[2].grossMargin + '%':'-'}}
                    </td>
                </tr>
                <tr>
                    <td width="25%">费率</td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[0].rate?form.dueFinanceYearOperatingCreateForms[0].rate + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[1].rate?form.dueFinanceYearOperatingCreateForms[1].rate + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[2].rate?form.dueFinanceYearOperatingCreateForms[2].rate + '%':'-'}}
                    </td>
                </tr>
                <tr>
                    <td width="25%">净利率</td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[0].profitRatio?form.dueFinanceYearOperatingCreateForms[0].profitRatio + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[1].profitRatio?form.dueFinanceYearOperatingCreateForms[1].profitRatio + '%':''}}
                    </td>
                    <td width="25%">
                        {{form.dueFinanceYearOperatingCreateForms[2].profitRatio?form.dueFinanceYearOperatingCreateForms[2].profitRatio + '%':'-'}}
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
