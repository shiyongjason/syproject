<template>
    <div>
        <el-form :model="baseForm" :rules="baseRules" ref="baseForm" label-width="130px" class="demo-baseForm">
            <el-form-item label="mis编码：" prop="name">
                <el-input v-model.trim="baseForm.misCode" placeholder="输入mis编码" maxlength="10" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="原公司名称：" prop="originaCompanyName">
                <el-input v-model.trim="baseForm.originaCompanyName" placeholder="输入原公司名称" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="原公司法人：" required>
                <el-col :span="4">
                    <el-form-item label="" prop="originalLegalPerson">
                        <el-input v-model.trim="baseForm.originalLegalPerson" placeholder="输入原公司法人" maxlength="64"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="originalLegalPersonPhone">
                        <el-input v-model.trim="baseForm.originalLegalPersonPhone" placeholder="输入原公司法人手机号" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="新公司名称：" prop="companyName">
                <el-input v-model.trim="baseForm.companyName" placeholder="输入新公司名称" maxlength="64" class="deveInput" @blur="onBlurinfo"></el-input>
            </el-form-item>
            <el-form-item label="公司简称：" prop="companyShortName">
                <el-input v-model.trim="baseForm.companyShortName" placeholder="输入公司简称" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="分部：" prop="ehrSubsectionCode">
                <HAutocomplete :selectArr="branchList" @back-event="backPlat($event,'F')" placeholder="请输入分部名称" :selectObj="selectAuth.branchObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
            </el-form-item>
            <el-form-item label="区域：">
                <HAutocomplete :selectArr="areaListNew" @back-event="backPlat($event,'Q')" placeholder="请输入区域名称" :selectObj="selectAuth.areaObj" :maxlength='30' :canDoBlurMethos='true'></HAutocomplete>
            </el-form-item>
            <el-form-item label="地址：" required>
                <el-col :span="4">
                    <el-form-item label="" prop="provinceCode">
                        <el-select v-model.trim="baseForm.provinceCode" placeholder="请选择省" @change="onChangeNest(1)">
                            <el-option label="请选择省" value=""></el-option>
                            <el-option :label="item.name" :value="item.provinceId" v-for="(item,index) in proviceList" :key=index></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="cityCode">
                        <el-select v-model.trim="baseForm.cityCode" placeholder="请选择市" @change="onChangeNest(2)">
                            <el-option label="请选择市" value=""></el-option>
                            <el-option :label="item.name" :value="item.cityId" v-for="(item,index) in cityList" :key=index></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="areaCode">
                        <el-select v-model.trim="baseForm.areaCode" placeholder="请选择区">
                            <el-option label="请选择区" value=""></el-option>
                            <el-option :label="item.name" :value="item.countryId" v-for="(item,index) in areaList" :key=index></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="address">
                        <el-input v-model.trim="baseForm.address" placeholder="地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="注册地址：">
                <el-input v-model.trim="baseForm.regLocation" placeholder="请输入注册地址" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="新营业执照号：">
                <el-input v-model.trim="baseForm.newBusinessLicenseNo" placeholder="请输入营业执照号" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="新营业执照：">
                <SingleUpload :upload="uploadInfo" :imageUrl="baseForm.newBusinessLicenseUrl" ref="uploadImg" @back-event="onereadUrl" />
                <p>尺寸要求:2M以内，支持PNG、GIF、JPEG、JPG</p>
            </el-form-item>
            <el-form-item label="新开户许可证：">
                <SingleUpload :upload="uploadInfo" :imageUrl="baseForm.newAccountOpeningPermit" ref="uploadImg" @back-event="tworeadUrl" />
                <p>尺寸要求:2M以内，支持PNG、GIF、JPEG、JPG</p>
            </el-form-item>
            <el-form-item label="公司类型：" prop="companyArr">
                <el-checkbox-group v-model="baseForm.companyArr">
                    <el-checkbox :label="item.dictInfoKey" v-for="(item) in companyTypeList" :key="item.dictInfoKey">{{item.dictInfoValue}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="主营系统：" prop="systemArr">
                <el-checkbox-group v-model="baseForm.systemArr">
                    <el-checkbox :label="item.dictInfoKey" v-for="(item) in mainSystemList" :key="item.dictInfoKey">{{item.dictInfoValue}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="主要业态：" prop="mainFormat">
                <el-radio-group v-model.trim="baseForm.mainFormat">
                    <el-radio :label=item.value v-for="(item,index) in formatList" :key=index>{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="经营范围：">
                <el-input type="textarea" placeholder="请输入经营范围" v-model="baseForm.businessScope" maxlength="255" show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item label="主设备品牌：" prop="mainBrand">
                <el-input v-model.trim="baseForm.mainBrand" placeholder="多个以逗号隔开" maxlength="64" class="deveInput"></el-input>
            </el-form-item>
            <el-form-item label="实际控制人：" required>
                <el-col :span="4">
                    <el-form-item label="" prop="controllerName">
                        <el-input v-model.trim="baseForm.controllerName" placeholder="姓名" maxlength="64"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="controllerPhone">
                        <el-input v-model.trim="baseForm.controllerPhone" placeholder="联系方式" maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="4">
                    <el-form-item prop="controllerId">
                        <el-input v-model.trim="baseForm.controllerId" placeholder="身份证号" maxlength="18"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="是否测试机构：">
                <el-radio-group v-model.trim="baseForm.isTest">
                    <el-radio :label=1>是</el-radio>
                    <el-radio :label=0>否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-button style="margin-top: 12px;" @click="onSavebasic" v-if="type=='edit'" :loading="loading">{{loading?'提交中':'保存'}}</el-button>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { interfaceUrl } from '@/api/config'
import { PHONE, checkIdCard } from '@/utils/rules'
import { FORMAT_LIST } from '../../store/const'
import { departmentAuth } from '@/mixins/userAuth'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { getCheckField, updateDevelopbasic, getTycHolder, getTycBasicInfo, getTycMainStaff, findAllBranchList } from '../../api/index'
export default {
    name: 'baseForm',
    mixins: [departmentAuth],
    components: {
        HAutocomplete
    },
    props: {
        baseForm: {
            type: Object,
            default: () => { }
        },
        selectAuth: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        return {
            pageInit: 0,
            loading: false,
            type: this.$route.query.type,
            companyData: [],
            formatList: FORMAT_LIST,
            baseRules: {
                originaCompanyName: [
                    { required: true, message: '请输入原公司名称', trigger: 'blur' }
                ],
                originalLegalPerson: [
                    { required: true, message: '输入原公司法人', trigger: 'blur' }
                ],
                originalLegalPersonPhone: [
                    { required: true, message: '输入原公司法人手机号', trigger: 'blur' },
                    { validator: PHONE, trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '输入新公司名称', trigger: 'blur' }
                ],
                companyShortName: [
                    { required: true, message: '输入公司简称', trigger: 'blur' }
                ],
                ehrSubsectionCode: [
                    { required: true, message: '请选择分部' }
                ],
                areaCode: [
                    { required: true, message: '请选择区', trigger: 'change' }
                ],
                cityCode: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                provinceCode: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                mainBrand: [
                    { required: true, message: '请输入主设备品牌', trigger: 'blur' }
                ],
                controllerPhone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                controllerName: [
                    { required: true, message: '请输入实际控制人姓名', trigger: 'blur' }
                ],
                mainFormat: [
                    { required: true, message: '请选择主要业态', trigger: 'change' }
                ],
                controllerId: [
                    { required: true, message: '请输入身份证', trigger: 'blur' },
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                systemArr: [
                    { type: 'array', required: true, message: '请至少选择一个主营系统', trigger: 'change' }
                ],
                companyArr: [
                    { type: 'array', required: true, message: '请至少选择一个公司类型', trigger: 'change' }
                ]
            },
            systemArr: [],
            companyArr: [],
            proviceList: [],
            companyTypeList: [],
            mainSystemList: [],
            radio: '',
            oneimageUrl: '',
            twoimageUrl: '',
            branchList: []
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
            regionalismList: state => state.areaList,
            areaListNew: state => state.areaList
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            dictInfoType: 'developmodule/dictInfoType'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.baseForm.provinceCode)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        areaList () {
            const city = this.cityList.filter(item => item.cityId == this.baseForm.cityCode)
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
                accept: 'image/jpeg, image/jpg, image/png, image/gif'
            }
        }
    },
    watch: {
        'baseForm.ehrSubsectionCode' (newVal) {
            if (newVal) {
                this.findAuthList({
                    deptType: 'Q',
                    pkDeptDoc: newVal || this.userInfo.pkDeptDoc
                })
            }
        }
    },
    mounted () {
        this.onFindNest()
        this.onFindCompanyType()
        this.onFindSystemType()
        this.findAllBranchList()
    },
    methods: {
        async findAllBranchList () {
            const { data } = await findAllBranchList()
            for (let i of data) {
                i.value = i.deptName
                i.selectCode = i.pkDeptDoc
            }
            this.branchList = data
        },
        ...mapActions({
            findAuthList: 'findAuthList',
            findNest: 'findNest',
            findCompanyType: 'developmodule/findCompanyType',
            setNewTags: 'setNewTags'
        }),
        onBlurinfo () {
            this.baseForm.companyName && Promise.all([this.onGetTycHolder(), this.onGetTycBasicInfo(), this.onGetTycMainStaff()])
        },
        async onGetTycHolder () {
            const { data } = await getTycHolder(this.baseForm.companyName)
            data && data.forEach(function (item) {
                if (item.type == '1') {
                    this.$set(this.baseForm.developSignInfoCreateForm, 'corporateShareholders', item.name)
                } else {
                    this.$set(this.baseForm.developSignInfoCreateForm, 'naturalPersonShareholders', item.name)
                }
            })
        },
        async onGetTycBasicInfo () {
            const { data } = await getTycBasicInfo(this.baseForm.companyName)
            this.$set(this.baseForm, 'businessScope', data.businessScope)
            this.$set(this.baseForm, 'regLocation', data.regLocation)
            this.$set(this.baseForm.developSignInfoCreateForm, 'estiblishTime', data.estiblishTime || '')
            // this.baseForm.developSignInfoCreateForm.estiblishTime = data.estiblishTime || ''
        },
        async onGetTycMainStaff () {
            const { data } = await getTycMainStaff(this.baseForm.companyName)
            data && data.forEach(function (item) {
                if (item.typeJoin[0] == '执行董事') {
                    this.$set(this.baseForm.developSignInfoCreateForm, 'director', item.name)
                } else if (item.typeJoin[0] == '总经理') {
                    this.$set(this.baseForm.developSignInfoCreateForm, 'generalManager', item.name)
                }
            })
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
        onereadUrl (val) {
            this.baseForm.newBusinessLicenseUrl = val.imageUrl
        },
        tworeadUrl (val) {
            this.baseForm.newAccountOpeningPermit = val.imageUrl
        },
        onChangeNest (val) {
            if (val == 1) {
                this.baseForm.cityCode = ''
                this.baseForm.areaCode = ''
            } else {
                this.baseForm.areaCode = ''
            }
        },
        onSaveBaseFrom () {
            this.baseForm.companyType = this.baseForm.companyArr && this.baseForm.companyArr.toString()
            this.baseForm.mainSystem = this.baseForm.systemArr && this.baseForm.systemArr.toString()
            this.baseForm.subregionName = this.baseForm.subregionCode && this.regionalismList.filter(item => item.pkDeptDoc == this.baseForm.subregionCode)[0].deptName
            this.baseForm.provinceName = this.baseForm.provinceCode && this.proviceList.filter(item => item.provinceId == this.baseForm.provinceCode)[0].name
            this.baseForm.cityName = this.baseForm.cityCode && this.cityList.filter(item => item.cityId == this.baseForm.cityCode)[0].name
            this.baseForm.areaName = this.baseForm.areaCode && this.areaList.filter(item => item.countryId == this.baseForm.areaCode)[0].name
            this.$refs.baseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await getCheckField({
                            'misCode': this.baseForm.misCode,
                            'companyShortName': this.baseForm.companyShortName
                        })
                        this.$emit('backnext')
                        this.baseForm.developAccountInfoCreateForm.accountBank = this.baseForm.companyName
                    } catch (error) {

                    }
                }
                // this.$emit('backnext')
            })
        },
        onSavebasic () {
            this.baseForm.companyType = this.baseForm.companyArr && this.baseForm.companyArr.toString()
            this.baseForm.mainSystem = this.baseForm.systemArr && this.baseForm.systemArr.toString()
            this.baseForm.subregionName = this.baseForm.subregionCode && this.regionalismList.filter(item => item.pkDeptDoc == this.baseForm.subregionCode)[0].deptName
            this.baseForm.provinceName = this.baseForm.provinceCode && this.proviceList.filter(item => item.provinceId == this.baseForm.provinceCode)[0].name
            this.baseForm.cityName = this.baseForm.cityCode && this.cityList.filter(item => item.cityId == this.baseForm.cityCode)[0].name
            this.baseForm.areaName = this.baseForm.areaCode && this.areaList.filter(item => item.countryId == this.baseForm.areaCode)[0].name
            this.loading = true
            this.$refs.baseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await updateDevelopbasic(this.baseForm)
                        this.$message.success('平台公司更新成功！')
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/developonline/developlist')
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        async backPlat (val, dis) {
            if (dis === 'F') {
                // this.baseForm.ehrSubsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                this.$set(this.baseForm, 'ehrSubsectionCode', val.value.pkDeptDoc ? val.value.pkDeptDoc : '')
                this.baseForm.subsectionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
                console.log(val)
                this.$refs['baseForm'].clearValidate()
                this.findAuthList({
                    deptType: 'Q',
                    pkDeptDoc: val.value.pkDeptDoc ? val.value.pkDeptDoc : this.userInfo.pkDeptDoc
                })
                !val.value.pkDeptDoc && this.linkage(dis)
            } else if (dis === 'Q') {
                this.baseForm.subregionCode = val.value.pkDeptDoc ? val.value.pkDeptDoc : ''
            }
        },
        linkage () {
            this.baseForm.subregionCode = ''
            this.selectAuth.areaObj = {
                selectCode: '',
                selectName: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.deveInput {
    width: 100%;
}
.demo-baseForm {
    width: 90%;
    margin: 10px auto;
}
.line {
    text-align: center;
}
</style>
