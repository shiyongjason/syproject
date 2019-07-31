<template>
    <div class="jd-manage">
        <p v-show="isdisabled && type">已提交 {{updateTime}} {{updateUser}} </p>
        <el-collapse
            v-model="activeName"
            accordion
            @change="onChange"
        >
            <el-collapse-item name="1">
                <template slot="title">
                    <p class="titlt-p">组织尽调评估及KPI</p>
                </template>
                <!--start-->
                <p class="small-title">1、组织尽调评估</p>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">评估项</div>
                        <div class="table-col">合作目标</div>
                        <div class="table-col"><span class="red-span">*</span>结论(必填)</div>
                        <div class="table-col">备注</div>
                    </div>
                    <div
                        class="table-row"
                        v-for="(item,index) in dueOrganizationAssessmentCreateFormList"
                        :key="index"
                    >
                        <div class="table-col">{{item.assessmentItem}}</div>
                        <div class="table-col">
                            {{item.cooperationTarget}}
                            <i v-if="index === 1">w</i>
                            <i v-if="index === 2">%</i>
                            <i v-if="index === 4">%</i>
                        </div>
                        <div class="table-col">
                            <el-select
                                v-model="item.state"
                                placeholder="请选择"
                                :disabled="isdisabled"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="table-col">
                            <el-input
                                v-model="item.remark"
                                placeholder="请输入内容"
                                :disabled="isdisabled"
                                maxlength="25"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <p class="small-title">2、KPI(必填)</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-row">
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">
                                <span class="red-span">*</span>实际控制人社会风评：
                            </div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="actualControllerSocialId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in reviewOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">
                                <span class="red-span">*</span>实际控制人对公司的掌控力：
                            </div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="actualCompanyControllerId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in controlOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="flex-wrap-box">
                            <div class="flex-wrap-title">
                                <span class="red-span">*</span>组织稳定性：
                            </div>
                            <div class="flex-wrap-cont">
                                <el-select
                                    v-model="organizationalStabilityId"
                                    placeholder="请选择"
                                    :disabled="isdisabled"
                                >
                                    <el-option
                                        v-for="item in stableOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="small-title">3、分析报告(必填)</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>风险揭示：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="6"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="riskDisclosure"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>分析描述：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="6"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="analysisDescription"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <!--end-->
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <p class="titlt-p">实际控制人评估(必填)</p>
                </template>
                <p class="small-title">1、个人简介</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>概况：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="actualControllerOverview"
                                maxlength="250"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>底线和禁区：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="actualControllerBaseline"
                                maxlength="250"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>个人风格和喜好：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="actualControllerHobby"
                                maxlength="250"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <p class="small-title">2、综合评估</p>
                <div class="table-flex">
                    <div class="table-row">
                        <div class="table-col">评估维度</div>
                        <div class="table-col">描述</div>
                        <div class="table-col">评分</div>
                    </div>
                    <template v-for="(item,index) in dueOrganizationControllerAssessmentCreateFormList">
                        <div
                            :key="index"
                            class="table-row"
                            v-if="index==0"
                        >
                            1、道德风险因素
                        </div>

                        <div
                            :key="index"
                            class="table-row"
                            v-if="index==4"
                        >
                            2、心理风险因素
                        </div>
                        <div
                            :key="index"
                            class="table-row"
                            v-if="index==6"
                        >
                            3、经营能力
                        </div>
                        <div
                            :key="index"
                            class="table-row"
                            v-if="index==8"
                        >
                           4、 社会关系
                        </div>
                        <div class="table-row" :key="'debtList'+item.type+index">
                            <div class="table-col">
                                <span class="red-span">*</span>
                                {{item.assessmentDimension}}
                            </div>
                            <div class="table-col">
                                <el-input
                                    :disabled="isdisabled"
                                    v-model="item.description"
                                    placeholder="请输入内容"
                                    maxlength="250"
                                ></el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    :disabled="isdisabled"
                                    v-model="item.score"
                                    @keyup.native.stop="percentInteget(index, $event, 'dueOrganizationControllerAssessmentCreateFormList', 'score')"
                                    placeholder="满分40"
                                ></el-input>
                            </div>
                        </div>
                    </template>
                    <div class="table-row">
                        <div class="table-col">
                            <span class="red-span">*</span>综合评分（自动计算）
                        </div>
                        <div class="table-col">-</div>
                        <div class="table-col">{{actualControllerScore}}</div>
                    </div>
                </div>
                <div
                    ref="radarChart2"
                    style="width:600px;height:550px;"
                ></div>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <p class="titlt-p">组织评估</p>
                </template>
                <p class="small-title">1、公司历程和业发展</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>公司历程和业务发展：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                maxlength="1000"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="companyHistoryBusiness"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <p class="small-title">2、组织架构</p>
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>在职人数：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder
                                maxlength="25"
                                :disabled="isdisabled"
                                v-model="incumbency"
                                @keyup.native.stop="integer('incumbency', $event)"
                            ></el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>在职人员平均薪资：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder
                                maxlength="25"
                                :disabled="isdisabled"
                                v-model="averageSalaryOnJob"
                                @keyup.native.stop="averageSalaryOnJobInteger('averageSalaryOnJob', $event)"
                            >
                                <template slot="suffix">元</template>
                            </el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>缴纳社保人数：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                placeholder
                                maxlength="25"
                                :disabled="isdisabled"
                                v-model="socialSecurityNum"
                                @keyup.native.stop="integer('socialSecurityNum', $event)"
                            ></el-input>
                        </div>
                    </div>
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>是否签订用人合同：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-select
                                v-model="isSignEmployment"
                                placeholder="请选择"
                                :disabled="isdisabled"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <p class="small-small-p">高管结构</p>
                <div class="flex-wrap-col supplier">
                    <div class="table-flex">
                        <div class="table-row">
                            <div class="table-col"><span class="red-span">*</span>职位</div>
                            <div class="table-col"><span class="red-span">*</span>姓名</div>
                            <div class="table-col"><span class="red-span">*</span>岗位职责</div>
                            <div class="table-col"><span class="red-span">*</span>人员情况</div>
                        </div>
                        <div
                            class="table-row"
                            v-for="(item,index) in dueOrganizationSeniorCreateFormList"
                            :key="index"
                        >
                            <div class="table-col">
                                <el-input
                                    placeholder="请输入职位"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.position"
                                ></el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder="请输入姓名"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.name"
                                ></el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder="请输入岗位职责"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.positionDuty"
                                ></el-input>
                            </div>
                            <div class="table-col">
                                <!-- <textarea
                                width="100%"
                                    placeholder="请输入人员情况"
                                    maxlength="500"
                                    v-model="item.personnelSituation"
                                ></textarea > -->
                                <el-input
  type="textarea"
  :rows="1"
 :autosize="{ minRows: 1, maxRows: 1}"
  placeholder="请输入人员情况"
    :disabled="isdisabled"
  v-model="item.personnelSituation">
</el-input>
                            </div>
                            <i
                                class="el-icon-circle-plus-outline pointer"
                                v-show="!isdisabled"
                                v-if="index==0"
                                @click="onAddperson()"
                            ></i>
                            <i
                                class="el-icon-remove-outline pointer"
                                v-show="!isdisabled"
                                @click="onDeletperson(index)"
                                v-else
                            ></i>
                        </div>
                    </div>
                </div>
                <p class="small-small-p">岗位分布</p>
                <div class="flex-wrap-col">
                    <div class="table-flex">
                        <div class="table-row">
                            <div class="table-col">岗位</div>
                            <div class="table-col">人数</div>
                            <div class="table-col">百分比</div>
                        </div>
                        <div
                            class="table-row"
                            v-for="(item,index) in dueOrganizationPostCreateFormList"
                            :key="index"
                        >
                            <div class="table-col">
                                <span class="red-span">*</span>
                                {{item.post}}
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.proportion"
                                    @keyup.native.stop="oninteger2(index, $event, 'dueOrganizationPostCreateFormList', 'proportion')"
                                >
                                    <template slot="suffix">人</template>
                                </el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.percentage"
                                    @keyup.native.stop="oninteger(index, $event, 'dueOrganizationPostCreateFormList', 'percentage')"
                                >
                                    <template slot="suffix">%</template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="small-small-p">综合评估(必填)</p>
                <div class="flex-wrap-col">
                    <div class="table-flex">
                        <div class="table-row">
                            <div class="table-col">评估维度</div>
                            <div class="table-col">描述</div>
                            <div class="table-col">评分</div>
                        </div>

                        <div
                            class="table-row"
                            v-for="(item,index) in dueOrganizationOrgAssessmentCreateFormList"
                            :key="index"
                        >
                            <div class="table-col">
                                <span class="red-span">*</span>
                                {{item.assessmentDimension}}
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder="请输入"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.description"
                                ></el-input>
                            </div>
                            <div class="table-col">
                                <el-input
                                    placeholder="满分40分"
                                    maxlength="25"
                                    :disabled="isdisabled"
                                    v-model="item.score"
                                    @keyup.native.stop="percentInteget(index, $event, 'dueOrganizationOrgAssessmentCreateFormList', 'score')"
                                    @change.native.stop="percentInteget(index, $event, 'dueOrganizationOrgAssessmentCreateFormList', 'score')"
                                ></el-input>
                            </div>
                        </div>
                        <div class="table-row">
                            <div class="table-col">
                                <span class="red-span">*</span>综合评分（自动计算）
                            </div>
                            <div class="table-col">-</div>
                            <div class="table-col">
                                {{organizationScore}}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref="radarChart"
                    style="width:600px;height:550px;"
                ></div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <p class="titlt-p">合作动机及风险评估</p>
                </template>
                <!--start-->
                <p class="small-title">1、合作初衷</p>
                <div class="flex-wrap-col">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>合作初衷：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="cooperationIntention"
                                maxlength="250"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <p class="small-title">2、合作风险</p>
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>合作风险：
                        </div>
                        <div class="flex-wrap-cont">
                            <div class="block">
                                <el-rate
                                    v-model="cooperationRisk"
                                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                    :disabled="isdisabled"
                                ></el-rate>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>企业优势：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                maxlength="250"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="companyAdvantage"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div class="flex-wrap-row">
                    <div class="flex-wrap-box">
                        <div class="flex-wrap-title">
                            <span class="red-span">*</span>企业短板：
                        </div>
                        <div class="flex-wrap-cont">
                            <el-input
                                type="textarea"
                                style="width:600px"
                                maxlength="250"
                                rows="4"
                                :disabled="isdisabled"
                                placeholder="请输入内容"
                                v-model="companyShortBoard"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <!--end-->
            </el-collapse-item>
        </el-collapse>
        <div
            class="flex-wrap-row top20"
            v-show="!isdisabled"
        >
            <el-col
                :span="2"
                :offset="6"
            >
                <el-button
                    type="info"
                    @click="onSaveOrganize"
                >保存</el-button>
            </el-col>
            <el-col
                :span="2"
                :offset="1"
            >
                <el-button
                    type="primary"
                    @click="onSubmit"
                >提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { addOrganization, getOrganization, updateOrganization } from '../api/index.js'
import { mapState } from 'vuex'
import echarts from 'echarts'
import { plusOrMinus } from '../../../rules.js'
export default {
    props: {
        roleType: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            type: false,
            input: '',
            isdisabled: false,
            activeName: '1',
            reviewOptions: [{ value: '', label: '请选择' }, { value: 0, label: '优' }, { value: 1, label: '良' }, { value: 2, label: '差' }],
            controlOptions: [{ value: '', label: '请选择' }, { value: 0, label: '绝对掌控' }, { value: 1, label: '中等掌控' }, { value: 2, label: '一般掌控' }],
            stableOptions: [{ value: '', label: '请选择' }, { value: 0, label: '高' }, { value: 1, label: '中' }, { value: 2, label: '低' }],
            options: [{ value: '', label: '请选择' }, { value: 0, label: '是' }, { value: 1, label: '否' }],
            seniorObj: { name: '', personnelSituation: '', position: '', positionDuty: '' },
            dueOrganizationAssessmentCreateFormList: [], // 组织尽调评估
            dueOrganizationControllerAssessmentCreateFormList: [], // 控制人综合评估
            dueOrganizationOrgAssessmentCreateFormList: [], // 组织综合评估
            dueOrganizationSeniorCreateFormList: [], // 高管结构
            dueOrganizationPostCreateFormList: [], // 岗位分部
            actualControllerSocialId: '',
            actualCompanyControllerId: '',
            organizationalStabilityId: '', // 稳定性
            riskDisclosure: '', // 风险提示
            actualControllerScore: '',
            organizationScore: '',
            analysisDescription: '', // 分析描述
            actualControllerOverview: '', // 实际控制人概况
            actualControllerBaseline: '', // 底线
            actualControllerHobby: '', // 爱好
            companyHistoryBusiness: '', // 公司历程和业务发展
            incumbency: '', // 在职人数
            averageSalaryOnJob: '', // 在职人员平均薪资
            socialSecurityNum: '', // 缴纳社保人数
            isSignEmployment: '', // 是否签订用人合同
            cooperationRisk: 1, // 合作风险
            cooperationIntention: '', // 合作初衷
            companyShortBoard: '', // 企业短板
            companyAdvantage: '', // 企业优势
            deleted: 0,
            createUser: '',
            applyId: '',
            dueOrganizationId: '', // 组织尽调id 第二次编辑调用update
            id: '',
            operationNode: '',
            radarChart: '',
            radarChartData: [],
            radartValueOfData: [],
            radarChartData2: [],
            radartValueOfData2: [],
            updateTime: '',
            updateUser: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.init()
    },
    methods: {
        init () {
            this.applyId = this.$route.query.applyId
            this.getOrganization()
            // const _this = this
            // window.onresize = function () {
            //     _this.radarChart.resize()
            // }
        },
        onChange (activeNames) {
            if (activeNames === '2') {
                this.drawRadar(1)
            }
            if (activeNames === '3') {
                this.drawRadar(2)
            }
        },
        drawRadar (i) {
            let indicator, value, text
            if (i === 1) {
                this.radarChart = echarts.init(this.$refs.radarChart2)
                indicator = this.radarChartData2
                value = this.radartValueOfData2
                text = '经营人评估'
            }
            if (i === 2) {
                this.radarChart = echarts.init(this.$refs.radarChart)
                indicator = this.radarChartData
                value = this.radartValueOfData
                text = '组织评估'
            }
            this.radarChart.setOption({
                title: {
                    text,
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
                    indicator
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value,
                            name: '经营人评估'
                        }
                    ]
                }]
            })
        },
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            }
            return false
        },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        oninteger (i, e, v, d) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this[v][i][d] = e.target.value
        },
        oninteger2 (i, e, v, d) {
            // 验证整数
            e.target.value = (e.target.value).match(/^[0-9]\d*$/)
            this[v][i][d] = e.target.value
        },
        percentInteget (i, e, v, d) {
            console.log(plusOrMinus(e.target.value))
            e.target.value = plusOrMinus(e.target.value.toString())
            if (e.target.value > 40) e.target.value = 40
            if (e.target.value < 0) e.target.value = 0
            this[v][i][d] = e.target.value
        },
        integer (v, e) {
            // 验证正整数
            e.target.value = (e.target.value).match(/^[0-9]\d*$/)
            this[v] = e.target.value
        },
        averageSalaryOnJobInteger (v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this[v] = e.target.value
        },
        async getOrganization () {
            const { data } = await getOrganization(this.applyId)
            if (!data.data.operationNode) {
                this.isdisabled = (!!data.data.operationNode) || !this.roleType
            } else {
                this.isdisabled = (!!data.data.operationNode)
            }
            this.type = !!data.data.operationNode
            this.updateTime = data.data.updateTime
            this.updateUser = data.data.updateUser
            this.dueOrganizationAssessmentCreateFormList = data.data.dueOrganizationAssessmentVoList
            this.dueOrganizationControllerAssessmentCreateFormList = data.data.dueOrganizationControllerAssessmentVoList
            this.dueOrganizationPostCreateFormList = data.data.dueOrganizationPostVoList
            this.dueOrganizationOrgAssessmentCreateFormList = data.data.dueOrganizationOrgAssessmentVoList
            data.data.dueOrganizationOrgAssessmentVoList.map(item => {
                this.radartValueOfData.push(item.score)
            })
            this.radarChartData = data.data.dueOrganizationOrgAssessmentVoList.map(item => {
                return { name: item.assessmentDimension, max: Math.max.apply(null, this.radartValueOfData) }
            })
            data.data.dueOrganizationControllerAssessmentVoList.map(item => {
                this.radartValueOfData2.push(item.score)
            })
            this.radarChartData2 = data.data.dueOrganizationControllerAssessmentVoList.map(item => {
                return { name: item.assessmentDimension, max: Math.max.apply(null, this.radartValueOfData2) }
            })
            this.dueOrganizationSeniorCreateFormList = data.data.dueOrganizationSeniorVoList
            // 新增进入 赋值一个高管结构一个{}
            if (this.dueOrganizationSeniorCreateFormList.length === 0) {
                this.$set(this.dueOrganizationSeniorCreateFormList, this.dueOrganizationSeniorCreateFormList.length, this.seniorObj)
            }
            this.id = data.data.id
            this.actualCompanyControllerId = data.data.actualCompanyControllerId
            this.actualControllerBaseline = data.data.actualControllerBaseline
            this.actualControllerHobby = data.data.actualControllerHobby
            this.actualControllerOverview = data.data.actualControllerOverview
            this.actualControllerScore = data.data.actualControllerScore
            this.actualControllerSocialId = data.data.actualControllerSocialId
            this.analysisDescription = data.data.analysisDescription
            this.averageSalaryOnJob = data.data.averageSalaryOnJob
            this.companyAdvantage = data.data.companyAdvantage
            this.companyHistoryBusiness = data.data.companyHistoryBusiness
            this.companyShortBoard = data.data.companyShortBoard
            this.cooperationIntention = data.data.cooperationIntention
            this.cooperationRisk = data.data.cooperationRisk
            this.incumbency = data.data.incumbency
            this.isSignEmployment = data.data.isSignEmployment
            this.organizationScore = data.data.organizationScore
            this.organizationalStabilityId = data.data.organizationalStabilityId
            this.riskDisclosure = data.data.riskDisclosure
            this.socialSecurityNum = data.data.socialSecurityNum
            this.dueOrganizationId = data.data.dueOrganizationId
        },
        onAddperson () {
            // const seniorObj = Object.assign({}, this.seniorObj)
            // const seniorObj = JSON.stringify(this.seniorObj)
            // console.log(seniorObj)
            this.dueOrganizationSeniorCreateFormList.push({ name: '', personnelSituation: '', position: '', positionDuty: '' })
        },
        onDeletperson (index) {
            this.dueOrganizationSeniorCreateFormList.splice(index, 1)
        },
        async onSaveOrganize () {
            const fromdata = {
                actualCompanyControllerId: this.actualCompanyControllerId,
                actualControllerHobby: this.actualControllerHobby,
                actualControllerOverview: this.actualControllerOverview,
                actualControllerScore: this.actualControllerScore,
                actualControllerSocialId: this.actualControllerSocialId,
                analysisDescription: this.analysisDescription,
                applyId: this.applyId,
                actualControllerBaseline: this.actualControllerBaseline,
                averageSalaryOnJob: this.averageSalaryOnJob,
                companyAdvantage: this.companyAdvantage,
                companyHistoryBusiness: this.companyHistoryBusiness,
                companyShortBoard: this.companyShortBoard,
                cooperationIntention: this.cooperationIntention,
                cooperationRisk: this.cooperationRisk,
                createUser: this.userInfo.name,
                dueOrganizationAssessmentCreateFormList: this.dueOrganizationAssessmentCreateFormList,
                dueOrganizationControllerAssessmentCreateFormList: this.dueOrganizationControllerAssessmentCreateFormList,
                dueOrganizationId: this.dueOrganizationId,
                dueOrganizationOrgAssessmentCreateFormList: this.dueOrganizationOrgAssessmentCreateFormList,
                dueOrganizationPostCreateFormList: this.dueOrganizationPostCreateFormList,
                dueOrganizationSeniorCreateFormList: this.dueOrganizationSeniorCreateFormList,
                incumbency: this.incumbency,
                isSignEmployment: this.isSignEmployment,
                organizationScore: this.organizationScore,
                organizationalStabilityId: this.organizationalStabilityId,
                riskDisclosure: this.riskDisclosure,
                socialSecurityNum: this.socialSecurityNum,
                updateUser: this.userInfo.name,
                id: this.id,
                operationNode: 0
            }
            if (this.dueOrganizationId) {
                await updateOrganization(fromdata)
            } else {
                await addOrganization(fromdata)
            }
            this.$message({
                message: '保存成功',
                type: 'success'
            })
            this.$router.go(-1)
        },
        async onSubmit () {
            for (let i = 0; i < this.dueOrganizationAssessmentCreateFormList.length; i++) {
                if (this.dueOrganizationAssessmentCreateFormList[i].state === null || this.dueOrganizationAssessmentCreateFormList[i].state === '') {
                    this.showWarnMsg('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            if (!this.vaildEmpty(this.actualControllerSocialId)) {
                this.showWarnMsg('请选择实际控制人社会风评')
                this.activeName = '1'
                return false
            }
            if (!this.vaildEmpty(this.actualCompanyControllerId)) {
                this.showWarnMsg('请选择实际控制人对公司的掌控力')
                this.activeName = '1'
                return false
            }
            if (!this.vaildEmpty(this.organizationalStabilityId)) {
                this.showWarnMsg('请选择组织稳定性')
                this.activeName = '1'
                return false
            }
            if (!this.riskDisclosure) {
                this.showWarnMsg('请输入风险揭示')
                this.activeName = '1'
                return false
            }
            if (!this.analysisDescription) {
                this.showWarnMsg('请输入分析描述')
                this.activeName = '1'
                return false
            }
            if (!this.actualControllerOverview) {
                this.showWarnMsg('请输入概况')
                this.activeName = '2'
                return false
            }
            if (!this.actualControllerBaseline) {
                this.showWarnMsg('请输入底线和禁区')
                this.activeName = '2'
                return false
            }
            if (!this.actualControllerHobby) {
                this.showWarnMsg('请输入个人风格和喜好')
                this.activeName = '2'
                return false
            }
            for (var i = 0; i < this.dueOrganizationControllerAssessmentCreateFormList.length; i++) {
                console.log(this.dueOrganizationControllerAssessmentCreateFormList)
                if (!(this.dueOrganizationControllerAssessmentCreateFormList[i].score && this.dueOrganizationControllerAssessmentCreateFormList[i].description)) {
                    this.showWarnMsg(`请输入${this.dueOrganizationControllerAssessmentCreateFormList[i].assessmentDimension}`)
                    this.activeName = '2'
                    return false
                }
            }
            if (!this.vaildEmpty(this.actualControllerScore)) {
                this.showWarnMsg('请输入实际控制人综合评分')
                this.activeName = '2'
                return false
            }
            if (!this.vaildEmpty(this.companyHistoryBusiness)) {
                this.showWarnMsg('请输入公司历程和业务发展')
                this.activeName = '3'
                return false
            }
            if (!this.vaildEmpty(this.incumbency)) {
                this.showWarnMsg('请输入在职人数')
                this.activeName = '3'
                return false
            }
            if (!this.vaildEmpty(this.averageSalaryOnJob)) {
                this.showWarnMsg('请输入在职人员平均薪资')
                this.activeName = '3'
                return false
            }
            if (!this.vaildEmpty(this.socialSecurityNum)) {
                this.showWarnMsg('请输入缴纳社保人数')
                this.activeName = '3'
                return false
            }
            if (!this.vaildEmpty(this.isSignEmployment)) {
                this.showWarnMsg('请选择是否签订用人合同')
                this.activeName = '3'
                return false
            }
            // eslint-disable-next-line
            for (var i = 0; i < this.dueOrganizationSeniorCreateFormList.length; i++) {
                if (!(this.dueOrganizationSeniorCreateFormList[i].name && this.dueOrganizationSeniorCreateFormList[i].personnelSituation &&
                    this.dueOrganizationSeniorCreateFormList[i].position && this.dueOrganizationSeniorCreateFormList[i].positionDuty)) {
                    this.showWarnMsg('请输入高管结构')
                    this.activeName = '3'
                    return false
                }
            }
            // eslint-disable-next-line
            for (var i = 0; i < this.dueOrganizationPostCreateFormList.length; i++) {
                if (!(this.dueOrganizationPostCreateFormList[i].proportion && this.dueOrganizationPostCreateFormList[i].percentage)) {
                    this.showWarnMsg(`请输入岗位分布${this.dueOrganizationPostCreateFormList[i].post}`)
                    this.activeName = '3'
                    return false
                }
            }
            // eslint-disable-next-line
            for (var i = 0; i < this.dueOrganizationOrgAssessmentCreateFormList.length; i++) {
                if (!(this.dueOrganizationOrgAssessmentCreateFormList[i].description && this.dueOrganizationOrgAssessmentCreateFormList[i].score)) {
                    this.showWarnMsg(`请输入综合评估${this.dueOrganizationOrgAssessmentCreateFormList[i].assessmentDimension}`)
                    this.activeName = '3'
                    return false
                }
            }
            if (!this.vaildEmpty(this.organizationScore)) {
                this.showWarnMsg('请输入组织评估综合得分')
                this.activeName = '3'
                return false
            }
            if (!this.vaildEmpty(this.cooperationIntention)) {
                this.showWarnMsg('请输入合作初衷')
                this.activeName = '4'
                return false
            }
            if (!this.vaildEmpty(this.cooperationRisk)) {
                this.showWarnMsg('请选择合作风险')
                this.activeName = '4'
                return false
            }
            if (!this.vaildEmpty(this.companyAdvantage)) {
                this.showWarnMsg('请输入企业优势')
                this.activeName = '4'
                return false
            }
            if (!this.vaildEmpty(this.companyShortBoard)) {
                this.showWarnMsg('请输入企业短板')
                this.activeName = '4'
                return false
            }
            const fromdata = {
                actualCompanyControllerId: this.actualCompanyControllerId,
                actualControllerHobby: this.actualControllerHobby,
                actualControllerOverview: this.actualControllerOverview,
                actualControllerScore: this.actualControllerScore,
                actualControllerSocialId: this.actualControllerSocialId,
                analysisDescription: this.analysisDescription,
                applyId: this.applyId,
                actualControllerBaseline: this.actualControllerBaseline,
                averageSalaryOnJob: this.averageSalaryOnJob,
                companyAdvantage: this.companyAdvantage,
                companyHistoryBusiness: this.companyHistoryBusiness,
                companyShortBoard: this.companyShortBoard,
                cooperationIntention: this.cooperationIntention,
                cooperationRisk: this.cooperationRisk,
                createUser: this.userInfo.name,
                dueOrganizationAssessmentCreateFormList: this.dueOrganizationAssessmentCreateFormList,
                dueOrganizationControllerAssessmentCreateFormList: this.dueOrganizationControllerAssessmentCreateFormList,
                dueOrganizationId: this.dueOrganizationId,
                dueOrganizationOrgAssessmentCreateFormList: this.dueOrganizationOrgAssessmentCreateFormList,
                dueOrganizationPostCreateFormList: this.dueOrganizationPostCreateFormList,
                dueOrganizationSeniorCreateFormList: this.dueOrganizationSeniorCreateFormList,
                incumbency: this.incumbency,
                isSignEmployment: this.isSignEmployment,
                organizationScore: this.organizationScore,
                organizationalStabilityId: this.organizationalStabilityId,
                riskDisclosure: this.riskDisclosure,
                socialSecurityNum: this.socialSecurityNum,
                updateUser: this.userInfo.name,
                id: this.id,
                operationNode: 1
            }
            if (this.dueOrganizationId) {
                await updateOrganization(fromdata)
            } else {
                await addOrganization(fromdata)
            }
            this.$message({
                message: '提交成功',
                type: 'success'
            })
            this.$router.go(-1)
        }
    },
    watch: {
        dueOrganizationControllerAssessmentCreateFormList: {
            handler (val) {
                this.actualControllerScore = 0
                val.map((item, index) => {
                    if (index === 0 || index === 1) {
                        this.actualControllerScore += +item.score * 0.4
                    } else if (index === 2 || index === 3) {
                        this.actualControllerScore += +item.score * 0.1
                    } else if (index === 4) {
                        this.actualControllerScore += +item.score * 0.5
                    } else if (index === 5 || index === 6 || index === 7) {
                        this.actualControllerScore += +item.score * 0.25
                    } else {
                        this.actualControllerScore += +item.score * 0.125
                    }
                })
                this.actualControllerScore = (this.actualControllerScore).toFixed(2)
            },
            deep: true
        },
        dueOrganizationOrgAssessmentCreateFormList: {
            handler (val) {
                this.organizationScore = 0
                val.map((item, index) => {
                    if (index === 0 || index === 1 || index === 6) {
                        this.organizationScore += (+item.score) * 0.5
                    } else {
                        this.organizationScore += (+item.score) * 0.25
                    }
                })
                this.organizationScore = (this.organizationScore).toFixed(2)
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.jd-manage {
    padding: 0 15px;
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
.el-checkbox {
    margin-right: 20px;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
}
.supplier {
    // border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    // padding-top: 25px;
    margin-bottom: 20px;
    > i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
    .table-row {
        position: relative;
        &:not(:first-child) {
            border-right: none !important;
        }
        > i {
            position: absolute;
            top: 10px;
            right: -50px;
            font-size: 20px;
        }
    }
}
</style>
<style scoped>
.flex-wrap-title {
    max-width: 200px;
    min-width: 180px;
}
</style>
