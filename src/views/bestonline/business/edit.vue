<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" :rules="rules" ref="form" label-width="160px">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title-p">商业尽调评估及KPI</p>
                    </template>
                    <!--start-->
                    <p class="small-title">1、商业尽调评估</p>
                    <table class="assessmentTable">
                        <thead>
                            <tr>
                                <td class="assessmentRow">评估项</td>
                                <td class="assessmentRow">合作目标</td>
                                <td class="assessmentRow"><span class="red-word">*</span>结论</td>
                                <td class="assessmentRow">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.dueBusinessAssessmentCreateFormList" :key=index>
                                <td>{{item.assessmentItem}}</td>
                                <td>{{item.cooperationIntention}}
                                    <i v-if="index === 1">w</i>
                                    <i v-if="index === 2">%</i>
                                    <i v-if="index === 4">%</i>
                                </td>
                                <td>
                                    <el-select v-model="item.state" placeholder="请选择">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td :rowspan="form.dueBusinessAssessmentCreateFormList.length" v-if="index == 0">
                                    <el-input type="textarea" row='30' placeholder="请输入内容" v-model="item.remark">
                                    </el-input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small-title ">2、KPI(必填)</p>
                    <div class="form-cont-row mb20">
                        <div class="form-cont-col">
                            <el-form-item label="批发:零售:工程占比：" :prop="(form.wholesaleShare==''||form.wholesaleShare==null)?'wholesaleShare':(form.retailShare==''||form.retailShare==null)?'retailShare':'projectShare'">
                                <el-input class="proportionKPI" v-model="form.wholesaleShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="form.retailShare"></el-input><span class="KPISymbol">:</span>
                                <el-input class="proportionKPI" v-model="form.projectShare"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-cont-col">
                            <el-form-item label="上年销售业绩：" prop="salesPerformanceLastYear">
                                <el-input v-model="form.salesPerformanceLastYear">
                                    <template slot="suffix">万</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <p class="small-title ">3、分析报告(必填)</p>
                    <el-form-item label="风险揭示：" prop="riskDisclosure" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入内容" v-model="form.riskDisclosure"></el-input>
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6" placeholder="请输入内容" v-model="form.analysisDescription"></el-input>
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

        <div class="flex-wrap-row top20">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSaveBus">保存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { addBusiness, putBusiness } from '../api/index.js'
import { DOWN_OPTIONS } from './const'
import BusinessMode from './components/businessMode.vue'
import MarketingModel from './components/marketingModel.vue'
import Supplier from './components/supplier.vue'
import Customer from './components/customer.vue'
import Members from './components/members.vue'
import Competitor from './components/competitor.vue'
import Plan from './components/plan.vue'
import SalesPerformance from './components/salesPerformance.vue'
import { mapState } from 'vuex'
export default {
    components: {
        BusinessMode, MarketingModel, SalesPerformance, Supplier, Customer, Members, Competitor, Plan
    },
    data () {
        return {
            activeName: '9',
            options: DOWN_OPTIONS,
            rules: {
                wholesaleShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                retailShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                projectShare: [
                    { required: true, message: '请输入批发:零售:工程占比', trigger: 'blur' }
                ],
                salesPerformanceLastYear: [
                    { required: true, message: '请输入上年销售业绩', trigger: 'blur' }
                ],
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
                    { required: true, message: '请输入业态占比', trigger: 'blur' }
                ],
                mainCategoryOneId: [
                    { required: true, message: '请选择主营品类', trigger: 'blur' }
                ],
                categoryOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' }
                ],
                mainBrandOneName: [
                    { required: true, message: '请输入主营品牌', trigger: 'blur' }
                ],
                brandOneSalesRatio: [
                    { required: true, message: '请输入销售比重', trigger: 'blur' }
                ],
                supplierName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                isProvideContract: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                purchaseAmount: [
                    { required: true, message: '请输入采购金额', trigger: 'blur' }
                ],
                proportion: [
                    { required: true, message: '请输入占比', trigger: 'blur' }
                ],
                health: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                switchDate: [
                    { type: 'date', required: false, message: '请选择日期', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.applyId = this.$route.query.applyId
        this.nowMonth = (new Date()).getMonth()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.businessData
        })
    },
    methods: {
        async onSaveBus () {
            if (this.dueBusinessId) {
                await putBusiness(this.form)
            } else {
                await addBusiness(this.form)
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            })
            // this.$router.go(-1)
        },
        async onSubmit () {
            for (const i of this.form.dueBusinessAssessmentCreateFormList) {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            for (const i of this.form.dueBusinessCustomerCreateFormList) {
                if (i.categoryId === null || i.categoryId === '') {
                    this.$message.warning('请选择品类')
                    this.activeName = '6'
                    return false
                } else if (i.customerName === null || i.customerName === '') {
                    this.$message.warning('请输入客户名称')
                    this.activeName = '6'
                    return false
                } else if (i.brandName === null || i.brandName === '') {
                    this.$message.warning('请输入品牌')
                    this.activeName = '6'
                    return false
                } else if (i.salesFee === null || i.salesFee === '') {
                    this.$message.warning('请输入销售金额')
                    this.activeName = '6'
                    return false
                } else if (i.salesProportion === null || i.salesProportion === '') {
                    this.$message.warning('请输入销售占比')
                    this.activeName = '6'
                    return false
                }
            }
            // console.log(this.form.publicityPromotionChannels)
            // this.form.publicityPromotionChannels = this.form.publicityPromotionChannels.join(',')
            // this.form.dueBusinessFuturePlanCreateForm.businessCategory = this.form.dueBusinessFuturePlanCreateForm.businessCategory.join(',')
            // this.form.dueBusinessFuturePlanCreateForm.serviceCategory = this.form.dueBusinessFuturePlanCreateForm.serviceCategory.join(',')
            const createUser = JSON.parse(sessionStorage.getItem('user_data')).name
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.dueBusinessId) {
                        await putBusiness({
                            id: this.id,
                            operationNode: 1,
                            createUser: createUser,
                            ...this.form
                        })
                        this.$message.success('提交成功')
                    } else {
                        await addBusiness({
                            operationNode: 1,
                            createUser: createUser,
                            ...this.form
                        })
                        this.$message.success('提交成功')
                    }
                }
            })
            // this.publicityPromotionChannels = this.checkedCities.join(',')
            // this.dueBusinessSaleCreateFormList[0].currentYearSales = this.currentYearAllSales
            // this.dueBusinessSaleCreateFormList[0].lastYearSales = this.lastYearAllSales
            // this.dueBusinessSaleCreateFormList[0].lastTwoYearSales = this.lastTwoYearAllSales
            // this.$router.go(-1)
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
.assessmentTable {
    margin: 15px;
}
.assessmentRow {
    width: calc(100% / 4);
    height: 36px;
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
    width: 50px;
}
.KPISymbol {
    margin-left: 10px;
}
/deep/ .supplierSymbol .el-input {
    width: 100%;
}
</style>