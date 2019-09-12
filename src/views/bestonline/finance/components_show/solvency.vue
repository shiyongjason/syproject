<template>
    <el-collapse-item name="4">
        <template slot="title">
            <p class="title-p">偿债能力(必填)</p>
        </template>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">指标</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td>流动比率</td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[0].liquidityRatio > 200?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[0].liquidityRatio}}%</span>
                    </td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[1].liquidityRatio > 200?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[1].liquidityRatio}}%</span>
                    </td>
                </tr>
                <tr>
                    <td>速动比率</td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[0].quickRatio > 100?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[0].quickRatio}}%</span>
                    </td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[1].quickRatio > 100?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[1].quickRatio}}%</span>
                    </td>
                </tr>
                <tr>
                    <td>现金比率</td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[0].cashRatio > 20?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[0].cashRatio?form.dueFinanceYearOperatingCreateForms[0].cashRatio +'%':'-'}}</span>
                    </td>
                    <td>
                        <span :class="form.dueFinanceYearOperatingCreateForms[1].cashRatio > 20?'green-word':'red-word'">{{form.dueFinanceYearOperatingCreateForms[1].cashRatio?form.dueFinanceYearOperatingCreateForms[1].cashRatio +'%':'-'}}</span>
                    </td>
                </tr>
                <tr>
                    <td>资产负债率</td>
                    <td>
                        <span :class="assetListT > 70?'green-word':'red-word'">{{assetListT}}%</span>
                    </td>
                    <td>
                        <span :class="assetListL > 70?'green-word':'red-word'">{{assetListL}}%</span>
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
                        <td>
                            <font color="green">绿色字体</font>
                        </td>
                    </tr>
                    <tr>
                        <td>不符合标准：</td>
                        <td>
                            <font color="red">红色字体</font>
                        </td>
                    </tr>
                </table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="debtDialogVisible = false">关闭</el-button>
                </div>
            </el-dialog>
        </span>
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
        }),
        assetListT () {
            if (this.form.assetsLiabilities.assetListT && this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent && this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent != 0) {
                const result = (+this.form.totalLiability / +this.form.assetsLiabilities.assetListT[this.form.assetsLiabilities.assetListT.length - 1].endOrCurrent / 100).toFixed(2)
                return result
            }
            return 0
        },
        assetListL () {
            if (this.form.assetsLiabilities.assetListL && this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent && this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent != 0) {
                const result = (+this.form.totalLiability / +this.form.assetsLiabilities.assetListL[this.form.assetsLiabilities.assetListL.length - 1].endOrCurrent / 100).toFixed(2)
                return result
            }
            return 0
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
.question .el-icon-question{
    position: absolute;
    left: 656.5px;
    bottom: 850px;
}
.green-word{
    color: green;
}
</style>
