<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
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
                            <label class="el-form-item__label label200">实际控制人社会风评：</label>
                            <div class="el-form-item__content content200">{{form.actualControllerSocialId}}</div>
                        </div>
                        <div>
                            <label class="el-form-item__label label200">实际控制人对公司的掌控力：</label>
                            <div class="el-form-item__content content200">{{form.actualCompanyControllerId}}</div>
                        </div>
                        <div>
                            <label class="el-form-item__label label200">组织稳定性：</label>
                            <div class="el-form-item__content content200">{{form.organizationalStabilityId}}</div>
                        </div>
                    </div>
                    <div class="organization-form mt20">
                        <div>
                            <label class="el-form-item__label label200">组织综合评分：</label>
                            <div class="el-form-item__content content200">{{form.organizationScore}}</div>
                        </div>
                        <div>
                            <label class="el-form-item__label label200">实际控制人综合评分：</label>
                            <div class="el-form-item__content content200">{{form.actualControllerScore}}</div>
                        </div>
                    </div>
                </div>
                <p class="small-title">分析报告(必填)</p>
                <div class="item-wrapper">
                    <div>
                        <label class="el-form-item__label label150">风险揭示：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.riskDisclosure}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">分析描述：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.analysisDescription}}</div>
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
                        <label class="el-form-item__label label150">概况：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.actualControllerOverview}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">底线和禁区：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.actualControllerBaseline}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">个人风格和喜好：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.actualControllerHobby}}</div>
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
                            <td :colspan="item.isTitle ? 3 : 1" style="text-align: left">
                                <div style="width: 180px;text-align: center">{{item.assessmentDimension}}</div>
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
                        <label class="el-form-item__label label200">公司历程和业务发展：</label>
                        <div class="el-form-item__content content200" style="width: 600px;">{{form.companyHistoryBusiness}}</div>
                    </div>
                </div>
                <p class="small-title">组织架构</p>
                <div class="organization-form item-wrapper">
                    <div>
                        <label class="el-form-item__label label150">在职人数：</label>
                        <div class="el-form-item__content content150">{{form.incumbency}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">在职人员平均薪资：</label>
                        <div class="el-form-item__content content150">
                            <span v-if="form.averageSalaryOnJob">{{form.averageSalaryOnJob}}元</span>
                        </div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">缴纳社保人数：</label>
                        <div class="el-form-item__content content150">{{form.socialSecurityNum}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">是否签订用人合同：</label>
                        <div class="el-form-item__content content150">{{form.isSignEmployment}}</div>
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
                        <tr v-for="(item, index) in form.dueOrganizationSeniorCreateFormList" :key="index">
                            <td>{{item.position}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.positionDuty}}</td>
                            <td>{{item.personnelSituation}}</td>
                        </tr>
                        <tr v-if="!form.dueOrganizationSeniorCreateFormList || form.dueOrganizationSeniorCreateFormList.length === 0">
                            <td colspan="4">暂无数据</td>
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
                            <td>
                                <span v-if="item.proportion">{{item.proportion}}人</span>
                            </td>
                            <td>
                                <span v-if="item.percentage">{{item.percentage}}%</span>
                            </td>
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
                        <label class="el-form-item__label label150">合作初衷：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.cooperationIntention}}</div>
                    </div>
                </div>
                <p class="small-title">合作风险</p>
                <div class="item-wrapper">
                    <div>
                        <label class="el-form-item__label label150">合作风险：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">
                            <el-rate v-model="form.cooperationRisk" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled style="line-height: 50px"></el-rate>
                        </div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">企业优势：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.companyAdvantage}}</div>
                    </div>
                    <div>
                        <label class="el-form-item__label label150">企业短板：</label>
                        <div class="el-form-item__content content150" style="width: 600px;">{{form.companyShortBoard}}</div>
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
import echarts from 'echarts'
export default {
    props: {
        applyId: {
            type: Number
        }
    },
    data () {
        return {
            activeName: '1',
            chartList: []
        }
    },
    computed: {
        controllerRadarData () {
            const controllerAssessment = this.form.dueOrganizationControllerAssessmentCreateFormList
            return controllerAssessment ? controllerAssessment.filter(item => !item.isTitle).map(item => !item.score || isNaN(item.score) ? 0 : item.score) : []
        },
        controllerRadarIndicator () {
            return this.chartList.map(item => {
                return { name: item.assessmentDimension, max: Math.max.apply(null, this.controllerRadarData) }
            })
        },
        organizationRadarData () {
            return this.form.dueOrganizationOrgAssessmentCreateFormList.map(item => !item.score || isNaN(item.score) ? 0 : item.score)
        },
        organizationRadarIndicator () {
            return this.form.dueOrganizationOrgAssessmentCreateFormList.map(item => {
                return { name: item.assessmentDimension, max: Math.max.apply(null, this.organizationRadarData) }
            })
        },
        ...mapState({
            form: state => state.dueDiligence.organizationData
        }),
        debtTotal () {
            const debtArr = this.debtList.map(item => item.debt)
            const result = debtArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        },
        assureTotal () {
            const assureArr = this.assureList.map(item => item.money)
            const result = assureArr.reduce((itemA, itemB) => (itemA - 0) + (itemB - 0), 0)
            return isNaN(result) ? '' : result
        }
    },
    watch: {
        form (form) {
            if (form.dueOrganizationAssessmentCreateFormList) {
                form.dueOrganizationAssessmentCreateFormList = form.dueOrganizationAssessmentCreateFormList.map(item => {
                    item.state = this.switchValueToLabel(YES_NO_STATUS, item.state)
                    return item
                })
            }
            form.actualControllerSocialId = this.switchValueToLabel(SOCIAL_REVIEW_OPTIONS, form.actualControllerSocialId)
            form.actualCompanyControllerId = this.switchValueToLabel(CONTROLL_OPTIONS, form.actualCompanyControllerId)
            form.organizationalStabilityId = this.switchValueToLabel(STABLE_OPTIONS, form.organizationalStabilityId)
            form.isSignEmployment = this.switchValueToLabel(YES_NO_STATUS, form.isSignEmployment)
            let controllerAssessments = form.dueOrganizationControllerAssessmentCreateFormList
            if (controllerAssessments && controllerAssessments.length > 0) {
                this.chartList = JSON.parse(JSON.stringify(controllerAssessments))
                controllerAssessments.splice(0, 0, { assessmentDimension: '基本情况', isTitle: true })
                controllerAssessments.splice(4, 0, { assessmentDimension: '道德风险因素', isTitle: true })
                controllerAssessments.splice(9, 0, { assessmentDimension: '心理风险因素', isTitle: true })
                controllerAssessments.splice(12, 0, { assessmentDimension: '经营能力', isTitle: true })
                controllerAssessments.splice(15, 0, { assessmentDimension: '社会关系', isTitle: true })
            }
        },
        activeName (activeName) {
            if (activeName == '2') {
                this.drawRadar('controller')
            }
            if (activeName == '3') {
                this.drawRadar('organization')
            }
        }
    },
    methods: {
        switchValueToLabel (options, value) {
            const filterOptions = options.filter(item => item.value === value)
            return filterOptions && filterOptions.length > 0 ? filterOptions[0].label : ''
        },
        drawRadar (type) {
            let props = {}
            if (type == 'controller') {
                props = {
                    text: '控制人评估',
                    indicator: this.controllerRadarIndicator,
                    value: this.controllerRadarData
                }
                this.radarChart = echarts.init(this.$refs.radarChart2)
            } else {
                props = {
                    text: '组织评估',
                    indicator: this.organizationRadarIndicator,
                    value: this.organizationRadarData
                }
                this.radarChart = echarts.init(this.$refs.radarChart)
            }
            this.radarChart.setOption({
                title: {
                    text: props.text,
                    left: 'center'
                },
                tooltip: {},
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                radar: {
                    name: {
                        textStyle: {
                            color: '#000',
                            borderRadius: 3,
                            padding: [10, 10]
                        }
                    },
                    indicator: props.indicator
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: props.value,
                            name: props.text
                        }
                    ]
                }]
            })
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
.label150 {
    width: 150px;
}
.label200 {
    width: 200px;
}
.content150 {
    margin-left: 150px;
    width: 224px;
}
.content200 {
    margin-left: 200px;
    width: 224px;
}
</style>
