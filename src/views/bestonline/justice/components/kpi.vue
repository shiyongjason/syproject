<template>
    <el-collapse-item name="1">
        <template slot="title">
            <p class="title-p">法务尽调评估及KPI</p>
        </template>
        <!--start-->
        <p class="small-title">法务尽调评估</p>
        <table class="item-wrapper">
            <thead>
                <tr>
                    <td width="180">评估项</td>
                    <td width="180">合作目标</td>
                    <td width="180"><span class="red-span">*</span>结论(必填)</td>
                    <td width="180">备注</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in justiceData.assessmentList" :key="index">
                    <td>{{item.assessmentItem}}</td>
                    <td>
                        {{item.cooperationTarget}}
                        <i v-if="index === 1">w</i>
                    </td>
                    <td>
                        <el-select v-model="item.state" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </td>
                    <td :rowspan="justiceData.assessmentList.length" v-if="index === 0">
                        <el-input type="textarea" :autosize="{ minRows: 10, maxRows:10 }" placeholder="请输入内容" v-model="item.remark">
                        </el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-title mt10">KPI(必填)</p>
        <div class="item-wrapper legal-form">
            <el-form-item label="尽调公司法律风险：" label-width="250px" prop="affairs.legalRisksOfCompany">
                <el-select v-model="justiceData.affairs.legalRisksOfCompany" placeholder="请选择结论">
                    <el-option v-for="item in companyLegalRisksOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实际控制人法律风险：" label-width="250px" prop="affairs.legalRisksOfController">
                <el-select v-model="justiceData.affairs.legalRisksOfController" placeholder="请选择结论">
                    <el-option v-for="item in controllerLegalRisksOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实际控制人配偶法律风险：" label-width="250px" prop="affairs.legalRisksOfControllerMate" class="single-row">
                <el-select v-model="justiceData.affairs.legalRisksOfControllerMate" placeholder="请选择结论">
                    <el-option v-for="item in controllerMateLegalRisksOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="个人经营性借款及担保总额：" label-width="250px" prop="affairs.personalOperatingloansTotalGuarantees">
                <el-input v-model="justiceData.affairs.personalOperatingloansTotalGuarantees" placeholder="请输入借款及担保总额">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
            <el-form-item label="公司借款及担保总额：" label-width="250px" prop="affairs.companyLoanTotalGuarantee">
                <el-input v-model="justiceData.affairs.companyLoanTotalGuarantee" placeholder="请输入借款及担保总额">
                    <template slot="suffix">万</template>
                </el-input>
            </el-form-item>
        </div>
        <p class="small-title">分析报告</p>
        <div class="item-wrapper">
            <el-form-item label="风险揭示：" label-width="100px" label-position="top" prop="affairs.riskDisclosure">
                <el-input type="textarea" style="width:600px" rows="3" placeholder="请输入内容" v-model="justiceData.affairs.riskDisclosure">
                </el-input>
            </el-form-item>
            <el-form-item label="分析描述：" label-width="100px" label-position="top" prop="affairs.analysisDescription">
                <el-input type="textarea" style="width:600px" rows="3" placeholder="请输入内容" v-model="justiceData.affairs.analysisDescription">
                </el-input>
            </el-form-item>
        </div>
        <!--end-->
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { COMPANY_LEGAL_RISKS_OPTIONS, CONTROLLER_LEGAL_RISKS_OPTIONS, CONTROLLER_MATE_LEGAL_RISKS_OPTIONS } from '../const'
import { YES_NO_STATUS } from '../../const'
export default {
    name: 'justice_kpi',
    data () {
        return {
            options: YES_NO_STATUS,
            companyLegalRisksOptions: COMPANY_LEGAL_RISKS_OPTIONS,
            controllerLegalRisksOptions: CONTROLLER_LEGAL_RISKS_OPTIONS,
            controllerMateLegalRisksOptions: CONTROLLER_MATE_LEGAL_RISKS_OPTIONS
        }
    },
    computed: {
        ...mapState({
            justiceData: state => state.dueDiligence.justiceData
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
.legal-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
.legal-form .el-form-item.single-row {
    display: block;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
