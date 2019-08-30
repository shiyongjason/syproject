<template>
    <el-collapse-item name="1">
        <template slot="title">
            <p class="title-p">组织尽调评估及KPI</p>
        </template>
        <p class="small-title">组织尽调评估</p>
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
                <tr v-for="(item,index) in form.dueOrganizationAssessmentCreateFormList" :key="index">
                    <td>{{item.assessmentItem}}</td>
                    <td>
                        {{item.cooperationTarget}}
                        <i v-if="index === 1">w</i>
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationAssessmentCreateFormList[${index}].state`"
                            :rules="{required: true, message: '此项为必填项！', trigger: 'change'}">
                            <el-select v-model="item.state" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </td>
                    <td :rowspan="form.dueOrganizationAssessmentCreateFormList.length" v-if="index === 0">
                        <el-input type="textarea" :rows="8" placeholder="请输入内容" maxlength="25" v-model="item.remark">
                        </el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-title">KPI(必填)</p>
        <div class="item-wrapper">
            <div class="organization-form">
                <el-form-item label="实际控制人社会风评：" label-width="250px" prop="actualControllerSocialId">
                    <el-select v-model="form.actualControllerSocialId" placeholder="请选择">
                        <el-option v-for="item in reviewOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实际控制人对公司的掌控力：" label-width="250px" prop="actualCompanyControllerId">
                    <el-select v-model="form.actualCompanyControllerId" placeholder="请选择">
                        <el-option v-for="item in controlOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织稳定性：" label-width="250px" prop="organizationalStabilityId">
                    <el-select v-model="form.organizationalStabilityId" placeholder="请选择">
                        <el-option v-for="item in stableOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="organization-form mt20">
                <el-form-item label="组织综合评分：" label-width="250px">
                    <p style="width: 224px">{{ form.organizationScore }}</p>
                </el-form-item>
                <el-form-item label="实际控制人综合评分：" label-width="250px">
                    <p style="width: 224px">{{ form.actualControllerScore }}</p>
                </el-form-item>
            </div>
        </div>
        <p class="small-title">分析报告(必填)</p>
        <div class="item-wrapper">
            <el-form-item label="风险揭示：" label-width="100px" prop="riskDisclosure">
                <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入内容" v-model="form.riskDisclosure"></el-input>
            </el-form-item>
            <el-form-item label="分析描述：" label-width="100px" prop="analysisDescription">
                <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入内容" v-model="form.analysisDescription"></el-input>
            </el-form-item>
        </div>
    </el-collapse-item>
</template>

<script>
import { YES_NO_STATUS } from '../../const'
import { SOCIAL_REVIEW_OPTIONS, CONTROLL_OPTIONS, STABLE_OPTIONS } from '../const'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            options: YES_NO_STATUS,
            reviewOptions: SOCIAL_REVIEW_OPTIONS,
            controlOptions: CONTROLL_OPTIONS,
            stableOptions: STABLE_OPTIONS
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.organizationData
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
    td {
        /deep/ .el-input__inner {
            border: none;
        }
        /deep/ .el-textarea__inner {
            border: none;
            resize: none;
        }
    }
}
.organization-form {
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
table {
    /deep/ .el-form-item__error {
        position: relative;
        text-align: left;
        padding-left: 10px;
    }
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
