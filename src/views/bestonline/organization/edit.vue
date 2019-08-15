<template>
    <div class="jd-manage">
        <el-collapse
            v-model="activeName"
            accordion
            @change="onChange"
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
            >
                <KPI />
                <Controller />
                <Organization />
                <MotivationRisk />
            </el-form>
        </el-collapse>
        <div class="flex-wrap-row top20">
            <el-col
                :span="2"
                :offset="6"
            >
                <el-button
                    type="info"
                    @click="onSaveOrganize"
                >暂存</el-button>
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
import { addOrganization, updateOrganization } from '../api/index.js'
import { mapState } from 'vuex'
import echarts from 'echarts'
import KPI from './components/kpi.vue'
import Controller from './components/controller.vue'
import Organization from './components/organization.vue'
import MotivationRisk from './components/motivationRisk.vue'
import { IsPositiveInteger } from '@/utils/rules'
export default {
    components: {
        KPI, Controller, Organization, MotivationRisk
    },
    props: {
        applyId: {
            type: Number
        }
    },
    data () {
        return {
            activeName: '1',
            rules: {
                actualControllerOverview: [
                    { required: true, message: '请输入概况', trigger: 'blur' }
                ],
                actualControllerBaseline: [
                    { required: true, message: '请输入底线和禁区', trigger: 'blur' }
                ],
                actualControllerHobby: [
                    { required: true, message: '请输入个人风格和喜好', trigger: 'blur' }
                ],
                companyHistoryBusiness: [
                    { required: true, message: '请输入公司历程和业务发展', trigger: 'blur' }
                ],
                incumbency: [
                    { required: true, message: '请输入在职人数', trigger: 'blur' },
                    { validator: IsPositiveInteger, message: '在职人数只能输入正整数' }
                ],
                averageSalaryOnJob: [
                    // TODO: 这个校验要看看怎么做
                    { required: true, message: '请输入在职人员平均薪资', trigger: 'blur' }
                ],
                socialSecurityNum: [
                    { required: true, message: '请输入缴纳社保人数', trigger: 'blur' },
                    { validator: IsPositiveInteger, message: '缴纳社保人数只能输入正整数' }
                ],
                isSignEmployment: [
                    { required: true, message: '请输入是否签订用人合同', trigger: 'blur' }
                ],
                cooperationIntention: [
                    { required: true, message: '请输入合作初衷', trigger: 'blur' }
                ],
                cooperationRisk: [
                    { required: true, message: '请设置合作风险', trigger: 'change' }
                ],
                companyAdvantage: [
                    { required: true, message: '请填写企业优势', trigger: 'blur' }
                ],
                companyShortBoard: [
                    { required: true, message: '请填写企业短板', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.organizationData
        })
    },
    methods: {
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
        async onSaveOrganize () {
            this.form.operationNode = 0
            this.form.applyId = this.applyId
            if (this.form.dueOrganizationId) {
                await updateOrganization(this.form)
            } else {
                await addOrganization(this.form)
            }
            this.$message({
                message: '暂存成功',
                type: 'success'
            })
            this.$router.go(-1)
        },
        onSubmit () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.form.operationNode = 1
                    this.form.applyId = this.applyId
                    if (this.form.dueOrganizationId) {
                        await updateOrganization(this.form)
                    } else {
                        await addOrganization(this.form)
                    }
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    })
                    this.$router.go(-1)
                }
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
.red-span {
    color: red;
}
.assessmentDimension-title {
    width: 320px;
    text-align: center;
}
</style>
