<template>
    <!-- 新增流贷弹窗 -->
    <div class="flowbody page-body">
        <div class="page-body-cont ">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <div class="dialogtitle">基础信息：</div>
                {{ruleForm}}
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账编号：" prop="account.standingBookNo">
                            <el-input v-model.trim="ruleForm.account.standingBookNo" placeholder="请输入台账编号"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <div class="query-cont-col">
                        <el-form-item label="金云系统编号：">
                            <el-input v-model.trim="ruleForm.account.jinyunArchiveNo" placeholder="如有请输入，无请忽略">
                            </el-input>
                        </el-form-item>
                    </div> -->
                    <div class="query-cont-col">
                        <el-form-item label="借款单位：" prop="loanCompanyName" ref="loanCompanyName">
                            <!-- <el-input v-model.trim="ruleForm.account.loanCompanyName" placeholder="请输入平台公司名"></el-input> -->
                            <HAutocomplete :selectArr="paltformList" v-if="paltformList" @back-event="backPlat"
                                :placeholder="'选择平台公司'" />
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="MIS编码：" prop="misCode">
                            <el-input v-model.trim="ruleForm.account.misCode" placeholder="如有请输入，无请忽略"></el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="分部：" prop="account.subsectionName">
                            <el-input v-model.trim="ruleForm.account.subsectionName" placeholder="自动带入" disabled>
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--抽离 还款-->
                <!-- <flowcomp :flowform=ruleForm.loan /> -->
                <grantcomp :flowform=ruleForm.loan />
                <!--抽离 还款利息-->
                <!-- <flowratecomp :flowrateform=ruleForm.planList[0] /> -->
                <grantratecomp :flowrateform=ruleForm.planList />
                <div class="dialogtitle">档案信息：</div>
                <div class="query-cont-row">
                    <div class="query-cont-col">
                        <el-form-item label="台账档案编号：">
                            <el-input v-model.trim="ruleForm.account.standingBookArchiveNo" placeholder="请输入台账档案编号">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="query-cont-col">
                        <el-form-item label="金云档案编号：">
                            <el-input v-model.trim="ruleForm.account.jinyunArchiveNo" placeholder="请输入金云档案编号">
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
                    <el-button>取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import flowcomp from '../typecomps/flowcomp'
import flowratecomp from '../typecomps/flowratecomp'
import grantcomp from '../typecomps/grantcomp'
import grantratecomp from '../typecomps/grantratecomp'

import { addAccount } from '../../api/index'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'flow',
    components: { flowcomp, flowratecomp, grantcomp, grantratecomp, HAutocomplete },
    data () {
        return {
            paltformList: [],
            textarea: '',
            rules: {
                'account.standingBookNo': [
                    { required: true, message: '请输入台账档案编号', trigger: 'blur' }
                ],
                'loanCompanyName': [
                    { required: true, message: '请输入借款单位', trigger: 'blur' }
                ],
                'account.subsectionName': [
                    { required: true, message: '请输入分部名称', trigger: 'blur' }
                ]
            },
            ruleForm: {
                account: {
                    accountType: 1, // 台账类型 1：流贷2：敞口 3：分授信
                    jinyunArchiveNo: '',
                    loanCompanyCode: '',
                    loanCompanyName: '',
                    misCode: '',
                    productType: 1, // 1：好信用 2：供应链 3：好橙工
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
                    loanAmount: '',
                    loanDateNum: '',
                    loanDateType: '',
                    loanEndTime: '',
                    loanStartTime: '',
                    registrant: '',
                    repaymentType: '',
                    standingBookId: '',
                    supplier: '',
                    yearRate: ''
                },
                planList: [{
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
                    isStepOverInterest: '',
                    overDueInterest: '',
                    overDueInterestAmount: '',
                    overDueInterestPaid: '',
                    overdueList: [{
                        dateNum: '',
                        dateType: '',
                        overDueInterest: '',
                        planId: '',
                        sort: '',
                        startTime: ''
                    }]
                }]
            }
        }
    },
    watch: {
        'ruleForm.account.loanCompanyName' (val) {
            this.$nextTick(() => {
                console.log(val)
                if (val) this.$refs['loanCompanyName'].clearValidate()
            })
        }
    },
    computed: {
        ...mapGetters({
            platformData: 'platformData'
        })
    },
    mounted () {
        this.onFindPlatformslist()
    },
    methods: {
        ...mapActions({
            findPlatformslist: 'findPlatformslist'
        }),
        onSubmit () {
            // 操作
            this.$refs.ruleForm.validate((valid) => {
                addAccount(this.ruleForm)
            })
        },
        async onFindPlatformslist () {
            await this.findPlatformslist()
            this.paltformList = this.platformData
        },
        backPlat (val) {
            console.log(val)
            this.ruleForm.account.loanCompanyCode = val.value ? val.value.selectCode : ''
            this.ruleForm.account.loanCompanyName = val.value ? val.value.value : ''
            this.ruleForm.account.subsectionCode = val.value ? val.value.subsectionCode : ''
            this.ruleForm.account.subsectionName = val.value ? val.value.subsectionName : ''
        }
    }
}
</script>

<style lang="scss" >
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
.flowbody {
    .query-cont-col {
        margin-bottom: 19px;
    }
}
.smalltitle {
    color: #f00;
    line-height: 30px;
}
.flow-bottom {
    margin: 20px auto;
}
</style>
