<template>
    <div class="drawer-wrap">
        <el-drawer title="企业详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <div class="drawer-content">
                <el-form :model="bossDetail" :rules="rules" ref="ruleForm">
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        江苏舒适云信息技术有限公司 <span>已认证</span>
                    </el-form-item>
                    <el-form-item label="管理员账号：" :label-width="formLabelWidth">
                        1233433443
                    </el-form-item>
                    <el-form-item label="管理员姓名：" :label-width="formLabelWidth">
                        1233433443
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth" v-if="type==='merchant'">
                        <el-select v-model="bossDetail.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
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

                    <el-form-item label="商家类型：" prop="resource" :label-width="formLabelWidth">
                        <el-radio-group v-model="bossDetail.merchantType">
                            <el-radio :label="1">体系内</el-radio>
                            <el-radio :label="2">体系外</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否关联平台公司：" :label-width="formLabelWidth">
                        <HAutocomplete :placeholder="'输入商家'" :maxlength=30 @back-event="backFindbrand" :selectArr="merchantArr" v-if="merchantArr" :selectObj="targetObj" :remove-value='removeValue' />
                    </el-form-item>
                    <el-form-item label="认证状态：" :label-width="formLabelWidth">
                        {{bossDetail.isAuthentication==true?'已认证':'未认证'}}
                        <template v-if="bossDetail.authenticationTime">
                            {{bossDetail.authenticationTime | formatterTime}}
                        </template>
                    </el-form-item>
                    <el-form-item label="金融风险：" :label-width="formLabelWidth">
                        白名单
                    </el-form-item>
                    <el-form-item label="创建时间：" :label-width="formLabelWidth">
                        {{bossDetail.registrationTime | formatterTime}}
                    </el-form-item>
                    <el-form-item label="创建人：" :label-width="formLabelWidth">
                        赵娟 15195954045
                    </el-form-item>
                    <el-form-item label="关联/认证时间：" :label-width="formLabelWidth">
                        2019-12-06 13:00:06
                    </el-form-item>
                    <el-form-item label="关联/认证人：" :label-width="formLabelWidth">
                        赵娟 15195954045
                    </el-form-item>
                    <el-form-item label="最近维护时间：" :label-width="formLabelWidth">
                        {{bossDetail.updateBy?bossDetail.updateBy:'-'}} {{bossDetail.updatePhone}}
                    </el-form-item>
                    <el-form-item label="最近维护人：" :label-width="formLabelWidth">
                        {{bossDetail.updateBy?bossDetail.updateBy:'-'}} {{bossDetail.updatePhone}}
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
import { putMerchantDetail, putMemberDetail } from '../api/index'
import { deepCopy } from '@/utils/utils'
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
/deep/.el-form .el-input {
}
.el-form-item__content .el-input {
    width: 200px !important;
}
</style>
