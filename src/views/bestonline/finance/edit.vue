<template>
    <div class="jd-manage">
        <el-collapse v-model="activeName" accordion>
            <el-form :model="form" :rules="rules" label-width="180px">
                <!-- KPI -->
                <KPI />
                <!-- 盈利能力 -->
                <Profitability />
                <!-- 费用结构 -->
                <CostStructure />
                <!-- 偿债能力 -->
                <Solvency />
                <!-- 营运能力 -->
                <Operational />
                <!-- 资金风险评估 -->
                <FinancialRisks />
                <!-- 税务合规 -->
                <TaxCompliance />
                <!-- 仓储 -->
                <!-- <Storage /> -->
                <!-- 财务委派 -->
                <FinancialAppointment />
                <!-- 资产负债表 -->
                <BalanceSheet />
                <!-- 利润表 -->
                <Profit />
                <!-- 现金流量表 -->
                <CashFlow />
            </el-form>
        </el-collapse>

        <div class="flex-wrap-row top20 " v-show="!isdisabled">
            <el-col :span="2" :offset="6">
                <el-button type="info" @click="onSureHandle(0)">保存</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSureHandle(1)">提交</el-button>
            </el-col>
        </div>
    </div>
</template>
<script>
import { getFinance, saveFinance, provinces } from '../api/index.js'
import { plusOrMinus } from '../../../rules.js'
import { mapState } from 'vuex'
import { YES_NO_STATUS, COST_RATIONALITY } from '../const'
import KPI from './components/kpi.vue'
import BalanceSheet from './components/balanceSheet.vue'
import CashFlow from './components/cashFlow.vue'
import CostStructure from './components/costStructure.vue'
import FinancialAppointment from './components/financialAppointment.vue'
import FinancialRisks from './components/financialRisks.vue'
import Operational from './components/operational.vue'
import Profit from './components/profit.vue'
import Profitability from './components/profitability.vue'
import Solvency from './components/solvency.vue'
import Storage from './components/storage.vue'
import TaxCompliance from './components/taxCompliance.vue'
export default {
    components: {
        BalanceSheet,
        CashFlow,
        CostStructure,
        FinancialAppointment,
        FinancialRisks,
        Operational,
        Profit,
        Profitability,
        Solvency,
        Storage,
        TaxCompliance,
        KPI
    },
    data () {
        return {
            activeName: '7',
            updateTime: '',
            updateUser: '',
            assessmentList: [], // 财务尽调评估
            dueFinanceBasic: {}, // 尽调数据
            assetsLiabilities: { recordTime: '' }, // 资产负债表
            dueFinanceProfit: { recordTime: '' }, // 利润表
            caseFlow: { recordTime: '' }, // 现金流量表
            isdisabled: false,
            riskoptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '高'
            }, {
                value: 1,
                label: '中'
            }, {
                value: 2,
                label: '低'
            }],
            storeOptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '自有'
            }, {
                value: 1,
                label: '租赁'
            }, {
                value: 2,
                label: '第三方监督'
            }],
            superviseoptions: [{
                value: '',
                label: '请选择'
            }, {
                value: 0,
                label: '资金和货物双重监管'
            }, {
                value: 1,
                label: '资金监管-高'
            }, {
                value: 2,
                label: '资金监管-低'
            }, {
                value: 3,
                label: '不接受'
            }],
            costRationalityData: COST_RATIONALITY,
            yesNoStatus: YES_NO_STATUS,
            storeProvince: [], // 省
            storeCity: [], // 市
            storeArea: [], // 区
            applyId: '',
            type: false,
            textarea: '',
            form: {
                assessmentList: [],
                assessmentItem: '',
                cooperationTarget: '',
                state: '',
                remark: '',
                riskDisclosure: '',
                analysisDescription: '',
                dueFinanceYearOperatingPos: [],
                salesExpensesRatio: '',
                costRationality: '',
                managementExpensesRatio: '',
                costRationalityRemark: '',
                companyDebt: '',
                shareholdersDebt: '',
                companyBorrowsShareholders: '',
                shareholdersBorrowsCompany: '',
                cashFlowRatio: '',
                capitalRiskAssessment: '',
                actualControllerAndMateOperatingLoan: '',
                personalAndCompanyGuarantee: '',
                taxableIncomeRatio: '',
                taxBearingRate: '',
                dueFinanceBasic: [],
                assetsLiabilities: [],
                dueFinanceProfit: [],
                caseFlow: [],
                assetLiabilityRatio: ''
            },
            rules: {
                riskDisclosure: [
                    { required: true, message: '请输入风险揭示', trigger: 'blur' }
                ],
                analysisDescription: [
                    { required: true, message: '请输入分析描述', trigger: 'blur' }
                ],
                shareholdersDebt: [
                    { required: true, message: '请输入股东借款金额', trigger: 'blur' }
                ],
                companyBorrowsShareholders: [
                    { required: true, message: '请输入公司向股东借款金额', trigger: 'blur' }
                ],
                shareholdersBorrowsCompany: [
                    { required: true, message: '请输入股东向公司借款金额', trigger: 'blur' }
                ],
                capitalRiskAssessment: [
                    { required: true, message: '请选择资金风险评估', trigger: 'change' }
                ]
            },
            a: '',
            debtDialog: false,
            tabName: 'nowYear',
            onDebtDialog: false

        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        // this.provinces({ parentId: 0 }, 0)
        this.getFinance()
        this.applyId = this.$route.query.applyId
    },
    methods: {
        oninput (value, e) {
            // 通过正则过滤小数点后两位
            e.target.value = plusOrMinus(e.target.value.toString())
            this.dueFinanceBasic[value] = e.target.value
        },
        oninputAssets (list, index, value, e) {
            e.target.value = plusOrMinus(e.target.value.toString())
            this.assetsLiabilities[list][index][value] = e.target.value
        },
        oninputDueAndCase (index, value, e, n) {
            e.target.value = plusOrMinus(e.target.value.toString())
            if (n === 0) {
                this.dueFinanceProfit.contentList[index][value] = e.target.value
                return
            }
            if (n === 1) {
                this.caseFlow.contentList[index][value] = e.target.value
            }
        },
        // 整数验证
        // oninputInt (value, e) {
        //     e.target.value = e.target.value.replace(/[^\d]/g, '')
        //     this.dueFinanceBasic[value] = e.target.value
        // },
        showWarnMsg (msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            })
        },
        vaildEmpty (value) {
            if (value !== null && value !== undefined && value !== '') {
                return true
            } else {
                return false
            }
        },
        async getFinance () {
            const { data } = await getFinance(this.$route.query.applyId)
            console.log(data.data)
            this.form = data.data

            this.form.assessmentList = data.data.assessmentList
            this.form.riskDisclosure = data.data.riskDisclosure
            this.form.analysisDescription = data.data.analysisDescription

            this.form.salesExpensesRatio = data.data.salesExpensesRatio
            this.form.managementExpensesRatio = data.data.managementExpensesRatio
            this.form.financeExpensesRatio = data.data.financeExpensesRatio
            this.form.costRationality = data.data.costRationality
            this.form.costRationalityRemark = data.data.costRationalityRemark

            // this.
            // if (!data.data.dueFinanceBasic.type) {
            //     this.isdisabled = (!!data.data.dueFinanceBasic.type) || !this.roleType
            // } else {
            //     this.isdisabled = (!!data.data.dueFinanceBasic.type)
            // }
            this.type = !!data.data.dueFinanceBasic.type
            this.updateUser = data.data.dueFinanceBasic.updateUser
            this.updateTime = data.data.dueFinanceBasic.updateTime
            this.dueFinanceBasic = data.data.dueFinanceBasic
            this.assetsLiabilities = data.data.assetsLiabilities
            this.dueFinanceProfit = data.data.dueFinanceProfit
            this.caseFlow = data.data.caseFlow
            // 获取省市区数据
            if (this.dueFinanceBasic.storeProvince) {
                this.dueFinanceBasic.storeProvince = +this.dueFinanceBasic.storeProvince
                this.provinces({ parentId: this.dueFinanceBasic.storeProvince }, 1)
                if (this.dueFinanceBasic.storeCity) {
                    this.dueFinanceBasic.storeCity = +this.dueFinanceBasic.storeCity
                    this.provinces({ parentId: this.dueFinanceBasic.storeCity }, 2)
                    if (this.dueFinanceBasic.storeArea) {
                        this.dueFinanceBasic.storeArea = +this.dueFinanceBasic.storeArea
                    }
                }
            }
            this.dueFinanceBasic.applyId = this.applyId
            if (this.dueFinanceBasic.id) {
                this.dueFinanceBasic.updateUser = this.userInfo.name
            } else {
                this.dueFinanceBasic.createUser = this.userInfo.name
            }
        },
        async provinces (params, city) {
            // return false
            const { data } = await provinces(params)
            switch (city) {
                case 0:
                    this.storeProvince = data.citys
                    this.storeProvince.unshift({ cityId: '', cityName: '请选择省', id: 0 })
                    break
                case 1:
                    this.storeCity = data.citys
                    this.storeCity.unshift({ cityId: '', cityName: '请选择市', id: 0 })
                    break
                case 2:
                    this.storeArea = data.citys
                    this.storeArea.unshift({ cityId: '', cityName: '请选择区', id: 0 })
                    break
            }
        },
        onProvince (parentId) {
            this.dueFinanceBasic.storeCity = ''
            this.dueFinanceBasic.storeArea = ''
            this.storeCity = []
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 1)
            }
        },
        onCity (parentId) {
            this.dueFinanceBasic.storeArea = ''
            this.storeArea = []
            if (parentId) {
                this.provinces({ parentId }, 2)
            }
        },
        onSureHandle (i) {
            // const type = i === 0 ? '保存' : '提交'
            // this.$confirm(`确定${type}?`, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'info'
            // }).then(() => {
            if (i === 0) return this.onSaveGood(i)
            if (i === 1) return this.onSubmit(i)
            // }).catch(() => {})
        },
        initTable () {

        },
        format (type) {
            if (this.form.dueFinanceBasic.dateOfCustody) this.form.dueFinanceBasic.dateOfCustody = this.$options.filters.formatDate(this.form.dueFinanceBasic.dateOfCustody, 'YYYY-MM-DD')
            if (this.form.dueFinanceBasic.startDateOfDelegation) this.form.dueFinanceBasic.startDateOfDelegation = this.$options.filters.formatDate(this.form.dueFinanceBasic.startDateOfDelegation, 'YYYY-MM-DD')
            if (this.form.assetsLiabilities.recordTime) this.form.assetsLiabilities.recordTime = this.$options.filters.formatDate(this.form.assetsLiabilities.recordTime, 'YYYY-MM-DD')
            if (this.form.dueFinanceProfit.recordTime) this.form.dueFinanceProfit.recordTime = this.$options.filters.formatDate(this.form.dueFinanceProfit.recordTime, 'YYYY-MM-DD')
            if (this.form.caseFlow.recordTime) this.form.caseFlow.recordTime = this.$options.filters.formatDate(this.form.caseFlow.recordTime, 'YYYY-MM-DD')
            const formData = {
                assessmentList: this.assessmentList,
                assetsLiabilities: this.assetsLiabilities,
                caseFlow: this.caseFlow,
                dueFinanceBasic: this.dueFinanceBasic,
                dueFinanceProfit: this.dueFinanceProfit
            }
            return formData
        },
        async onSaveGood (type) {
            const formData = this.format(type)
            // console.log(formData)
            await saveFinance(formData)
            // this.getFinance()
            this.$message({
                type: 'success',
                message: '保存成功!'
            })
            this.$router.go(-1)
        },
        async onSubmit (type) {
            for (const i of this.form.assessmentList) {
                if (i.state === null || i.state === '') {
                    this.$message.warning('请选择尽调评估结论')
                    this.activeName = '1'
                    return false
                }
            }
            for (const i of this.form.dueFinanceYearOperatingPos) {
                if (i.assetLiabilityRatio === null || i.assetLiabilityRatio === '') {
                    this.$message.warning('请输入资产负债率')
                    this.activeName = '1'
                    return false
                } else if (i.profitRatio === null || i.profitRatio === '') {
                    this.$message.warning('请输入净利率')
                    this.activeName = '1'
                    return false
                } else if (i.grossMargin === null || i.grossMargin === '') {
                    this.$message.warning('请输入销售毛利率')
                    this.activeName = '2'
                    return false
                } else if (i.rate === null || i.rate === '') {
                    this.$message.warning('请输入费率')
                    this.activeName = '2'
                    return false
                } else if (i.liquidityRatio === null || i.liquidityRatio === '') {
                    this.$message.warning('请输入流动比率')
                    this.activeName = '4'
                    return false
                } else if (i.quickRatio === null || i.quickRatio === '') {
                    this.$message.warning('请输入速动比率')
                    this.activeName = '4'
                    return false
                } else if (i.cashRatio === null || i.cashRatio === '') {
                    this.$message.warning('请输入现金比率')
                    this.activeName = '4'
                    return false
                } else if (i.assetLiabilityRatio === null || i.assetLiabilityRatio === '') {
                    this.$message.warning('请输入资产负债率')
                    this.activeName = '4'
                    return false
                }
            }
            //  this.$refs['form'].validate(async (valid) => {
            //     if (valid) {
            //         if (this.dueBusinessId) {
            //             await putBusiness({
            //                 id: this.id,
            //                 operationNode: 1,
            //                 createUser: createUser,
            //                 ...this.form
            //             })
            //             this.$message.success('提交成功')
            //         } else {
            //             await addBusiness({
            //                 operationNode: 1,
            //                 createUser: createUser,
            //                 ...this.form
            //             })
            //             this.$message.success('提交成功')
            //         }
            //     }
            // })
            // const formData = this.format(type)
            // for (let i = 0;i < this.assessmentList.length;i++) {
            //     if (this.assessmentList[i].state === null || this.assessmentList[i].state === '') {
            //         this.showWarnMsg('请选择尽调评估结论')
            //         this.activeName = '1'
            //         return false
            //     }
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.fundingRisks)) {
            //     this.showWarnMsg('请选择资金风险')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.fundSupervision)) {
            //     this.showWarnMsg('请选择资金监管')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.warehouseManaged)) {
            //     this.showWarnMsg('请选择仓库托管')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.financialExpatriates)) {
            //     this.showWarnMsg('请选择财务外派')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.dueFinanceBasic.riskDisclosure) {
            //     this.showWarnMsg('请输入风险揭示')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.dueFinanceBasic.analysisDescription) {
            //     this.showWarnMsg('请输入分析描述')
            //     this.activeName = '1'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.grossMargin)) {
            //     this.showWarnMsg('请输入销售毛利率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.rate)) {
            //     this.showWarnMsg('请输入费率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.profitRatio)) {
            //     this.showWarnMsg('请输入净利率')
            //     this.activeName = '2'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.liquidityRatio)) {
            //     this.showWarnMsg('请输入流动比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.quickRatio)) {
            //     this.showWarnMsg('请输入速动比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.assetLiabilityRatio)) {
            //     this.showWarnMsg('请输入资产负债率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.cashRatio)) {
            //     this.showWarnMsg('请输入现金比率')
            //     this.activeName = '4'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.daysOfReceivable)) {
            //     this.showWarnMsg('请输入应收账款周转天数')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.daysOfInventory)) {
            //     this.showWarnMsg('请输入库存周转天数')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.totalAssetsTurnover)) {
            //     this.showWarnMsg('请输入总资产周转率')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.returnOnEquity)) {
            //     this.showWarnMsg('请输入净资产收益率')
            //     this.activeName = '5'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.companyDebt)) {
            //     this.showWarnMsg('请输入公司借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.shareholdersDebt)) {
            //     this.showWarnMsg('请输入股东借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.companyBorrowsShareholders)) {
            //     this.showWarnMsg('请输入公司向股东借款')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.shareholdersBorrowsCompany)) {
            //     this.showWarnMsg('请输入股东向公司借款')
            //     this.activeName = '6'
            //     return false
            // }
            // // if (!this.dueFinanceBasic.cashFlowRatio) {
            // //     this.showWarnMsg('请输入现金流量比率')
            // //     this.activeName = '6'
            // //     return false
            // // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.capitalRiskAssessment)) {
            //     this.showWarnMsg('请选择资金风险评估')
            //     this.activeName = '6'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.annualTaxableBusinessIncome)) {
            //     this.showWarnMsg('请输入年度纳税营业收入')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.taxableIncomeRatio)) {
            //     this.showWarnMsg('请输入纳税收入占比')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.taxBearingRate)) {
            //     this.showWarnMsg('请输入税负率')
            //     this.activeName = '7'
            //     return false
            // }
            // if (!this.vaildEmpty(this.dueFinanceBasic.isAgreeFinancialDelegation)) {
            //     this.showWarnMsg('请选择是否同意财务委派')
            //     this.activeName = '9'
            //     return false
            // }

            // var result1 = this.assetsLiabilities.assetList.some((v, i) => {
            //     return v.beginOrPrior || v.endOrCurrent
            // })
            // var result2 = this.assetsLiabilities.liabilitiesList.some((v, i) => {
            //     return v.beginOrPrior || v.endOrCurrent
            // })
            // if (!result1 && !result2) {
            //     this.showWarnMsg('请输入资产负债表')
            //     this.activeName = '10'
            //     return false
            // }
            // await saveFinance(formData)
            // this.isdisabled = true
            // this.$message({
            //     type: 'success',
            //     message: `提交成功`
            // })
            // this.$router.go(-1)
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
            right: -50px;
            font-size: 20px;
        }
    }
}
.double-table {
    display: flex;
    margin: 15px;
    .table-flex {
        width: 50%;
        margin: 0;
    }
    .table-flex:nth-child(1) {
        .table-row {
            border-right: none;
        }
    }
    .table-flex:nth-child(2) {
        .table-row {
            border-left: none;
        }
    }
}
.table_left {
    .table-col {
        text-align: left !important;
    }
}
.subtitle {
    font-weight: 700;
    height: 40px;
}
.table_h {
    height: 80px;
    // line-height: 80px;
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
.el-dialog span {
    text-align: center;
}
</style>
