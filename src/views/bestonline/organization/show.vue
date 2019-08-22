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
                            <td width="180">结论</td>
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
                <p class="small-title">KPI</p>
                <div class="item-wrapper">
                    <div class="organization-form">
                        <div>
                            <label for="">实际控制人社会风评：</label>
                            <span>{{form.actualControllerSocialId}}</span>
                        </div>
                        <div>
                            <label for="">实际控制人对公司的掌控力：</label>
                            <span>{{form.actualCompanyControllerId}}</span>
                        </div>
                        <div>
                            <label for="">组织稳定性：</label>
                            <span>{{form.organizationalStabilityId}}</span>
                        </div>
                    </div>
                    <div class="organization-form mt20">
                        <div>
                            <label for="">组织综合评分：</label>
                            <span>{{form.organizationScore}}</span>
                        </div>
                        <div>
                            <label for="">实际控制人综合评分：</label>
                            <span>{{form.actualControllerScore}}</span>
                        </div>
                    </div>
                </div>
                <p class="small-title">分析报告(必填)</p>
                <div class="item-wrapper">
                    <div>
                        <label for="">风险揭示：</label>
                        <span>{{form.riskDisclosure}}</span>
                    </div>
                    <div>
                        <label for="">分析描述：</label>
                        <span>{{form.analysisDescription}}</span>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <p class="title-p">实际控制人评估(必填)</p>
                </template>
                <p class="small-title">个人简介</p>
                <div class="item-wrapper">
                    <div>
                        <label for="">概况：</label>
                        <span>{{form.actualControllerOverview}}</span>
                    </div>
                    <div>
                        <label for="">底线和禁区：</label>
                        <span>{{form.actualControllerBaseline}}</span>
                    </div>
                    <div>
                        <label for="">个人风格和喜好：</label>
                        <span>{{form.actualControllerHobby}}</span>
                    </div>
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
                    <div>
                        <label for="">公司历程和业务发展：</label>
                        <span>{{form.companyHistoryBusiness}}</span>
                    </div>
                </div>
                <p class="small-title">组织架构</p>
                <div class="organization-form item-wrapper">
                    <div>
                        <label for="">在职人数：</label>
                        <span>{{form.incumbency}}</span>
                    </div>
                    <div>
                        <label for="">在职人员平均薪资：</label>
                        <span>{{form.averageSalaryOnJob}}元</span>
                    </div>
                    <div>
                        <label for="">缴纳社保人数：</label>
                        <span>{{form.socialSecurityNum}}</span>
                    </div>
                    <div>
                        <label for="">是否签订用人合同：</label>
                        <span>{{form.isSignEmployment}}</span>
                    </div>
                </div>
                <p class="small-small-p">高管结构</p>
                <table class="item-wrapper">
                    <thead>
                        <tr>
                            <td width="180">职位</td>
                            <td width="180">姓名</td>
                            <td width="180">岗位职责</td>
                            <td width="180">人员情况</td>
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
                    <div>
                        <label for="">合作初衷：</label>
                        <span>{{form.cooperationIntention}}</span>
                    </div>
                </div>
                <p class="small-title">合作风险</p>
                <div class="item-wrapper">
                    <div>
                        <label for="">合作风险：</label>
                        <el-rate v-model="form.cooperationRisk" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate>
                    </div>
                    <div>
                        <label for="">企业优势：</label>
                        <span>{{form.companyAdvantage}}</span>
                    </div>
                    <div>
                        <label for="">企业短板：</label>
                        <span>{{form.companyShortBoard}}</span>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { YES_NO_STATUS } from '../const'
import { SOCIAL_REVIEW_OPTIONS, CONTROLL_OPTIONS, STABLE_OPTIONS } from './const'
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
    watch: {
        form () {
            this.form.dueOrganizationAssessmentCreateFormList = this.form.dueOrganizationAssessmentCreateFormList.map(item => {
                item.state = YES_NO_STATUS.filter(obj => obj.value === item.state)[0].label
                return item
            })
            this.form.actualControllerSocialId = SOCIAL_REVIEW_OPTIONS.filter(item => item.value === this.form.actualControllerSocialId)[0].label
            this.form.actualCompanyControllerId = CONTROLL_OPTIONS.filter(item => item.value === this.form.actualCompanyControllerId)[0].label
            this.form.organizationalStabilityId = STABLE_OPTIONS.filter(item => item.value === this.form.organizationalStabilityId)[0].label
            this.form.isSignEmployment = YES_NO_STATUS.filter(item => item.value === item.state)[0].label
        }
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
.small-title {
    padding: 10px;
    font-size: 17px;
    line-height: 40px;
    background: #fafafa;
}
</style>
