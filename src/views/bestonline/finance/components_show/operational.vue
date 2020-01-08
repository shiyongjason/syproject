<template>
    <el-collapse-item name="5">
        <template slot="title">
            <p class="title-p">营运能力</p>
        </template>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">指标</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                    <td width="180">上上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td>应收账款周转天数</td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[0].daysOfReceivable}}天
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[1].daysOfReceivable}}天
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].daysOfReceivable?form.dueFinanceYearOperatingCreateForms[2].daysOfReceivable + '天':'-'}}
                    </td>
                </tr>
                <tr>
                    <td>库存周转天数</td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[0].daysOfInventory}}天
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[1].daysOfInventory}}天
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].daysOfInventory?form.dueFinanceYearOperatingCreateForms[2].daysOfInventory + '天':'-'}}
                    </td>
                </tr>
                <tr>
                    <td>总资产周转率</td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[0].totalAssetsTurnover}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[1].totalAssetsTurnover}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover?form.dueFinanceYearOperatingCreateForms[2].totalAssetsTurnover + '%':'-'}}
                    </td>
                </tr>
                <tr>
                    <td>净资产收益率</td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[0].returnOnEquity}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[1].returnOnEquity}}%
                    </td>
                    <td>
                        {{form.dueFinanceYearOperatingCreateForms[2].returnOnEquity?form.dueFinanceYearOperatingCreateForms[2].returnOnEquity +'%':'-'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
