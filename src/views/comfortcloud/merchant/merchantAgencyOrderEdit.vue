<template>
    <div class="page-body">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
                <div class="page-body-title">
                    <h3>新增代理订单</h3>
                </div>
                <el-form-item label="代理商公司全称：" prop="title">
                    <el-input v-model.trim="form.title" show-word-limit placeholder="请输入代理商公司全称" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="代理商联系人：" prop="title">
                    <el-input v-model.trim="form.title" show-word-limit placeholder="请输入代理商联系人" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <el-form-item label="代理商联系电话：" prop="title">
                    <el-input v-model.trim="form.title" show-word-limit placeholder="请输入代理商联系电话" maxlength='50'
                              class="newTitle"></el-input>
                </el-form-item>
                <span>代理商注册享钱后，该手机号对应的企业代理信息将自动同步</span>
                <el-form-item label="选择代理区域">

                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11" label-width="200px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理等级" prop="region">
                    <el-select placeholder="请选择代理等级">
                        <el-option label="一级" value="shanghai"></el-option>
                        <el-option label="二级" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐搭配商品：">
                    <el-button type="primary" @click="addAgency">新增</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" v-for="(item,index) in form.mainProductList" :key="index"
                              :prop="'mainProductList.'+index+'.productId'" :rules="rules.productId">
                    <el-select v-model="item.productName" @change='selectItem(item)' placeholder="输入已上架的商品名称"
                               reserve-keyword filterable remote :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="items in options" :key="items.productId" :label="items.productName"
                                   :value="items.productName">
                        </el-option>
                    </el-select>
                    <el-button type="danger" style="margin-left:20px" @click="deleteClassifyMerchants(index)">删除
                    </el-button>
                </el-form-item>

                <el-form-item label="代理押金支付方式" prop="region">
                    <el-select placeholder="请选择支付方式">
                        <el-option label="支付宝" value="shanghai"></el-option>
                        <el-option label="微信" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理押金支付时间">
                    <el-col :span="11" label-width="200px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品主图：" prop="productImg" ref="productImg">
                    <SingleUpload sizeLimit='1M' :upload="uploadInfo" :imageUrl="productImgUrl" ref="uploadImg" @back-event="productImg" :imgW="80" :imgH="80" />
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
import { saveCloudMerchantAd } from '../api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'merchantAdEdit',
    data () {
        return {
            form: {
                title: '',
                categorys: [],
                content: ''
            },
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
                title: [
                    { required: true, message: '请输入广告标题', trigger: 'blur' }
                ],
                categorys: [
                    { required: true, message: '请添加招商品类和类型', trigger: 'change' }
                ],
                category: [{ required: true, message: '品类不能为空', trigger: 'change' }],
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
                }],
                content: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length <= 0 || value === '<p><br></p>') {
                                return callback(new Error('请输入广告内容'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            dialogVisible: false,
            uploadedUrl: '',
            videoimageUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            cloudMerchantAdDetail: 'cloudMerchantAdDetail',
            cloudMerchantShopCategoryList: 'cloudMerchantShopCategoryList',
            cloudMerchantShopCategoryTypeList: 'cloudMerchantShopCategoryTypeList' // 商品类型
        }),
        videoUpload () {
            return {
                action: interfaceUrl + 'tms/files/upload',
                data: {
                    updateUid: this.userInfo.employeeName
                },
                accept: 'audio/mp4, video/mp4'
            }
        },
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
            this.getAdDetail(this.$route.query.id)
        }
    },
    methods: {
        ...mapActions({
            setNewTags: 'setNewTags',
            getCloudMerchantAdDetail: 'getCloudMerchantAdDetail',
            findCloudMerchantShopCategoryList: 'findCloudMerchantShopCategoryList',
            findCloudMerchantShopCategoryTypeList: 'findCloudMerchantShopCategoryTypeList'
        }),

        async getAdDetail (id) {
            await this.getCloudMerchantAdDetail(id)
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

        },

        onSaveAd () {
            this.loading = true
            console.log(this.form)
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try {
                        let dic = {}
                        this.form.categorys.map((item) => {
                            if (dic[item.categoryId] == null) {
                                dic[item.categoryId] = [item.specificationId]
                            } else {
                                dic[item.categoryId].push(item.specificationId)
                            }
                        })

                        let params = {
                            title: this.form.title,
                            content: this.form.content,
                            merchantsCategory: JSON.stringify(dic)
                        }
                        console.log(params)

                        if (this.$route.query.id) {
                            params['id'] = this.$route.query.id
                            await saveCloudMerchantAd(params)
                            this.$message.success('广告修改成功')
                        } else {
                            await saveCloudMerchantAd(params)
                            this.$message.success('广告保存成功')
                        }
                        this.setNewTags((this.$route.fullPath).split('?')[0])
                        this.$router.push('/comfortCloudMerchant/merchantManage/merchantAd')
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                    }
                } else {
                    this.loading = false
                }
            })
        },
        videoUrl (val) {
            this.$message.success('视频上传成功')
            this.uploadedUrl = val.imageUrl
            this.videoimageUrl = 'https://hosjoy-iot.oss-cn-hangzhou.aliyuncs.com/images/public/big/share_icon.png'
        },
        onAddvideo () {
            this.uploadedUrl = ''
            this.videoimageUrl = ''
            this.dialogVisible = true
        },
        handleClose () {
            // console.log(this.$refs.editors.editor)
            this.dialogVisible = false
        },
        onInsertVideo () {
            this.$refs.editors.onInsertUrl(`</br><video src="${this.uploadedUrl}"  poster="" controls controlsList="nofullscreen nodownload noremote footbar" width="450" height="300" style="border:1px solid #f5f5f5;"></video></br>`)
            this.dialogVisible = false
        },
        onAddCategory () {
            this.form.categorys.push({ categoryId: '', specificationId: '' })
            this.categoryTypes.push([])
            this.$refs['form'].clearValidate(['categorys'])
        },
        async selectChanged (index) {
            this.form.categorys[index].specificationId = ''
            this.categoryTypes.splice(index, 1, [])
            await this.findCloudMerchantShopCategoryTypeList({ categoryId: this.form.categorys[index].categoryId })
            this.categoryTypes.splice(index, 1, this.cloudMerchantShopCategoryTypeList)
        },
        selectSpecificationIdChanged () {
            for (let i = 0; i < this.form.categorys.length; i++) {
                this.$refs['form'].validateField('categorys.' + i + '.specificationId')
            }
        },
        onRemoveCategory (index) {
            this.form.categorys.splice(index, 1)
            this.categoryTypes.splice(index, 1)
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
