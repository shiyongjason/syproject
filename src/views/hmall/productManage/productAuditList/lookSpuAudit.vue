<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules">
                <div class="title-cont">
                    <span class="title-cont__label">基本信息</span>
                </div>
                <el-form-item label="商品品牌：" prop="brandName">
                    {{form.brandName}}
                </el-form-item>
                <el-form-item label="商品系列：" prop="model">
                    {{form.model}}
                </el-form-item>
                <el-form-item label="商品类目：" prop="categoryId">
                    {{form.categoryPath}}
                </el-form-item>
                <el-form-item label="商品名称：" prop="name">
                    {{form.name}}
                </el-form-item>
                <el-form-item label="商品销售名称：" prop="showName">
                    {{form.showName}}
                    <!-- <el-input class="form-input_big" v-model="form.showName" maxlength="100" placeholder="请输入商品销售名称"></el-input> -->
                </el-form-item>
                <div class="title-cont">
                    <span class="title-cont__label">销售信息</span>
                </div>
                <el-form-item label="商品图片：" prop="imageUrls" ref="imageUrls">
                    <el-upload :action="uploadInfo.action" :data="uploadInfo.data" :name="uploadAttr.name" :list-type="uploadAttr.listType" :show-file-list="uploadAttr.showFileList" :on-success="handleSuccess" :accept="uploadAttr.accept" :before-upload="beforeUpload"
                               v-if="imageUrls.length !==5 && seeTask == false">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div class="picture-content">
                        <ul>
                            <li v-for="(item, index) in imageUrls" :key="index">
                                <div class="mask-btn" v-show="seeTask == false">
                                    <span :class="index==0?'isDisabled':''" @click="onSettingTop(index)">设为主图</span>
                                    <span @click="onRemove(index)">删除图片</span>
                                    <a target="_blank" :href="item">查看原图</a>
                                </div>
                                <img :src="item">
                                <!-- <span v-if="index == 0" class="isDefault">主图</span> -->
                            </li>
                        </ul>
                    </div>
                    <div class="picture-prompt" v-show="seeTask == false">
                        <p>最多支持上传5张750*750，大小不超过2M，仅支持jpeg，jpg，png格式</p>
                    </div>
                </el-form-item>
                <skuTable ref="skuTable" :formData.sync="form" :seeTask.sync="seeTask" :edite.sync="edite"></skuTable>
                <div class="title-cont" v-if="specData.length != 0">
                    <span class="title-cont__label">参数信息</span>
                </div>
                <div class="form-cont-row parameter">
                    <div class="form-cont-col mb20" v-for="(item,index) in specifications" :key="index">
                        <el-form-item :label="item.k + '：'" :prop="`specifications[${index}].v`" :rules="seeTask == false ?{required:item.isRequired == 1 ? true : false, message: item.isCombobox == 1 ? '请选择' + item.k : '请输入' + item.k }: {}">
                            <el-input v-model="form.specifications[index].v" v-if="item.isCombobox == 0" maxlength="20" :disabled="seeTask == true">
                                <template slot="suffix">{{item.unit}}</template>
                            </el-input>
                            <el-select v-model="form.specifications[index].v" v-if="item.isCombobox == 1" clearable :disabled="seeTask == true">
                                <el-option v-for="i in item.options" :key="i" :value="i" :label="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="title-cont mt10">
                    <span class="title-cont__label">商品详情信息</span>
                </div>
                <RichEditor style="position:relative;z-index:1" v-model="form.detail" :width="richTextAttr.width" :height="richTextAttr.height" :menus="richTextAttr.menus" :uploadImgServer="richTextAttr.uploadImgServer" :uploadImgParams="richTextAttr.uploadImgParams" :disabled="disabled">
                </RichEditor>
                <el-form-item style="text-align: right" class="pt30">
                    <h-button type='primary' :loading="btnLoading" @click="onSave" v-if="seeTask == false">确定</h-button>
                    <h-button @click="onCancel">返回</h-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont" v-if="showMore">
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import skuTable from './skuTable'
    import { interfaceUrl } from '@/api/config'
    import { RICH_EDITOR_MENUS, PUTAWAY_RULES } from '../const/common'
    import { flatten } from '@/views/hmall/utils/sku'
    import { deepCopy } from '@/utils/utils'
    import { clearCache } from '@/utils/index'
    export default {
        name: 'editSpuAudit',
        components: {
            skuTable
        },
        data () {
            return {
                seeTask: false,
                edite: true,
                showMore: false,
                btnLoading: false,
                specifications: [],
                addValues: [],
                imageUrls: [],
                form: {
                    brandId: '',
                    brandName: '',
                    model: '',
                    categoryId: '',
                    name: '',
                    showName: '',
                    imageUrls: '',
                    specifications: [],
                    optionTypeIds: [],
                    mainSkus: [
                        {
                            name: '',
                            imageUrls: '',
                            serialNumber: '',
                            length: '',
                            width: '',
                            height: '',
                            grossWeight: '',
                            volume: '',
                            netWeight: ''
                        }
                    ],
                    detail: '',
                    operator: '',
                    optionTypeList: [],
                    auditStatus: '',
                    auditOpinion: ''
                },
                rules: {
                    imgUrls: [
                        { required: true, message: '请上传商品图片', trigger: 'change' }
                    ],
                    k: [
                        { required: true, message: '请输入规格名', trigger: 'blur' }
                    ],
                    v: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                this.form.optionTypeList.map(item => {
                                    if (!item.v || item.v.length == 0) {
                                        return callback(new Error('请输入规格值'))
                                    }
                                })
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    auditStatus: [
                        { required: true, message: '请选择审核结果', trigger: 'change' }
                    ],
                    auditOpinion: [
                        { required: true, message: '请填写理由说明', trigger: 'blur' },
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (this.form.auditOpinion && this.form.auditOpinion.replace(/\s/g, '').length < 1) {
                                    return callback(new Error('请填写理由说明'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    serialNumber: [
                        {
                            required: false,
                            validator: (rule, value, callback) => {
                                const reg = /^[A-Za-z0-9]+$/
                                if (this.form.mainSkus[0].serialNumber && !reg.test(this.form.mainSkus[0].serialNumber)) {
                                    return callback(new Error('条头码仅支持字母和数字'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    length: [
                        {
                            required: false,
                            validator: (rule, value, callback) => {
                                const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                                if (this.form.mainSkus[0].length && !reg.test(this.form.mainSkus[0].length)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                                if (this.form.mainSkus[0].width && !reg.test(this.form.mainSkus[0].width)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                                if (this.form.mainSkus[0].height && !reg.test(this.form.mainSkus[0].height)) {
                                    return callback(new Error('长宽高格式为小数点前十位，小数点后两位'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    grossWeight: [
                        {
                            required: false,
                            validator: (rule, value, callback) => {
                                const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                                if (this.form.mainSkus[0].grossWeight && !reg.test(this.form.mainSkus[0].grossWeight)) {
                                    return callback(new Error('毛重格式为小数点前十位，小数点后两位'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    volume: [
                        {
                            required: false,
                            validator: (rule, value, callback) => {
                                const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                                if (this.form.mainSkus[0].volume && !reg.test(this.form.mainSkus[0].volume)) {
                                    return callback(new Error('体积格式为小数点前十位，小数点后两位'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ],
                    netWeight: [
                        {
                            required: false,
                            validator: (rule, value, callback) => {
                                const reg = /(^[1-9]([0-9]{1,9})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                                if (this.form.mainSkus[0].netWeight && !reg.test(this.form.mainSkus[0].netWeight)) {
                                    return callback(new Error('净重格式为小数点前十位，小数点后两位'))
                                }
                                return callback()
                            },
                            trigger: 'blur'
                        }
                    ]
                },
                timer: null,
                props: {
                    emitPath: false,
                    value: 'id',
                    label: 'name',
                    children: 'subCategoryList'
                },
                uploadAttr: {
                    name: 'multiFile',
                    listType: 'picture-card',
                    showFileList: false,
                    limit: 5,
                    dialogImageUrl: '',
                    accept: 'image/jpeg, image/jpg, image/png'
                },
                richTextAttr: {
                    width: 1200,
                    height: 500,
                    menus: RICH_EDITOR_MENUS,
                    uploadImgServer: interfaceUrl + 'tms/files/upload-list',
                    uploadImgParams: { updateUid: 'Hosjoy' }
                },
                auditStatus: ''
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.userInfo,
                productUnique: state => state.hmall.productManage.productUnique,
                productSpuInfo: state => state.hmall.productManage.productSpuInfo,
                optionId: state => state.hmall.productManage.optionId,
                optionValueData: state => state.hmall.productManage.optionValueData
            }),
            ...mapGetters({
                brandOption: 'productManage/brandOption',
                modelOption: 'productManage/modelOption',
                categoryOption: 'productManage/categoryOption',
                specData: 'productManage/specData'
            }),
            uploadInfo () {
                return {
                    action: interfaceUrl + 'tms/files/upload',
                    data: {
                        updateUid: 'Hosjoy'
                    },
                    accept: 'image/jpeg, image/jpg, image/png'
                }
            },
            disabled () {
                return !!this.$route.query.seeTask
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.name == 'spuAudit') {
                    this.init()
                }
            },
            'form.brandName' (value) {
                if (value == '') {
                    this.form.brandId = ''
                }
            },
            'form.imgUrls' (value) {
                if (value > 0) {
                    this.$refs.imgUrls.clearValidate()
                }
            },
            'form.optionTypeList' (value) {
                const optionTypeList = flatten(value.filter(item => item.name && item.optionValues.length))
                // console.log(this.form.mainSkus)
                this.form.mainSkus.map(item => {
                    let optionValues = []
                    this.productSpuInfo.optionTypeList.forEach(i => {
                        let arr = item.optionValues.filter(j => j.optionTypeId == i.id)
                        if (arr.length > 0) {
                            optionValues = optionValues.concat(arr)
                        } else {
                            optionValues.push({
                                id: '',
                                name: '',
                                optionTypeId: i.id,
                                optionTypeName: i.name
                            })
                        }
                    })
                    item.optionValues = optionValues
                    return item
                })
            }
        },
        methods: {
            async init () {
                this.getBrandOptions()
                this.getCategoryOptions()
                this.getModelOptions()
                if (this.$route.query.id) {
                    this.showMore = true
                    this.getProductInfo(this.$route.query.id)
                }
                if (this.$route.query.seeTask) {
                    this.seeTask = true
                } else {
                    this.seeTask = false
                }
            },
            async querySearchAsyncBrand (queryString, cb) {
                const results = queryString ? await this.brandOption.filter(this.createStateFilter(queryString)) : this.brandOption
                cb(results)
            },
            handleSelectBrand (item) {
                this.form.brandName = item.name
                this.form.brandId = item.id
            },
            handleBlurBrand () {
                const data = this.brandOption.filter(item => item.name.toLowerCase() == this.form.brandName.toLowerCase())
                if (!(data.length > 0 && data[0].id === this.form.brandId)) {
                    this.form.brandName = ''
                    this.form.brandId = ''
                }
            },
            async querySearchAsyncModel (queryString, cb) {
                await this.getModelOptions()
                const modelOption = this.modelOption
                const results = queryString ? modelOption.filter(this.createStateFilter(queryString)) : modelOption
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    cb(results)
                }, 1000)
            },
            async handleSelectModel (item) {
                await this.getProductInfo(item.mainSpuId)
                this.showMore = true
            },
            createStateFilter (queryString) {
                return (state) => {
                    return state.value.indexOf(queryString) >= 0
                }
            },
            onExpandChangeCategory (value) {
                if (value.length == 2) {
                    this.getSpecByCategory(value[1])
                }
            },
            handleSuccess (file) {
                this.imageUrls.push(file.data.accessUrl)
            },
            beforeUpload (file) {
                if (this.uploadAttr.accept.indexOf(file.type) > -1) {

                } else {
                    this.$message.error('上传文件格式不正确!')
                    return false
                }
                const fileSize = file.size / 1024 / 1024 < 2
                if (!fileSize) {
                    this.$message.error('上传图片大小不能超过 2MB!')
                }
                return fileSize
            },
            backPicUrl (file) {
                this.form.mainSkus[0].imageUrls = file.imageUrl
            },
            onSettingTop (index) {
                this.imageUrls.unshift((this.imageUrls.splice(index, 1))[0])
            },
            onRemove (index) {
                this.imageUrls.splice(index, 1)
            },
            onChange (val) {
                this.$refs.form.clearValidate()
            },
            onSave () {
                let form = {}
                form = {
                    ...this.form,
                    mainSpuId: this.$route.query.id,
                    modifiableInfo: {
                        imgUrls: this.imageUrls,
                        detail: this.form.detail,
                        specifications: this.form.specifications.filter(item => item.v)
                    },
                    mainSkuWarehouseRequest: deepCopy(this.form.mainSkus).map(item => {
                        item.imageUrls = item.imageUrls.split(',')
                        return item
                    }),
                    operator: this.userInfo.employeeName,
                    auditStatus: this.form.auditStatus,
                    auditOpinion: this.form.auditOpinion
                }
                this.btnLoading = true
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        if (this.form.auditStatus != '') {
                            try {
                                await this.aduitSpu(form)
                                this.btnLoading = false
                                this.$message.success('操作成功！')
                                this.$router.push('/b2b/product/productAuditList')
                                this.setNewTags((this.$route.fullPath).split('?')[0])
                            } catch (error) {
                                this.btnLoading = false
                            }
                        } else {
                            this.btnLoading = false
                            this.$message.error('请选择审核结果！')
                        }
                    } else {
                        this.btnLoading = false
                    }
                })
            },
            onCancel () {
                this.$router.push('/b2b/product/productAuditList')
                this.setNewTags((this.$route.fullPath).split('?')[0])
            },
            ...mapActions({
                setNewTags: 'setNewTags',
                findBrandOptions: 'productManage/findBrandOptions',
                findCategoryOptions: 'productManage/findCategoryOptions',
                findModelOptions: 'productManage/findModelOptions',
                findSpecByCategory: 'productManage/findSpecByCategory',
                checkProductUnique: 'productManage/checkProductUnique',
                findProductSpuInfo: 'productManage/findProductSpuInfo',
                addOption: 'productManage/addOption',
                addOptionValue: 'productManage/addOptionValue',
                createProduct: 'productManage/createProduct',
                editProduct: 'productManage/editProduct',
                aduitSpu: 'productManage/aduitSpu'
            }),
            async getBrandOptions () {
                await this.findBrandOptions()
            },
            async getCategoryOptions () {
                await this.findCategoryOptions()
            },
            async getModelOptions () {
                await this.findModelOptions({ brandId: this.form.brandId, categoryId: this.form.categoryId })
            },
            async getSpecByCategory (categoryId) {
                await this.findSpecByCategory({ categoryId: categoryId })
                this.specifications = this.specData
                this.form.specifications = deepCopy(this.specifications).map(item => {
                    return { k: item.k, v: '' }
                })
            },
            async getProductUnique () {
                await this.checkProductUnique({ brandId: this.form.brandId, categoryId: this.form.categoryId, model: this.form.model })
            },
            async getProductInfo (id) {
                await this.findProductSpuInfo({ id: id })
                await this.getSpecByCategory(this.productSpuInfo.twoCategoryId)
                // console.log(this.productSpuInfo)
                this.form = {
                    ...this.productSpuInfo,
                    mainSkus: this.productSpuInfo.mainSkus.map(item => {
                        item.imageUrls = item.imageUrls.join(',')
                        return item
                    }),
                    optionTypeList: this.productSpuInfo.optionTypeList ? this.productSpuInfo.optionTypeList : []
                }
                // TODO: 处理老数据
                const specifications = this.productSpuInfo.specifications || []
                this.form.specifications = deepCopy(this.specifications).map((item, index) => {
                    const itemArr = specifications.filter(sItem => sItem.k == item.k)
                    if (itemArr.length > 0) {
                        item.v = itemArr[0].v
                    }
                    return item
                })
                this.imageUrls = this.productSpuInfo.imageUrls
            }
        },
        mounted () {
            this.init()
        },
        beforeRouteLeave (to, from, next) {
            if (to.name != 'productAuditList') {
                clearCache('productAuditList')
            }
            next()
        }
    }
</script>
<style lang="scss" scoped>
    .form {
        &-input {
            &_big {
                width: 480px;

                /deep/ .el-input {
                    width: 100%;
                }
            }

            &_medium {
                width: 405px;

                /deep/ .el-input {
                    width: 100%;
                }
            }
        }
    }

    .autocomplete {
        &-select {
            &_item {
                float: left;
                padding: 0 10px;
                width: calc(100% / 4 - 20px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .mask-btn {
        position: absolute;
        width: 104px;
        height: 104px;
        border-radius: 4px;
        z-index: -1;
        background: rgba($color: #000000, $alpha: 0.65);

        span,
        a {
            float: left;
            margin-left: 14px;
            padding: 0px 12px;
            height: 22px;
            line-height: 22px;
            color: #fff;
            font-size: 12px;
            border-radius: 4px;
            background: $hosjoyColor;
            cursor: pointer;
            margin-top: 10px;

            &:hover {
                background: $hosjoyColorHover;
            }
            &:active {
                background: $hosjoyColorActive;
            }
        }
    }

    .isDefault {
        display: inline-flex;
        width: 104px;
        height: 20px;
        line-height: 20px;
        color: $grayColor;
        text-align: center;
        // margin-top: 104px;
    }

    .isDisabled {
        background: $grayColor !important;
        cursor: not-allowed !important;
    }

    .sku-cont {
        &_group {
            position: relative;
            padding: 20px 24px;
            border: 1px solid #e5e5ea;
        }
    }

    .seeTask {
        display: flex;
        justify-content: flex-start;
        .el-form-item {
            margin-right: 20px;
        }
    }

    .group-spec {
        &_close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;

            &:hover {
                opacity: 0.6;
            }
        }
    }

    /deep/ .editor-wrap {
        width: 100% !important;
    }

    .stepPrcieBox {
        box-sizing: border-box;
        padding: 20px 0;
        margin-bottom: 20px;
        display: flex;
        border: 1px solid #e5e5ea;
        .stepLabel {
            text-align: right;
            width: 108px;
            padding-right: 12px;
            color: #ff7a45;
        }
        .stepItem {
            width: 180px;
            .stepTitle {
                color: #ff7a45;
                margin-bottom: 10px;
            }
            .stepPrice,
            .stepRange {
                color: #333333;
            }
        }
    }
    .area-cascader {
        /deep/ .el-cascader__tags {
            max-height: 100px;
            overflow-y: auto;
        }
        /deep/ .el-cascader {
            max-height: 100px;
        }
        /deep/ .el-input {
            width: 600px;
        }
    }

    .el-tag {
        background-color: #ecf5ff;
        border-color: #d9ecff;
        color: #409eff;

        /deep/ .el-tag__close {
            color: #409eff;

            &:hover {
                color: #fff;
                background-color: #409eff;
            }
        }
    }
</style>
