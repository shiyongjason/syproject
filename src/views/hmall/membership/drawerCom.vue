<template>
    <div class="drawer-wrap">
        <el-drawer title="账号详情" :visible.sync="drawer" :with-header="false" direction="rtl" size='50%' :before-close="handleClose">
            <div class="drawer-content">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="功能管理" name="first"></el-tab-pane>
                    <el-tab-pane label="基本信息" name="second"></el-tab-pane>
                </el-tabs>
                <el-form :model="bossDetail" v-if="activeName=='first'">
                    <el-form-item label="商家账号：" :label-width="formLabelWidth">
                        {{bossDetail.merchantAccount}}
                    </el-form-item>
                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                        {{bossDetail.companyName}}
                    </el-form-item>
                    <el-form-item label="所属分部：" :label-width="formLabelWidth">
                        <el-select v-model="bossDetail.subsectionCode" placeholder="请选择" :clearable=true>
                            <el-option :label="item.organizationName" :value="item.organizationCode" v-for="item in branchArr" :key="item.organizationCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经营区域：" :label-width="formLabelWidth">
                        <el-select v-model="bossDetail.provinceId" placeholder="请选择省" @change="onChangeList(1)">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="(item) in proviceList" :key="item.provinceId" :label="item.name" :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <el-select v-model="bossDetail.cityId" placeholder="请选择市" @change="onChangeList(2)">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="(item) in cityList" :key="item.cityId" :label="item.name" :value="item.cityId">
                            </el-option>
                        </el-select>
                        <el-select v-model="bossDetail.countryId" placeholder="请选择区">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="(item) in areaList" :key="item.countryId" :label="item.name" :value="item.countryId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商家类型：" prop="resource" :label-width="formLabelWidth">
                        <el-radio-group v-model="bossDetail.merchantType">
                            <el-radio :label="1">体系内</el-radio>
                            <el-radio :label="2">体系外</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="自动推送至店铺：" prop="resource" :label-width="formLabelWidth">
                        <el-switch v-model="bossDetail.isAutoDispatch" :active-value=1 :inactive-value=0></el-switch>
                    </el-form-item>
                    <el-form-item label="认证状态：" :label-width="formLabelWidth">
                        {{bossDetail.isAuthentication==0?'未认证':'已认证'}}（{{bossDetail.authenticationTime | formatterTime}}）
                    </el-form-item>
                    <el-form-item label="商家角色：" prop="type" :label-width="formLabelWidth">

                        <el-checkbox label="商品型" name="type" v-model="bossDetail.isCommodity" :true-label=1 :false-label=0></el-checkbox>
                        <el-checkbox label="运营型" name="type" v-model="bossDetail.isOperational" :true-label=1 :false-label=0></el-checkbox>

                    </el-form-item>
                    <el-form-item label="员工：" :label-width="formLabelWidth">
                        <ul>
                            <li v-for="(item,index) in bossDetail.staff" :key=index>{{item.name}} {{item.role}} {{item.phone}}</li>
                        </ul>
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
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="onSaveDetail()" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
                </div>
                <div class="" v-if="activeName=='second'">
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
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { putMerchantDetail } from './api/index'
export default {
    name: 'account',
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        merchantCode: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            activeName: 'first',
            branchArr: [],
            formLabelWidth: '140px',
            loading: false,
            proviceList: [],
            bossDetail: {
                authenticationTime: '',
                cityId: '',
                cityName: '',
                companyName: '',
                countryId: '',
                countryName: '',
                isAuthentication: '',
                isAutoDispatch: '',
                isCommodity: '', // 是否商品型商家
                isOperational: '',
                merchantAccount: '',
                merchantType: '',
                provinceId: '',
                provinceName: '',
                registrationTime: '',
                staff: [],
                subsectionCode: '',
                subsectionName: '',
                updateBy: '',
                updateTime: '',
                updatePhone: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            nestDdata: 'nestDdata',
            merchantDetail: 'merchantDetail',
            branchList: 'branchList'
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
        merchantCode: {
            handler (val) {
                console.log(val)
                if (val) {
                    this.getMerchtDetail(val)
                }
            },
            deep: true
        }
    },
    methods: {
        ...mapActions({
            findNest: 'findNest',
            findMerchantDetail: 'findMerchantDetail',
            findBranch: 'findBranch'
        }),
        handleClose () {
            this.$emit('backEvent')
        },
        cancelForm () {
            this.$emit('backEvent')
        },
        async onSaveDetail () {
            const params = { ...this.bossDetail }
            params.updateBy = this.userInfo.employeeName
            params.phone = this.userInfo.phoneNumber
            params.merchantCode = this.merchantCode
            this.loading = true
            try {
                await putMerchantDetail(params)
                this.$message({
                    message: '数据保存成功',
                    type: 'success'
                })
                this.$emit('backEvent')
                this.loading = false
            } catch (error) {
                this.loading = false
            }
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
        async getMerchtDetail (val) {
            await this.findMerchantDetail({ merchantCode: val })
            this.bossDetail = { ...this.merchantDetail }
        }
    },
    mounted () {
        this.getFindNest()
        this.onGetbranch()
    }
}
</script>
<style  lang="scss" scoped>
/deep/ .el-drawer__body {
    overflow-y: scroll;
    position: relative;
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
    }
    .drawer-footer {
        padding: 0 10px;
        display: flex;
        position: fixed;
        bottom: 10px;
        // left: 0;
        right: 0;
        button {
            flex: 1;
        }
    }
}
/deep/ .el-tabs__item.is-active {
    background: transparent;
    color: #000;
}
</style>