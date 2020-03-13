<template>
    <div class="page-body">
        <div class="page-body-cont ">
            <el-steps :active="active" simple>
                <el-step title="基本信息" icon="el-icon-edit"></el-step>
                <el-step title="其他信息" icon="el-icon-edit"></el-step>
                <el-step title="签约信息" icon="el-icon-edit"></el-step>
                <el-step title="账户信息" icon="el-icon-edit"></el-step>
            </el-steps>
            <baseForm v-if="active==1" @backnext = nextActive :baseForm=formData ref="baseform"></baseForm>
            <otherForm v-if="active==2" @backnext = nextActive :otherForm=formData.developOtherInfoCreateForm ref="otherform"></otherForm>
            <signForm v-if="active==3" @backnext = nextActive :signForm=formData.developSignInfoCreateForm ref="signform"></signForm>

            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
    </div>
</template>
<script>
import baseForm from './fromcomponents/baseForm'
import otherForm from './fromcomponents/otherForm'
import signForm from './fromcomponents/signForm'
export default {
    data () {
        return {
            active: 1,
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
                isTest: '0',
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
                    profitGrowth: '3%', // 利润增长
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
        signForm
    },
    methods: {
        next () {
            console.log(this.active)
            if (this.active == 1) {
                console.log(this.$refs.baseform.onSaveBaseFrom())
            } else if (this.active == 2) {
                this.$refs.otherform.onSaveotherFrom()
            } else if (this.active == 3) {
                this.$refs.signform.onSaveSignFrom()
            }
        },
        nextActive () {
            this.active++
        }
    }
}
</script>
<style lang="scss" scoped>
</style>