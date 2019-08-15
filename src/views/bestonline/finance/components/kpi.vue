<template>
<el-collapse-item name="1">
    <template slot="title">
        <p class="title-p">财务尽调评估及KPI</p>
    </template>
    <p class="small-title">财务尽调评估</p>
    <table class="item-wrapper">
        <thead>
            <tr>
                <td width="180">评估项</td>
                <td width="180">合作目标</td>
                <td width="180"><span class="red-word">*</span>结论</td>
                <td width="180">备注</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in form.assessmentList" :key="index">
                <td>{{ item.assessmentItem }}</td>
                <td>{{ item.cooperationTarget }}
                    <i v-if="index === 1">w</i>
                    <i v-if="index === 2">%</i>
                    <i v-if="index === 4">%</i>
                </td>
                <td>
                    <el-select v-model="item.state" placeholder="请选择">
                        <el-option v-for="i in options" :key="i.value" :label="i.label" :value="i.value">
                        </el-option>
                    </el-select>
                </td>
                <td :rowspan="form.assessmentList.length" v-if="index == 0">
                    <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="item.remark">
                    </el-input>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="small-title">KPI（必填）</p>
    <table class="item-wrapper">
        <thead>
            <tr>
                <td width="180">-</td>
                <td width="180">本年度</td>
                <td width="180">上年度</td>
            </tr>
        </thead>
        <tbody v-if="form.dueFinanceYearOperatingPos">
            <tr>
                <td width="180">资产负债率</td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[0]" v-model="form.dueFinanceYearOperatingPos[0].assetLiabilityRatio">
                        <template slot="suffix">%</template>
                    </el-input>
                </td>
                <td width="180">
                    <span class="red-word">*</span>
                    <el-input v-if="form.dueFinanceYearOperatingPos[1]" v-model="form.dueFinanceYearOperatingPos[1].assetLiabilityRatio">
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
            </tr>
        </tbody>
    </table>
    <p class="small-title mb15">分析报告(必填)</p>
    <div class="item-wrappper">
        <el-form-item label="风险揭示：" prop="dueFinanceBasic.riskDisclosure">
            <el-input type="textarea" v-model="form.dueFinanceBasic.riskDisclosure" style="width:600px" rows="6" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="分析描述：" prop="dueFinanceBasic.analysisDescription">
            <el-input type="textarea" v-model="form.dueFinanceBasic.analysisDescription" style="width:600px" rows="6" placeholder="请输入内容"></el-input>
        </el-form-item>
    </div>
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { YES_NO_STATUS } from '../../const'
export default {
    data () {
        return {
            options: YES_NO_STATUS
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
.red-span {
    color: red;
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
