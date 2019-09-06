<template>
    <el-collapse-item name="1">
        <template slot="title">
            <p class="title-p">财务尽调评估及KPI</p>
        </template>
        <p class="small-title">财务尽调评估</p>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="25%">评估项</td>
                    <td width="25%">合作目标</td>
                    <td width="25%"><span class="red-word">*</span>结论</td>
                    <td width="25%">备注</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.assessmentList" :key="index">
                    <td>{{ item.assessmentItem }}</td>
                    <td v-if="index === 2 || index === 4">
                        <p v-for="(v, i) in item.cooperationTarget.split(';')" :key="i" style="line-height: normal;">{{v}}</p>
                    </td>
                    <td v-else>{{ item.cooperationTarget }}
                        <i v-if="index === 1">w</i>
                    </td>
                    <td>
                        <el-form-item :prop="`assessmentList[${index}].state`" :rules="rules.state" label-width="0">
                            <el-select v-model="item.state" placeholder="请选择">
                                <el-option v-for="i in options" :key="i.value" :label="i.label" :value="i.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </td>
                    <td :rowspan="form.assessmentList.length" v-if="index == 0">
                        <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="item.remark">
                        </el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-title">KPI（必填）</p>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="180">-</td>
                    <td width="180">本年度</td>
                    <td width="180">上年度</td>
                </tr>
            </thead>
            <tbody v-if="form.dueFinanceYearOperatingCreateForms">
                <tr>
                    <td width="180">资产负债率</td>
                    <td width="180">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="assetListT" placeholder="自动录入" disabled>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="180">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="assetListL" placeholder="自动录入" disabled>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td width="180">净利率</td>
                    <td width="180">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[0]" v-model="form.dueFinanceYearOperatingCreateForms[0].profitRatio" placeholder="自动录入" disabled>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                    <td width="180">
                        <el-input v-if="form.dueFinanceYearOperatingCreateForms[1]" v-model="form.dueFinanceYearOperatingCreateForms[1].profitRatio" placeholder="自动录入" disabled>
                            <template slot="suffix">%</template>
                        </el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-title mb15">分析报告(必填)</p>
        <div class="item-wrappper">
            <el-form-item label="风险揭示：" prop="dueFinanceBasic.riskDisclosure">
                <el-input type="textarea" v-model="form.dueFinanceBasic.riskDisclosure" style="width:600px" rows="6" placeholder="请输入内容">
                </el-input>
            </el-form-item>
            <el-form-item label="分析描述：" prop="dueFinanceBasic.analysisDescription">
                <el-input type="textarea" v-model="form.dueFinanceBasic.analysisDescription" style="width:600px" rows="6" placeholder="请输入内容"></el-input>
            </el-form-item>
        </div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { YES_NO_STATUS_COPY } from '../../const'
export default {
    data () {
        return {
            options: YES_NO_STATUS_COPY,
            rules: {
                state: [
                    { required: true, message: '请选择结论', trigger: 'change' }
                ]
            }
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
.red-span {
    color: red;
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
