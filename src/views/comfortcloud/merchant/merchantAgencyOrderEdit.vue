<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
                <div class="page-body-title">
                    <h3>新增代理订单</h3>
                </div>
                <el-form-item label="代理商公司全称：" prop="companyName">
                    <el-input v-model.trim="form.companyName" show-word-limit placeholder="请输入代理商公司全称" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="代理商联系人：" prop="contactUser">
                    <el-input v-model.trim="form.contactUser" show-word-limit placeholder="请输入代理商联系人" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="代理商联系电话：" prop="contactNumber">
                    <el-input v-model.trim="form.contactNumber" show-word-limit placeholder="请输入代理商联系电话" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <span>代理商注册享钱后，该手机号对应的企业代理信息将自动同步</span>
                <el-form-item label="选择代理区域" prop="country">
                    <div class="query-col-input">
                        <el-cascader  placeholder="" :options="areaOptions" v-model="optarr" :clearable=true :collapse-tags=true :show-all-levels="true"
                                     ref="myCascader"
                                     @change="cityChange" :props="{ multiple: false ,value:'countryId',label:'name',children:'cities'}" filterable>
                        </el-cascader>
                    </div>
                </el-form-item>
                <el-form-item label="代理等级" prop="region">
                    <el-select placeholder="请选择代理等级" v-model="form.level">
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐搭配商品：">
                    <el-button type="primary" @click="addAgency">新增</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" v-for="(item,index) in form.signSpecifications" :key="index"
                              :rules="rules.productId">
                    <el-col :span="8">
                        <el-form-item label="归属品类：" >
                            <el-select v-model="item.categoryId" @change="selectChanged(item)">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.categoryName" :value="item.categoryId"
                                           v-for="item in cloudMerchantShopCategoryList"
                                           :key="item.categoryId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商品型号：">
                            <el-select v-model="item.specificationId" @change="selectSpecificationIdChanged(item)">
                                <el-option label="选择" value=""></el-option>
                                <el-option :label="item.specificationName" :value="item.specificationId"
                                           v-for="item in item.categoryList"
                                           :key="item.specificationId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button type="danger" style="margin-left:20px" @click="deleteClassifyMerchants(index)">删除
                    </el-button>
                </el-form-item>
                <el-form-item label="代理押金支付方式" prop="region" >
                    <el-select placeholder="请选择支付方式" v-model="form.payMethod">
                        <el-option label="现金" value="1"></el-option>
                        <el-option label="支付宝" value="20"></el-option>
                        <el-option label="微信" value="30"></el-option>
                        <el-option label="银行转账" value="40"></el-option>
                        <el-option label="其他" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理押金支付时间">
                    <el-col :span="4" label-width="200px">
                        <el-date-picker  placeholder="选择日期" v-model="form.payTime"
                                        style="width: 100%;" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品主图：" prop="productImg" ref="productImg">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="form.productImg" ref="uploadImg" @back-event="productImg" :imgW="80" :imgH="80" />
                    <div class="upload-tips">
                        建议尺寸：375*375，图片大小1M以内，支持jpeg,png和jpg格式
                    </div>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSaveAd()" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                    <el-button @click="onBack()">返回</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script>
import { interfaceUrl } from '@/api/config'
import { getLikeMerchantList } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantAdEdit',
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
            options: [],
            optarr: '',
            categoryTypes: [],
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
                type: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('商品类型不能为空'))
                        }

                        const index = parseInt(rule.field.split('.')[1])
                        const categoryId = this.form.categorys[index].categoryId
                        const specificationId = value

                        for (let i = 0; i < this.form.categorys.length; i++) {
                            if (i === index) {
                                continue
                            }
                            let item = this.form.categorys[i]
                            if (item.categoryId === categoryId && item.specificationId === specificationId) {
                                return callback(new Error('商品类型不能重复'))
                            }
                        }
                        callback()
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
        }
    },
    async mounted () {
        await this.findCloudMerchantShopCategoryList()
        this.allCategorys = this.cloudMerchantShopCategoryList

        if (this.$route.query.id) {
            this.getAgentDetail(this.$route.query.id)
        }
        this.getFindNest()
    },
    methods: {
        ...mapActions({
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList',
            findNest: 'findNest'
        }),

        async getAgentDetail (id) {
            let categorys = []
            let categoryTypes = []

            // 判断merchantsCategory是否是json
            if (this.cloudMerchantAdDetail.merchantsCategory.indexOf('{') !== -1) {
                let merchantsCategory = JSON.parse(this.cloudMerchantAdDetail.merchantsCategory)
                let keys = Object.keys(merchantsCategory)

                for (let i = 0; i < keys.length; i++) {
                    let ids = merchantsCategory[keys[i]]
                    for (let j = 0; j < ids.length; j++) {
                        categorys.push({
                            categoryId: parseInt(keys[i]),
                            specificationId: parseInt(ids[j])
                        })

                        await this.findCloudMerchantShopCategoryTypeList({ categoryId: keys[i] })
                        categoryTypes.push(this.cloudMerchantShopCategoryTypeList)
                    }
                }
            }

            this.form = {
                title: this.cloudMerchantAdDetail.title,
                categorys: categorys,
                content: this.cloudMerchantAdDetail.content
            }
            this.categoryTypes = categoryTypes
            console.log(this.form)
        },
        onBack () {
            this.setNewTags((this.$route.fullPath).split('?')[0])
            this.$router.go(-1)
        },

        addAgency: function () {
            this.form.signSpecifications.push({ categoryId: '', categoryName: '', specificationId: '', specificationName: '', categoryList: [] })
        },
        deleteClassifyMerchants: function (index) {
            this.form.signSpecifications.splice(index, 1)
        },
        remoteMethod: async function (query) {
            if (query !== '') {
                this.loading = true
                // 请求数据
                this.loading = false
                const merchantList = await getLikeMerchantList({ productName: query })
                this.options = merchantList.data
            } else {
                this.options = []
            }
        },
        onSaveAd () {
            this.loading = true
            console.log(this.form)
        },

        handleClose () {
            this.dialogVisible = false
        },
        async selectChanged (item) {
            item.specificationId = ''
            item.specificationName = ''
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: item.categoryId })
            this.cloudMerchantShopCategoryList.find((value) => { // 这里的ClaOptions就是上面遍历的数据源
                if (item.categoryId === value.categoryId) {
                    item.categoryName = value.categoryName
                }
            })
            let data = this.cloudMerchantShopCategoryTypeList
            item.categoryList = data
        },
        selectSpecificationIdChanged (item) {
            this.cloudMerchantShopCategoryTypeList.find((value) => { // 这里的ClaOptions就是上面遍历的数据源
                if (item.specificationId === value.specificationId) {
                    item.specificationName = value.specificationName
                }
            })
        },
        productImg (val) {
            this.form.productImg = val.imageUrl
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-body-title {
        margin-bottom: 20px;
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
