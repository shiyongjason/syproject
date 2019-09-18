<template>
    <div class="jd-manage">
        <p v-if="form.operationNode==1">已提交 {{form.updateTime}} {{ form.updateUser}} </p>
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" :rules="rules" ref="form" label-width="160px">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title-p">商业尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <p class="small-title">1、商业尽调评估</p>
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <td width="25%">评估项</td>
                                <td width="25%">合作目标</td>
                                <td width="25%"><span class="red-word">*</span>结论</td>
                                <td width="25%">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.dueBusinessAssessmentCreateFormList" :key=index>
                                <td>{{item.assessmentItem}}</td>
                                <td>{{item.cooperationIntention}}
                                    <i v-if="index === 1">w</i>
                                </td>
                                <td>
                                    <el-form-item :prop="`dueBusinessAssessmentCreateFormList[${index}].state`" :rules="rules.state" label-width="0">
                                        <el-select v-model="item.state" placeholder="请选择">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td :rowspan="form.dueBusinessAssessmentCreateFormList.length" v-if="index == 0" width="80px">
                                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows:10 }" placeholder="请输入备注信息" v-model="item.remark">
                                    </el-input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small-title ">2、KPI(必填)</p>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col proportionKPI">
                            <el-form-item label="批发:零售:工程占比：" prop="share">
                                <el-input class="" v-model="form.wholesaleShare" maxlength="27"></el-input><span class="KPISymbol">:</span>
                                <el-input v-model="form.retailShare" maxlength="27"></el-input><span class="KPISymbol">:</span>
                                <el-input v-model="form.projectShare" maxlength="27"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="上年销售业绩：">
                                <el-input v-model="form.salesPerformanceLastYear" disabled>
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <p class="small-title ">3、分析报告(必填)</p>
                    <el-form-item label="风险揭示：" prop="riskDisclosure" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入风险揭示" v-model="form.riskDisclosure"></el-input>
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入分析描述" v-model="form.analysisDescription"></el-input>
                    </el-form-item>
                    <!--end-->
                </el-collapse-item>
                <!-- 业务模式 -->
                <BusinessMode />
                <!-- 销售业绩(含税)（万元） -->
                <SalesPerformance />
                <!-- 营销模式 -->
                <MarketingModel />
                <!-- 上游-供应商结构 -->
                <Supplier />
                <!-- 下游-客户结构 -->
                <Customer />
                <!-- 门店/会员店 -->
                <Members />
                <!-- 竞争对手 -->
                <Competitor />
                <!-- 新合资公司规划 -->
                <Plan />
            </el-form>
        </el-collapse>

        <div class="jd-bottom" :class="isCollapse?'minLeft':'maxLeft'">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSaveBus" v-if="hosAuthCheck(draftAuthCode)">暂存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSubmit" v-if="hosAuthCheck(commitAuthCode)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { addBusiness, putBusiness } from '../api/index.js'
import { YES_NO_STATUS_COPY } from '../const'
import BusinessMode from './components/businessMode.vue'
import MarketingModel from './components/marketingModel.vue'
import Supplier from './components/supplier.vue'
import Customer from './components/customer.vue'
import Members from './components/members.vue'
import Competitor from './components/competitor.vue'
import Plan from './components/plan.vue'
import SalesPerformance from './components/salesPerformance.vue'
import { mapState, mapActions } from 'vuex'
import { IsPositiveInteger, IsFixedTwoNumber, Money } from '@/utils/rules'
import { AUTH_BESTONLINE_REVIEW_BUSINESS_DRAFT, AUTH_BESTONLINE_REVIEW_BUSINESS_COMMIT } from '@/utils/auth_const'
import { kpiValidProps, businessModelValidProps, UpstreamSupplierStructureValidProps, NewJointVenturePlanningValidProps } from './const.js'
export default {
    components: {
        BusinessMode, MarketingModel, SalesPerformance, Supplier, Customer, Members, Competitor, Plan
    },
    data () {
        return {
            activeName: '1',
            options: YES_NO_STATUS_COPY,
            rules: {
                share: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            var Reg = /^[0-9]+(.[0-9]{1,2})?$/
                            if (this.form.wholesaleShare == '') {
                                return callback(new Error('请输入批发:零售:工程占比'))
                            }
                            if (this.form.retailShare == '') {
                                return callback(new Error('请输入批发:零售:工程占比'))
                            }
                            if (this.form.projectShare == '') {
                                return callback(new Error('请输入批发:零售:工程占比'))
                            }
                            if (!Reg.test(this.form.wholesaleShare) || !Reg.test(this.form.retailShare) || !Reg.test(this.form.projectShare)) {
                                return callback(new Error('可以输入有两位小数的正实数'))
                            }
                            return callback()
                        }
                    }
                ],
                // salesPerformanceLastYear: [
                //     { required: true, message: '请输入上年销售业绩', trigger: 'blur' }
                // ],
                riskDisclosure: [
                    { required: true, message: '请输入风险揭示', trigger: 'blur' }
                ],
                analysisDescription: [
                    { required: true, message: '请输入分析描述', trigger: 'blur' }
                ],
                mainBusinessFormatOneId: [
                    { required: true, message: '请选择主营业态', trigger: 'change' }
                ],
                businessFormatOneRatio: [
                    { required: true, message: '请输入业态占比', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                businessFormatTwoRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                businessFormatTwoThreeRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                mainCategoryOneId: [
                    { required: true, message: '请选择主营品类', trigger: 'blur' }
                ],
                categoryOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                categoryTwoSalesRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                mainBrandOneName: [
                    { required: true, message: '请输入主营品牌', trigger: 'blur' }
                ],
                brandOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                brandTwoSalesRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                brandThreeSalesRatio: [
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                supplierName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                isProvideContract: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                health: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                switchDate: [
                    { type: 'date', required: false, message: '请选择日期', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.webServiceCategory': [
                    { type: 'array', required: true, message: '请至少选择一个业务类别', trigger: 'change' }
                ],
                'dueBusinessFuturePlanCreateForm.webBusinessCategory': [
                    { type: 'array', required: true, message: '请至少选择一个经营品类', trigger: 'change' }
                ],
                'dueBusinessFuturePlanCreateForm.manageCategory': [
                    { required: true, message: '请输入说明', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.brandManagement': [
                    { required: true, message: '请输入品牌信息', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.annualSalesScale': [
                    { required: true, message: '请输入年销售规模', trigger: 'blur' },
                    { validator: Money }
                ],
                'dueBusinessFuturePlanCreateForm.netProfitRate': [
                    { required: true, message: '请输入净利润率', trigger: 'blur' },
                    { validator: IsFixedTwoNumber, trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers': [
                    { required: true, message: '请输入下游切换渠道和客户', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.marketingChannelsPlans': [
                    { required: true, message: '请输入市场推广渠道及计划', trigger: 'blur' }
                ],
                'dueBusinessFuturePlanCreateForm.fundingRequirements': [
                    { required: true, message: '请输入资金用款需求', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '此项为必填项！', trigger: 'change' }
                ],
                customerName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                selfStoresNum: [
                    { validator: IsPositiveInteger, message: '请输入正整数', trigger: 'blur' }
                ],
                memberShopNum: [
                    { validator: IsPositiveInteger, message: '请输入正整数', trigger: 'blur' }
                ],
                firstTenMonthsDown: [
                    { required: true, message: '请选择是否下滑', trigger: 'change' }
                ],
                lastYearSales: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ]
            },
            draftAuthCode: AUTH_BESTONLINE_REVIEW_BUSINESS_DRAFT,
            commitAuthCode: AUTH_BESTONLINE_REVIEW_BUSINESS_COMMIT
        }
    },
    mounted () {
        this.nowMonth = (new Date()).getMonth()
    },
    watch: {
        form (form) {
            form.applyId = this.$route.query.applyId
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            isCollapse: state => state.isCollapse,
            form: state => state.dueDiligence.businessData
        })
    },
    methods: {
        ...mapActions({
            findBusinessData: 'findBusinessData'
        }),
        async onSaveBus () {
            const createUser = JSON.parse(sessionStorage.getItem('userInfo')).employeeName
            const publicityPromotionChannels = this.form.publicityPromotionChannels
            this.form.publicityPromotionChannels = publicityPromotionChannels ? (Array.isArray(publicityPromotionChannels) ? publicityPromotionChannels.join(',') : publicityPromotionChannels) : ''
            this.form.dueBusinessFuturePlanCreateForm.businessCategory = this.form.dueBusinessFuturePlanCreateForm.webBusinessCategory.join(',')
            this.form.dueBusinessFuturePlanCreateForm.serviceCategory = this.form.dueBusinessFuturePlanCreateForm.webServiceCategory.join(',')
            this.form.operationNode = 0
            this.form.createUser = createUser
            if (this.form.dueBusinessId) {
                await putBusiness(this.form)
            } else {
                await addBusiness(this.form)
            }
            this.$message.success('暂存成功')
            this.findBusinessData({ applyId: this.$route.query.applyId })
        },
        async onSubmit () {
            const createUser = JSON.parse(sessionStorage.getItem('userInfo')).employeeName
            this.$refs['form'].validate(async (valid, errors) => {
                this.findValidFailIndex(errors)
                if (valid) {
                    if (this.form.publicityPromotionChannels && typeof this.form.publicityPromotionChannels == 'string') {
                        this.form.publicityPromotionChannels = this.form.publicityPromotionChannels.split(',')
                    }
                    this.form.publicityPromotionChannels = this.form.publicityPromotionChannels ? this.form.publicityPromotionChannels.join(',') : ''
                    this.form.dueBusinessFuturePlanCreateForm.businessCategory = this.form.dueBusinessFuturePlanCreateForm.webBusinessCategory && this.form.dueBusinessFuturePlanCreateForm.webBusinessCategory.join(',')
                    this.form.dueBusinessFuturePlanCreateForm.serviceCategory = this.form.dueBusinessFuturePlanCreateForm.webServiceCategory && this.form.dueBusinessFuturePlanCreateForm.webServiceCategory.join(',')
                    if (this.form.dueBusinessId) {
                        await putBusiness({
                            id: this.id,
                            createUser: createUser,
                            ...this.form,
                            operationNode: 1
                        })
                    } else {
                        await addBusiness({
                            createUser: createUser,
                            ...this.form,
                            operationNode: 1
                        })
                    }
                    this.$message.success('提交成功')
                    this.findBusinessData({ applyId: this.$route.query.applyId })
                    this.$router.go(-1)
                }
            })
        },
        findValidFailIndex (errors) {
            const expandKpi = Object.keys(errors).filter(item => {
                const index = item.indexOf('[')
                return kpiValidProps.has(index == -1 ? item : item.substring(0, index))
            }).length > 0
            const expandController = Object.keys(errors).filter(item => {
                const index = item.indexOf('[')
                return businessModelValidProps.has(index == -1 ? item : item.substring(0, index))
            }).length > 0
            const expandOrganization = Object.keys(errors).filter(item => {
                const index = item.indexOf('].') + 2
                return UpstreamSupplierStructureValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            const expandMotivationRisk = Object.keys(errors).filter(item => {
                const index = item.indexOf('.') + 1
                return NewJointVenturePlanningValidProps.has(index == -1 ? item : item.substring(index))
            }).length > 0
            if (expandKpi) {
                this.activeName = '1'
            } else if (expandController) {
                this.activeName = '2'
            } else if (expandOrganization) {
                this.activeName = '5'
            } else if (expandMotivationRisk) {
                this.activeName = '9'
            }
        }
    },
    filters: {
        keepTwoNum: function (val) {
            if (isNaN(val)) {
                val = 0
            }
            val = val * 100
            val = Number(val)
            if (val || val === 0) {
                return val.toFixed(2) + '%'
            } else {
                return '-'
            }
        }
    }
}
</script>
<style lang="scss" >
.jd-manage {
    padding: 0 15px;
    table,
    tr,
    td {
        border: 1px solid #dddddd;
        text-align: center;
        line-height: 40px;
    }
    .lengthen {
        .flex-wrap-box {
            max-width: 600px;
        }
    }
}
.jd-manage {
    textarea {
        border: 1px solid #dddddd;
    }
}
table {
    border-collapse: collapse;
}

.el-checkbox {
    margin-right: 20px;
}
.el-checkbox + .el-checkbox {
    margin-left: 0;
}
.supplier {
    border: 1px solid #dcdcdc;
    position: relative;
    padding-right: 40px;
    padding-top: 25px;
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
            right: -38px;
            font-size: 20px;
        }
    }
}
.flex-wrap-title {
    max-width: 200px;
    min-width: 180px;
}

/deep/ .textHeight {
    textarea {
        height: 210px;
        border: 0;
    }
}
.small-title {
    margin-bottom: 10px;
}
.proportionKPI {
    .el-input {
        width: 60px;
    }
    .el-input__inner {
        padding: 0 2px;
    }
}
.KPISymbol {
    margin-left: 10px;
}
</style>
