<template>
    <el-collapse-item name="2">
        <template slot="title">
            <p class="title-p">实际控制人评估(必填)</p>
        </template>
        <p class="small-title">个人简介</p>
        <div class="item-wrapper">
            <el-form-item label="概况：" label-width="150px" prop="actualControllerOverview">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerOverview" maxlength="250"></el-input>
            </el-form-item>
            <el-form-item label="底线和禁区：" label-width="150px" prop="actualControllerBaseline">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerBaseline" maxlength="250"></el-input>
            </el-form-item>
            <el-form-item label="个人风格和喜好：" label-width="150px" prop="actualControllerHobby">
                <el-input type="textarea" style="width:600px" rows="4" placeholder="请输入内容" v-model="form.actualControllerHobby" maxlength="250"></el-input>
            </el-form-item>
        </div>
        <p class="small-title">综合评估</p>
        <table class="custom-table">
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
                        <span class="red-span" v-if="!item.isTitle">*</span>
                        {{item.assessmentDimension}}
                    </td>
                    <td v-if="!item.isTitle">
                        <el-form-item :prop="`dueOrganizationControllerAssessmentCreateFormList[${index}].description`" :rules="rules.description(item, index)">
                            <el-input v-model="item.description" placeholder="请输入内容" maxlength="250"></el-input>
                        </el-form-item>
                    </td>
                    <td v-if="!item.isTitle">
                        <el-form-item :prop="`dueOrganizationControllerAssessmentCreateFormList[${index}].score`" :rules="rules.score(item, index)">
                            <el-input v-model.number="item.score" :placeholder="`满分${item.fullMarks}`" maxlength="2" @change="onChangeScore(item, item.fullMarks)"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td><span class="red-span">*</span>综合评分（自动计算）</td>
                    <td>-</td>
                    <td>{{ actualControllerScore }}</td>
                </tr>
            </tfoot>
        </table>
        <div ref="radarChart2" style="width:600px;height:550px;"></div>
    </el-collapse-item>
</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
import { IsInteger } from '@/utils/rules'
const weightMap = new Map([
    ['年龄', 0.2],
    ['健康', 0.3],
    ['认知能力', 0.25],
    ['金钱观', 0.2],
    ['诚信度', 0.2],
    ['家庭观', 0.05],
    ['社会贡献', 0.05],
    ['压力分析', 0.25],
    ['投机心理', 0.25],
    ['商业分析', 0.25],
    ['好享家', 0.25],
    ['社会职务', 0.125],
    ['人脉关系', 0.125]
])
const fullMarkMap = new Map([
    ['年龄', 40],
    ['健康', 40],
    ['认知能力', 40],
    ['金钱观', 30],
    ['诚信度', 40],
    ['家庭观', 40],
    ['社会贡献', 20],
    ['压力分析', 30],
    ['投机心理', 30],
    ['商业分析', 25],
    ['好享家', 20],
    ['社会职务', 20],
    ['人脉关系', 40]
])
export default {
    name: 'organization_controller',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            chartList: [],
            rules: {
                description: (item, index) => {
                    return [
                        {
                            validator: (rule, value, callback) => {
                                if (!this.form.dueOrganizationControllerAssessmentCreateFormList[index].description) {
                                    return callback(new Error(`${item.assessmentDimension}为必填项`))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ]
                },
                score: (item, index) => {
                    return [
                        {
                            // 这边的验证很复杂，后台传过来的是null，前端置空后是'',验证时可以填0
                            validator: (rule, value, callback) => {
                                if (!this.form.dueOrganizationControllerAssessmentCreateFormList[index].score) {
                                    return callback(new Error(`${item.assessmentDimension}的评分为必填项`))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        },
                        { validator: IsInteger, trigger: 'blur', message: '分数请输入自然数' }
                    ]
                }
            }
        }
    },
    computed: {
        actualControllerScore () {
            const controllerAssement = this.form.dueOrganizationControllerAssessmentCreateFormList
            if (!controllerAssement || controllerAssement.length == 0) {
                return ''
            }
            let total = 0
            controllerAssement.forEach(item => {
                if (weightMap.get(item.assessmentDimension)) {
                    total += item.score * weightMap.get(item.assessmentDimension)
                }
            })
            return isNaN(total) ? '' : total.toFixed(2)
        },
        radarValueOfData () {
            return this.form.dueOrganizationControllerAssessmentCreateFormList.filter(item => !item.isTitle).map(item => isNaN(item.score) ? 0 : item.score)
        },
        radarChartData () {
            return this.chartList.map(item => {
                return { name: item.assessmentDimension, max: fullMarkMap.get(item.assessmentDimension) }
            })
        },
        ...mapState({
            form: state => state.dueDiligence.organizationData
        })
    },
    watch: {
        actualControllerScore (val) {
            this.form.actualControllerScore = val
        },
        isShow (val) {
            val && this.drawRadar()
        },
        form (organizationData) {
            let controllerAssessments = organizationData.dueOrganizationControllerAssessmentCreateFormList
            if (controllerAssessments && controllerAssessments.length > 0) {
                this.chartList = JSON.parse(JSON.stringify(controllerAssessments))
                controllerAssessments.map(item => {
                    item.fullMarks = fullMarkMap.get(item.assessmentDimension)
                    return item
                })
                controllerAssessments.splice(0, 0, { assessmentDimension: '基本情况', isTitle: true })
                controllerAssessments.splice(4, 0, { assessmentDimension: '道德风险因素', isTitle: true })
                controllerAssessments.splice(9, 0, { assessmentDimension: '心理风险因素', isTitle: true })
                controllerAssessments.splice(12, 0, { assessmentDimension: '经营能力', isTitle: true })
                controllerAssessments.splice(15, 0, { assessmentDimension: '社会关系', isTitle: true })
            }
        }
    },
    methods: {
        onScore (e, score, fullMarks) {
            if (score < fullMarks) e.target.value = score
            if (score > fullMarks) e.target.value = fullMarks
            // console.log(val)
        },
        onChangeScore (item, fullMarks) {
            if (item.score > fullMarks) {
                item.score = fullMarks
            }
            this.drawRadar()
        },
        drawRadar () {
            this.radarChart = echarts.init(this.$refs.radarChart2)
            this.radarChart.setOption({
                title: {
                    text: '经营人评估',
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
                    indicator: this.radarChartData
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: this.radarValueOfData,
                            name: '经营人评估'
                        }
                    ]
                }]
            })
        }
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
    /deep/ .el-input {
        width: 100%;
    }
    /deep/ .el-input__inner {
        border: none;
    }
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
/deep/ .el-form .el-input {
    width: 100%;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
