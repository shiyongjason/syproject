<template>
    <div class="drawer-wrap">
        <h-drawer :title="type==='merchant'?'商家详情':'会员详情'" :visible.sync="drawer" direction='rtl' size='50%' :beforeClose="handleClose">
            <template #connect>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="功能管理" name="first"></el-tab-pane>
                    <el-tab-pane label="开户信息" name="second"></el-tab-pane>
                </el-tabs>
                <el-form v-if="activeName=='first'" :model="bossDetail" :rules="rules" ref="ruleForm">
                    <el-form-item :label="type==='merchant'?'商家账号：':'会员账号：'" :label-width="formLabelWidth">
                        <span v-if="type==='merchant'">{{bossDetail.merchantAccount?bossDetail.merchantAccount:'-'}}</span>
                        <span v-if="type==='member'">{{bossDetail.memberAccount?bossDetail.memberAccount:'-'}}</span>
                    </el-form-item>
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        {{bossDetail.companyName?bossDetail.companyName:'-'}}
                    </el-form-item>
                    <el-form-item label="店铺名称：" :label-width="formLabelWidth" v-if="type == 'merchant'">
                        <el-input v-model="bossDetail.shopName" maxLength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth" v-if="type==='merchant'">
                        <el-select v-model="bossDetail.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属商家：" :label-width="formLabelWidth" v-if="type==='member'">
                        <HAutocomplete :placeholder="'输入商家'" :maxlength=30 @back-event="backFindbrand" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                    </el-form-item>
                    <el-form-item label="经营区域：" :label-width="formLabelWidth" required>
                        <el-col :span="6">
                            <el-form-item prop="provinceId">
                                <el-select v-model="bossDetail.provinceId" placeholder="请选择省" @change="onChangeList(1)">
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
                                <el-select v-model="bossDetail.cityId" placeholder="请选择市" @change="onChangeList(2)">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item prop="countryId">
                                <el-select v-model="bossDetail.countryId" placeholder="请选择区" @change="onChangeList(3)">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="(item) in areaList" :key="item.countryId" :label="item.name" :value="item.countryId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <template v-if="type==='merchant'">
                        <el-form-item label="商家类型：" prop="resource" :label-width="formLabelWidth">
                            <el-radio-group v-model="bossDetail.merchantType">
                                <el-radio :label="1">体系内</el-radio>
                                <el-radio :label="2">体系外</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="自动推送至店铺：" prop="resource" :label-width="formLabelWidth">
                            <el-switch v-model="bossDetail.isAutoDispatch" :active-value=1 :inactive-value=0></el-switch>
                        </el-form-item>
                        <el-form-item label="商家角色：" prop="type" :label-width="formLabelWidth">
                            <el-checkbox label="商品型" name="type" v-model="bossDetail.isCommodity" :true-label=1 :false-label=0></el-checkbox>
                            <el-checkbox label="运营型" name="type" v-model="bossDetail.isOperational" :true-label=1 :false-label=0></el-checkbox>
                        </el-form-item>
                    </template>
                    <!-- <template v-if="type==='member'">
                        <el-form-item label="会员来源：" :label-width="formLabelWidth">
                            {{memberSource[bossDetail.source]}}
                        </el-form-item>
                    </template> -->
                    <el-form-item label="认证状态：" :label-width="formLabelWidth">
                        {{bossDetail.isAuthentication==true?'已认证':'未认证'}}
                        <template v-if="bossDetail.authenticationTime">
                            {{bossDetail.authenticationTime | formatterTime}}
                        </template>
                    </el-form-item>
                    <el-form-item label="员工：" :label-width="formLabelWidth" v-if="bossDetail.staff">
                        <ul v-if="bossDetail.staff.length>0">
                            <li v-for="(item,index) in bossDetail.staff" :key=index>
                                {{item.name}} {{item.phone}} <i style="font-style:normal" v-for="(itemb,indexb) in item.role" :key=indexb>{{(indexb>0?',':'')+itemb}}
                                </i>
                            </li>
                        </ul>
                        <p v-if="bossDetail.staff.length==0">-</p>
                    </el-form-item>
                    <el-form-item label="注册时间：" :label-width="formLabelWidth">
                        {{bossDetail.registrationTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="最近更新时间：" :label-width="formLabelWidth">
                        {{bossDetail.updateTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="最近维护人：" :label-width="formLabelWidth">
                        {{bossDetail.updateBy?bossDetail.updateBy:'-'}} {{bossDetail.updatePhone}}
                    </el-form-item>
                </el-form>
                <div class="drawer-footer" v-if="activeName=='first'">
                    <div class="drawer-button">
                        <h-button @click="cancelForm">取 消</h-button>
                        <h-button type="primary" @click="onSaveDetail()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</h-button>
                    </div>
                </div>
                <div class="" v-if="activeName=='second'&&!bossDetail.isAuthentication&&!bossDetail.authenticationTime">
                    暂无认证信息
                </div>
                <div class="" v-if="activeName=='second'&&bossDetail.authenticationTime">
                    <el-form :model="bossDetail">
                        <el-form-item label="企业名称：" :label-width="formLabelWidth">
                            {{bossDetail.companyName||'-'}}
                        </el-form-item>
                        <el-form-item label="企业类型：" :label-width="formLabelWidth">
                            <!-- 11=个人，12=企业，13=个体工商户 -->
                            {{bossDetail.userType?userType[bossDetail.userType]:'-'}}
                        </el-form-item>
                        <el-form-item label="统一社会信用代码：" :label-width="formLabelWidth">
                            {{
                                bossDetail.corporation
                                ?
                                bossDetail.corporation.unifiedSocialCreditCode?bossDetail.corporation.unifiedSocialCreditCode:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item label="营业执照照片：" :label-width="formLabelWidth">
                            <div v-if="bossDetail.corporation&&bossDetail.corporation.businessLicensePhoto">
                                <el-image class="yyzzpic" fit="contain" style="width: 100px; height: 100px;border: 1px solid #c7c7c7;border-radius: 3px;" :src="bossDetail.corporation.businessLicensePhoto" :preview-src-list="[`${bossDetail.corporation.businessLicensePhoto}`]">
                                </el-image>
                            </div>
                            <div v-else>-</div>
                        </el-form-item>

                        <el-form-item v-if="bossDetail.userType==12" label="法人姓名：" :label-width="formLabelWidth">
                            {{
                                bossDetail.corporation
                                ?
                                bossDetail.corporation.legalPersonName?bossDetail.corporation.legalPersonName:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item v-if="bossDetail.userType==11" label="法人姓名：" :label-width="formLabelWidth">
                            {{
                                bossDetail.individual
                                ?
                                bossDetail.individual.userName?bossDetail.individual.userName:'-'
                                :'-'
                            }}
                        </el-form-item>

                        <el-form-item v-if="bossDetail.userType==12" label="法人身份证号：" :label-width="formLabelWidth">
                            {{
                                bossDetail.corporation
                                ?
                                bossDetail.corporation.legalCredentialNumber?bossDetail.corporation.legalCredentialNumber:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item v-if="bossDetail.userType==11" label="法人身份证号：" :label-width="formLabelWidth">
                            {{
                                bossDetail.individual
                                ?
                                bossDetail.individual.credentialNumber?bossDetail.individual.credentialNumber:'-'
                                :'-'
                            }}
                        </el-form-item>

                        <el-form-item v-if="bossDetail.userType==12" label="法人身份证照片：" :label-width="formLabelWidth">
                            <div style="float:left">
                                <el-image v-if="bossDetail.corporation&&bossDetail.corporation.certPhotoA" class="yyzzpic" fit="contain" style="width: 100px; height: 100px;border: 1px solid #c7c7c7;border-radius: 3px;" :src="bossDetail.corporation.certPhotoA"
                                    :preview-src-list="[`${bossDetail.corporation.certPhotoA}`]">
                                </el-image>
                                <font v-else>-</font>
                            </div>
                            <div style="float:left;margin-left:10px">
                                <el-image v-if="bossDetail.corporation&&bossDetail.corporation.certPhotoB" class="yyzzpic" fit="contain" style="width: 100px; height: 100px;border: 1px solid #c7c7c7;border-radius: 3px;" :src="bossDetail.corporation.certPhotoB"
                                    :preview-src-list="[`${bossDetail.corporation.certPhotoB}`]">
                                </el-image>
                                <font v-else>-</font>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="bossDetail.userType==11" label="法人身份证照片：" :label-width="formLabelWidth">
                            <div style="float:left">
                                <el-image v-if="bossDetail.individual&&bossDetail.individual.certPhotoA" class="yyzzpic" fit="contain" style="width: 100px; height: 100px;border: 1px solid #c7c7c7;border-radius: 3px;" :src="bossDetail.individual.certPhotoA"
                                    :preview-src-list="[`${bossDetail.individual.certPhotoA}`]">
                                </el-image>
                                <font v-else>-</font>
                            </div>
                            <div style="float:left;margin-left:10px">
                                <el-image v-if="bossDetail.individual&&bossDetail.individual.certPhotoB" class="yyzzpic" fit="contain" style="width: 100px; height: 100px;border: 1px solid #c7c7c7;border-radius: 3px;" :src="bossDetail.individual.certPhotoB"
                                    :preview-src-list="[`${bossDetail.individual.certPhotoB}`]">
                                </el-image>
                                <font v-else>-</font>
                            </div>
                        </el-form-item>

                        <el-form-item label="开户许可证核准号：" :label-width="formLabelWidth">
                            {{
                                bossDetail.corporation
                                ?
                                bossDetail.corporation.approvalNo?bossDetail.corporation.approvalNo:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item label="开户银行ID：" :label-width="formLabelWidth">
                            {{
                                bossDetail.bankAccount
                                ?
                                bossDetail.bankAccount.bankId?bossDetail.bankAccount.bankId:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item label="开户银行卡号：" :label-width="formLabelWidth">
                            {{
                                bossDetail.bankAccount
                                ?
                                bossDetail.bankAccount.bankAccountNumber?bossDetail.bankAccount.bankAccountNumber:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item label="开户银行支行名称：" :label-width="formLabelWidth">
                            {{
                                bossDetail.bankAccount
                                ?
                                bossDetail.bankAccount.branchName?bossDetail.bankAccount.branchName:'-'
                                :'-'
                            }}
                        </el-form-item>
                        <el-form-item label="认证状态：" :label-width="formLabelWidth">
                            <!-- 0：未认证 1：已认证 -->
                            {{
                                bossDetail.isAuthentication==0?'未认证':bossDetail.isAuthentication==1?"已认证":'-'
                            }}
                            <span v-if="bossDetail.authenticationFailureReason&&bossDetail.isAuthentication!=1">（{{bossDetail.authenticationFailureReason}}）</span>
                        </el-form-item>
                        <el-form-item label="认证方式：" :label-width="formLabelWidth">
                            <!-- 1：e签宝-企业四要素/e签宝-个人二要素 2：中金-开户 -->
                            {{
                                bossDetail.authenticationType==1?'e签宝':bossDetail.authenticationType==2?"中金":'-'
                            }}
                        </el-form-item>
                        <el-form-item label="认证时间：" :label-width="formLabelWidth">
                            {{formatTime(bossDetail.authenticationTime)}}
                        </el-form-item>
                        <el-form-item label="开户状态：" :label-width="formLabelWidth">
                            {{
                                bossDetail.openStatus==1?'未开户':bossDetail.openStatus==2?'开户中':bossDetail.openStatus==3?'开户成功':bossDetail.openStatus==4?'开户失败':'-'
                            }}
                            <span v-if="bossDetail.openStatus==4">（{{bossDetail.openFailureReason}}）</span>
                        </el-form-item>
                        <el-form-item label="开户时间：" :label-width="formLabelWidth">
                            {{formatTime(bossDetail.openTime)}}
                        </el-form-item>
                    </el-form>
                </div>
            </template>
        </h-drawer>
    </div>
</template>
<script>
import moment from 'moment'
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState, mapGetters, mapActions } from 'vuex'
import { putMerchantDetail, putMemberDetail } from './api/index'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'membershipDrawerCom',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            options: {
                direction: 'rtl',
                size: '50%'
            },
            userType: { 11: '个人', 12: '企业', 13: '个体工商户' },
            type: '',
            removeValue: true,
            merchantArr: [],
            activeName: 'first',
            branchArr: [],
            formLabelWidth: '140px',
            loading: false,
            proviceList: [],
            merchantCode: '',
            memberCode: '',
            bossDetail: {
                // memberAccount: '',
                // authenticationTime: '',
                // cityId: '',
                // cityName: '',
                // companyName: '',
                // countryId: '',
                // countryName: '',
                // isAuthentication: '',
                // isAutoDispatch: '',
                // isCommodity: '', // 是否商品型商家
                // isOperational: '',
                // merchantAccount: '',
                // merchantType: '',
                // provinceId: '',
                // provinceName: '',
                // registrationTime: '',
                // staff: [],
                // subsectionCode: '',
                // subsectionName: '',
                // updateBy: '',
                // updateTime: '',
                // updatePhone: ''

            },
            copyDetail: {},
            rules: {
                countryId: [
                    { required: true, message: '请选择区', trigger: 'change' }
                ],
                cityId: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                provinceId: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ]
            },
            memberSource: ['存量会员店', '存量平台公司', 'app注册', '商家注册', '好友推荐', '商家邀请'],
            targetObj: {
                selectName: '',
                selectCode: ''
            }
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
            merchantDetail: 'merchantDetail',
            branchList: 'branchList',
            memberDetail: 'memberDetail',
            merchantList: 'merchantList'
        }),
        cityList () {
            const province = this.proviceList.filter(item => item.provinceId == this.bossDetail.provinceId)
            if (province.length > 0) {
                return province[0].cities
            }
            return []
        },
        areaList () {
            const city = this.cityList.filter(item => item.cityId == this.bossDetail.cityId)
            if (city.length > 0) {
                return city[0].countries
            }
            return []
        }
    },
    watch: {
        // merchantCode: {
        //     handler (newV, oldV) {
        //         console.log(newV, oldV)
        //         if (newV) {
        //             this.getMerchtDetail(newV)
        //         }
        //     },
        //     deep: true
        // }
    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findMerchantDetail: 'findMerchantDetail',
            findBranch: 'findBranch',
            findMemberDetail: 'findMemberDetail',
            findMerchant: 'findMerchant'
        }),
        handleClose () {
            if (JSON.stringify(this.bossDetail) != JSON.stringify(this.copyDetail)) {
                this.$confirm('取消则不会保存修改的内容，你还要继续吗？', '是否确认取消修改？', {
                    confirmButtonText: '确认取消',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(async () => {
                    this.$emit('backEvent')
                })
            } else {
                this.activeName = 'first'
                this.$emit('backEvent')
            }
        },
        cancelForm () {
            if (JSON.stringify(this.bossDetail) != JSON.stringify(this.copyDetail)) {
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
        onSaveDetail () {
            this.bossDetail.provinceName = this.bossDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.bossDetail.provinceId)[0].name
            this.bossDetail.cityName = this.bossDetail.cityId && this.cityList.filter(item => item.cityId == this.bossDetail.cityId)[0].name
            this.bossDetail.countryName = this.bossDetail.countryId && this.areaList.filter(item => item.countryId == this.bossDetail.countryId)[0].name
            const params = { ...this.bossDetail }
            params.updateBy = this.userInfo.employeeName
            params.phone = this.userInfo.phoneNumber
            if (params.subsectionCode) {
                params.subsectionName = this.branchArr.find(v => v.organizationCode == params.subsectionCode).organizationName || ''
            }
            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    try {
                        if (this.type === 'merchant') {
                            params.merchantCode = this.merchantCode
                            await putMerchantDetail(params)
                        } else if (this.type === 'member') {
                            params.memberCode = this.memberCode
                            delete params.merchantName
                            await putMemberDetail(params)
                        }
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
        async onGetbranch () {
            await this.findBranch()
            this.branchArr = this.branchList
        },
        onChangeList (val) {
            if (val === 1) {
                this.bossDetail.countryId = ''
                this.bossDetail.cityId = ''
                // 获取中文
                // this.bossDetail.provinceName = this.bossDetail.provinceId && this.proviceList.filter(item => item.provinceId == this.bossDetail.provinceId).name
            } else if (val === 2) {
                this.bossDetail.countryId = ''
                // this.bossDetail.cityName = this.bossDetail.cityId && this.cityList.filter(item => item.cityId == this.bossDetail.cityId).name
            } else if (val === 3) {
                // this.bossDetail.countryName = this.bossDetail.countryId && this.areaList.filter(item => item.countryId == this.bossDetail.countryId).name
            }
        },
        async getFindNest () {
            await this.findNest()
            this.proviceList = this.nestDdata
        },
        async getMerchantList () {
            await this.findMerchant()
            this.merchantArr = this.merchantList
        },
        async getMerchtMemberDetail (val, type) {
            this.type = type
            if (type === 'merchant') {
                this.merchantCode = val
                await this.findMerchantDetail({ merchantCode: val })
                this.bossDetail = { ...this.merchantDetail }
            } else {
                this.memberCode = val
                await this.findMemberDetail({ memberCode: val })
                this.bossDetail = { ...this.memberDetail }
                // this.getFindNest()
                this.targetObj.selectCode = this.memberDetail.merchantCode
                this.targetObj.selectName = this.memberDetail.merchantName
            }
            this.copyDetail = deepCopy(this.bossDetail)
        },
        backFindbrand (val) {
            this.bossDetail.merchantCode = val.value ? val.value.selectCode : ''
        },
        formatTime (val) {
            if (!val) return '-'
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted () {
        this.getFindNest()
        this.onGetbranch()
        this.getMerchantList()
    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
    // position: relative;
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
/deep/ .el-tabs__item.is-active {
    background: transparent;
    color: #000;
}

/deep/.el-autocomplete {
    width: 300px;
    .el-input {
        width: 300px !important;
    }
}

.el-form-item__content .el-input {
    width: 200px !important;
}
.yyzzpic {
    margin-right: 10px;
}
</style>
