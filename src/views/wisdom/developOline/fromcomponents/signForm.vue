<template>
    <div>
        <el-form :model="signForm" :rules="baseRules" ref="signForm" label-width="150px" class="demo-signForm">
            <el-form-item label="签约人：" required>
                <el-col :span="5">
                    <el-form-item label="" prop="signerName">
                        <el-input v-model.trim="signForm.signerName" placeholder="姓名" maxlength="10" class=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="" prop="signerPhone">
                        <el-input v-model.trim="signForm.signerPhone" placeholder="联系方式" maxlength="11" class=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="" prop="signerId">
                        <el-input v-model.trim="signForm.signerId" placeholder="身份证号" maxlength="18" class=""></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="我方签约人：" prop="ourSigner">
                        <el-input v-model.trim="signForm.ourSigner" placeholder="请输入我方签约人" maxlength="20" class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="签约日期：" prop="signTime">
                        <el-date-picker placeholder="请选择签约日期" v-model="signForm.signTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="营业执照下发时间：" prop="">
                        <el-date-picker placeholder="请选择营业执照下发时间" v-model="signForm.licenseLssuedTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="签报时间：" prop="">
                        <el-date-picker placeholder="请选择签报时间" v-model="signForm.signQuoteTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="新公司法人：" prop="newLegalPerson">
                        <el-input placeholder="请输入新公司法人" v-model="signForm.newLegalPerson" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="注册时间：">
                        <el-date-picker placeholder="请选择注册时间" v-model="signForm.signQuoteTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="自然人股东：">
                        <el-input placeholder="请输入自然人股东" v-model="signForm.naturalPersonShareholders" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="法人股东：">
                        <el-input placeholder="请输入法人股东" v-model="signForm.corporateShareholders" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="董事：">
                        <el-input placeholder="请输入董事" v-model="signForm.director" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="总经理：">
                        <el-input placeholder="请输入总经理" v-model="signForm.generalManager" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="监事：">
                        <el-input placeholder="请输入监事" v-model="signForm.supervisor" maxlength='20' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="新法人身份证号：" prop="newCorporationIdcard">
                <el-input placeholder="请输入身份证号" v-model="signForm.newCorporationIdcard" maxlength='18' class="deveInput"></el-input>
            </el-form-item>
            <el-row>
                <el-form-item label="新法人身份证照片：" prop="">
                    <el-col :span="5">
                        <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" />
                    </el-col>
                    <el-col :span="5">
                        <SingleUpload :upload="uploadInfo" :imageUrl="imageUrl" ref="uploadImg" @back-event="readUrl" />
                    </el-col>
                    <el-col :span="7">
                        上传正反面，尺寸要求:2M以内，支持PNG、GIF、JPEG、JPG
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="尽调报告时间：" prop="">
                        <el-date-picker placeholder="请选择尽调报告时间" v-model="signForm.dueDiligenceReportTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="尽调评审时间：" prop="">
                        <el-date-picker placeholder="请选择尽调评审时间" v-model="signForm.dueDiligenceInspectionTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="尽调意见：" prop="">
                <el-input type="textarea" placeholder="请输入尽调意见" v-model="signForm.dueDiligenceOpiniot" maxlength="255" show-word-limit>
                </el-input>
            </el-form-item>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="签约规模/万：" prop="signScale">
                        <el-input placeholder="请输入签约规模/万" v-model="signForm.signScale" maxlength='9' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="老公司规模/万：" prop="oldCompanyScale">
                        <el-input placeholder="请输入老公司规模/万" v-model="signForm.oldCompanyScale" maxlength='9' class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="销售规模增长(%)：" prop="salesVolume">
                        <el-select v-model="signForm.salesVolume" placeholder="请选销售规模增长" >
                            <el-option label="请选销售规模增长" value=""></el-option>
                            <el-option label="20%" value="0.2"></el-option>
                            <el-option label="30%" value="0.3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="利润增长(%)：" prop="profitGrowth">
                        <el-input placeholder="请输入利润增长" v-model="signForm.profitGrowth" class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="我方注册资金/万：" prop="ourRegisteredFund">
                        <el-input placeholder="请输入我方注册资金" v-model="signForm.ourRegisteredFund" class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="打款时间：">
                        <el-date-picker placeholder="请选择打款时间" v-model="signForm.remittanceTime" style="width: 100%;"></el-date-picker >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="上线时间：">
                <el-date-picker placeholder="请选择上线时间" v-model="signForm.onlineTime" ></el-date-picker >
            </el-form-item>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="总注册资金/万：" prop="changeRegisterFund">
                        <el-input placeholder="请输入总注册资金" v-model="signForm.changeRegisterFund" class="deveInput"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="变更时间：">
                        <el-date-picker placeholder="请选择变更时间" v-model="signForm.fundChangeTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { PHONE, checkIdCard } from '@/utils/rules'
import { FORMAT_LIST } from '../../store/const'
export default {
    props: {
        signForm: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            companyData: [],
            formatList: FORMAT_LIST,
            baseRules: {
                signerName: [
                    { required: true, message: '请输入签约人姓名', trigger: 'blur' }
                ],
                signerPhone: [
                    { required: true, message: '请输入签约人电话', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur' }
                ],
                signerId: [
                    { required: true, message: '请输入签约人身份号', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                ourSigner: [
                    { required: true, message: '请输入输入我方签约人', trigger: 'blur' }
                ],
                signTime: [
                    { type: 'date', required: true, message: '请选择签约日期', trigger: 'change' }
                ],
                newLegalPerson: [
                    { required: true, message: '请输入新公司法人', trigger: 'blur' }
                ],
                newCorporationIdcard: [
                    { required: true, message: '请输入新法人身份证号', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                signScale: [
                    { required: true, message: '输入输入签约规模', trigger: 'blur' }
                ],
                oldCompanyScale: [
                    { required: true, message: '请输入老公司规模/万', trigger: 'change' }
                ],
                profitGrowth: [
                    { required: true, message: '请选输入利润增长', trigger: 'change' }
                ],
                salesVolume: [
                    { required: true, message: '请选择销售规模增长', trigger: 'change' }
                ],
                ourRegisteredFund: [
                    { required: true, message: '请输入输入我方注册资金', trigger: 'change' }
                ]
            },
            systemArr: [],
            companyArr: [],
            proviceList: [],
            companyTypeList: [],
            mainSystemList: [],
            radio: '',
            imageUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            devDepList: state => state.devDepList
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            dictInfoType: 'developmodule/dictInfoType'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.signForm.provinceCode)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        areaList () {
            const city = this.cityList.filter(item => item.cityId == this.signForm.cityCode)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        },
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {

                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        }
    },
    mounted () {
        this.onFinddevlist()
        this.onFindNest()
        this.onFindCompanyType()
        this.onFindSystemType()
    },
    methods: {
        ...mapActions({
            getDevdeplist: 'getDevdeplist',
            findNest: 'findNest',
            findCompanyType: 'developmodule/findCompanyType'
        }),
        async onFinddevlist () {
            await this.getDevdeplist({ organizationType: 1 })
            this.companyData = this.devDepList.data
        },
        async onFindCompanyType () {
            await this.findCompanyType({ 'dictCateName': 'company_type' })
            this.companyTypeList = this.dictInfoType.data
        },
        async onFindSystemType () {
            await this.findCompanyType({ 'dictCateName': 'main_system' })
            this.mainSystemList = this.dictInfoType.data
        },
        async onFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
        },
        readUrl (val) {
            this.uploadImg.imageUrl = val.imageUrl
        },
        onChangeNest (val) {

        },
        onSaveSignFrom () {
            this.$refs.signForm.validate((valid) => {
                if (valid) {

                }
                // this.$emit('backnext')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.deveInput {
    width: 100%;
}
.demo-signForm {
    width: 90%;
    margin: 10px auto;
}
.line {
    text-align: center;
}
/deep/ .el-row {
    margin-bottom: 20px;
}
</style>