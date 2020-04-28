<template>
    <div class="drawer-wrap">
        <el-drawer title="企业详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose" :wrapperClosable=false>
            <div class="drawer-content">
                <el-form :model="businessDetail" :rules="rules" ref="ruleForm">
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        {{businessDetail.companyName}} &emsp;<el-button size="mini" round type="primary">{{businessDetail.isAuthentication?'已认证':'未认证'}}</el-button>
                    </el-form-item>
                    <el-form-item label="管理员账号：" :label-width="formLabelWidth">
                        {{businessDetail.userAccount||'-'}}
                    </el-form-item>
                    <el-form-item label="管理员姓名：" :label-width="formLabelWidth">
                           {{businessDetail.userName||'-'}}
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth" prop="subsectionCode">
                        <el-select v-model="businessDetail.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经营区域：" :label-width="formLabelWidth" required>
                        <el-col :span="6">
                            <el-form-item prop="provinceId">
                                <el-select v-model="businessDetail.provinceId" placeholder="请选择省" @change="onChangeList(1)">
                                    <el-option label="请选择" value=""></el-option>
                                    <template v-for="item in proviceList">
                                        <el-option :key="item.provinceId" :label="item.name" :value="item.provinceId">
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item prop="cityId">
                                <el-select v-model="businessDetail.cityId" placeholder="请选择市" @change="onChangeList(2)">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item prop="countryId">
                                <el-select v-model="businessDetail.countryId" placeholder="请选择区" @change="onChangeList(3)">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in areaList" :key="item.countryId" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="企业类型：" prop="companyType" :label-width="formLabelWidth">
                        <el-radio-group v-model="businessDetail.companyType" @change="onClearType">
                            <el-radio :label=1>体系内</el-radio>
                            <el-radio :label=2>体系外</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="平台公司：" :label-width="formLabelWidth" class="autoInput" v-if="businessDetail.companyType===1" prop="developOnlineCompanyCode"  ref="developOnlineCompany">
                        <HAutocomplete :placeholder="'请选择平台公司'" :maxlength=30 @back-event="backFindbrand($event,1)" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                    </el-form-item>
                   <template v-if="businessDetail.companyType==2">
                    <el-form-item label="是否关联平台公司：" prop="isRelated" :label-width="formLabelWidth" >
                        <el-radio-group v-model="businessDetail.isRelated" @change="onClearRelated">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="关联平台公司：" :label-width="formLabelWidth" class="autoInput" v-if="businessDetail.isRelated" prop="relationCompanyCode"  ref="relationCompany">
                        <HAutocomplete :placeholder="'请选择关联平台公司'" :maxlength=30 @back-event="backFindbrand($event,2)" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                    </el-form-item>
                    </template>
                    <el-form-item label="客户分类：" :label-width="formLabelWidth">
                      {{businessDetail.customerType==1?'黑名单':businessDetail.customerType==2?'白名单':businessDetail.customerType==3?'待审核':'-'}}
                    </el-form-item>
                    <el-form-item label="创建时间：" :label-width="formLabelWidth">
                        {{businessDetail.createTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="创建人：" :label-width="formLabelWidth">
                        {{businessDetail.createBy}} {{businessDetail.createPhone}}
                    </el-form-item>
                    <el-form-item label="关联/认证时间：" :label-width="formLabelWidth">
                        {{businessDetail.authenticationTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="关联/认证人：" :label-width="formLabelWidth">
                       {{businessDetail.authenticationBy||'-'}} {{businessDetail.authenticationPhone}}
                    </el-form-item>
                    <el-form-item label="最近维护时间：" :label-width="formLabelWidth">
                        {{businessDetail.updateTime| formatterTime}}
                    </el-form-item>
                    <el-form-item label="最近维护人：" :label-width="formLabelWidth">
                        {{businessDetail.updateBy?businessDetail.updateBy:'-'}} ({{businessDetail.updatePhone}})
                    </el-form-item>
                </el-form>
                <div class="drawer-footer">
                    <div class="drawer-button">
                        <el-button type="info" @click="onSetWhite()" v-if="hosAuthCheck(authen_operate)">设置白名单</el-button>
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button type="primary" @click="onSaveDetail()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="设置白名单" :visible.sync="dialogVisible" width="30%" :before-close="()=>dialogVisible = false" :close-on-click-modal=false>
            <el-form ref="statusForm" :model="statusForm" :rules="statusRules" label-width="100px">
                <el-form-item label="客户分类：" prop="customerType">
                    <el-radio-group v-model="statusForm.customerType">
                        <el-radio :label=item.key v-for="item in statusType" :key="item.key">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="说明：" prop="note">
                    <el-input type="textarea" v-model.trim="statusForm.note" maxlength="200" :rows="5" show-word-limit></el-input>
                </el-form-item>
                <p class="page-title">记录</p>
                <div class="page-wrap">
                    <div v-for="(i) in whiteRecordsList" :key=i.id>
                        <i class="el-icon-edit"></i><b>{{i.operator}} {{i.operatorPhone}}</b> 在 <b>{{i.operateTime| formatterTime}}</b> 将 客户分类 设置为了
                         <b> {{i.customerType==1?'黑名单':i.customerType==2?'白名单':i.customerType==3?'待审核':'-'}}</b> 说明：<b>{{i.note}}</b>；
                          <p v-if="i.customerType==2">白名单失效时间为：<b>{{i.failureTime| formatterTime}}</b></p>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onPutwhite" :loading="statusLoading">{{ statusLoading ? '提交中 ...' : '确 定' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState, mapGetters, mapActions } from 'vuex'
import { getBusinessAuthen, updateCrmauthen, putWhiterecord } from '../api/index'
import { deepCopy } from '@/utils/utils'
import * as Auths from '@/utils/auth_const'
export default {
    name: 'businessdrawer',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            authen_operate: Auths.CRM_WHITE_OPERATE,
            removeValue: true,
            branchArr: [],
            formLabelWidth: '150px',
            loading: false,
            statusLoading: false,
            businessDetail: {
            },
            copyDetail: {},
            rules: {
                subsectionCode: [
                    { required: true, message: '请选择分部', trigger: 'change' }
                ],
                companyType: [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                countryId: [
                    { required: true, message: '请选择区', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                provinceId: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                relationCompanyCode: [
                    { required: true, message: '请选择关联公司' }
                ],
                developOnlineCompanyCode: [
                    { required: true, message: '请选择平台公司' }
                ],
                isRelated: [
                    { required: true, message: '请选择是否关联平台公司', trigger: 'change' }
                ]
            },
            targetObj: {
                selectName: '',
                selectCode: ''
            },
            statusType: [{ value: '黑名单', key: 1 }, { value: '白名单', key: 2 }, { value: '待审核', key: 3 }],
            dialogVisible: false,
            proviceList: [],
            merchantArr: [],
            statusForm: {
                companyCode: '',
                companyName: '',
                customerType: '',
                note: '',
                operator: '',
                operatorPhone: ''
            },
            copyStatusForm: {},
            statusRules: {
                customerType: [
                    { required: true, message: '请选择客户分类', trigger: 'change' }
                ],
                note: [
                    { required: true, message: '请输入说明' }
                ]
            },
            whiteRecordsList: []
        }
    },
    components: {
        HAutocomplete
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            branchList: 'branchList',
            crmauthDetail: 'crmauthen/crmauthDetail',
            platlist: 'crmauthen/platlist',
            whiteRecords: 'crmauthen/whiteRecords'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        areaList () {
            const city = this.cityList.filter(item => item.cityId == this.businessDetail.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    watch: {

    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findBusinessDetail: 'crmauthen/findBusinessDetail',
            findBranch: 'findBranch',
            findPlatlist: 'crmauthen/findPlatlist',
            findWhiterecords: 'crmauthen/findWhiterecords'

        }),
        onClearV () {
            this.$refs['ruleForm'].clearValidate()
        },
        onClearType () {
            this.targetObj.selectCode = ''
            this.targetObj.selectName = ''
            if (this.businessDetail.companyType == 1) {
                this.$refs['developOnlineCompany'].clearValidate()
            } else {
                // this.$refs['relationCompany'].clearValidate()
                // this.$refs['developOnlineCompany'].clearValidate()
            }
        },
        onClearRelated () {
            this.targetObj.selectCode = ''
            this.targetObj.selectName = ''
            this.businessDetail.relationCompanyCode = ''
            this.businessDetail.relationCompanyName = ''
            if (this.businessDetail.isRelated) {
                this.$refs['relationCompany'].clearValidate()
            }
        },
        onAutenSatus (val) {
            if (val == 1) {
                return '未认证'
            } else if (val == 2) {
                return '认证中'
            } else if (val == 3) {
                return '认证成功'
            } else if (val == 4) {
                return '认证失败'
            }
        },
        handleClose () {
            if (JSON.stringify(this.businessDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
        },
        cancelForm () {
            if (JSON.stringify(this.businessDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.$emit('backEvent')
            }
        },
        async getMerchtMemberDetail (val) {
            const { data } = await getBusinessAuthen(val)
            await this.findBusinessDetail({ companyCode: val })
            this.businessDetail = this.crmauthDetail
            this.businessDetail.authenticationStatus = data.authenticationStatus
            this.copyDetail = deepCopy(this.businessDetail)
            this.targetObj.selectCode = this.businessDetail.companyType == 1 ? this.businessDetail.developOnlineCompanyCode : this.businessDetail.isRelated ? this.businessDetail.relationCompanyCode : ''
            this.targetObj.selectName = this.businessDetail.companyType == 1 ? this.businessDetail.developOnlineCompanyName : this.businessDetail.isRelated ? this.businessDetail.relationCompanyName : ''
            this.statusForm.customerType = ''
            this.statusForm.note = ''
            this.copyStatusForm = deepCopy(this.statusForm)
        },
        onSaveDetail () {
            this.businessDetail.provinceName = this.businessDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId)[0].name
            this.businessDetail.cityName = this.businessDetail.cityId && this.cityList.filter(item => item.cityId == this.businessDetail.cityId)[0].name
            this.businessDetail.countryName = this.businessDetail.countryId && this.areaList.filter(item => item.countryId == this.businessDetail.countryId)[0].name
            const params = { ...this.businessDetail }
            params.updateBy = this.userInfo.employeeName
            params.updatePhone = this.userInfo.phoneNumber
            if (params.subsectionCode) {
                params.subsectionName = this.branchArr.find(v => v.organizationCode == params.subsectionCode).organizationName || ''
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    try {
                        await updateCrmauthen(params)
                        this.$message({
                            message: '数据保存成功',
                            type: 'success'
                        })
                        this.$emit('backEvent')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                }
            })
        },
        async onSetWhite () {
            this.dialogVisible = true
            await this.findWhiterecords({ companyCode: this.businessDetail.companyCode })
            this.whiteRecordsList = this.whiteRecords
            this.statusForm = deepCopy(this.copyStatusForm)
            // 设置白名单
            this.statusForm.customerType = this.businessDetail.customerType
            this.statusForm.companyCode = this.businessDetail.companyCode
            this.statusForm.companyName = this.businessDetail.companyName
            this.$nextTick(() => {
                this.$refs['statusForm'].clearValidate()
            })
        },
        onPutwhite () {
            const params = { ...this.statusForm }
            params.operator = this.userInfo.employeeName
            params.operatorPhone = this.userInfo.phoneNumber
            this.$refs['statusForm'].validate(async (valid) => {
                if (valid) {
                    this.statusLoading = true
                    try {
                        await putWhiterecord(params)
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.$set(this.businessDetail, 'customerType', this.statusForm.customerType)
                        this.statusLoading = false
                    } catch (error) {
                        this.statusLoading = false
                    }
                }
            })
        },
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        onChangeList (val) {
            if (val === 1) {
                this.businessDetail.countryId = ''
                this.businessDetail.cityId = ''
                // 获取中文
                // this.businessDetail.provinceName = this.businessDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.businessDetail.provinceId).name
            } else if (val === 2) {
                this.businessDetail.countryId = ''
                // this.businessDetail.cityName = this.businessDetail.cityId && this.cityList.filter(item => item.cityId == this.businessDetail.cityId).name
            } else if (val === 3) {
                // this.businessDetail.countryName = this.businessDetail.countryId && this.areaList.filter(item => item.countryId == this.businessDetail.countryId).name
            }
        },
        async getPlatlist () {
            await this.findPlatlist()
            this.merchantArr = this.platlist
        },
        async getFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
        },

        backFindbrand (val, type) {
            if (type == 1) {
                this.businessDetail.developOnlineCompanyCode = val.value ? val.value.selectCode : ''
                this.businessDetail.developOnlineCompanyName = val.value ? val.value.companyName : ''
            } else {
                this.businessDetail.relationCompanyCode = val.value ? val.value.selectCode : ''
                this.businessDetail.relationCompanyName = val.value ? val.value.companyName : ''
            }
        }
    },
    mounted () {
        this.getFindNest()
        this.onGetbranch()
        this.getPlatlist()
    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
}
.drawer-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    form {
        // flex: 1;
        margin-bottom: 60px;
        // border-bottom: 1px solid #e5e5e5;
    }
    .drawer-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px 24px;
        border-top: 1px solid #e5e5ea;
        background: #fff;
        z-index: 1000;
        button {
            flex: 1;
        }
        .drawer-button {
            text-align: right;
        }
    }
}
.page-title {
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0;
}
.page-wrap {
    max-height: 250px;
    overflow-y: scroll;
    div {
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        transition: 0.3s;
        .el-icon-edit {
            color: #eb7343;
            margin-right: 10px;
        }
        b{
            color: #ff0000;
            font-weight: 500;
        }
    }
}
/deep/ .el-tabs__item.is-active {
    background: transparent;
    color: #000;
}

/deep/.el-autocomplete {
    width: 100%;
    .el-input {
        width: 100% !important;
    }
}
/deep/.el-drawer__header {
    padding: 20px 20px;
    border-bottom: 1px solid #e5e5e5;
}
.el-form-item__content .el-input {
    width: 200px !important;
}
/deep/.el-autocomplete {
    width: 100% !important;
}
/deep/ .el-form .el-input{
    width: 215px;
}
</style>
