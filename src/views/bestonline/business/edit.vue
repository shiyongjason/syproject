<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion @change="onChange">
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
                                    <el-select v-model="item.state" placeholder="请选择" >
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td :rowspan="form.dueBusinessAssessmentCreateFormList.length" v-if="index == 0">
                                    <el-input class="textHeight" type="textarea" row='30' placeholder="请输入内容" v-model="item.remark">
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
                        <el-input type="textarea" style="width:600px" rows="6"  placeholder="请输入内容" v-model="form.riskDisclosure"></el-input>
                    </el-form-item>
                    <el-form-item label="分析描述：" prop="analysisDescription" label-width="100px">
                        <el-input type="textarea" style="width:600px" rows="6"  placeholder="请输入内容" v-model="form.analysisDescription"></el-input>
                    </el-form-item>
                    <!--end-->
                </el-collapse-item>
                <!-- 业务模式 -->
                <BusinessMode />
                <!-- 销售业绩(含税)（万元） -->
                <SalesPerformance />
                <!-- <Plan /> -->
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
import { getBusiness, addBusiness, putBusiness } from '../api/index.js'
import { plusOrMinus } from '../../../utils/rules'
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
            activeName: '1',
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
        console.log(this.form)
        this.nowMonth = (new Date()).getMonth()
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            form: state => state.dueDiligence.businessData
        })
    },
    methods: {
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            this[value] = plusOrMinus(e.target.value.toString())
        },
        oninput2 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessSupplierCreateFormList[i][v] = e.target.value
        },
        oninput3 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessCustomerCreateFormList[i][v] = e.target.value
        },
        oninput4 (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueBusinessProxySwitchSchemeCreateFormList[i][v] = e.target.value
        },
        oninputSale (i, v, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            // console.log(e.target.value)
            this.dueBusinessSaleCreateFormList[i][v] = e.target.value
            // console.log(this.dueBusinessSaleCreateFormList[i][v])
        },
        integer (v, e) {
            if (e) {
                this[v] = e.target.value.replace(/[^0-9]/g, '')
            }
        },
        // 结合change事件对失去焦点进行判断，防止输入一些无效值
        numChange (value, e) {
            e = parseFloat(e).toFixed(2)
            this[value] = e.replace(/[^0-9.-]/g, '')
        },
        onChange () {
            document.getElementsByClassName('container')[0].scrollTop = 0
        },
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            } else {
                return false
            }
        },
        addScheme () {
            this.dueBusinessProxySwitchSchemeCreateFormList.push({
                brand: '',
                expectSales: '',
                switchDate: ''
            })
        },
        deleteScheme (index) {
            this.dueBusinessProxySwitchSchemeCreateFormList.splice(index, 1)
        },
        addSupplier () {
            this.dueBusinessSupplierCreateFormList.push({
                contractEndDate: '',
                contractScale: '',
                contractStartDate: '',
                dueBusinessId: '',
                isProvideContract: '',
                proportion: '',
                purchaseAmount: '',
                supplierName: ''
            })
        },
        deleteSupplier (index) {
            this.dueBusinessSupplierCreateFormList.splice(index, 1)
        },
        addCustomer () {
            this.dueBusinessCustomerCreateFormList.push({
                agreementEndDate: '',
                agreementScale: '',
                agreementStartDate: '',
                brandName: '',
                categoryId: '',
                customerName: '',
                dueBusinessId: '',
                salesFee: '',
                salesProportion: ''
            })
        },
        deleteCustomer (index) {
            this.dueBusinessCustomerCreateFormList.splice(index, 1)
        },
        addCompet () {
            this.dueBusinessCompetitorCreateFormList.push({
                competitorName: '',
                mainForms: ''
            })
        },
        deleteCompet (index) {
            this.dueBusinessCompetitorCreateFormList.splice(index, 1)
        },
        async getBusiness () {
            const { data } = await getBusiness(this.applyId)

            data.data.dueBusinessAssessmentCreateFormList.map((item, value) => {
                this.currentYearAllSales += +item.currentYearSales
                this.lastYearAllSales += +item.lastYearSales
                this.lastTwoYearAllSales += +item.lastTwoYearSales
            })
            this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
            this.lastYearAllSales = (this.lastYearAllSales ? this.lastYearAllSales : 0).toFixed(2)
            this.lastTwoYearAllSales = (this.lastTwoYearAllSales ? this.lastTwoYearAllSales : 0).toFixed(2)

            this.id = data.data.id
            this.type = !!data.data.operationNode
            this.updateTime = data.data.updateTime
            this.updateUser = data.data.updateUser
            this.dueBusinessId = data.data.dueBusinessId
            // if (!data.data.operationNode) {
            //     this.isdisabled = (!!data.data.operationNode) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.operationNode)
            // }
            this.form = data.data
            this.form.dueBusinessFuturePlanCreateForm.serviceCategory = data.data.dueBusinessFuturePlanVo.serviceCategory ? data.data.dueBusinessFuturePlanVo.serviceCategory : []
            this.form.dueBusinessFuturePlanCreateForm.businessCategory = data.data.dueBusinessFuturePlanVo.businessCategory ? data.data.dueBusinessFuturePlanVo.businessCategory : []
            // this.form.dueBusinessFuturePlanCreateForm.businessCategoryOther = data.data.dueBusinessFuturePlanVo.businessCategoryOther
            // this.form.dueBusinessFuturePlanCreateForm.brandManagement = data.data.dueBusinessFuturePlanVo.brandManagement
            // this.form.dueBusinessFuturePlanCreateForm.businessProvince = data.data.dueBusinessFuturePlanVo.businessProvince
            // this.form.dueBusinessFuturePlanCreateForm.businessCity = data.data.dueBusinessFuturePlanVo.businessCity
            // this.form.dueBusinessFuturePlanCreateForm.businessArea = data.data.dueBusinessFuturePlanVo.businessArea
            // this.form.dueBusinessFuturePlanCreateForm.annualSalesScale = data.data.dueBusinessFuturePlanVo.annualSalesScale
            // this.form.dueBusinessFuturePlanCreateForm.netProfitRate = data.data.dueBusinessFuturePlanVo.netProfitRate
            // this.form.dueBusinessFuturePlanCreateForm.downstreamSwitchChannelsCustomers = data.data.dueBusinessFuturePlanVo.downstreamSwitchChannelsCustomers
            // this.form.dueBusinessFuturePlanCreateForm.marketingChannelsPlans = data.data.dueBusinessFuturePlanVo.marketingChannelsPlans
            // this.form.dueBusinessFuturePlanCreateForm.fundingRequirements = data.data.dueBusinessFuturePlanVo.fundingRequirements
            // this.form.dueBusinessFuturePlanCreateForm.otherPlansNeeds = data.data.dueBusinessFuturePlanVo.otherPlansNeeds

            // if (data.data.publicityPromotionChannels) {
            // this.form.publicityPromotionChannels = data.data.publicityPromotionChannels.split(',')
            // }

            // this.form.publicityPromotionChannels = this.form.publicityPromotionChannels.map(Number)

            this.dueBusinessAssessmentCreateFormList = data.data.dueBusinessAssessmentVoList
            this.dueBusinessSupplierCreateFormList = data.data.dueBusinessSupplierVoList
            if (this.dueBusinessSupplierCreateFormList.length === 0) {
                this.dueBusinessSupplierCreateFormList.push(this.busObj)
            }
            this.dueBusinessCustomerCreateFormList = data.data.dueBusinessCustomerVoList
            if (this.dueBusinessCustomerCreateFormList.length === 0) {
                this.dueBusinessCustomerCreateFormList.push(this.cusObj)
            }
            this.dueBusinessCompetitorCreateFormList = data.data.dueBusinessCompetitorVoList
            if (this.dueBusinessCompetitorCreateFormList.length === 0) {
                this.dueBusinessCompetitorCreateFormList.push(this.comObj)
            }
            this.dueBusinessProxySwitchSchemeCreateFormList = data.data.dueBusinessProxySwitchSchemeVoList
            if (this.dueBusinessProxySwitchSchemeCreateFormList.length === 0) {
                this.dueBusinessProxySwitchSchemeCreateFormList.push(this.comObj)
            }
        },
        handleCheckAllChange (val) {
            this.form.publicityPromotionChannels = val ? this.newChannels : []
            this.isIndeterminate = false
        },
        handleCheckedWays (value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.newChannels.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.newChannels.length
        },
        async onSaveBus () {
            this.publicityPromotionChannels = this.checkedCities.join(',')
            this.dueBusinessSaleCreateFormList[0].currentYearSales = this.currentYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastYearSales = this.lastYearAllSales
            this.dueBusinessSaleCreateFormList[0].lastTwoYearSales = this.lastTwoYearAllSales
            const formData = {
                id: this.id,
                analysisDescription: this.analysisDescription,
                applyId: this.applyId,
                brandOneSalesRatio: this.brandOneSalesRatio,
                brandThreeSalesRatio: this.brandThreeSalesRatio,
                brandTwoSalesRatio: this.brandTwoSalesRatio,
                businessFormatOneRatio: this.businessFormatOneRatio,
                businessFormatTwoRatio: this.businessFormatTwoRatio,
                businessFormatTwoThreeRatio: this.businessFormatTwoThreeRatio,
                categoryOneSalesRatio: this.categoryOneSalesRatio,
                categoryTwoSalesRatio: this.categoryTwoSalesRatio,
                createUser: this.userInfo.name,
                customersHealth: this.customersHealth,
                downstreamCustomersHealth: this.downstreamCustomersHealth,
                dueBusinessAssessmentCreateFormList: this.dueBusinessAssessmentCreateFormList,
                dueBusinessCompetitorCreateFormList: this.dueBusinessCompetitorCreateFormList,
                dueBusinessCustomerCreateFormList: this.dueBusinessCustomerCreateFormList,
                dueBusinessCustomerDemandCreateForm: this.dueBusinessCustomerDemandCreateForm,
                dueBusinessFuturePlanCreateForm: this.dueBusinessFuturePlanCreateForm,
                dueBusinessId: this.dueBusinessId,
                dueBusinessProxySwitchSchemeCreateFormList: this.dueBusinessProxySwitchSchemeCreateFormList,
                dueBusinessSaleCreateFormList: this.dueBusinessSaleCreateFormList,
                dueBusinessSupplierCreateFormList: this.dueBusinessSupplierCreateFormList,
                firstTenMonthsDown: this.firstTenMonthsDown,
                interIndustryCooperation: this.interIndustryCooperation,
                mainBrandOneName: this.mainBrandOneName,
                mainBrandThreeName: this.mainBrandThreeName,
                mainBrandTwoName: this.mainBrandTwoName,
                mainBusinessFormatOneId: this.mainBusinessFormatOneId,
                mainBusinessFormatThreeId: this.mainBusinessFormatThreeId,
                mainBusinessFormatTwoId: this.mainBusinessFormatTwoId,
                mainCategoryOneId: this.mainCategoryOneId,
                mainCategoryTwoId: this.mainCategoryTwoId,
                memberShopNum: this.memberShopNum,
                operationNode: 0,
                publicityPromotionChannels: this.publicityPromotionChannels,
                riskDisclosure: this.riskDisclosure,
                salesGrowthHealth: this.salesGrowthHealth,
                selfStoresNum: this.selfStoresNum,
                upstreamBodySwitchable: this.upstreamBodySwitchable
            }
            // console.log(formData)
            if (this.dueBusinessId) {
                await putBusiness(formData)
            } else {
                await addBusiness(formData)
            }
            this.$message({
                type: 'success',
                message: '保存成功'
            })
            this.$router.go(-1)
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
            const formData = {
                id: this.id,
                analysisDescription: this.form.analysisDescription,
                applyId: this.applyId,
                brandOneSalesRatio: this.form.brandOneSalesRatio,
                brandThreeSalesRatio: this.form.brandThreeSalesRatio,
                brandTwoSalesRatio: this.form.brandTwoSalesRatio,
                businessFormatOneRatio: this.form.businessFormatOneRatio,
                businessFormatTwoRatio: this.form.businessFormatTwoRatio,
                businessFormatTwoThreeRatio: this.form.businessFormatTwoThreeRatio,
                categoryOneSalesRatio: this.form.categoryOneSalesRatio,
                categoryTwoSalesRatio: this.form.categoryTwoSalesRatio,
                createUser: JSON.parse(sessionStorage.getItem('user_data')).name,
                customersHealth: this.form.customersHealth,
                downstreamCustomersHealth: this.downstreamCustomersHealth,
                dueBusinessAssessmentCreateFormList: this.form.dueBusinessAssessmentVoList,
                dueBusinessCompetitorCreateFormList: this.form.dueBusinessCompetitorVoList,
                dueBusinessCustomerCreateFormList: this.form.dueBusinessCustomerVoList,
                dueBusinessFuturePlanCreateForm: this.form.dueBusinessFuturePlanVo,
                dueBusinessId: this.dueBusinessId,
                dueBusinessSaleCreateFormList: {
                    currentYearSales: this.currentYearAllSales,
                    lastYearSales: this.lastYearAllSales,
                    lastTwoYearSales: this.lastTwoYearAllSales
                },
                dueBusinessSupplierCreateFormList: this.form.dueBusinessSupplierVoList,
                firstTenMonthsDown: this.form.firstTenMonthsDown,
                interIndustryCooperation: this.form.interIndustryCooperation,
                mainBrandOneName: this.form.mainBrandOneName,
                mainBrandThreeName: this.form.mainBrandThreeName,
                mainBrandTwoName: this.form.mainBrandTwoName,
                mainBusinessFormatOneId: this.form.mainBusinessFormatOneId,
                mainBusinessFormatThreeId: this.form.mainBusinessFormatThreeId,
                mainBusinessFormatTwoId: this.form.mainBusinessFormatTwoId,
                mainCategoryOneId: this.form.mainCategoryOneId,
                mainCategoryTwoId: this.form.mainCategoryTwoId,
                memberShopNum: this.form.memberShopNum,
                operationNode: 1,
                publicityPromotionChannels: this.form.publicityPromotionChannels,
                riskDisclosure: this.form.riskDisclosure,
                salesGrowthHealth: this.salesGrowthHealth,
                salesPerformanceLastYear: this.form.salesPerformanceLastYear,
                selfStoresNum: this.form.selfStoresNum,
                upstreamBodySwitchable: this.upstreamBodySwitchable,
                wholesaleShare: this.form.wholesaleShare,
                retailShare: this.form.retailShare,
                projectShare: this.form.projectShare
            }
            console.log(formData)
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
    watch: {
        'form.dueBusinessSaleCreateFormList': {
            handler (val) {
                let databaseCurrentYearAllSales
                let databaseLastYearAllSales
                let databaseLastTwoYearAllSales
                this.currentYearAllSales = 0
                this.lastYearAllSales = 0
                this.lastTwoYearAllSales = 0
                val.map((item, index) => {
                    if (index === 0) {
                        databaseCurrentYearAllSales = parseFloat(item.currentYearSales)
                        databaseLastYearAllSales = parseFloat(item.lastYearSales)
                        databaseLastTwoYearAllSales = parseFloat(item.lastTwoYearSales)
                    } else {
                        this.currentYearAllSales += parseFloat(item.currentYearSales)
                        this.lastYearAllSales += parseFloat(item.lastYearSales)
                        this.lastTwoYearAllSales += parseFloat(item.lastTwoYearSales)
                    }
                })
                this.currentYearAllSales = (this.currentYearAllSales ? this.currentYearAllSales : 0).toFixed(2)
                this.lastYearAllSales = (this.lastYearAllSales).toFixed(2)
                this.lastTwoYearAllSales = (this.lastTwoYearAllSales).toFixed(2)
                if (this.watchTime === 0) {
                    if (+this.currentYearAllSales !== databaseCurrentYearAllSales) {
                        this.currentYearAllSales = databaseCurrentYearAllSales.toFixed(2)
                    }
                    if (+this.lastYearAllSales !== databaseLastYearAllSales) {
                        this.lastYearAllSales = databaseLastYearAllSales.toFixed(2)
                    }
                    if (+this.lastTwoYearAllSales !== databaseLastTwoYearAllSales) {
                        this.lastTwoYearAllSales = databaseLastTwoYearAllSales.toFixed(2)
                    }
                }
                this.watchTime++
            },
            deep: true
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
<style lang="scss" scoped>
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
    width: 360px;
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