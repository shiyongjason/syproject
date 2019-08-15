<template>
<el-collapse-item name="2">
    <template slot="title">
        <p class="title-p">盈利能力(必填)</p>
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
        <tbody v-if="form.dueFinanceYearOperatingPos">
            <tr>
                <td width="180">销售毛利率</td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].grossMargin">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].grossMargin">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].grossMargin">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
            </tr>
            <tr>
                <td width="180">费率</td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].rate">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].rate">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].rate">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
            </tr>
            <tr>
                <td width="180">净利率</td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].profitRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].profitRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <el-input v-if="form.dueFinanceYearOperatingPos[2]" v-model="form.dueFinanceYearOperatingPos[2].profitRatio">
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
