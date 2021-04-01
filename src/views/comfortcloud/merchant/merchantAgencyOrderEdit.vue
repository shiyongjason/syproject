<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
                <div class="page-body-title">
                    <h3>新增代理订单</h3>
                </div>
                <el-form-item label="代理商联系电话：" prop="contactNumber">
                    <el-input v-model.trim="form.contactNumber" @change='remoteMethod' show-word-limit placeholder="请输入代理商手机号" maxlength='50' class="newTitle"></el-input>
<!--                    <el-select v-model="form.contactNumber" @change='selectContactItem' @blur="searchBlur" placeholder="请输入代理商联系电话" reserve-keyword filterable remote-->
<!--                               :remote-method="remoteMethod" :loading="loading">-->
<!--                        <el-option v-for="items in this.contactNumberOptions" :key="items.contactNumber" :label="items.contactNumber" :value="items">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
                </el-form-item>
                <el-form-item label="代理商公司全称：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50' class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="代理商联系人：" prop="contactUser">
                    <el-input v-model.trim="form.contactUser" show-word-limit placeholder="请输入代理商联系人" maxlength='50' class="newTitle"></el-input>
                </el-form-item>

                <span>代理商注册享钱后，该手机号对应的企业代理信息将自动同步</span>
                <el-form-item label="选择代理区域" prop="provinceName">
                    <el-col :span="6">
                        <div class="query-col-input">
                            <el-cascader placeholder="" :options="areaOptions" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true" ref="myCascader" @change="cityChange" :props="{ multiple: false ,value:'countryId',label:'name',children:'cities'}" filterable>
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址：" prop="contactAddress">
                            <el-input v-model.trim="form.contactAddress" show-word-limit placeholder="请输入详细地址" maxlength='50' class="newTitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理等级" prop="level">
                    <el-select placeholder="请选择代理等级" v-model="form.level">
                        <el-option label="一级" :value=1></el-option>
                        <el-option label="二级" :value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐搭配商品：" prop="signSpecifications">
                    <el-button type="primary" @click="addAgency">新增</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" v-for="(item,index) in form.signSpecifications" :key="index" :rules="rules.productId">
                    <el-col :span="8">
                        <el-form-item label="归属品类：">
                            <el-select v-model="item.categoryId" @change="selectChanged(item,index)">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.categoryName" :value="item.categoryId" v-for="item in cloudMerchantShopCategoryList" :key="item.categoryId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商品型号：">
                            <el-select v-model="item.specificationId" @change="selectSpecificationIdChanged(item)">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.specificationName" :value="item.specificationId" v-for="item in categoryList[index]"  :key="item.specificationId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button type="danger" style="margin-left:20px" @click="deleteClassifyMerchants(index)">删除
                    </el-button>
                </el-form-item>
                <el-form-item label="代理押金合计">
                    <el-col :span="6">
                        <span>代理押金 {{this.form.signSpecifications.length*1000}}元</span>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="首批提货款：">
                            <el-input v-model.trim="form.prepayAmount" show-word-limit placeholder="首批提货款" class="newTitle" v-isNum:2="form.prepayAmount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理押金支付方式" prop="payMethod">
                    <el-select placeholder="请选择支付方式" v-model="form.payMethod">
                        <el-option label="现金" :value=1></el-option>
                        <el-option label="支付宝" :value=20></el-option>
                        <el-option label="微信" :value=30></el-option>
                        <el-option label="银行转账" :value=40></el-option>
                        <el-option label="其他" :value=10></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理押金支付时间" prop="payTime">
                    <el-col :span="4" label-width="200px">
                        <el-date-picker placeholder="选择日期" v-model="form.payTime" style="width: 100%;" type="datetime" value-format="yyyy-MM-ddTHH:mm:ss" format="yyyy-MM-ddTHH:mm"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品主图：" prop="payCertificates" ref="productImg" >
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="productImgUrl" ref="uploadImg" @back-event="productImg" :imgW="80" :imgH="80" />
                    <SingleUpload v-if="form.payCertificates.length===1||form.payCertificates.length===2" sizeLimit='1M' :upload="uploadInfo" :imageUrl="productImgUrl2" ref="uploadImg" @back-event="productImg" :imgW="80" :imgH="80" />
                    <div class="upload-tips">
                        建议尺寸：375*375，图片大小1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveAd()" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}
                    </el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { saveManualAgent } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'merchantAgencyOrderEdit',
    data () {
        return {
            areaOptions: [],
            form: {
                agentCode: '',
                contactNumber: '',
                contactUser: '',
                companyName: '',
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                countryId: '',
                countryName: '',
                contactAddress: '',
                prepayAmount: '',
                payMethod: '',
                payTime: '',
                level: '',
                payCertificates: [],
                signSpecifications: [],
                operator: ''
            },
            contactNumberOptions: [],
            options: [],
            optarr: [],
            categoryList: [],
            allCategorys: [],
            menus: [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'undo', // 撤销
                'redo' // 重复
            ],
            rules: {
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                contactUser: [
                    { required: true, message: '请输入联系人', trigger: 'change' }
                ],
                contactNumber: [{ required: true, message: '请输入联系人号码', trigger: 'change' }],
                contactAddress: [{ required: true, message: '请输入联系地址', trigger: 'change' }],
                provinceName: [{ required: true, message: '请输入地区', trigger: 'change' }],
                level: [{ required: true, message: '请输入代理等级', trigger: 'change' }],
                payMethod: [{ required: true, message: '请输入支付方式', trigger: 'change' }],
                payTime: [{ required: true, message: '请输入支付时间', trigger: 'change' }],
                payCertificates: [{ required: true, message: '请输入支付凭证', trigger: 'change' }],
                signSpecifications: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('商品类型不能为空'))
                        }
                        let categoryIds = []
                        for (let i = 0; i < this.form.signSpecifications.length; i++) {
                            let item = this.form.signSpecifications[i]
                            if (!item.specificationName || !item.categoryName) {
                                return callback(new Error('商品类型不能为空'))
                            }
                            if (categoryIds.includes(item.specificationName)) {
                                return callback(new Error('商品类型不能重复'))
                            } else {
                                categoryIds.push(item.specificationName)
                            }
                        }

                        return callback()
                    },
                    trigger: 'change'
                }]

            },
            loading: false,
            dialogVisible: false,
            uploadedUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            nestDdata: 'nestDdata',
            cloudMerchantFromPhone: 'cloudMerchantFromPhone',
            cloudMerchantAgentOrderDetail: 'cloudMerchantAgentOrderDetail',
            cloudMerchantShopCategoryTypeList: 'cloudMerchantShopCategoryTypeList' // 商品类型
        }),
        uploadInfo () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'image/jpeg, image/jpg, image/png'
            }
        },
        uploadImgServer () {
            return interfaceUrl + 'tms/files/upload-list'
        },
        uploadImgParams () {
            return {
                updateUid: this.userInfo.employeeName
            }
        },
        uploadImgName () {
            return 'multiFile'
        },
        pickerOptionsStart () {
            return {
                disabledDate: time => {
                    return time.getTime() < Date.now() - 8.64e7
                }
            }
        },
        productImgUrl () {
            return this.form.payCertificates[0]
        },
        productImgUrl2 () {
            return this.form.payCertificates[1]
        }
    },
    async mounted () {
        await this.findCloudMerchantShopCategoryList()
        this.allCategorys = this.cloudMerchantShopCategoryList

        if (this.$route.query.agentCode) {
            this.getAgentDetail(this.$route.query.agentCode)
        }
        this.getFindNest()
        this.categoryList = []
    },
    methods: {
        ...mapActions({
            findCloudMerchantAgentOrderDetail: 'findCloudMerchantAgentOrderDetail',
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantFromPhone: 'findCloudMerchantFromPhone',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList',
            findNest: 'findNest'
        }),
        searchBlur (e) {
            this.form.contactNumber = e.target.value
        },
        async getAgentDetail (val) {
            await this.findCloudMerchantAgentOrderDetail({ agentCode: val })
            this.form = this.cloudMerchantAgentOrderDetail
            this.optarr = [this.form.provinceId, this.form.cityId, this.form.countryId]
            this.form.signSpecifications.map(async (item, index) => {
                await this.findCloudMerchantShopCategoryTypeList({ categoryId: item.categoryId })
                let data = this.cloudMerchantShopCategoryTypeList
                let list = [...this.categoryList]
                list[index] = data
                this.categoryList = list
            })
        },
        onBack () {
            this.$router.go(-1)
        },

        addAgency: function () {
            this.form.signSpecifications.push({
                categoryId: '',
                categoryName: '',
                specificationId: '',
                signAmount: 1000,
                specificationName: ''
            })
        },
        deleteClassifyMerchants: function (index) {
            this.form.signSpecifications.splice(index, 1)
        },
        onSaveAd () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.$confirm(`维护代理订单后，该代理商即可享受价格优惠，请确认信息准确无误后再提交。`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(async () => {
                        try {
                            this.form.totalAgentAmount = parseInt(this.form.prepayAmount) + this.form.signSpecifications.length * 1000
                            this.form.operator += this.userInfo.employeeName
                            this.form.signSpecifications.map((item) => {
                                item.signAmount = 1000
                            })
                            if (this.$route.query.agentCode) {
                                this.form.agentCode = this.$route.query.agentCode
                                await saveManualAgent(this.form)
                                this.$message.success('修改成功')
                            } else {
                                await saveManualAgent(this.form)
                                this.$message.success('保存成功')
                            }
                            this.loading = false
                            this.$router.push({ path: '/comfortCloudMerchant/merchantManage/merchantOrder' })
                        } catch (error) {
                            this.loading = false
                        }
                    })
                } else {
                    this.loading = false
                }
            })
        },

        handleClose () {
            this.dialogVisible = false
        },
        async selectChanged (item, index) {
            item.specificationId = ''
            item.specificationName = ''
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: item.categoryId })
            this.cloudMerchantShopCategoryList.find((value) => { // 这里的ClaOptions就是上面遍历的数据源
                if (item.categoryId === value.categoryId) {
                    item.categoryName = value.categoryName
                }
            })
            let data = this.cloudMerchantShopCategoryTypeList
            let list = [...this.categoryList]
            list[index] = data
            this.categoryList = list
        },
        async selectContactItem (val) {
            console.log(val)
            this.form.countryId = val.countryId
            this.form.countryName = val.countryName
            this.form.cityId = val.cityId
            this.form.provinceId = val.provinceId
            this.form.provinceName = val.provinceName
            this.form.contactAddress = val.contactAddress
            this.form.contactUser = val.contactUser
            this.form.companyName = val.companyName
            this.form.contactNumber = val.contactNumber
            this.optarr = [val.provinceId, val.cityId, val.countryId]
        },
        async remoteMethod (val) {
            await this.findCloudMerchantFromPhone({ phone: val })
            // this.contactNumberOptions.pop()
            let data = this.cloudMerchantFromPhone
            this.selectContactItem(data)
        },
        selectSpecificationIdChanged (item) {
            this.cloudMerchantShopCategoryTypeList.find((value) => { // 这里的ClaOptions就是上面遍历的数据源
                if (item.specificationId === value.specificationId) {
                    item.specificationName = value.specificationName
                }
            })
            this.form.signSpecifications.map((value, index) => {

            })
        },
        productImg (val) {
            this.form.payCertificates.push(val.imageUrl)
        },
        async getFindNest () {
            await this.findNest()
            this.areaOptions = this.nestDdata && this.nestDdata.map(item => {
                item.countryId = item.provinceId
                item.cities.map(value => {
                    value.cities = value.countries
                    value.countryId = value.cityId
                })
                return item
            })
        },
        cityChange (val) {
            this.form.provinceId = val[0]
            this.form.cityId = val[1]
            this.form.countryId = val[2]
            this.form.provinceName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
            this.form.cityName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
            this.form.countryName = this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
        },
        handleAvatarSuccess (res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload (file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isLt2M
        }

    }
}
</script>

<style lang="scss" scoped>
.page-body-title {
    margin-bottom: 20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.upload-tips {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    height: 100px;
    margin-left: 10px;
}

/deep/ .avatar-uploader {
    margin-right: 10px;
}

.editor-wrap {
    margin-top: 20px;
}

/deep/ .el-dialog__wrapper {
    // z-index: 99999 !important;
}

/deep/ .newTitle {
    width: 500px !important;
}

.el-picker-panel {
    z-index: 99999 !important;
}

/deep/ .w-e-text-container {
    z-index: 40 !important;
}

/deep/ .w-e-menu {
    z-index: 99 !important;
}

/deep/ .editor-wrap {
    margin-bottom: 23px !important;
}

/deep/ .w-e-toolbar {
    z-index: 99 !important;
}
</style>
