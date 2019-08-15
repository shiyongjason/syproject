<template>
<el-collapse-item name="7">
    <template slot="title">
        <p class="title-p">税务合规(必填)</p>
    </template>
    <table class="assessmentTable">
        <thead>
            <tr>
                <td class="assessmentRow">-</td>
                <td class="assessmentRow">本年度</td>
                <td class="assessmentRow">上年度</td>
                <td class="assessmentRow">上上年度</td>
            </tr>
        </thead>
        <tbody v-if="form.dueFinanceYearOperatingPos">
            <tr>
                <td class="assessmentRow">年度纳税营业收入</td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].annualTaxableBusinessIncome">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].annualTaxableBusinessIncome">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].annualTaxableBusinessIncome">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
            </tr>
            <tr>
                <td class="assessmentRow">纳税收入占比</td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].taxableIncomeRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].taxableIncomeRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].taxableIncomeRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
            </tr>
            <tr>
                <td class="assessmentRow">税负率</td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].taxBearingRate">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].taxBearingRate">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td class="assessmentRow">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].taxBearingRate">
                        <template slot="suffix">%</template>
                    </el-input>
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
table, tr, td {
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 40px;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
