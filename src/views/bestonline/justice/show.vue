<template>
    <div class="jd-manage">
        <p v-if="justiceData.affairs.type==1">已提交 {{justiceData.affairs.updateTime}} {{ justiceData.affairs.updateUser}} </p>
        <el-form ref="form" :model="justiceData" :rules="rules">
            <el-collapse v-model="activeName" accordion>
                <KPI />
                <CoPartner />
                <el-collapse-item v-for="(title, index) in legalInfoTitles" :key="index" :name="index + 3">
                    <template slot="title">
                        <p class="title-p">{{ title }}</p>
                    </template>
                    <InvestmentOutLook v-if="index != 3" :type="index" />
                    <CompanyBasicLook v-if="index == 3" :type="index" />
                    <LegalInfoLook :type="index" />
                </el-collapse-item>
            </el-collapse>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import KPI from './components/kpiLook.vue'
import CoPartner from './components/copartnerLook.vue'
import LegalInfoLook from './components/legalInfoLook.vue'
import CompanyBasicLook from './components/legalInfo/companyBasicLook.vue'
import InvestmentOutLook from './components/legalInfo/investmentOutLook.vue'
export default {
    components: {
        KPI, CoPartner, CompanyBasicLook, InvestmentOutLook, LegalInfoLook
    },
    data () {
        return {
            legalInfoTitles: ['实际控制人法务信息', '实际控制人配偶法务信息', '拟选合伙人法务信息', '尽调公司法务信息'],
            activeName: '1',
            applyId: '',
            type: 1,
            updateTime: '',
            updateUser: '',
            tempFileId: null,
            dueLegalRemarkCreateForm: {
                companyDebtRemark: '',
                companyNotOperatingAssureRemark: '',
                companyOperatingAssureRemark: '',
                controllerAssureRemark: '',
                controllerDebtRemark: '',
                controllerMateAssureRemark: '',
                controllerMateDebtRemark: '',
                id: ''
            },
            rules: {
                state: [
                    { required: true, message: '此项为必填项！', trigger: 'change' }
                ],
                'affairs.legalRisksOfCompany': [
                    { required: true, message: '尽调公司法律风险不能为空', trigger: 'change' }
                ],
                'affairs.legalRisksOfController': [
                    { required: true, message: '实际控制人法律风险不能为空', trigger: 'change' }
                ],
                'affairs.legalRisksOfControllerMate': [
                    { required: true, message: '实际控制人配偶法律风险不能为空', trigger: 'change' }
                ],
                'affairs.personalOperatingloansTotalGuarantees': [
                    { required: true, message: '请输入个人经营性借款及担保总额', trigger: 'blur' }
                ],
                'affairs.companyLoanTotalGuarantee': [
                    { required: true, message: '请输入公司借款及担保总额 ', trigger: 'blur' }
                ],
                'affairs.riskDisclosure': [
                    { required: true, message: '风险揭示不能为空', trigger: 'blur' }
                ],
                'affairs.analysisDescription': [
                    { required: true, message: '分析描述不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        'justiceData.assetList': {
            handler (data) {
                data.map(value => {
                    if (typeof (value.attachInfo) == 'string') {
                        value.attachInfo = value.attachInfo && JSON.parse(value.attachInfo)
                    } else {

                    }
                    return value
                })
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.isCollapse,
            userInfo: state => state.userInfo,
            justiceData: state => state.dueDiligence.justiceData
        })
        // assetListType0 () {
        //     return this.justiceData.assetList.filter(value => {
        //         if (value.type === 0) return value
        //     })
        // }
    },
    methods: {
        ...mapActions({
            findJusticeData: 'findJusticeData'
        }),
        total (name) {
            let total = 0
            let falg = false
            let key = ''
            if (name.indexOf('assureListType') > -1) {
                key = 'money'
            } else {
                key = 'debt'
            }
            this[name].forEach((value) => {
                try {
                    let temp = value[key] - 0
                    total += temp
                } catch (e) {
                    falg = true
                }
            })
            if (falg || isNaN(total)) {
                this.$message({
                    type: 'warning',
                    message: '计算格式不正确！'
                })
                return
            }
            this[name + 'Total'] = total
        },
        onFilterUnNumber (id, fromTo, model, event) {
            let tempIndex = 0
            this['justiceData'][fromTo].forEach((value, index) => {
                if (value.id === id) tempIndex = index
            })
            this['justiceData'][fromTo][tempIndex][model] = event.target.value.replace(/[^\d]/g, '')
        },

        ...mapActions([
            'findJusticeData'
        ])
    },
    async mounted () {
        this.applyId = this.$route.query.applyId
        // await this.findJusticeData({ applyId: this.applyId })
    }
}
</script>
<style lang="scss" scoped>
.title-p {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
}
</style>
