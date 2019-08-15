<template>
<el-collapse-item name="4">
    <template slot="title">
        <p class="title-p">偿债能力(必填)</p>
    </template>
    <div class="form-cont-row">
        <div class="form-cont-col">
            <table class="assessmentTable">
                <thead>
                    <tr>
                        <td class="assessmentRow">-</td>
                        <td class="assessmentRow">本年度</td>
                        <td class="assessmentRow">上年度</td>
                    </tr>
                </thead>
                <tbody v-if="form.dueFinanceYearOperatingPos">
                    <tr>
                        <td class="assessmentRow">流动比率</td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].liquidityRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].liquidityRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="assessmentRow">速动比率</td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].quickRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].quickRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="assessmentRow">现金比率</td>
                        <td class="assessmentRow">
                            <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].cashRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                        <td class="assessmentRow">
                            <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].cashRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="assessmentRow">资产负债率</td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].assetLiabilityRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                        <td class="assessmentRow">
                            <span class="red-word">*</span>
                            <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].assetLiabilityRatio">
                                <template slot="suffix">%</template>
                            </el-input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <span class="question">
                <i class="el-icon-question" @click="debtDialogVisible = true"></i>
                <el-dialog title="偿债能力标准值" width="20%" :visible.sync="debtDialogVisible" center>
                    <span>满足以下条件，即判断为符合标准。</span>
                    <table width="100%">
                        <tr>
                            <td>流动比率：</td>
                            <td>≥200%</td>
                        </tr>
                        <tr>
                            <td>速动比率：</td>
                            <td>≥100%</td>
                        </tr>
                        <tr>
                            <td>现金比率：</td>
                            <td>≥20%</td>
                        </tr>
                        <tr>
                            <td>资产负债率：</td>
                            <td>≥70%</td>
                        </tr>
                        <tr>
                            <td>符合标准：</td>
                            <td><font color="green">绿色字体</font></td>
                        </tr>
                        <tr>
                            <td>不符合标准：</td>
                            <td><font color="red">红色字体</font></td>
                        </tr>
                    </table>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="debtDialogVisible = false">关闭</el-button>
                    </div>
                </el-dialog>
            </span>
        </div>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'finance_profitability',
    data () {
        return {
            debtDialogVisible: false
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
