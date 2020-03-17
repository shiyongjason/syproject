<template>
    <div class="page-body">
        <div class="page-body-cont ">
            <el-steps :active="active" simple v-if="type=='add'">
                <el-step title="基本信息" icon="el-icon-edit"></el-step>
                <el-step title="其他信息" icon="el-icon-edit"></el-step>
                <el-step title="签约信息" icon="el-icon-edit"></el-step>
                <el-step title="账户信息" icon="el-icon-edit"></el-step>
            </el-steps>
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick" v-if="type=='edit'">
                <el-tab-pane name="1">
                    <span slot="label"><i class="el-icon-edit"></i> 基本信息 </span>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label"><i class="el-icon-edit"></i> 其他信息 </span>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <span slot="label"><i class="el-icon-edit"></i> 签约信息 </span>
                </el-tab-pane>
                <el-tab-pane name="4">
                    <span slot="label"><i class="el-icon-edit"></i> 账户信息 </span>
                </el-tab-pane>
            </el-tabs>
            <baseForm v-if="active==1" @backnext=nextActive :baseForm=formData ref="baseform"></baseForm>
            <otherForm v-if="active==2" @backnext=nextActive :otherForm=formData.developOtherInfoCreateForm ref="otherform"></otherForm>
            <signForm v-if="active==3" @backnext=nextActive :signForm=formData.developSignInfoCreateForm ref="signform"></signForm>
            <accountForm v-if="active==4" @backadd=onAddDevelopinof :accountForm=formData.developAccountInfoCreateForm ref="accountform"></accountForm>
            <div v-if="type=='add'">
                <el-button style="margin-top: 12px;" @click="next" v-if="active!=4">下一步</el-button>
                <el-button style="margin-top: 12px;" @click="next" v-if="active==4" :loading="loading">{{loading?'提交中':'保存'}}</el-button>
            </div>

        </div>
    </div>
</template>
<script>
import baseForm from './fromcomponents/baseForm'
import otherForm from './fromcomponents/otherForm'
import signForm from './fromcomponents/signForm'
import accountForm from './fromcomponents/accountForm'
import { addDevelopinfo, getDevelopbasic, getDevelopother, getDevelopsign, getDevelopaccount } from '../api/index'
import { mapActions } from 'vuex'
export default {
    name: 'addPlatform',
    data () {
        return {
            userDate: JSON.parse(sessionStorage.getItem('user_Data')),
            active: 1,
            activeName: '1',
            type: this.$route.query.type,
            loading: false,
            formData: {
                // 基本表单数据参数
                systemArr: [],
                companyArr: [],
                misCode: '', // mis编码
                originaCompanyName: '', // 原公司名称
                originalLegalPerson: '', // 原公司法人
                originalLegalPersonPhone: '',
                companyName: '', // 新公司名称
                companyShortName: '', // 公司简称
                // subsectionName: '', //分部名称
                subsectionCode: '', // 分部code
                provinceName: '', // 省
                cityName: '', // 市
                areaName: '', // 区
                provinceCode: '', // 省code
                cityCode: '', // 市code
                areaCode: '', // 区code
                address: '', // 地址
                companyType: '', // 公司类型
                mainSystem: '', // 主营系统
                mainFormat: '', // 主要业态
                mainBrand: '', // 主设备品牌
                controllerName: '', // 实际控制人姓名
                controllerPhone: '', // 实际控制人手机号
                controllerId: '', // 实际控制人身份证
                businessScope: '', // 经营范围
                regLocation: '',
                isTest: 0,
                newAccountOpeningPermit: '', // 新开户许可证
                newBusinessLicenseNo: '', // 新营业执照号
                newBusinessLicenseUrl: '', // 新营业执照图片地址
                // 其它表单数据参数
                developOtherInfoCreateForm: {
                    staffNum: '', // 员工数
                    salesmanNum: '', // 销售员工数
                    constructionTeamNum: '', // 施工队数
                    supervisorNum: '', // 监理数
                    storeNum: '', // 门店数
                    storeType: '', // 门店类型
                    isInternetTools: '', // 互联网工具需求  0:否 1:是
                    isStoreRenovation: '', // 门店改造需求  0:否 1:是
                    companyCode: ''
                },

                // 签约表单数据参数
                developSignInfoCreateForm: {
                    signerName: '', // 签约人姓名
                    signerPhone: '', // 签约人手机号
                    signerId: '', // 签约人身份证
                    ourSigner: '', // 我方签约人
                    signTime: '', // 签约日期
                    licenseLssuedTime: '', // 营业执照下发时间
                    signQuoteTime: '',
                    newLegalPerson: '', // 新公司法人
                    supervisor: '胡志宇',
                    dueDiligenceReportTime: '',
                    dueDiligenceInspectionTime: '',
                    dueDiligenceOpiniot: '',
                    signScale: '', // 签约规模/万万产生上线时间当天及之后不可修改
                    oldCompanyScale: '', // 老公司规模/万
                    salesVolume: '', // 销售规模增长
                    profitGrowth: '3', // 利润增长
                    ourRegisteredFund: '', // 我方注册资金
                    remittanceTime: '',
                    onlineTime: '',
                    changeFactors: '0',
                    newSignScale: '',
                    signChangeTime: '',
                    changeRegisterFund: '',
                    fundChangeTime: '',
                    companyCode: '',
                    newCorporateIdcardBackUrl: '', // 新法人身份证照片反面
                    newCorporateIdcardFrontUrl: '', // 新法人身份证照片正面
                    newCorporationIdcard: '', // 新公司法人身份证号
                    estiblishTime: '',
                    corporateShareholders: '',
                    director: '',
                    generalManager: '',
                    naturalPersonShareholders: ''
                },
                // 账户表单数据参数
                developAccountInfoCreateForm: {
                    accountType: 1,
                    accountBank: '',
                    openBank: '',
                    accountNumber: '',
                    bankCode: '',
                    coupletNumber: '',
                    accountAddress: '',
                    alipayRate: '0', // 支付宝费率
                    wechatRate: '0', // 微信费率
                    debitRate: '0', // 借记卡费率
                    creditRate: '0', // 贷记卡费率
                    companyCode: ''
                },
                companyCode: ''
            }
        }
    },
    components: {
        baseForm,
        otherForm,
        signForm,
        accountForm
    },
    mounted () {
        if (this.type == 'edit') {
            this.onGetdevelopbasicinfo()
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags'
        }),
        handleClick (tab, event) {
            if (tab.name == '1') {
                this.onGetdevelopbasicinfo()
            }
            if (tab.name == '2') this.onGetdevelopotherinfo()

            if (tab.name == '3') this.onGetdevelopsigninfo()
            if (tab.name == '4') this.onGetdevelopaccountinfo()
            this.active = parseInt(tab.name)
        },
        next () {
            if (this.active == 1) {
                this.$refs.baseform.onSaveBaseFrom()
            } else if (this.active == 2) {
                this.$refs.otherform.onSaveotherFrom()
            } else if (this.active == 3) {
                this.$refs.signform.onSaveSignFrom()
            } else if (this.active == 4) {
                this.$refs.accountform.onSaveaccountFrom()
            }
        },
        nextActive () {
            this.active++
        },
        async onAddDevelopinof () {
            delete this.formData.companyArr
            delete this.formData.systemArr
            this.formData.createUser = this.userDate.name
            this.formData.createUid = this.userDate.uid
            this.formData.developOtherInfoCreateForm.createUser = this.userDate.name
            this.formData.developOtherInfoCreateForm.createUid = this.userDate.uid
            this.formData.developSignInfoCreateForm.createUser = this.userDate.name
            this.formData.developSignInfoCreateForm.createUid = this.userDate.uid
            this.formData.developAccountInfoCreateForm.createUser = this.userDate.name
            this.formData.developAccountInfoCreateForm.createUid = this.userDate.uid
            await addDevelopinfo(this.formData)
            this.$message.success('平台公司添加成功！')
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.push('/wisdom/developlist')
        },
        async onGetdevelopbasicinfo () {
            const { data } = await getDevelopbasic({ companyCode: '7ffffe8f22f0a4ad64c349c4eaf918ba' })
            this.formData = { ...data.data }
            const companyArr = this.formData.companyType.split(',')
            const systemArr = this.formData.mainSystem.split(',')
            this.$set(this.formData, 'companyArr', companyArr)
            this.$set(this.formData, 'systemArr', systemArr)
        },
        async onGetdevelopotherinfo () {
            const { data } = await getDevelopother({ companyCode: '7ffffe8f22f0a4ad64c349c4eaf918ba' })
            this.$set(this.formData, 'developOtherInfoCreateForm', { ...data.data })
        },
        async onGetdevelopsigninfo () {
            const { data } = await getDevelopsign({ companyCode: '7ffffe8f22f0a4ad64c349c4eaf918ba' })
            data.data.profitGrowth = data.data.profitGrowth * 100
            this.$set(this.formData, 'developSignInfoCreateForm', { ...data.data })
        },
        async onGetdevelopaccountinfo () {
            const { data } = await getDevelopaccount({ companyCode: '7ffffe8f22f0a4ad64c349c4eaf918ba' })
            this.$set(this.formData, 'developAccountInfoCreateForm', { ...data.data })
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 0;
}
/deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    width: 25%;
    text-align: center;
}
</style>