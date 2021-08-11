<template>
    <div class="page-body B2b">
        <div class="page-body-cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <p class="mb20" v-if='form.auditStatus == 2'>审核不通过原因: <span class="red-word">{{form.auditOpinion}}</span></p>
                <div class="title-cont">
                    <span class="title-cont__label">商品基本信息</span>
                </div>
                <el-form-item label="商品品牌：" prop="brandName">
                    <el-autocomplete class="form-input_big" v-model="form.brandName" :fetch-suggestions="querySearchAsyncBrand" @select="handleSelectBrand" @blur="handleBlurBrand" :debounce="500" :maxlength="30" placeholder="请输入商品品牌" :disabled="showMore&&nowShow"></el-autocomplete>
                    <span class="ml10 isGrayColor">如果没有对应的品牌，请联系运营人员添加!</span>
                </el-form-item>
                <el-form-item label="商品型号：" prop="model">
                    <el-autocomplete class="form-input_big autocomplete" v-model="form.model" :fetch-suggestions="querySearchAsyncModel" @select="handleSelectModel" :debounce="500" :maxlength="50" placeholder="请输入商品型号" :disabled="showMore&&nowShow">
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
                    <el-cascader class="form-input_medium" v-model="form.categoryId" :options="categoryOption" :props="props" clearable @expand-change="onExpandChangeCategory" placeholder="请选择商品类目" :disabled="showMore&&nowShow"></el-cascader>
                    <h-button type='primary' class="ml10" @click="onFindProduct" :disabled="showMore&&nowShow">确定</h-button>
                </el-form-item>
                <div v-if="showMore">
                    <el-form-item label="商品名称：" prop="name">
                        <el-input class="form-input_big" v-model="form.name" maxlength="100" placeholder="请输入商品名称" :disabled="$route.query.id&&form.auditStatus == 1&&nowShow"></el-input>
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
                    <el-form-item label="商品图片：" prop="imageUrls" ref="imageUrls">
                        <el-upload :action="uploadInfo.action" :data="uploadInfo.data" :name="uploadAttr.name" :list-type="uploadAttr.listType" :show-file-list="uploadAttr.showFileList" :on-success="handleSuccess" :accept="uploadAttr.accept" :before-upload="beforeUpload"
                            v-if="imageUrls.length !==5">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <input type="hidden" v-model="form.imageUrls">
                        <div class="picture-content">
                            <ul>
                                <li v-for="(item, index) in imageUrls" :key="index">
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
                    <div class="sku-cont">
                        <div class="sku-cont_group mb20" v-for="(item,index) in form.optionTypeList" :key="index">
                            <div class="group-spec_label">
                                <el-form-item label="规格名：" :prop="`optionTypeList[${index}].name`" :rules="rules.option">
                                    <el-input v-model="item.name" @change="onAddOption(item.id,item.name,index)" maxlength="10" placeholder="请输入规格名" :disabled="item.disabled&&nowShow"></el-input>
                                </el-form-item>
                            </div>
                            <div class="group-spec_tags mt20">
                                <el-form-item label="规格值：" :prop="`optionTypeList[${index}].optionValues`" :rules="rules.optionValues">
                                    <el-tag class="mr10" v-for="(sItem,sIndex) in item.optionValues" :key="sIndex" @close="onDelOptionValue(index,sIndex)" :closable="!sItem.disabled&&!nowShow">{{sItem.name}}</el-tag>
                                    <el-input v-model="addValues[index]" @change="onAddOptionVlaue(index)" suffix-icon="el-icon-plus" maxlength="50" placeholder="多个属性值以空格隔开"></el-input>
                                </el-form-item>
                            </div>
                            <span class="group-spec_close" @click="onDelOptionTemplate(index)" v-if="!(form.auditStatus == 1 && item.disabled)"><i class="el-icon-close"></i></span>
                        </div>
                        <h-button type="create" class="mb20" @click="onAddOptionTemplate" :disabled="disabled">添加规格</h-button>
                    </div>
                    <skuTable ref="skuTable" :formData.sync="form"></skuTable>
                    <h-button type="create" class="mb20" v-if="form.optionTypeList.length>0" @click="onAddSKU">+</h-button>
                    <div class="title-cont" v-if="specData.length != 0">
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
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import skuTable from './skuTable'
import { interfaceUrl } from '@/api/config'
import { RICH_EDITOR_MENUS, PUTAWAY_RULES } from '../const/common'
import { flatten } from '@/views/hmall/utils/sku'
import { deepCopy } from '@/utils/utils'
import { clearCache, newCache } from '@/utils/index'
export default {
    name: 'createProduct',
    inject: ['reload'],
    components: {
        skuTable
    },
    data () {
        return {
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
                imageUrls: [],
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
                        netWeight: '',
                        optionValues: []
                    }
                ],
                detail: '',
                operator: '',
                optionTypeList: []
            },
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
                // imageUrls: [
                //     {
                //         required: true,
                //         validator: (rule, value, callback) => {
                //             if (this.imageUrls.length == 0) {
                //                 return callback(new Error('请上传商品图片'))
                //             }
                //             return callback()
                //         },
                //         trigger: 'change'
                //     }
                // ],
                option: [
                    { required: true, message: '请输入规格名', trigger: 'blur' }
                ],
                optionValues: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            this.form.optionTypeList.map(item => {
                                if (!item.optionValues || item.optionValues.length == 0) {
                                    return callback(new Error('请输入规格值'))
                                }
                            })
                            return callback()
                        }
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
            agreement: PUTAWAY_RULES
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
            return this.form.optionTypeList.some(item => !item.name || item.optionValues.length == 0)
        },
        mainSkus () {
            return deepCopy(this.form.mainSkus)
        },
        nowShow () {
            return !this.$route.query.show
        }
    },
    watch: {
        imageUrls (value) {
            if (this.$refs.imageUrls) {
                if (value.length) {
                    this.$refs.imageUrls.clearValidate()
                }
            }
        },
        'form.optionTypeList' (value, preValue) {
            // 当sku被编辑或者是编辑页面的时候，我们不做笛卡尔积
            if (this.isEdit || this.isEditSku) {
                /**
                 * 当编辑页面时候，页面渲染会触发form.optionTypeList的变更，这个时候我们不需要处理mainSkus
                 * 所以这里判断preValue.length > 0的时候，真正在调整form.optionTypeList才触发mainSkus的处理
                 */
                if (preValue.length > 0) {
                    // 当增加规格的时候
                    if (this.form.mainSkus[0].optionValues.length < value.length) {
                        // 增加一列，且只赋予第一个规格值
                        if (value[value.length - 1].optionValues.length > 0) {
                            this.form.mainSkus = this.form.mainSkus.map(item => {
                                item.optionValues.push({
                                    id: '',
                                    name: '',
                                    optionTypeId: deepCopy(value[value.length - 1].optionValues[0]).optionTypeId,
                                    optionTypeName: deepCopy(value[value.length - 1].optionValues[0]).optionTypeName
                                })
                                return item
                            })
                        }
                    } else if (this.form.mainSkus[0].optionValues.length > value.length) {
                        // 当删除规格的时候
                        this.form.mainSkus = this.form.mainSkus.map(item => {
                            item.optionValues = value.map(v => {
                                return item.optionValues.filter(o => o.optionTypeId == v.id)[0]
                            })
                            return item
                        })
                    }
                }
                return
            }
            let changeSku = true
            value.forEach(item => {
                if (item.optionValues.length <= 0) {
                    changeSku = false
                }
            })
            if (!changeSku) {
                return
            }
            // 下面是笛卡尔积逻辑
            const optionTypeList = flatten(value.filter(item => item.name && item.optionValues.length))
            if (this.$route.query.id) {
                this.form.mainSkus.map(item => {
                    let optionValues = []
                    this.productSpuInfo.optionTypeList.forEach(i => {
                        let arr = item.optionValues.filter(j => j.optionTypeId == i.id)
                        if (arr.length > 0) {
                            optionValues = optionValues.concat(arr)
                        } else {
                            optionValues.push({ id: '', name: '', optionTypeId: i.id, optionTypeName: i.name })
                        }
                    })
                    item.optionValues = optionValues
                    return item
                })
            } else {
                const mainSkus = optionTypeList.map(item => {
                    return item
                })
                if (!mainSkus.length) {
                    this.form.mainSkus = this.form.mainSkus
                    return
                }
                if (this.form.mainSkus.length == mainSkus.length) {
                    this.form.mainSkus = mainSkus.map((item, index) => ({
                        ...this.form.mainSkus[index],
                        ...item
                    }))
                } else {
                    this.form.mainSkus = mainSkus
                }
            }
        },
        mainSkus: {
            handler (value, preValue) {
                const valueNew = value.map(item => {
                    item.disabled = ''
                    return item
                })
                const preValueNew = preValue.map(item => {
                    item.disabled = ''
                    return item
                })
                const valueStr = JSON.stringify(valueNew)
                const preValueStr = JSON.stringify(preValueNew)
                /**
                 * 判断SKU是否变化的核心判断规则：是否只是optionTypeList引起的变更
                 * optionTypeList引起的变更有两种情况
                 * 1. 笛卡尔积造成的mainSkus的长度增加
                 * 2. 增加了规格名且规格值只有一个，mainSkus的长度不增加，但是mainSkus.optionValues的长度增加了
                 * 通过上述分析可以判断当两个数据长度都没有变化的时候就说明是SKU值发生变化了：
                 * value.length === preValue.length && value[0].optionValues.length === preValue[0].optionValues.length
                 * 》》》》》》》》》》》》》》》》》》》》》》》》》》》》
                 * 实际遇到一个意外情况：
                 * 1. mainSkus在进入skuTable进行编辑的时候，增加了一个disabled属性，会触发mainSkus变更，导致判断失效
                 * 这里将disabled属性置空之后对比两个value的值，如果值没有变化，我们也认为没有SKU变更
                 */
                if (valueStr != preValueStr && value.length === preValue.length && value[0].optionValues.length === preValue[0].optionValues.length) {
                    this.isEditSku = true
                }
            },
            deep: true
        },
        '$route' (to, from) {
            if (to.query.id) {
                this.reload('createProduct')
            }
        }
    },
    methods: {
        init () {
            this.getBrandOptions()
            this.getCategoryOptions()
            this.getModelOptions()
            if (this.$route.query.id) {
                this.isEdit = true
                this.showMore = true
                this.getProductInfo(this.$route.query.id)
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
            this.$router.push({ path: '/b2b/product/createProduct', query: { id: item.mainSpuId } })
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
        onFindProduct () {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    await this.getProductUnique()
                    if (this.productUnique) {
                        this.$router.push({ path: '/b2b/product/createProduct', query: { id: this.productUnique } })
                    } else {
                        this.showMore = true
                    }
                }
            })
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
        onAddOptionTemplate () {
            this.form.optionTypeList.push({ id: '', name: '', optionValues: [] })
        },
        onDelOptionTemplate (index) {
            this.form.optionTypeList.splice(index, 1)
            if (this.form.optionTypeList.length == 0) {
                this.form.mainSkus = [{
                    name: '',
                    imageUrls: '',
                    serialNumber: '',
                    length: '',
                    width: '',
                    height: '',
                    grossWeight: '',
                    volume: '',
                    netWeight: '',
                    optionValues: []
                }]
            }
        },
        async onAddOption (id, name, index) {
            if (id) {
                await this.editOption({ id: id, name: name })
            } else {
                await this.addOption({ name: name })
            }
            this.form.optionTypeList[index].id = this.optionId
        },
        async onAddOptionVlaue (index) {
            let str = this.addValues[index] || ''
            str = str.trim()
            if (!str) return
            const oldArr = this.form.optionTypeList[index].optionValues
            const arr = str.split(/\s+/)
                .filter(item => !oldArr.some(value => value.name == item))
                .map(item => (item))
            if (arr.length > 0) {
                await this.addOptionValue({ id: this.form.optionTypeList[index].id, name: this.addValues.join('') })
                this.form.optionTypeList = this.form.optionTypeList.map((item, i) => {
                    if (index === i) {
                        item.optionValues = this.form.optionTypeList[i].optionValues.concat(this.optionValueData)
                    }
                    item.optionValues.map(sItem => {
                        sItem.disabled = item.optionValues.length == 1 || this.$route.id || this.productSpuInfo.auditStatus == 1
                        return sItem
                    })
                    return item
                })
            }
            this.$set(this.addValues, index, '')
        },
        onDelOptionValue (index, sIndex) {
            let id = ''
            this.form.optionTypeList = this.form.optionTypeList.map((item, i) => {
                if (index === i) {
                    id = item.optionValues[sIndex].id
                    item.optionValues.splice(sIndex, 1)
                }
                item.optionValues.map(sItem => {
                    sItem.disabled = item.optionValues.length == 1 || this.$route.id || this.productSpuInfo.auditStatus == 1
                    return sItem
                })
                return item
            })
            this.form.mainSkus = this.form.mainSkus.map((item, i) => {
                item.optionValues = item.optionValues.map(obj => {
                    if (obj.id === id) {
                        obj.id = ''
                        obj.name = ''
                    }
                    return obj
                })
                return item
            })
            this.addValues.splice(sIndex, 1)
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        onSettingTop (index) {
            this.imageUrls.unshift((this.imageUrls.splice(index, 1))[0])
        },
        onRemove (index) {
            this.imageUrls.splice(index, 1)
        },
        onAddSKU () {
            let optionValues = []
            this.form.optionTypeList.forEach(item => {
                optionValues.push({
                    id: '',
                    name: '',
                    optionTypeId: item.id,
                    optionTypeName: item.name
                })
            })
            this.form.mainSkus = this.form.mainSkus.concat({ imageUrls: '', optionValues: optionValues })
        },
        onSave () {
            this.form.imageUrls = this.imageUrls
            this.btnLoading = true
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    let form = {}
                    if (this.form.optionTypeList.length > 0) {
                        form = {
                            ...this.form,
                            optionTypeIds: this.form.optionTypeList.map(item => item.id),
                            mainSkus: deepCopy(this.form.mainSkus).map(item => {
                                item.id = item.mainSkuId ? item.mainSkuId : ''
                                item.name = this.form.name + item.optionValues.map(sItem => sItem.name).join('')
                                item.imageUrls = item.imageUrls ? item.imageUrls.split(',') : []
                                item.optionValueIds = item.optionValues.map(sItem => sItem.id).filter(sItem => sItem)
                                return item
                            }),
                            specifications: this.form.specifications.filter(item => item.v),
                            operator: this.userInfo.employeeName
                        }
                    } else {
                        form = {
                            ...this.form,
                            mainSkus: deepCopy(this.form.mainSkus).map(item => {
                                item.id = item.mainSkuId ? item.mainSkuId : ''
                                item.name = this.form.name
                                item.imageUrls = item.imageUrls ? item.imageUrls.split(',') : []
                                return item
                            }),
                            specifications: this.form.specifications.filter(item => item.v),
                            operator: this.userInfo.employeeName
                        }
                    }
                    if (form.mainSkus.length <= 0) {
                        this.$message.warning('请添加商品！')
                        this.btnLoading = false
                        return false
                    } else {
                        try {
                            if (this.$route.query.id) {
                                await this.editProduct(form)
                                this.$router.push('/b2b/product/productList')
                                this.setNewTags((this.$route.fullPath).split('?')[0])
                            } else {
                                form.id = ''
                                await this.createProduct(form)
                                this.$router.push('/b2b/product/productList')
                                this.setNewTags((this.$route.fullPath).split('?')[0])
                            }
                            this.btnLoading = false
                        } catch (error) {
                            this.btnLoading = false
                        }
                    }
                } else {
                    this.btnLoading = false
                }
            })
        },
        onCancel () {
            this.$router.push('/b2b/product/productList')
            this.setNewTags((this.$route.fullPath).split('?')[0])
        },
        onReset () {
            this.reload('createProduct')
        },
        onPutawayRules () {
            this.$alert(this.agreement, '舒适e购商品上架规则', {
                confirmButtonText: '关闭',
                dangerouslyUseHTMLString: true
            })
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
            editOption: 'productManage/editOption',
            addOptionValue: 'productManage/addOptionValue',
            createProduct: 'productManage/createProduct',
            editProduct: 'productManage/editProduct'
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
            this.form = {
                ...this.productSpuInfo,
                mainSkus: this.productSpuInfo.mainSkus.length > 0 ? this.productSpuInfo.mainSkus.map((item, index) => {
                    item.imageUrls = item.imageUrls ? item.imageUrls.join(',') : []
                    // 编辑页面的调整，如果当前属性值没有选择的时候，后端就不会返回数据，我们需要补足数据
                    const optionTypeList = this.productSpuInfo.optionTypeList.map(obj => ({
                        id: '',
                        name: '',
                        optionTypeId: obj.id,
                        optionTypeName: obj.name
                    }))
                    item.optionValues = optionTypeList.map((obj, index) => {
                        const options = item.optionValues.filter(i => i.optionTypeId == obj.optionTypeId)
                        return options.length > 0 ? options[0] : obj
                    })
                    return item
                }) : [{
                    name: '',
                    imageUrls: '',
                    serialNumber: '',
                    length: '',
                    width: '',
                    height: '',
                    grossWeight: '',
                    volume: '',
                    netWeight: '',
                    optionValues: []
                }],
                optionTypeList: this.productSpuInfo.optionTypeList.length ? this.productSpuInfo.optionTypeList.map(item => {
                    item.disabled = !!(this.$route.query.id)
                    item.optionValues.map(sItem => {
                        sItem.disabled = item.optionValues.length == 1 || this.$route.id || this.productSpuInfo.auditStatus == 1
                        return sItem
                    })
                    return item
                }) : []
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
        if (to.name != 'productList') {
            clearCache('productList')
            // clearCache('productList')
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

.picture-content {
    line-height: 20px;
}

.isDefault {
    display: inline-block;
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
