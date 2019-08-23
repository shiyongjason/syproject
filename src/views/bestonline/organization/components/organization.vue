<template>
    <el-collapse-item name="3">
        <template slot="title">
            <p class="title-p">组织评估</p>
        </template>
        <p class="small-title">公司历程和业发展</p>
        <div class="item-wrapper">
            <el-form-item label="公司历程和业务发展：" label-width="200px" prop="companyHistoryBusiness">
                <el-input type="textarea" rows="6" style="width:600px" v-model="form.companyHistoryBusiness" placeholder="请输入公司历程和业务发展">
                </el-input>
            </el-form-item>
        </div>
        <p class="small-title">组织架构</p>
        <div class="organization-form item-wrapper">
            <el-form-item label="在职人数：" label-width="200px" prop="incumbency">
                <el-input v-model="form.incumbency" placeholder="请输入在职人数" maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="在职人员平均薪资：" label-width="200px" prop="averageSalaryOnJob">
                <el-input v-model="form.averageSalaryOnJob" placeholder="请输入在职人员平均薪资" maxlength="25">
                    <template slot="suffix">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="缴纳社保人数：" label-width="200px" prop="socialSecurityNum">
                <el-input v-model="form.socialSecurityNum" placeholder="请输入缴纳社保人数" maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="是否签订用人合同：" label-width="200px" prop="isSignEmployment">
                <el-select v-model="form.isSignEmployment" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <p class="small-small-p">高管结构</p>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="180"><span class="red-span">*</span>职位</td>
                    <td width="180"><span class="red-span">*</span>姓名</td>
                    <td width="180"><span class="red-span">*</span>岗位职责</td>
                    <td width="180"><span class="red-span">*</span>人员情况</td>
                    <td width="180">操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in organizationSeniorList" :key="index">
                    <td>
                        <el-form-item :prop="`dueOrganizationSeniorCreateFormList[${index}].position`"
                            :rules="{ required: true, message: '请输入职位', trigger: 'blur' }">
                            <el-input v-model="item.position" placeholder="请输入职位" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationSeniorCreateFormList[${index}].name`"
                            :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
                            <el-input v-model="item.name" placeholder="请输入姓名" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationSeniorCreateFormList[${index}].positionDuty`"
                            :rules="{ required: true, message: '请输入岗位职责', trigger: 'blur' }">
                            <el-input v-model="item.positionDuty" placeholder="请输入岗位职责" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationSeniorCreateFormList[${index}].personnelSituation`"
                            :rules="{ required: true, message: '请输入岗位职责', trigger: 'blur' }">
                            <el-input type="textarea" :rows="1" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入人员情况" v-model="item.personnelSituation"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <i class="el-icon-circle-plus-outline pointer" v-if="index==0" @click="onAddPerson()"></i>
                        <i class="el-icon-remove-outline pointer" @click="onRemovePerson(index)" v-else></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-small-p">岗位分布</p>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="320">岗位</td>
                    <td width="320">人数</td>
                    <td width="320">百分比</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.dueOrganizationPostCreateFormList" :key="index">
                    <td>
                        <span class="red-span">*</span>
                        {{item.post}}
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationPostCreateFormList[${index}].proportion`"
                            :rules="{ required: true, message: '请输入人数', trigger: 'blur' }">
                            <el-input placeholder maxlength="25" v-model="item.proportion" @change="onChangeProportion">
                                <template slot="suffix">人</template>
                            </el-input>
                        </el-form-item>
                    </td>
                    <td>
                        {{item.percentage}}%
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="small-small-p">综合评估(必填)</p>
        <table class="custom-table">
            <thead>
                <tr>
                    <td width="320">评估维度</td>
                    <td width="320">描述</td>
                    <td width="320">评分</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.dueOrganizationOrgAssessmentCreateFormList" :key="index">
                    <td>
                        <span class="red-span">*</span>
                        {{item.assessmentDimension}}
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationOrgAssessmentCreateFormList[${index}].description`"
                            :rules="{ required: true, message: '请输入描述', trigger: 'blur' }">
                            <el-input v-model="item.description" placeholder="请输入" maxlength="25"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item :prop="`dueOrganizationOrgAssessmentCreateFormList[${index}].score`"
                            :rules="{ required: true, message: '请输入分数', trigger: 'blur' }">
                            <el-input v-model="item.score" placeholder="满分40分" maxlength="25" @change="onChangeScore"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td><span class="red-span">*</span>综合评分（自动计算）</td>
                    <td>-</td>
                    <td>{{ organizationScore }}</td>
                </tr>
            </tfoot>
        </table>
        <div ref="radarChart" style="width:600px;height:550px;"></div>
    </el-collapse-item>
</template>

<script>
import { YES_NO_STATUS } from '../../const'
import { mapState } from 'vuex'
import echarts from 'echarts'
const weightMap = new Map([
    ['社会责任', 0.5],
    ['使命、战略、目标', 0.5],
    ['结构&组织', 0.25],
    ['关系&流程', 0.25],
    ['酬劳&激励', 0.25],
    ['支持&工具', 0.25],
    ['管理&领导', 0.5]
])
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            options: YES_NO_STATUS,
            defaultOrganizationSenior: {
                position: '',
                name: '',
                positionDuty: '',
                personnelSituation: ''
            }
        }
    },
    computed: {
        organizationSeniorList () {
            let organizationSeniorList = this.form.dueOrganizationSeniorCreateFormList
            if (!organizationSeniorList) {
                organizationSeniorList = []
            }
            if (organizationSeniorList.length == 0) {
                let defaultObj = JSON.parse(JSON.stringify(this.defaultOrganizationSenior))
                organizationSeniorList.push(defaultObj)
            }
            this.$set(this.form, 'dueOrganizationSeniorCreateFormList', organizationSeniorList)
            return organizationSeniorList
        },
        organizationScore () {
            const organizationAssessment = this.form.dueOrganizationOrgAssessmentCreateFormList
            let total = 0
            if (!organizationAssessment) {
                return ''
            }
            organizationAssessment.forEach(item => {
                total += item.score * weightMap.get(item.assessmentDimension)
            })
            return isNaN(total) ? '' : total
        },
        radarValueOfData () {
            return this.form.dueOrganizationOrgAssessmentCreateFormList.map(item => isNaN(item.score) ? 0 : item.score)
        },
        radarChartData () {
            return this.form.dueOrganizationOrgAssessmentCreateFormList.map(item => {
                return { name: item.assessmentDimension, max: Math.max.apply(null, this.radarValueOfData) }
            })
        },
        ...mapState({
            form: state => state.dueDiligence.organizationData
        })
    },
    watch: {
        isShow (val) {
            val && this.drawRadar()
        },
        organizationScore (val) {
            this.form.organizationScore = val
        }
    },
    methods: {
        onChangeProportion () {
            const organizationPostList = this.form.dueOrganizationPostCreateFormList
            let total = 0
            organizationPostList.forEach(item => {
                total += item.proportion - 0
            })
            if (isNaN(total)) {
                return ''
            }
            this.form.dueOrganizationPostCreateFormList = organizationPostList.map(item => {
                item.percentage = isNaN(total) ? '' : Math.round((item.proportion - 0) / total * 100)
                return item
            })
        },
        onAddPerson () {
            this.form.dueOrganizationSeniorCreateFormList.push(JSON.parse(JSON.stringify(this.defaultOrganizationSenior)))
        },
        onRemovePerson (index) {
            this.form.dueOrganizationSeniorCreateFormList.splice(index, 1)
        },
        onChangeScore () {
            this.drawRadar()
        },
        drawRadar () {
            this.radarChart = echarts.init(this.$refs.radarChart)
            this.radarChart.setOption({
                title: {
                    text: '组织评估',
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
                            name: '组织评估'
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
    td {
        .el-input {
            width: 100%;
        }
        /deep/ .el-input__inner {
            border: none;
        }
        /deep/.el-textarea__inner {
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
.pointer {
    cursor: pointer;
}
/deep/ .el-collapse-item__wrap {
    padding: 15px 0;
}
</style>
