<template>
    <div class="drawer-wrap">
        <el-drawer :title="type==='merchant'?'商家详情':'会员详情'" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <div class="drawer-content">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="功能管理" name="first"></el-tab-pane>
                    <!-- <el-tab-pane label="基本信息" name="second"></el-tab-pane> -->
                </el-tabs>
                <el-form :model="bossDetail" :rules="rules" ref="ruleForm">
                    <el-form-item :label="type==='merchant'?'商家账号：':'会员账号：'" :label-width="formLabelWidth">
                        <span v-if="type==='merchant'">{{bossDetail.merchantAccount?bossDetail.merchantAccount:'-'}}</span>
                        <span v-if="type==='member'">{{bossDetail.memberAccount?bossDetail.memberAccount:'-'}}</span>
                    </el-form-item>
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        {{bossDetail.companyName?bossDetail.companyName:'-'}}
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth" v-if="type==='merchant'">
                        <el-select v-model="bossDetail.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属商家：" :label-width="formLabelWidth" v-if="type==='member'">
                        <HAutocomplete :placeholder="'输入商家'" @back-event="backFindbrand" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
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
                                <el-select v-model="bossDetail.countryId" placeholder="请选择区">
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
                        <template v-if="bossDetail.isAuthentication">
                            {{bossDetail.isAuthentication==0?'未认证':'已认证'}}
                        </template>
                        {{bossDetail.authenticationTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="员工：" :label-width="formLabelWidth">
                        <ul v-if="bossDetail.staff.length>0">
                            <li v-for="(item,index) in bossDetail.staff" :key=index>{{item.name}} {{item.phone}} <i style="font-style:normal" v-for="(itemb,indexb) in item.role" :key=indexb>{{itemb+(indexb>0?'':',')}}</i></li>
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
                        {{bossDetail.updateBy}} {{bossDetail.updatePhone}}
                    </el-form-item>
                </el-form>
                <div class="drawer-footer" v-if="activeName=='first'">
                    <div class="drawer-button">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button type="primary" @click="onSaveDetail()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                    </div>
                </div>
                <!-- <div class="" v-if="activeName=='second'">
                    <el-form :model="form">
                        <el-form-item label="企业名称：" :label-width="formLabelWidth">
                            江苏舒适云信息技术有限公司
                        </el-form-item>
                        <el-form-item label="企业类型：" :label-width="formLabelWidth">
                            个体工商户
                        </el-form-item>
                        <el-form-item label="统一社会信用代码：" :label-width="formLabelWidth">
                            2716986423661687QAZ
                        </el-form-item>
                        <el-form-item label="营业执照照片：" :label-width="formLabelWidth">
                            <div>
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item label="法人姓名：" :label-width="formLabelWidth">
                            韦小宝
                        </el-form-item>
                        <el-form-item label="法人手机号：" :label-width="formLabelWidth">
                            3778765678
                        </el-form-item>
                        <el-form-item label="法人身份证号：" :label-width="formLabelWidth">
                            320121199997897797979
                        </el-form-item>
                        <el-form-item label="法人身份证照片：" :label-width="formLabelWidth">
                            <div style="float:left">
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                            <div style="float:left;margin-left:10px">
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item label="开户名：" :label-width="formLabelWidth">
                            320121199997897797979
                        </el-form-item>
                        <el-form-item label="银行卡号：" :label-width="formLabelWidth">
                            320121199997897797979
                        </el-form-item>
                        <el-form-item label="联行号：" :label-width="formLabelWidth">
                            320121199997897797979
                        </el-form-item>
                        <el-form-item label="开户许可证图片：" :label-width="formLabelWidth">
                            <div>
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item label="门头照：" :label-width="formLabelWidth">
                            <div>
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                        </el-form-item>
                        <el-form-item label="门店内景：" :label-width="formLabelWidth">
                            <div>
                                <img src="../../../assets/images/img_0.png" alt="">
                            </div>
                        </el-form-item>
                    </el-form>
                </div> -->
            </div>
        </el-drawer>
    </div>
</template>
<script>
import HAutocomplete from '@/components/autoComplete/HAutocomplete'
import { mapState, mapGetters, mapActions } from 'vuex'
import { putMerchantDetail, putMemberDetail } from './api/index'
import { deepCopy } from '@/utils/utils'
export default {
    name: 'account',
    props: {
        drawer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
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
            } else if (val === 2) {
                this.bossDetail.countryId = ''
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
</style>
