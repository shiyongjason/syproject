<template>
<el-collapse-item name="1">
    <template slot="title">
        <p class="titlt-p">法务尽调评估及KPI</p>
    </template>
    <!--start-->
    <p class="small-title">法务尽调评估</p>
    <basicTable
        :tableLabel="tableLabel"
        :tableData="justiceData.assessmentList"
        :tableAttr="tableAttr">
        <template slot="state" slot-scope="scope">
            <el-select v-model="scope.data.row.state" placeholder="请选择结论">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
            </el-select>
        </template>
        <template slot="remark" slot-scope="scope">
            <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="scope.data.row.remark"></el-input>
        </template>
    </basicTable>
    <p class="small-title mt10">KPI(必填)</p>
    <el-form v-if="justiceData.affairs" :model="justiceData.affairs" :rules="affairsRules" label-position="right"
        label-width="250px" class="legal-form">
        <el-form-item label="尽调公司法律风险：" prop="legalRisksOfCompany">
            <el-select v-model="justiceData.affairs.legalRisksOfCompany" placeholder="请选择结论">
                <el-option v-for="item in companyLegalRisksOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="实际控制人法律风险：" prop="legalRisksOfController">
            <el-select v-model="justiceData.affairs.legalRisksOfController" placeholder="请选择结论">
                <el-option v-for="item in controllerLegalRisksOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="实际控制人配偶法律风险：" prop="legalRisksOfControllerMate" class="single-row">
            <el-select v-model="justiceData.affairs.legalRisksOfControllerMate" placeholder="请选择结论">
                <el-option v-for="item in controllerMateLegalRisksOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="个人经营性借款及担保总额：" prop="personalOperatingloansTotalGuarantees">
            <el-input v-model="justiceData.affairs.personalOperatingloansTotalGuarantees" placeholder="请输入借款及担保总额">
                <template slot="suffix">万</template>
            </el-input>
        </el-form-item>
        <el-form-item label="公司借款及担保总额：" prop="companyLoanTotalGuarantee">
            <el-input v-model="justiceData.affairs.companyLoanTotalGuarantee" placeholder="请输入借款及担保总额">
                <template slot="suffix">万</template>
            </el-input>
        </el-form-item>
    </el-form>
    <p class="small-title">分析报告</p>
    <el-form v-if="justiceData.affairs" :model="justiceData.affairs" :rules="analysisRules" label-position="top">
        <el-form-item label="风险揭示：" prop="riskDisclosure">
            <el-input
                type="textarea"
                style="width:600px"
                rows="3"
                placeholder="请输入内容"
                v-model="justiceData.affairs.riskDisclosure" >
            </el-input>
        </el-form-item>
        <el-form-item label="分析描述：" prop="analysisDescription">
            <el-input
                type="textarea"
                style="width:600px"
                rows="3"
                placeholder="请输入内容"
                v-model="justiceData.affairs.analysisDescription">
            </el-input>
        </el-form-item>
    </el-form>
    <!--end-->
</el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import { COMPANY_LEGAL_RISKS_OPTIONS, CONTROLLER_LEGAL_RISKS_OPTIONS, CONTROLLER_MATE_LEGAL_RISKS_OPTIONS } from '../const'

export default {
    name: 'justice_kpi',
    data () {
        return {
            companyLegalRisksOptions: COMPANY_LEGAL_RISKS_OPTIONS,
            controllerLegalRisksOptions: CONTROLLER_LEGAL_RISKS_OPTIONS,
            controllerMateLegalRisksOptions: CONTROLLER_MATE_LEGAL_RISKS_OPTIONS,
            tableLabel: [
                { label: '评估项', prop: 'assessmentItem', width: '50px' },
                { label: '合作目标', prop: 'cooperationTarget' },
                { label: '结论(必填)', prop: 'state' },
                { label: '备注', prop: 'remark' }
            ],
            tableAttr: {
                'span-method': function ({ row, column, rowIndex, columnIndex }) {
                    if (columnIndex === 3) {
                        if (rowIndex === 0) {
                            return [5, 1]
                        } else {
                            return [0, 0]
                        }
                    }
                }
            },
            affairsRules: {
                legalRisksOfCompany: [
                    { required: true, message: '尽调公司法律风险不能为空', trigger: 'change' }
                ],
                legalRisksOfController: [
                    { required: true, message: '实际控制人法律风险不能为空', trigger: 'change' }
                ],
                legalRisksOfControllerMate: [
                    { required: true, message: '实际控制人配偶法律风险不能为空', trigger: 'change' }
                ],
                personalOperatingloansTotalGuarantees: [
                    { required: true, message: '请输入个人经营性借款及担保总额', trigger: 'blur' }
                ],
                companyLoanTotalGuarantee: [
                    { required: true, message: '请输入公司借款及担保总额 ', trigger: 'blur' }
                ]
            },
            analysisRules: {
                riskDisclosure: [
                    { required: true, message: '风险揭示不能为空', trigger: 'blur' }
                ],
                analysisDescription: [
                    { required: true, message: '分析描述不能为空', trigger: 'blur' }
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
.legal-form {
    flex-direction: row;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
}
.legal-form .el-form-item {
    display: inline-block;
}
.legal-form .el-form-item.single-row {
    display: block;
}
/deep/ .el-table .cell.el-tooltip {
    white-space: normal;
}
/deep/ .textHeight {
    textarea {
        height: 337px;
        border: 0;
    }
}
.small-title{
    margin-bottom: 20px;
}
</style>
