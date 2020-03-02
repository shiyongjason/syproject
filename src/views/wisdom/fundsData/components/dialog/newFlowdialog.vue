<template>
    <!-- 新增流贷弹窗 -->
    <div class="flowbody page-body">
        <div class="page-body-cont ">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="dialogtitle">基础信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="account.standingBookNo">
                            <el-input maxlength='20' v-model.trim="ruleForm.account.standingBookNo" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <div class="query-cont-col">
                        <el-form-item label="金云系统编号：">
                            <el-input v-model.trim="ruleForm.account.jinyunArchiveNo" placeholder="如有请输入，无请忽略">
                            </el-input>
                        </el-form-item>
                    </div> -->
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="account.loanCompanyName" ref="loanCompanyName">
                            <HAutocomplete :selectArr="paltformList" v-if="paltformList" @back-event="backPlat" :placeholder="'选择平台公司'" />
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="account.misCode" ref="misCode">
                            <el-input v-model.trim="ruleForm.account.misCode" placeholder="自动带入" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="account.subsectionName" ref="subsectionName">
                            <el-input v-model.trim="ruleForm.account.subsectionName" placeholder="自动带入" disabled>
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--抽离 还款-->
                <flowcomp :flowform=ruleForm.loan v-if="changeType(1,1)" />
                <grantcomp ref="opencomp" :flowform=ruleForm.loan @repaymentTypeChange="onRepaymentTypeChange" v-if="changeType(1,2)" />
                <opencomp ref="opencomp" :flowform=ruleForm.loan @repaymentTypeChange="onRepaymentTypeChange" v-if="changeType(1,3)" />
                <!--抽离 还款利息-->
                <flowratecomp :flowrateform=ruleForm.planList[0] @stepOver="onStepOver" v-if="changeType(1,1)" />
                <grantratecomp :flowrateform=ruleForm.planList @stepOver="onStepOver" v-if="changeType(1,2)" />
                <grantratecomp :flowrateform=ruleForm.planList @stepOver="onStepOver" v-if="changeType(1,3)" />
                <!--供应链抽离 还款-->
                <flowcomp :flowform=ruleForm.loan v-if="changeType(2,1)" />
                <flowratecomp :flowrateform=ruleForm.planList[0] @stepOver="onStepOver" v-if="changeType(2,1)" />
                <div class="dialogtitle">档案信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账档案编号：">
                            <el-input maxlength='20' v-model.trim="ruleForm.account.standingBookArchiveNo" placeholder="请输入台账档案编号">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云档案编号：">
                            <el-input maxlength='20' v-model.trim="ruleForm.account.jinyunArchiveNo" placeholder="请输入金云档案编号">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="dialogtitle">备注：</div>
                <div class="query-cont-row">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" maxlength="1000" show-word-limit v-model="ruleForm.account.remark">
                    </el-input>
                </div>
                <div class="flow-bottom">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import flowcomp from '../typecomps/flowcomp'
import flowratecomp from '../typecomps/flowratecomp'
import grantcomp from '../typecomps/grantcomp'
import grantratecomp from '../typecomps/grantratecomp'
import opencomp from '../typecomps/opencomp'
import { addAccount } from '../../api/index'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'newFlowdialog',
    components: { flowcomp, flowratecomp, grantcomp, grantratecomp, opencomp, HAutocomplete },
    data () {
        return {
            paltformList: [],
            textarea: '',
            rules: {
                'account.standingBookNo': [
                    { required: true, message: '请输入台账编号', trigger: 'blur' }
                ],
                'account.loanCompanyName': [
                    { required: true, message: '请输入借款单位' }
                ],
                'account.subsectionName': [
                    { required: true, message: '请输入分部名称', trigger: 'blur' }
                ],
                'account.misCode': [
                    { required: true, message: '请输入MIS编码', trigger: 'blur' }
                ]
            },
            ruleForm: {
                account: {
                    accountType: this.$route.query.accountType, // 台账类型 1：流贷2：敞口 3：分授信
                    jinyunArchiveNo: '',
                    loanCompanyCode: '',
                    loanCompanyName: '',
                    misCode: '',
                    productType: this.$route.query.productType, // 1：好信用 2：供应链 3：好橙工
                    remark: '',
                    standingBookArchiveNo: '',
                    standingBookNo: '',
                    subsectionCode: '',
                    subsectionName: ''
                },
                loan: {
                    depositPay: '',
                    depositProportion: '',
                    invoiceAmount: '',
                    invoiceTime: '',
                    loanAmount: '', // 借款金额(敞口金额)
                    loanDateNum: '',
                    loanDateType: '',
                    loanEndTime: '',
                    loanStartTime: '',
                    registrant: '',
                    repaymentType: 1,
                    standingBookId: '',
                    supplier: '',
                    yearRate: ''
                },
                planList: []
            },
            planListItem: {
                capitalAmount: '',
                capitalPaid: '',
                dealTime: '',
                exsitGrace: '',
                graceDay: '',
                graceInterest: '',
                graceInterestAmount: '',
                graceInterestPaid: '',
                interestAmount: '',
                interestPaid: '',
                isStepOverInterest: 1, // 默认逾期是
                overDueInterest: '',
                overDueInterestAmount: '',
                overDueInterestPaid: '',
                overdueList: [
                    {
                        dateNum: '3',
                        dateType: '',
                        overDueInterest: '16',
                        planId: '',
                        sort: '',
                        startTime: ''
                    },
                    {
                        dateNum: '999',
                        dateType: '',
                        overDueInterest: '20',
                        planId: '',
                        sort: '',
                        startTime: ''
                    }
                ]
            },
            // 还款方式：334 对应 30%，30%，40%
            repaymenBaseNum: [0.3, 0.3, 0.4],
            repaymenDays: [2, 1, 0]
        }
    },
    watch: {
        ruleForm: {
            handler (val) {
                // console.log('ruleForm最新数据', val)
            },
            deep: true
        },
        'ruleForm.loan.loanEndTime' (val) {
            console.log('watch loanEndTime', val)
            // 触发自动计算还款计划
            this.onRepaymentTypeChange(this.ruleForm.loan.repaymentType, false)
        },
        'ruleForm.loan.loanAmount' (val) {
            // 触发自动计算还款计划
            this.onRepaymentTypeChange(this.ruleForm.loan.repaymentType, false)
        },
        'ruleForm.account.loanCompanyCode' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['loanCompanyName'].clearValidate()
            })
        },
        'ruleForm.account.subsectionName' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['subsectionName'].clearValidate()
            })
        },
        'ruleForm.account.misCode' (val) {
            this.$nextTick(() => {
                if (val) this.$refs['misCode'].clearValidate()
            })
        }
    },
    computed: {
        ...mapGetters({
            platformData: 'platformData'
        }),
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted () {
        this.onFindPlatformslist()
        this.planListItem.overDueInterest = 12
        this.ruleForm.planList.push({ ...this.planListItem })
    },
    methods: {
        ...mapActions({
            findPlatformslist: 'findPlatformslist',
            setNewTags: 'setNewTags'
        }),
        changeType (productType, accountType) {
            if (productType == this.ruleForm.account.productType && accountType == this.ruleForm.account.accountType) {
                return true
            } else {
                return false
            }
        },
        onSubmit () {
            // 操作
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.ruleForm.loan.invoiceTime = this.ruleForm.loan.loanStartTime
                    this.ruleForm.loan.registrant = this.userInfo.employeeName // Boss登记人
                    await addAccount(this.ruleForm)
                    this.$message({
                        message: '新增台账成功！',
                        type: 'success'
                    })
                    this.setNewTags((this.$route.fullPath).split('?')[0])
                    this.$router.push('/fundsData/standingBook')
                }
            })
        },
        async onFindPlatformslist () {
            await this.findPlatformslist()
            this.paltformList = this.platformData
        },
        backPlat (val) {
            this.ruleForm.account.loanCompanyCode = val.value ? val.value.selectCode : ''
            this.ruleForm.account.loanCompanyName = val.value ? val.value.value : ''
            this.ruleForm.account.subsectionCode = val.value ? val.value.subsectionCode : ''
            this.ruleForm.account.subsectionName = val.value ? val.value.subsectionName : ''
            this.ruleForm.account.misCode = val.value ? val.value.misCode : ''
        },
        onStepOver (val) {
            let newRata = JSON.parse(JSON.stringify(this.planListItem.overdueList[0]))
            this.ruleForm.planList[0].overdueList = []
            let rateArr = [3, 999] // 默认时长
            const profit = [16, 20] // 默认逾期利率
            if (val === 2) {
                for (var i = 0; i < 2; i++) {
                    newRata.dateNum = rateArr[i]
                    this.ruleForm.planList[0].overdueList.push({ ...newRata })
                    this.ruleForm.planList[0].overdueList[i].overDueInterest = profit[i]
                }
            } else if (val === 1) {
                this.ruleForm.planList[0].overdueList.push(newRata)
                this.ruleForm.planList[0].overdueList[0].overDueInterest = profit[0]
            }
        },
        onRepaymentTypeChange (val, boolean = true) {
            this.ruleForm.planList = []
            this.ruleForm.loan.repaymentTsype = val
            if (val === 1) {
                if (boolean) this.ruleForm.loan.loanDateNum = ''
                if (boolean) this.ruleForm.loan.loanDateType = ''
                if (this.ruleForm.loan.loanEndTime && boolean) this.ruleForm.loan.loanEndTime = ''
                this.ruleForm.planList.push({ ...this.planListItem })
            } else if (val === 2) {
                for (let i = 0; i < 3; i++) {
                    this.ruleForm.planList.push({ ...this.planListItem })
                }
                // 还款方式选择334的时候，借款期限默认选中月。默认显示6，不可修改。
                this.ruleForm.loan.loanDateType = 1
                this.ruleForm.loan.loanDateNum = 6
            }
            this.$refs['opencomp'].onChooseTime(this.ruleForm.loan.loanStartTime)
            this.setPlanList()
        },
        /** 自动计算还款计划和日期 */
        setPlanList () {
            //  moment().subtract(7, 'days').format('YYYY-MM-DD')
            if (this.ruleForm.loan.repaymentType == 1) {
                this.ruleForm.planList[0].capitalAmount = this.ruleForm.loan.loanAmount
                this.$set(this.ruleForm.planList[0], 'endTime', this.ruleForm.loan.loanEndTime)
            } else if (this.ruleForm.loan.repaymentType == 2) {
                for (let i = 0; i < this.repaymenBaseNum.length; i++) {
                    this.ruleForm.planList[i].capitalAmount = (this.ruleForm.loan.loanAmount * this.repaymenBaseNum[i]).toFixed(2) || ''
                    this.ruleForm.planList[i].endTime = this.ruleForm.loan.loanEndTime && moment(this.ruleForm.loan.loanEndTime, 'YYYY-MM-DD').subtract(this.repaymenDays[i], 'months').format('YYYY-MM-DD')
                }
            }
        },
        onCancel () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/fundsData/standingBook')
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    font-size: 14px;
}
.dialogtitle {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    line-height: 30px;
}
.smalltitle {
    line-height: 30px;
}
.flow-bottom {
    margin: 20px auto;
}
</style>
