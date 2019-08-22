<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="title-p">组织尽调评估及KPI</p>
                </template>
                <p class="small-title">组织尽调评估</p>
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
                        <tr v-for="(item, index) in form.dueOrganizationAssessmentCreateFormList" :key="index">
                            <td>{{item.assessmentItem}}</td>
                            <td>
                                {{item.cooperationTarget}}
                                <i v-if="index === 1">w</i>
                                <i v-if="index === 2">%</i>
                                <i v-if="index === 4">%</i>
                            </td>
                            <td>
                                {{item.state}}
                            </td>
                            <td :rowspan="form.dueOrganizationAssessmentCreateFormList.length" v-if="index === 0">
                                {{item.remark}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="small-title">KPI(必填)</p>
                <div class="item-wrapper">
                    <div class="organization-form">
                        <el-form-item label="实际控制人社会风评：" label-width="250px" prop="actualControllerSocialId">
                            {{form.actualControllerSocialId}}
                        </el-form-item>
                        <el-form-item label="实际控制人对公司的掌控力：" label-width="250px" prop="actualCompanyControllerId">
                            {{form.actualCompanyControllerId}}
                        </el-form-item>
                        <el-form-item label="组织稳定性：" label-width="250px" prop="organizationalStabilityId">
                            {{form.organizationalStabilityId}}
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
                        {{form.riskDisclosure}}
                    </el-form-item>
                    <el-form-item label="分析描述：" label-width="100px" prop="analysisDescription">
                        {{form.analysisDescription}}
                    </el-form-item>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <p class="title-p">实际控制人评估(必填)</p>
                </template>
                <p class="small-title">个人简介</p>
                <div class="item-wrapper">
                    <el-form-item label="概况：" label-width="150px" prop="actualControllerOverview">
                        {{form.actualControllerOverview}}
                    </el-form-item>
                    <el-form-item label="底线和禁区：" label-width="150px" prop="actualControllerBaseline">
                        {{form.actualControllerBaseline}}
                    </el-form-item>
                    <el-form-item label="个人风格和喜好：" label-width="150px" prop="actualControllerHobby">
                        {{form.actualControllerHobby}}
                    </el-form-item>
                </div>
                <p class="small-title">综合评估</p>
                <table class="item-wrapper">
                    <thead>
                        <tr>
                            <td width="180">评估维度</td>
                            <td width="500">描述</td>
                            <td width="80">评分</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.dueOrganizationControllerAssessmentCreateFormList" :key="index">
                            <td :colspan="item.isTitle ? 3 : 1">
                                {{item.assessmentDimension}}
                            </td>
                            <td v-if="!item.isTitle">
                                {{item.description}}
                            </td>
                            <td v-if="!item.isTitle">
                                {{item.score}}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><span class="red-span">*</span>综合评分（自动计算）</td>
                            <td>-</td>
                            <td>{{ form.actualControllerScore }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div ref="radarChart2" style="width:600px;height:550px;"></div>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <p class="title-p">组织评估</p>
                </template>
                <p class="small-title">公司历程和业发展</p>
                <div class="item-wrapper">
                    <el-form-item label="公司历程和业务发展：" label-width="200px" prop="companyHistoryBusiness">
                        {{form.companyHistoryBusiness}}
                    </el-form-item>
                </div>
                <p class="small-title">组织架构</p>
                <div class="organization-form item-wrapper">
                    <el-form-item label="在职人数：" label-width="200px" prop="incumbency">
                        {{form.incumbency}}
                    </el-form-item>
                    <el-form-item label="在职人员平均薪资：" label-width="200px" prop="averageSalaryOnJob">
                        {{form.averageSalaryOnJob}}元
                    </el-form-item>
                    <el-form-item label="缴纳社保人数：" label-width="200px" prop="socialSecurityNum">
                        {{form.socialSecurityNum}}
                    </el-form-item>
                    <el-form-item label="是否签订用人合同：" label-width="200px" prop="isSignEmployment">
                        {{form.isSignEmployment}}
                    </el-form-item>
                </div>
                <p class="small-small-p">高管结构</p>
                <table class="item-wrapper">
                    <thead>
                        <tr>
                            <td width="180"><span class="red-span">*</span>职位</td>
                            <td width="180"><span class="red-span">*</span>姓名</td>
                            <td width="180"><span class="red-span">*</span>岗位职责</td>
                            <td width="180"><span class="red-span">*</span>人员情况</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in organizationSeniorList" :key="index">
                            <td>{{item.position}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.positionDuty}}</td>
                            <td>{{item.personnelSituation}}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="small-small-p">岗位分布</p>
                <table class="item-wrapper">
                    <thead>
                        <tr>
                            <td width="320">岗位</td>
                            <td width="320">人数</td>
                            <td width="320">百分比</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.dueOrganizationPostCreateFormList" :key="index">
                            <td>{{item.post}}</td>
                            <td>{{item.proportion}}人</td>
                            <td>{{item.percentage}}%</td>
                        </tr>
                    </tbody>
                </table>
                <p class="small-small-p">综合评估(必填)</p>
                <table class="item-wrapper">
                    <thead>
                        <tr>
                            <td width="320">评估维度</td>
                            <td width="320">描述</td>
                            <td width="320">评分</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.dueOrganizationOrgAssessmentCreateFormList" :key="index">
                            <td>{{item.assessmentDimension}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.score}}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><span class="red-span">*</span>综合评分（自动计算）</td>
                            <td>-</td>
                            <td>{{ form.organizationScore }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div ref="radarChart" style="width:600px;height:550px;"></div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <p class="title-p">合作动机及风险评估</p>
                </template>
                <p class="small-title">合作初衷</p>
                <div class="item-wrapper">
                    <el-form-item label="合作初衷：" label-width="100px" prop="cooperationIntention">
                        {{form.cooperationIntention}}
                    </el-form-item>
                </div>
                <p class="small-title">合作风险</p>
                <div class="item-wrapper">
                    <el-form-item label="合作风险：" label-width="100px" prop="cooperationRisk">
                        <el-rate v-model="form.cooperationRisk" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate>
                    </el-form-item>
                    <el-form-item label="企业优势：" label-width="100px" prop="companyAdvantage">
                        {{form.companyAdvantage}}
                    </el-form-item>
                    <el-form-item label="企业短板：" label-width="100px" prop="companyShortBoard">
                        {{form.companyShortBoard}}
                    </el-form-item>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        applyId: {
            type: Number
        }
    },
    data () {
        return {
            activeName: '1'
        }
    },
    computed: {
        ...mapState({
            form: state => state.dueDiligence.organizationData
        })
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.flex-wrap-title {
    max-width: 200px;
    min-width: 180px;
}

.jd-manage {
    padding: 0 15px;
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
}
.organization-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.organization-table {
    margin: 20px;
}
.red-span {
    color: red;
}
.assessmentDimension-title {
    width: 320px;
    text-align: center;
}
</style>
