<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">盈利能力(必填)</p>
        </template>
        <table class="customTable">
            <thead>
                <tr>
                    <td width="25%">-</td>
                    <td width="25%">本年度</td>
                    <td width="25%">上年度</td>
                    <td width="25%">上上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td width="25%">销售毛利率</td>
                    <td width="25%">
                        <el-form-item label-width="0">
                            <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].grossMargin" placeholder="请输入内容">
                                <template slot="prefix">
                                    <span class="red-word">*</span>
                                </template>
                                <template slot="suffix">%</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].grossMargin" placeholder="请输入内容">
                            <template slot="prefix">
                                <span class="red-word">*</span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].grossMargin" placeholder="请输入内容">
                            <template slot="prefix">
                                <span></span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td width="25%">费率</td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].rate" placeholder="请输入内容">
                            <template slot="prefix">
                                <span class="red-word">*</span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].rate" placeholder="请输入内容">
                            <template slot="prefix">
                                <span class="red-word">*</span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].rate" placeholder="请输入内容">
                            <template slot="prefix">
                                <span></span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td width="25%">净利率</td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].profitRatio" placeholder="请输入内容">
                            <template slot="prefix">
                                <span class="red-word">*</span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].profitRatio" placeholder="请输入内容">
                            <template slot="prefix">
                                <span class="red-word">*</span>
                            </template>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="25%">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[2]" v-model="form.dueFinanceYearOperatingCreateForms[2].profitRatio" placeholder="请输入内容">
                            <template slot="prefix">
                                <span></span>
                            </template>
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
