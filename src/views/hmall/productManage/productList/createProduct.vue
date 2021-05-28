<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="auto">
                <p class="mb20" v-if='form.auditOpinion'>审核不通过原因: <span class="red-word">{{form.auditOpinion}}</span></p>
                <div class="title-cont">
                    <span class="title-cont__label">商品基本信息</span>
                </div>
                <el-form-item label="商品品牌：" prop="brandName">
                    <el-autocomplete class="form-input_big" v-model="form.brandName" :fetch-suggestions="querySearchAsyncBrand" @select="handleSelectBrand" @blur="handleBlurBrand" :debounce="500" :maxlength="30" :disabled="showMore" placeholder="请输入商品品牌"></el-autocomplete>
                    <span class="ml10 isGrayColor">如若没有所需品牌，请联系运营添加!</span>
                </el-form-item>
                <el-form-item label="商品型号：" prop="model">
                    <el-autocomplete class="form-input_big autocomplete" v-model="form.model" :fetch-suggestions="querySearchAsyncTemplate" @select="handleSelectTemplate" :debounce="500" :maxlength="50" :disabled="showMore" placeholder="请输入商品型号">
                        <template slot-scope="{item}">
                            <el-tooltip effect="dark" :content="item.value" placement="top">
                                <span class="autocomplete-select_item">{{item.value}}</span>
                            </el-tooltip>
                            <el-tooltip effect="dark" :content="item.brandName" placement="top">
                                <span class="autocomplete-select_item">{{item.brandName}}</span>
                            </el-tooltip>
                            <el-tooltip effect="dark" :content="item.category" placement="top">
                                <span class="autocomplete-select_item">{{item.category}}</span>
                            </el-tooltip>
                            <el-tooltip effect="dark" :content="item.name" placement="top">
                                <span class="autocomplete-select_item">{{item.name}}</span>
                            </el-tooltip>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="商品类目：" prop="categoryId">
                    <el-cascader :append-to-body="false" class="form-input_medium" v-model="form.categoryId" :options="categoryOption" :props="props" clearable @expand-change="onExpandChangeCategory" :disabled="showMore" placeholder="请选择商品类目"></el-cascader>
                    <h-button type='primary' class="ml10" @click="onFindTemplate" :disabled="showMore">确定</h-button>
                </el-form-item>
                <div v-if="showMore">
                    <el-form-item label="商品名称：" prop="name">
                        <el-input class="form-input_big" v-model="form.name" maxlength="100" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <span class="isGrayColor">商品名称用于识别操作上下架编辑，字数最多100字</span>
                    </el-form-item>
                    <el-form-item label="商品销售名称：" prop="showName">
                        <el-input class="form-input_big" v-model="form.showName" maxlength="100" placeholder="请输入商品销售名称"></el-input>
                    </el-form-item>
                    <div class="title-cont">
                        <span class="title-cont__label">销售信息</span>
                    </div>
                    <el-form-item label="商品图片：" prop="imgUrls" ref="imgUrls">
                        <el-upload :action="uploadInfo.action" :data="uploadInfo.data" :name="uploadAttr.name" :list-type="uploadAttr.listType" :show-file-list="uploadAttr.showFileList" :on-success="handleSuccess" :accept="uploadAttr.accept" :before-upload="beforeUpload" v-if="imgUrls.length !==5">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="picture-content">
                            <ul>
                                <li v-for="(item, index) in imgUrls" :key="index">
                                    <div class="mask-btn">
                                        <span :class="index==0?'isDisabled':''" @click="onSettingTop(index)">设为主图</span>
                                        <span @click="onRemove(index)">删除图片</span>
                                    </div>
                                    <img :src="item">
                                    <span v-if="index == 0" class="isDefault">主图</span>
                                </li>
                            </ul>
                        </div>
                        <div class="picture-prompt">
                            <p>最多支持上传5张750*750，大小不超过2M，仅支持jpeg，jpg，png格式</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="规格图片：" v-if="form.specTemplate.length < 1" prop="imgUrlsSku">
                        <SingleUpload :upload="uploadInfo" :imgW="104" :imgH="104" :imageUrl="form.skuList[0].imgUrls" @back-event="backPicUrl" />
                        <div class="picture-prompt ml20">
                            <p>上传750*750，大小不超过2M，仅支持jpeg，jpg，png格式</p>
                        </div>
                        <input type="hidden" v-model="form.skuList[0].imgUrls">
                    </el-form-item>
                    <div class="sku-cont">
                        <div class="sku-cont_group mb20" v-for="(item,index) in form.specTemplate" :key="index">
                            <div class="group-spec_label">
                                <el-form-item label="规格名：" :prop="`specTemplate[${index}].k`" :rules="rules.k">
                                    <el-input v-model="item.k" :disabled="form.isOnShelf" maxlength="20" placeholder="请输入规格名"></el-input>
                                </el-form-item>
                            </div>
                            <div class="group-spec_tags mt20">
                                <el-form-item label="规格值：" :prop="`specTemplate[${index}].k`" :rules="rules.v">
                                    <el-tag class="mr10" v-for="(sItem,sIndex) in item.v" :key="sIndex" @close="onDelOption(index,sIndex)" :closable="form.auditStatus != 1 && item.v.length>1">{{sItem}}</el-tag>
                                    <el-input v-model="addValues[index]" maxlength="50" @keyup.native.enter="onAddOption(index)" @blur="onAddOption(index)" suffix-icon="el-icon-plus" :disabled="form.isOnShelf" placeholder="多个属性值以空格隔开"></el-input>
                                </el-form-item>
                            </div>
                            <span class="group-spec_close" @click="onDelSpec(index)" v-if="!form.isOnShelf"><i class="el-icon-close"></i></span>
                        </div>
                        <h-button type="create" class="mb20" @click="onAddSpec" :disabled="disabled || form.isOnShelf">添加规格</h-button>
                    </div>
                    <skuTable ref="skuTable" :formData.sync="form" v-if="form.specTemplate.length > 0"></skuTable>
                    <div class="title-cont" v-if="specifications.length != 0">
                        <span class="title-cont__label">参数信息</span>
                    </div>
                    <div class="form-cont-row parameter">
                        <div class="form-cont-col mb20" v-for="(item,index) in specifications" :key="index">
                            <el-form-item :label="item.k + '：'" :prop="`specifications[${index}].v`" :rules="{required:item.isRequired == 1 ? true : false, message: item.isCombobox == 1 ? '请选择' + item.k : '请输入' + item.k }">
                                <el-input v-model="form.specifications[index].v" v-if="item.isCombobox == 0" maxlength="20">
                                    <template slot="suffix">{{item.unit}}</template>
                                </el-input>
                                <el-select v-model="form.specifications[index].v" v-if="item.isCombobox == 1" clearable>
                                    <el-option v-for="i in item.options" :key="i" :value="i" :label="i"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="title-cont">
                        <span class="title-cont__label">商品销售信息</span>
                    </div>
                    <div class="title-cont mt10">
                        <span class="title-cont__label">商品详情信息</span>
                    </div>
                    <RichEditor style="position:relative;z-index:1" v-model="form.detail" :width="richTextAttr.width" :height="richTextAttr.height" :menus="richTextAttr.menus" :uploadImgServer="richTextAttr.uploadImgServer" :uploadImgParams="richTextAttr.uploadImgParams">
                    </RichEditor>
                </div>
                <div class="agreement mt10">
                    <span>温馨提示：为规范舒适e购商品发布管理，商家在上架商品时，需遵守<a class="isLink" @click="onPutawayRules">《舒适e购商品上架规则》</a></span>
                </div>
            </el-form>
        </div>
        <div class="page-body-cont btn-cont" v-if="showMore">
            <h-button @click="onCancel">取消</h-button>
            <h-button type='primary' :loading="btnLoading" @click="onSave">提交</h-button>
            <h-button @click="onReset">重置</h-button>
        </div>
        <el-backtop target=".page-body-cont .el-scrollbar__wrap"></el-backtop>
    </div>
</template>
<script>
import skuTable from './skuTable'
import { mapActions, mapState } from 'vuex'
import { addProduct, editProduct } from '../api/index'
import { interfaceUrl } from '@/api/config'
import { RICH_EDITOR_MENUS, PUTAWAY_RULES } from '../const/common'
// import { uniqueArr, flatten } from '@/utils/sku'
import { deepCopy } from '@/utils/utils'
import { clearCache } from '@/utils/index'
export default {
    name: 'createProduct',
    components: {
        skuTable
    },
    data () {
        return {
            showMore: true,
            btnLoading: false,
            brandOption: [],
            templateOption: [],
            categoryOption: [],
            specifications: [],
            provinceData: [],
            addValues: [],
            salesAreaList: [],
            imgUrls: [],
            priceDrawerSync: false,
            priceList: [],
            form: {
                brandId: '',
                brandName: '',
                model: '',
                categoryId: '',
                name: '',
                showName: '',
                specifications: [],
                salesAreaList: [],
                imgUrls: '',
                skuList: [
                    {
                        name: '',
                        imgUrls: '',
                        sellPrice: 0,
                        retailPrice: '',
                        commission: 0,
                        costPrice: '',
                        orderMinCount: '',
                        buyLimit: false,
                        orderMaxCount: '',
                        saleableStock: 0
                    }
                ],
                specTemplate: [

                ],
                detail: ''
            },
            orderMinCount: 1,
            buyLimit: false,
            orderMaxCount: '',
            rules: {
                brandName: [
                    { required: true, message: '请选择商品品牌', trigger: 'change' }
                ],
                model: [
                    { required: true, message: '请选择商品型号', trigger: 'change' }
                ],
                categoryId: [
                    { required: true, message: '请选择商品型类目', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                showName: [
                    { required: true, message: '请输入商品销售名称', trigger: 'blur' }
                ],
                salesAreaList: [
                    { required: true, message: '请选择可售卖区域', trigger: 'blur' }
                ],
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
                            this.form.specTemplate.map(item => {
                                if (!item.v || item.v.length == 0) {
                                    return callback(new Error('请输入规格值'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                imgUrlsSku: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            this.form.skuList.map(item => {
                                if (!item.imgUrls || item.imgUrls == '') {
                                    return callback(new Error('请上传规格图片'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'change'
                    }
                ],
                sellPrice: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            this.form.skuList.map(item => {
                                if (!item.sellPrice || item.sellPrice == '') {
                                    return callback(new Error('请输入销售价'))
                                }
                                if (!reg.test(item.sellPrice)) {
                                    return callback(new Error('销售价格式为小数点前十三位，小数点后两位'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                retailPrice: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            this.form.skuList.map(item => {
                                if (!item.retailPrice || item.retailPrice == '') {
                                    return callback(new Error('请输入建议零售价'))
                                }
                                if (!reg.test(item.retailPrice)) {
                                    return callback(new Error('建议零售价格式为小数点前十三位，小数点后两位'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                commission: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/
                            this.form.skuList.map(item => {
                                if (item.commission != 0 && item.commission == '') {
                                    return callback(new Error('请输入佣金'))
                                }
                                if (!reg.test(item.commission)) {
                                    return callback(new Error('佣金为小于100的2位小数或整数'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                costPrice: [
                    {
                        validator: (rule, value, callback) => {
                            const reg = /(^[1-9]([0-9]{1,12})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                            this.form.skuList.map(item => {
                                if (item.costPrice && !reg.test(item.costPrice)) {
                                    return callback(new Error('成本价格式为小数点前十三位，小数点后两位'))
                                }
                            })
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                orderMinCount: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /^[1-9]\d*$/
                            if (!this.orderMinCount || this.orderMinCount == '') {
                                return callback(new Error('请输入起售数量'))
                            }
                            if (this.buyLimit && (Number(this.orderMaxCount) < Number(this.orderMinCount))) {
                                return callback(new Error('起售数量不大于限购数量'))
                            }
                            if (!reg.test(this.orderMinCount)) {
                                return callback(new Error('起卖数量为正整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                buyLimit: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            return callback()
                        },
                        trigger: 'change'
                    }
                ],
                orderMaxCount: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            const reg = /^[1-9]\d*$/
                            if (!this.orderMaxCount || this.orderMaxCount == '') {
                                return callback(new Error('请输入限购数量'))
                            }
                            if (Number(this.orderMaxCount) < Number(this.orderMinCount)) {
                                return callback(new Error('限购数量不小于起售数量'))
                            }
                            if (!reg.test(this.orderMaxCount)) {
                                return callback(new Error('限购数量为正整数'))
                            }
                            return callback()
                        },
                        trigger: 'blur'
                    }
                ],
                saleableStock: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            this.form.skuList.map(item => {
                                const reg = /^[0-9]\d*$/
                                if (item.saleableStock === '') {
                                    return callback(new Error('请输入库存'))
                                } else if (item.saleableStock < 0 || !reg.test(item.saleableStock)) {
                                    return callback(new Error('库存为大于等于0的数字'))
                                }
                            })
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
            provinceProps: {
                multiple: true
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
            agreement: PUTAWAY_RULES
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo.principal,
            provinceOptions: state => state.provinceOptions
        }),
        ...mapState({
            brandData: 'productManage/brandData',
            templateData: 'templateData',
            categoryData: 'categoryData',
            specData: 'specData',
            templateInfo: 'templateInfo',
            brandAuthValue: 'brandAuthValue',
            productInfo: 'productInfo'
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
            return this.form.isOnShelf || this.form.specTemplate.some(item => !item.k || item.v.length == 0)
        },
        sumSaleableStock () {
            let sum = 0
            this.form.skuList.map(item => {
                sum += item.saleableStock ? item.saleableStock - 0 : 0
            })
            return sum
        },
        sumAvailableStock () {
            let sum = 0
            this.form.skuList.map(item => {
                sum += item.availableStock ? item.availableStock - 0 : 0
            })
            return sum
        }
    },
    watch: {
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
        'form.specTemplate' (val) {
            // const specTemplate = flatten(val.filter(item => item.k && item.v.length))
            const skuList = specTemplate.map((item, index) => {
                item.indexes = item.specifications.map(sItem => sItem.i).join('_')
                const skuInfo = this.form.skuList.filter(sku => sku.indexes == item.indexes)[0]
                item = { ...item, ...skuInfo }
                item.sellPrice = item.sellPrice ? item.sellPrice : 0
                item.saleableStock = item.saleableStock ? item.saleableStock : 0
                return item
            })
            if (!skuList.length) {
                this.form.skuList = this.form.skuList
                return
            }
            if (this.form.skuList.length == skuList.length) {
                this.form.skuList = skuList.map((item, index) => ({
                    ...this.form.skuList[index],
                    ...item
                }))
            } else {
                this.form.skuList = skuList
            }
        }
    },
    methods: {
        async init () {
            // this.getAllBrands()
            // this.getTemplateByValue()
            // this.getCategory()
            // await this.getProvinceOptions()
            if (this.$route.query.id) {
                this.showMore = true
                this.getProductInfo()
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
            const data = this.brandData.filter(item => item.name.toLowerCase() == this.form.brandName.toLowerCase())
            if (!(data.length > 0 && data[0].id === this.form.brandId)) {
                this.form.brandName = ''
                this.form.brandId = ''
            }
        },
        async querySearchAsyncTemplate (queryString, cb) {
            this.templateOption = []
            await this.getTemplateByValue()
            const templateOption = this.templateOption
            const results = queryString ? templateOption.filter(this.createStateFilter(queryString)) : templateOption
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                cb(results)
            }, 1000)
        },
        async handleSelectTemplate (item) {
            this.showMore = true
            await this.getTemplateInfoById(item.spuTemplateId)
            await this.getBrandAuthByValue()
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
        onFindTemplate () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.showMore = true
                    await this.getTemplateByValue()
                    await this.getBrandAuthByValue()
                    this.form.name = this.form.brandName + this.form.model + this.form.name
                }
            })
        },
        onChangeProvince (value) {
            this.form.salesAreaList = this.objArrToDyadicArr(value)
        },
        handleSuccess (file) {
            this.imgUrls.push(file.data.accessUrl)
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
            this.form.skuList[0].imgUrls = file.imageUrl
        },
        onAddSpec () {
            this.form.specTemplate.push({ k: '', v: [] })
        },
        onDelSpec (index) {
            this.form.specTemplate.splice(index, 1)
            if (!this.form.specTemplate.length) {
                this.form.skuList = [{
                    name: '',
                    imgUrls: '',
                    sellPrice: 0,
                    retailPrice: '',
                    commission: 0,
                    costPrice: '',
                    orderMinCount: '',
                    buyLimit: 0,
                    orderMaxCount: '',
                    saleableStock: 0
                }]
            }
        },
        onAddOption (index) {
            let str = this.addValues[index] || ''
            str = str.trim()
            if (!str) return
            const oldArr = this.form.specTemplate[index].v
            const arr = str.split(/\s+/)
                .filter(item => !oldArr.some(value => value == item))
                .map(item => (item))
            this.form.specTemplate = this.form.specTemplate.map((item, i) => {
                if (index === i) {
                    // item.v = uniqueArr([...oldArr, ...arr])
                }
                return item
            })
            this.$set(this.addValues, index, '')
        },
        onDelOption (index, sIndex) {
            this.form.specTemplate = this.form.specTemplate.map((item, i) => {
                if (index === i) {
                    item.v.splice(sIndex, 1)
                }
                return item
            })
            this.form.skuList = this.form.skuList.filter((item) => {
                const arr = item.indexes.split('_')
                return !(arr[index] === sIndex)
            })
            this.form.skuList = this.form.skuList.map((item) => {
                const arr = item.indexes.split('_')
                arr[index] = arr[index] >= sIndex ? arr[index] - 1 : arr[index]
                item.indexes = arr.join('_')
                return item
            })
            this.addValues.splice(sIndex, 1)
        },
        onSettingTop (index) {
            this.imgUrls.unshift((this.imgUrls.splice(index, 1))[0])
        },
        onRemove (index) {
            this.imgUrls.splice(index, 1)
        },
        onChangeStock () {
            if (this.form.skuList[0].difference) {
                this.form.skuList[0].availableStock = this.form.skuList[0].saleableStock - 0 + this.form.skuList[0].difference - 0
            } else {
                this.form.skuList[0].availableStock = this.form.skuList[0].saleableStock - 0
            }
        },
        onSave () {
            this.form.merchantCode = this.userInfo.merchantCode
            this.form.merchantName = this.userInfo.merchantName
            this.form.imgUrls = this.imgUrls.join(',')
            let form = {}
            if (this.form.specTemplate.length > 0) {
                form = {
                    ...this.form,
                    skuList: deepCopy(this.form.skuList).map(item => {
                        item.name = this.form.name + item.specifications.map(sItem => sItem.v).join('')
                        item.specifications = JSON.stringify(item.specifications)
                        item.buyLimit = this.buyLimit
                        item.orderMinCount = this.orderMinCount
                        item.orderMaxCount = this.orderMaxCount
                        return item
                    }),
                    specTemplate: JSON.stringify(this.form.specTemplate),
                    specifications: this.form.specifications.filter(item => item.v)
                }
            } else {
                form = {
                    ...this.form,
                    skuList: deepCopy(this.form.skuList).map(item => {
                        item.name = this.form.name
                        item.orderMinCount = this.orderMinCount
                        item.buyLimit = this.buyLimit
                        item.orderMaxCount = this.orderMaxCount
                        item.ladderPriceList = this.priceList
                        item.specifications = ''
                        return item
                    }),
                    specTemplate: '',
                    specifications: this.form.specifications.filter(item => item.v)
                }
            }
            this.btnLoading = true
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.$route.query.id) {
                            await editProduct(form)
                            if (this.$route.query.from == 'stepPrice') {
                                this.$router.push('/price/stepPrice')
                            } else {
                                this.$router.push('/goods/productList')
                            }
                        } else {
                            form.id = ''
                            await addProduct(form)
                            this.$router.push('/goods/productList')
                        }
                        this.btnLoading = false
                    } catch (error) {
                        this.btnLoading = false
                    }
                } else {
                    this.btnLoading = false
                }
            })
        },
        onCancel () {
            if (this.$route.query.from == 'stepPrice') {
                this.$router.push('/price/stepPrice')
            } else {
                this.$router.push('/goods/productList')
            }
        },
        onReset () {
            this.reload()
        },
        onPutawayRules () {
            this.$alert(this.agreement, '舒适e购商品上架规则', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
            })
        },
        objArrToDyadicArr (value) {
            const filterResult = []
            this.provinceData.filter(item => value.some(i => item.children.some(j => j.value == i[1])))
                .map(item => ({ label: item.label, value: item.value, children: item.children.filter(i => value.some(j => i.value == j[1])) }))
                .map(item => {
                    item.children.map(i => {
                        filterResult.push({ provinceId: item.value, provinceName: item.label, cityId: i.value, cityName: i.label })
                    })
                })
            return filterResult
        },
        dyadicArrToObjArr (value) {
            let result = []
            const provinceObj = {}
            const cityArr = this.provinceData.map(item => {
                provinceObj[item.value] = item.children.map(cItem => [item.value, cItem.value])
                return item.children.map(cItem => [item.value, cItem.value])
            })
            value.forEach(item => {
                if (item.provinceId == '0') {
                    result = result.concat(cityArr.flat())
                } else if (item.cityId == '0') {
                    result = result.concat(provinceObj[item.provinceId])
                } else {
                    result.push([item.provinceId, item.cityId])
                }
            })
            return result
        },
        ...mapActions({
            // 'findProvinceOptions',
            getBrandOptions: 'productManage/findBrandOptions'
        }),
        ...mapActions('productManage', [
            'findAllBrands',
            'findTemplateByValue',
            'findCategory',
            'findSpecByCategory',
            'findTemplateInfoById',
            'findBrandAuthByValue',
            'findProductInfo'
        ]),
        async getAllBrands () {
            await this.findAllBrands()
            this.brandOption = this.brandData.map(item => {
                item.value = item.name
                return item
            })
        },
        async getTemplateByValue () {
            await this.findTemplateByValue({ brandId: this.form.brandId, categoryId: this.form.categoryId })
            this.templateOption = this.templateData.map(item => {
                item.value = item.model
                return item
            })
        },
        async getCategory () {
            await this.findCategory()
            this.categoryOption = this.categoryData
        },
        async getSpecByCategory (categoryId) {
            await this.findSpecByCategory({ categoryId: categoryId })
            this.specifications = this.specData.specifications || []
            this.form.specifications = deepCopy(this.specifications).map(item => {
                return { k: item.k, v: '' }
            })
        },
        async getTemplateInfoById (spuTemplateId) {
            await this.findTemplateInfoById({ spuTemplateId: spuTemplateId })
            await this.getSpecByCategory(this.templateInfo.twoCategoryId)
            this.form = {
                ...this.form,
                ...this.templateInfo,
                name: this.templateInfo.brandName + this.templateInfo.model + this.templateInfo.name
            }
            this.imgUrls = this.templateInfo.imgUrls.split(',')
            const specifications = this.form.specifications || []
            this.form.specifications = deepCopy(this.specifications).map((item, index) => {
                const itemArr = specifications.filter(sItem => sItem.k == item.k)
                if (itemArr.length > 0) {
                    item.v = itemArr[0].v
                }
                return item
            })
        },
        async getBrandAuthByValue () {
            await this.findBrandAuthByValue({ brandId: this.form.brandId, categoryId: this.form.categoryId, merchantCode: this.userInfo.merchantCode })
            this.salesAreaList = this.dyadicArrToObjArr(this.brandAuthValue)
            this.form.salesAreaList = this.objArrToDyadicArr(this.salesAreaList)
        },
        async getProvinceOptions () {
            await this.findProvinceOptions()
            this.provinceData = this.provinceOptions.map(i => {
                return {
                    label: i.name,
                    value: i.provinceId,
                    children: i.cities.map(j => {
                        return {
                            label: j.name,
                            value: j.cityId
                        }
                    })
                }
            })
        },
        async getProductInfo () {
            await this.findProductInfo({ spuId: this.$route.query.id })
            await this.getSpecByCategory(this.productInfo.twoCategoryId)
            this.form = {
                ...this.productInfo,
                skuList: this.productInfo.skuList.map(item => {
                    item.specifications = JSON.parse(item.specifications)
                    this.priceList = item.ladderPriceList ? item.ladderPriceList : []
                    this.orderMinCount = item.orderMinCount
                    this.buyLimit = item.buyLimit
                    this.orderMaxCount = item.orderMaxCount
                    item.difference = item.availableStock - item.saleableStock
                    return item
                }),
                specTemplate: this.productInfo.specTemplate ? JSON.parse(this.productInfo.specTemplate) : []
            }
            // TODO: 处理老数据
            const specifications = this.productInfo.specifications || []
            this.form.specifications = deepCopy(this.specifications).map((item, index) => {
                const itemArr = specifications.filter(sItem => sItem.k == item.k)
                if (itemArr.length > 0) {
                    item.v = itemArr[0].v
                }
                return item
            })
            this.salesAreaList = this.dyadicArrToObjArr(this.productInfo.salesAreaList)
            this.form.salesAreaList = this.objArrToDyadicArr(this.salesAreaList)
            this.imgUrls = this.productInfo.imgUrls.split(',')
        }
    },
    mounted () {
        this.init()
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'productList') {
            clearCache('productList')
        }
        if (to.name != 'stepPrice') {
            clearCache('stepPrice')
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

    span {
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
        &:nth-child(1) {
            margin-top: 22px;
        }
        &:nth-child(2) {
            margin-top: 14px;
        }

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
    margin-top: 104px;
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
</style>
