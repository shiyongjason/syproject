<template>
    <el-collapse-item name="1">
        <template slot="title">
            <p class="title-p">法务尽调评估及KPI</p>
        </template>
        <!--start-->
        <p class="small-title">法务尽调评估</p>
        <table class="custom-table">
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
                      {{item.state==1?'否':item.state==0?'是':''}}
                    </td>
                    <td :rowspan="justiceData.assessmentList.length" v-if="index === 0">
                      {{item.remark}}
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-title mt10">KPI(必填)</p>
        <div class="item-wrapper legal-form">
            <el-form-item label="尽调公司法律风险：" label-width="250px" prop="affairs.legalRisksOfCompany">
               {{justiceData.affairs.legalRisksOfCompany}}
            </el-form-item>
            <el-form-item label="实际控制人法律风险：" label-width="250px" prop="affairs.legalRisksOfController">
               {{justiceData.affairs.legalRisksOfController}}
            </el-form-item>
            <el-form-item label="实际控制人配偶法律风险：" label-width="250px" prop="affairs.legalRisksOfControllerMate" class="single-row">
                {{justiceData.affairs.legalRisksOfControllerMate}}
            </el-form-item>
            <el-form-item label="个人经营性借款及担保总额：" label-width="250px" prop="affairs.personalOperatingloansTotalGuarantees">
                {{justiceData.affairs.personalOperatingloansTotalGuarantees}}
            </el-form-item>
            <el-form-item label="公司借款及担保总额：" label-width="250px" prop="affairs.companyLoanTotalGuarantee">
               {{justiceData.affairs.companyLoanTotalGuarantee}}
            </el-form-item>
        </div>
        <p class="small-title">分析报告</p>
        <div class="item-wrapper">
            <el-form-item label="风险揭示：" label-width="100px" label-position="top" prop="affairs.riskDisclosure">
              {{justiceData.affairs.riskDisclosure}}
            </el-form-item>
            <el-form-item label="分析描述：" label-width="100px" label-position="top" prop="affairs.analysisDescription">
               {{justiceData.affairs.analysisDescription}}
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
            controllerMateLegalRisksOptions: CONTROLLER_MATE_LEGAL_RISKS_OPTIONS,
            rules: {
                state: [
                    { required: true, message: '此项为必填项！', trigger: 'change' }
                ]
            }
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

.legal-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.red-span {
    color: red;
}
// table {
//     border-collapse: collapse;
// }
// table,
// tr,
// td {
//     border: 1px solid #dddddd;
//     text-align: center;
//     line-height: 40px;
// }
// .legal-form .el-form-item.single-row {
//     display: block;
// }
// /deep/ .el-collapse-item__wrap {
//     padding: 15px 0;
// }
</style>
